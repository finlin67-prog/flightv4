from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone

# MongoDB connection - read directly from environment variables (Replit Secrets)
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME')

if not mongo_url or not db_name:
    raise ValueError("MONGO_URL and DB_NAME must be set in environment variables (Replit Secrets)")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============================================================================
# DATA MODELS
# ============================================================================

class AssessmentQuestion(BaseModel):
    id: str
    category: str
    question: str
    description: str
    options: List[Dict[str, Any]]

class TechTool(BaseModel):
    id: str
    name: str
    tier: str

class TechCategory(BaseModel):
    name: str
    weight: float
    tools: List[TechTool]

class AssessmentResponse(BaseModel):
    question_id: str
    value: int

class AssessmentSubmission(BaseModel):
    responses: Dict[str, int]
    tech_tools: List[str]
    assessment_id: Optional[str] = None

class AssessmentResult(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    assessment_score: float
    tech_score: float
    combined_score: float
    plane_level: Dict[str, str]
    responses: Dict[str, int]
    tech_tools: List[str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    insights: List[str]
    recommendations: List[Dict[str, Any]]
    reao_scores: Dict[str, float] = Field(default_factory=dict)

class ScenarioEstimate(BaseModel):
    budget_pct: float = 0  # -50 to +50
    headcount: int = 0  # -10 to +10
    tech_utilization_pct: float = 0  # -30 to +30
    process_maturity_pct: float = 0  # -20 to +20

# ============================================================================
# ASSESSMENT QUESTIONS DATA
# ============================================================================

ASSESSMENT_QUESTIONS = [
    {
        "id": "strategy",
        "category": "Marketing Strategy",
        "question": "How mature is your marketing strategy?",
        "description": "Evaluate your strategic planning, goal-setting, and market positioning.",
        "options": [
            {"value": 0, "label": "No formal strategy - reactive marketing"},
            {"value": 25, "label": "Basic strategy - annual planning with limited data"},
            {"value": 50, "label": "Defined strategy - quarterly planning with metrics"},
            {"value": 75, "label": "Advanced strategy - integrated with business goals and competitive analysis"},
            {"value": 100, "label": "World-class - data-driven, predictive, agile strategic planning"}
        ]
    },
    {
        "id": "content",
        "category": "Content Marketing",
        "question": "How sophisticated is your content operation?",
        "description": "Assess your content creation, distribution, and measurement capabilities.",
        "options": [
            {"value": 0, "label": "Ad-hoc content - no process or calendar"},
            {"value": 25, "label": "Basic content - simple blog posts and social updates"},
            {"value": 50, "label": "Structured content - editorial calendar and content types"},
            {"value": 75, "label": "Advanced content - multi-channel, personalized, performance-tracked"},
            {"value": 100, "label": "Content excellence - AI-assisted, omnichannel, audience-segmented"}
        ]
    },
    {
        "id": "demand_gen",
        "category": "Demand Generation",
        "question": "How effective is your demand generation?",
        "description": "Evaluate lead generation, nurturing, and conversion capabilities.",
        "options": [
            {"value": 0, "label": "No formal demand gen - sporadic campaigns"},
            {"value": 25, "label": "Basic campaigns - email blasts and webinars"},
            {"value": 50, "label": "Multi-channel campaigns - integrated email, ads, content"},
            {"value": 75, "label": "Advanced demand gen - ABM, lead scoring, nurture tracks"},
            {"value": 100, "label": "Predictive demand gen - AI-driven targeting and personalization"}
        ]
    },
    {
        "id": "sales_alignment",
        "category": "Sales & Marketing Alignment",
        "question": "How aligned are sales and marketing?",
        "description": "Measure collaboration, shared goals, and handoff processes.",
        "options": [
            {"value": 0, "label": "Misaligned - separate goals and limited communication"},
            {"value": 25, "label": "Basic alignment - occasional meetings"},
            {"value": 50, "label": "Defined SLAs - shared definitions and regular sync"},
            {"value": 75, "label": "Strong alignment - integrated systems and joint planning"},
            {"value": 100, "label": "Revenue team - unified goals, processes, and accountability"}
        ]
    },
    {
        "id": "operations",
        "category": "Marketing Operations",
        "question": "How mature are your marketing operations?",
        "description": "Assess process management, automation, and operational efficiency.",
        "options": [
            {"value": 0, "label": "No formal operations - manual processes"},
            {"value": 25, "label": "Basic automation - email sequences"},
            {"value": 50, "label": "Defined operations - process documentation and workflows"},
            {"value": 75, "label": "Advanced ops - integrated automation and data governance"},
            {"value": 100, "label": "World-class ops - AI-driven optimization and predictive workflows"}
        ]
    },
    {
        "id": "tech_stack",
        "category": "Technology Stack",
        "question": "How sophisticated is your marketing technology?",
        "description": "Evaluate your martech integration and utilization.",
        "options": [
            {"value": 0, "label": "Minimal tools - email and basic CRM"},
            {"value": 25, "label": "Basic stack - MAP, CRM, analytics"},
            {"value": 50, "label": "Integrated stack - 5-10 tools with some integration"},
            {"value": 75, "label": "Advanced stack - unified platform with data flows"},
            {"value": 100, "label": "Best-in-class - fully integrated, AI-enabled martech ecosystem"}
        ]
    },
    {
        "id": "abm",
        "category": "Account-Based Marketing",
        "question": "How developed is your ABM program?",
        "description": "Measure account targeting, personalization, and orchestration.",
        "options": [
            {"value": 0, "label": "No ABM - mass marketing only"},
            {"value": 25, "label": "ABM aware - identifying target accounts"},
            {"value": 50, "label": "ABM lite - personalized campaigns for top accounts"},
            {"value": 75, "label": "Scaled ABM - multi-tier account strategies"},
            {"value": 100, "label": "ABM excellence - AI-driven orchestration across buying groups"}
        ]
    },
    {
        "id": "analytics",
        "category": "Analytics & Insights",
        "question": "How advanced is your analytics capability?",
        "description": "Assess measurement, attribution, and data-driven decision making.",
        "options": [
            {"value": 0, "label": "Basic metrics - vanity metrics only"},
            {"value": 25, "label": "Channel metrics - engagement and traffic"},
            {"value": 50, "label": "Business metrics - leads, pipeline, revenue"},
            {"value": 75, "label": "Advanced attribution - multi-touch and journey analytics"},
            {"value": 100, "label": "Predictive analytics - AI-driven insights and forecasting"}
        ]
    },
    {
        "id": "team",
        "category": "Team & Skills",
        "question": "How capable is your marketing team?",
        "description": "Evaluate team structure, skills, and development.",
        "options": [
            {"value": 0, "label": "Generalists only - limited specialized skills"},
            {"value": 25, "label": "Basic specialization - few dedicated roles"},
            {"value": 50, "label": "Defined roles - specialists across key functions"},
            {"value": 75, "label": "Advanced team - centers of excellence and skill development"},
            {"value": 100, "label": "World-class team - continuous learning and innovation culture"}
        ]
    },
    {
        "id": "budget",
        "category": "Budget & Resources",
        "question": "How strategic is your budget allocation?",
        "description": "Measure budget planning, optimization, and ROI tracking.",
        "options": [
            {"value": 0, "label": "No formal budget - reactive spending"},
            {"value": 25, "label": "Annual budget - limited flexibility"},
            {"value": 50, "label": "Quarterly planning - some reallocation"},
            {"value": 75, "label": "Dynamic budgeting - performance-based allocation"},
            {"value": 100, "label": "Optimized budgeting - AI-driven, predictive, continuous optimization"}
        ]
    }
]

# ============================================================================
# TECH STACK DATA
# ============================================================================

TECH_CATEGORIES = [
    {
        "name": "CRM & Customer Data",
        "weight": 1.0,
        "tools": [
            {"id": "salesforce", "name": "Salesforce", "tier": "enterprise"},
            {"id": "hubspot", "name": "HubSpot", "tier": "mid"},
            {"id": "pipedrive", "name": "Pipedrive", "tier": "smb"},
            {"id": "zoho", "name": "Zoho CRM", "tier": "smb"},
            {"id": "supabase", "name": "Supabase", "tier": "custom"}
        ]
    },
    {
        "name": "Marketing Automation & Email",
        "weight": 1.0,
        "tools": [
            {"id": "marketo", "name": "Adobe Marketo", "tier": "enterprise"},
            {"id": "eloqua", "name": "Oracle Eloqua", "tier": "enterprise"},
            {"id": "pardot", "name": "Salesforce Pardot", "tier": "enterprise"},
            {"id": "klaviyo", "name": "Klaviyo", "tier": "mid"},
            {"id": "mailchimp", "name": "Mailchimp", "tier": "smb"}
        ]
    },
    {
        "name": "Analytics & Business Intelligence",
        "weight": 1.2,
        "tools": [
            {"id": "ga4", "name": "Google Analytics 4", "tier": "foundational"},
            {"id": "mixpanel", "name": "Mixpanel", "tier": "mid"},
            {"id": "amplitude", "name": "Amplitude", "tier": "mid"},
            {"id": "tableau", "name": "Tableau", "tier": "enterprise"},
            {"id": "looker", "name": "Google Looker", "tier": "enterprise"}
        ]
    },
    {
        "name": "Content, SEO & Search",
        "weight": 0.9,
        "tools": [
            {"id": "semrush", "name": "Semrush", "tier": "mid"},
            {"id": "ahrefs", "name": "Ahrefs", "tier": "mid"},
            {"id": "contentiq", "name": "ContentIQ", "tier": "enterprise"},
            {"id": "hubspot-cms", "name": "HubSpot CMS", "tier": "mid"},
            {"id": "wordpress", "name": "WordPress", "tier": "foundational"}
        ]
    },
    {
        "name": "Advertising & Demand Gen",
        "weight": 0.9,
        "tools": [
            {"id": "google-ads", "name": "Google Ads", "tier": "foundational"},
            {"id": "meta-ads", "name": "Meta Ads", "tier": "foundational"},
            {"id": "linkedin-ads", "name": "LinkedIn Ads", "tier": "mid"},
            {"id": "6sense", "name": "6sense", "tier": "enterprise"},
            {"id": "the-trade-desk", "name": "The Trade Desk", "tier": "enterprise"}
        ]
    },
    {
        "name": "Orchestration & Integration",
        "weight": 1.1,
        "tools": [
            {"id": "zapier", "name": "Zapier", "tier": "foundational"},
            {"id": "make", "name": "Make", "tier": "foundational"},
            {"id": "segment", "name": "Segment", "tier": "enterprise"},
            {"id": "mparticle", "name": "mParticle", "tier": "enterprise"},
            {"id": "iterable", "name": "Iterable", "tier": "mid"}
        ]
    }
]

# ============================================================================
# SCORING LOGIC - 4 DIMENSIONS (R/E/A/O)
# ============================================================================

def calculate_reao_scores(responses: Dict[str, int], tech_tools: List[str]) -> Dict[str, float]:
    """
    Calculate 4-dimension scores: Readiness, Efficiency, Alignment, Opportunity
    """
    if not responses:
        return {"readiness": 0, "efficiency": 0, "alignment": 0, "opportunity": 0}
    
    # Map questions to dimensions
    dimension_mapping = {
        "strategy": ["readiness", "alignment"],
        "content": ["efficiency", "readiness"],
        "demand_gen": ["readiness", "opportunity"],
        "sales_alignment": ["alignment", "efficiency"],
        "operations": ["efficiency", "alignment"],
        "tech_stack": ["efficiency", "readiness"],
        "abm": ["opportunity", "readiness"],
        "analytics": ["efficiency", "opportunity"],
        "team": ["readiness", "alignment"],
        "budget": ["alignment", "opportunity"]
    }
    
    # Calculate dimension scores
    dimension_scores = {"readiness": [], "efficiency": [], "alignment": [], "opportunity": []}
    
    for q_id, score in responses.items():
        if q_id in dimension_mapping:
            for dimension in dimension_mapping[q_id]:
                dimension_scores[dimension].append(score)
    
    # Average scores per dimension
    reao = {}
    for dimension, scores in dimension_scores.items():
        reao[dimension] = sum(scores) / len(scores) if scores else 0
    
    # Tech stack bonus (adds to efficiency and readiness)
    tech_count = len(tech_tools)
    tech_bonus = min(10, tech_count * 0.8)  # Up to 10 points bonus
    reao["efficiency"] = min(100, reao["efficiency"] + tech_bonus * 0.6)
    reao["readiness"] = min(100, reao["readiness"] + tech_bonus * 0.4)
    
    return reao

def calculate_assessment_score(responses: Dict[str, int]) -> float:
    """Calculate assessment score from question responses"""
    if not responses:
        return 0.0
    
    scores = list(responses.values())
    return sum(scores) / len(scores)

def calculate_tech_score(selected_tools: List[str]) -> float:
    """Calculate tech stack score based on selected tools"""
    if not selected_tools:
        return 0.0
    
    score = 0.0
    total_weight = 0.0
    
    for category in TECH_CATEGORIES:
        selected_in_category = [
            tool for tool in category["tools"] 
            if tool["id"] in selected_tools
        ]
        
        if selected_in_category:
            category_score = len(selected_in_category) * 1.5
            
            for tool in selected_in_category:
                if tool["tier"] == "enterprise":
                    category_score += 2
                elif tool["tier"] == "mid":
                    category_score += 1.5
                elif tool["tier"] == "foundational":
                    category_score += 0.5
            
            category_score = min(10, category_score / len(selected_in_category))
            score += category_score * category["weight"]
            total_weight += category["weight"]
    
    return min(10, score / total_weight) if total_weight > 0 else 0.0

def get_plane_level(assessment_score: float, tech_score: float) -> Dict[str, str]:
    """Determine plane level based on combined scores"""
    combined = (assessment_score / 10 + tech_score) / 2
    
    if combined < 2:
        return {
            "name": "Grounded",
            "emoji": "✈️",
            "description": "Foundation building phase"
        }
    elif combined < 3:
        return {
            "name": "Single Engine",
            "emoji": "🛩️",
            "description": "Basic capabilities emerging"
        }
    elif combined < 4.5:
        return {
            "name": "Regional Jet",
            "emoji": "✈️",
            "description": "Growing sophistication"
        }
    elif combined < 6:
        return {
            "name": "Commercial Jet",
            "emoji": "🛫",
            "description": "Advanced readiness"
        }
    elif combined < 7.5:
        return {
            "name": "Wide-body Jet",
            "emoji": "✈️",
            "description": "Enterprise capability"
        }
    else:
        return {
            "name": "Airbus 380",
            "emoji": "🛫",
            "description": "Maximum operational capability"
        }

def generate_insights(responses: Dict[str, int], tech_tools: List[str], reao_scores: Dict[str, float]) -> List[str]:
    """Generate insights based on assessment, tech stack, and R/E/A/O scores"""
    insights = []
    
    # R/E/A/O specific insights
    r = reao_scores.get("readiness", 0)
    e = reao_scores.get("efficiency", 0)
    a = reao_scores.get("alignment", 0)
    o = reao_scores.get("opportunity", 0)
    
    # Readiness insights
    if r < 50:
        insights.append("🎯 Readiness: Build foundational capabilities and team skills before scaling")
    elif r < 75:
        insights.append("🎯 Readiness: Strong foundation - ready to scale operations")
    else:
        insights.append("🎯 Readiness: Excellent preparedness for advanced initiatives")
    
    # Efficiency insights
    if e < 50:
        insights.append("⚡ Efficiency: Automate repetitive tasks and improve process workflows")
    elif e < 75:
        insights.append("⚡ Efficiency: Good operational rhythm - optimize key bottlenecks")
    else:
        insights.append("⚡ Efficiency: Highly optimized operations - focus on innovation")
    
    # Alignment insights
    if a < 50:
        insights.append("🎯 Alignment: Strengthen cross-functional collaboration and shared goals")
    elif a < 75:
        insights.append("🎯 Alignment: Good coordination - deepen strategic integration")
    else:
        insights.append("🎯 Alignment: Exceptional team sync and strategic cohesion")
    
    # Opportunity insights
    if o < 50:
        insights.append("🚀 Opportunity: Focus on quick wins before pursuing aggressive growth")
    elif o < 75:
        insights.append("🚀 Opportunity: Strong position - expand into adjacent channels")
    else:
        insights.append("🚀 Opportunity: Prime position for market leadership initiatives")
    
    # Overall strategic guidance
    avg_reao = (r + e + a + o) / 4
    if avg_reao < 50:
        insights.append("📊 Strategic Priority: Build foundations before scaling")
    elif avg_reao < 75:
        insights.append("📊 Strategic Priority: Scale proven channels and systematize")
    else:
        insights.append("📊 Strategic Priority: Lead with innovation and market expansion")
    
    return insights

def generate_recommendations(responses: Dict[str, int], tech_tools: List[str]) -> List[Dict[str, Any]]:
    """Generate journey recommendations based on assessment"""
    recommendations = []
    
    # Analyze weak areas
    weak_areas = []
    for q in ASSESSMENT_QUESTIONS:
        score = responses.get(q["id"], 0)
        if score < 50:
            weak_areas.append({
                "category": q["category"],
                "score": score,
                "id": q["id"]
            })
    
    # Sort by score (weakest first)
    weak_areas.sort(key=lambda x: x["score"])
    
    # Generate journey recommendations
    journey_map = {
        "abm": {
            "title": "ABM → Operations Excellence",
            "description": "Strategic targeting of high-value accounts with personalized campaigns",
            "stages": [
                "Account identification and tiering",
                "Personalized content and engagement",
                "Sales-marketing orchestration"
            ],
            "timeline": "12-16 weeks",
            "required_tools": ["salesforce", "6sense", "linkedin-ads"]
        },
        "analytics": {
            "title": "Analytics → Performance Optimization",
            "description": "Build comprehensive measurement and attribution capabilities",
            "stages": [
                "Define metrics and KPIs",
                "Implement tracking and dashboards",
                "Advanced attribution modeling"
            ],
            "timeline": "10-14 weeks",
            "required_tools": ["ga4", "mixpanel", "tableau"]
        },
        "content": {
            "title": "Content → Distribution Mastery",
            "description": "Scale content production and optimize distribution",
            "stages": [
                "Content audit and strategy",
                "Editorial calendar and workflows",
                "Multi-channel distribution"
            ],
            "timeline": "8-12 weeks",
            "required_tools": ["hubspot-cms", "semrush", "wordpress"]
        }
    }
    
    for area in weak_areas[:3]:
        area_id = area["id"]
        if area_id in journey_map:
            journey = journey_map[area_id]
            journey["current_score"] = area["score"]
            journey["priority"] = "High" if area["score"] < 30 else "Medium"
            recommendations.append(journey)
    
    return recommendations

# ============================================================================
# API ENDPOINTS
# ============================================================================

@api_router.get("/")
async def root():
    return {"message": "Flight Deck API - Marketing Assessment Platform"}

@api_router.get("/assessment/questions")
async def get_assessment_questions():
    """Get all assessment questions"""
    return {"questions": ASSESSMENT_QUESTIONS}

@api_router.get("/tech/categories")
async def get_tech_categories():
    """Get all tech categories and tools"""
    return {"categories": TECH_CATEGORIES}

@api_router.post("/assessment/submit")
async def submit_assessment(submission: AssessmentSubmission):
    """Submit assessment and get results"""
    try:
        # Calculate scores
        assessment_score = calculate_assessment_score(submission.responses)
        tech_score = calculate_tech_score(submission.tech_tools)
        combined_score = (assessment_score / 10 + tech_score) / 2
        
        # Calculate R/E/A/O scores
        reao_scores = calculate_reao_scores(submission.responses, submission.tech_tools)
        
        # Get plane level
        plane_level = get_plane_level(assessment_score, tech_score)
        
        # Generate insights and recommendations
        insights = generate_insights(submission.responses, submission.tech_tools, reao_scores)
        recommendations = generate_recommendations(submission.responses, submission.tech_tools)
        
        # Create result object
        result = AssessmentResult(
            id=submission.assessment_id or str(uuid.uuid4()),
            assessment_score=assessment_score,
            tech_score=tech_score,
            combined_score=combined_score,
            plane_level=plane_level,
            responses=submission.responses,
            tech_tools=submission.tech_tools,
            insights=insights,
            recommendations=recommendations,
            reao_scores=reao_scores
        )
        
        # Save to database
        result_dict = result.model_dump()
        result_dict['created_at'] = result_dict['created_at'].isoformat()
        
        await db.assessments.update_one(
            {"id": result.id},
            {"$set": result_dict},
            upsert=True
        )
        
        return result
        
    except Exception as e:
        logging.error(f"Error submitting assessment: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/assessment/results/{assessment_id}")
async def get_assessment_results(assessment_id: str):
    """Get assessment results by ID"""
    result = await db.assessments.find_one({"id": assessment_id}, {"_id": 0})
    
    if not result:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    return result

@api_router.get("/assessment/history")
async def get_assessment_history():
    """Get all assessments (last 50)"""
    assessments = await db.assessments.find(
        {}, 
        {"_id": 0}
    ).sort("created_at", -1).limit(50).to_list(50)
    
    return {"assessments": assessments}

@api_router.delete("/assessment/{assessment_id}")
async def delete_assessment(assessment_id: str):
    """Delete an assessment"""
    result = await db.assessments.delete_one({"id": assessment_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    return {"message": "Assessment deleted successfully"}

@api_router.post("/scenarios/estimate")
async def estimate_scenario(assessment_id: str, scenario: ScenarioEstimate):
    """
    Estimate impact of resource changes on scores
    What-if simulator for budget, headcount, tech, and process changes
    """
    try:
        # Get base assessment
        base = await db.assessments.find_one({"id": assessment_id}, {"_id": 0})
        if not base:
            raise HTTPException(status_code=404, detail="Assessment not found")
        
        # Get base R/E/A/O scores
        base_reao = base.get("reao_scores", {})
        
        # Calculate adjusted scores based on scenario
        adjusted_reao = {}
        
        # Budget impact (affects Efficiency and Opportunity)
        budget_impact = scenario.budget_pct / 100
        adjusted_reao["efficiency"] = min(100, max(0, base_reao.get("efficiency", 0) + budget_impact * 8))
        adjusted_reao["opportunity"] = min(100, max(0, base_reao.get("opportunity", 0) + budget_impact * 6))
        
        # Headcount impact (affects Readiness and Alignment)
        headcount_impact = scenario.headcount * 3
        adjusted_reao["readiness"] = min(100, max(0, base_reao.get("readiness", 0) + headcount_impact * 0.5))
        adjusted_reao["alignment"] = min(100, max(0, base_reao.get("alignment", 0) + headcount_impact * 0.3))
        
        # Tech utilization impact (affects Efficiency)
        tech_impact = scenario.tech_utilization_pct / 100
        adjusted_reao["efficiency"] = min(100, max(0, adjusted_reao["efficiency"] + tech_impact * 10))
        
        # Process maturity impact (affects Alignment and Readiness)
        process_impact = scenario.process_maturity_pct / 100
        adjusted_reao["alignment"] = min(100, max(0, adjusted_reao["alignment"] + process_impact * 9))
        adjusted_reao["readiness"] = min(100, max(0, adjusted_reao["readiness"] + process_impact * 5))
        
        # Calculate new combined score
        avg_adjusted = sum(adjusted_reao.values()) / 4
        new_assessment_score = avg_adjusted
        new_tech_score = base.get("tech_score", 0)
        new_combined = (new_assessment_score / 10 + new_tech_score) / 2
        
        # Get new plane level
        new_plane = get_plane_level(new_assessment_score, new_tech_score)
        
        # Generate scenario insights
        scenario_insights = []
        for dimension, new_val in adjusted_reao.items():
            old_val = base_reao.get(dimension, 0)
            delta = new_val - old_val
            if abs(delta) > 2:
                direction = "↑" if delta > 0 else "↓"
                scenario_insights.append(f"{dimension.title()}: {direction} {abs(delta):.1f} points")
        
        return {
            "base_scores": base_reao,
            "adjusted_scores": adjusted_reao,
            "new_combined_score": new_combined,
            "new_plane_level": new_plane,
            "delta_insights": scenario_insights,
            "scenario_applied": scenario.model_dump()
        }
        
    except Exception as e:
        logging.error(f"Error estimating scenario: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
