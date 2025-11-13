import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plane, Target, Map, Sparkles, TrendingUp, ArrowRight, MapPin } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FlightDeckPage = () => {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLuckyJourneys, setShowLuckyJourneys] = useState(false);
  const [luckyJourneys, setLuckyJourneys] = useState([]);

  useEffect(() => {
    if (assessmentId) {
      fetchAssessmentResults(assessmentId);
    } else {
      fetchLatestAssessment();
    }
  }, [assessmentId]);

  const fetchAssessmentResults = async (id) => {
    try {
      const response = await axios.get(`${API}/assessment/results/${id}`);
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  const fetchLatestAssessment = async () => {
    try {
      const response = await axios.get(`${API}/assessment/history`);
      if (response.data.assessments && response.data.assessments.length > 0) {
        const latest = response.data.assessments[0];
        fetchAssessmentResults(latest.id);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      setLoading(false);
    }
  };

  const journeyCatalog = [
    {
      id: 'spray_to_abm',
      title: 'From Spray & Pray to Targeted ABM',
      origin: 'Demand Generation',
      destination: 'Account-Based Marketing',
      layovers: ['Marketing Operations', 'Analytics & Data', 'Sales Alignment'],
      description: 'Transform your mass marketing approach into a sophisticated account-based strategy that targets high-value prospects with precision.',
      nextSteps: [
        'Identify and tier your top 100 target accounts using firmographic and intent data',
        'Implement account scoring and stakeholder mapping for tier-1 accounts',
        'Build personalized content and messaging frameworks by vertical and use case',
        'Set up multi-channel orchestration with coordinated touchpoints across email, social, and direct channels',
        'Establish sales-marketing SLAs for account engagement and handoff processes'
      ],
      techRequired: ['6sense', 'Demandbase', 'LinkedIn Sales Navigator', 'Salesforce'],
      estimatedTime: '12-16 weeks',
      priority: 'high'
    },
    {
      id: 'manual_to_automated',
      title: 'From Manual Campaigns to Marketing Automation',
      origin: 'Email Marketing',
      destination: 'Marketing Automation',
      layovers: ['Marketing Operations', 'Data Management', 'Lead Scoring'],
      description: 'Scale your marketing with sophisticated automation that nurtures leads, scores engagement, and drives pipeline efficiently.',
      nextSteps: [
        'Audit current email campaigns and identify automation opportunities',
        'Map buyer journey stages and define qualification criteria',
        'Implement behavioral lead scoring based on engagement and firmographics',
        'Build automated nurture tracks for each stage of the buyer journey',
        'Create closed-loop reporting with sales to optimize conversion rates'
      ],
      techRequired: ['HubSpot', 'Marketo', 'Pardot', 'ActiveCampaign'],
      estimatedTime: '8-12 weeks',
      priority: 'high'
    },
    {
      id: 'vanity_to_revenue',
      title: 'From Vanity Metrics to Revenue Attribution',
      origin: 'Basic Analytics',
      destination: 'Revenue Attribution',
      layovers: ['Data Integration', 'Marketing Operations', 'CRM Alignment'],
      description: 'Move beyond page views and clicks to prove marketing\'s true impact on revenue with multi-touch attribution.',
      nextSteps: [
        'Integrate all marketing touchpoints into a unified data warehouse',
        'Define attribution model (first-touch, last-touch, or multi-touch weighted)',
        'Map campaigns and channels to pipeline and closed-won revenue',
        'Build executive dashboards showing marketing ROI and CAC by channel',
        'Implement predictive analytics to forecast pipeline contribution'
      ],
      techRequired: ['Bizible', 'Google Analytics', 'Tableau', 'Salesforce'],
      estimatedTime: '10-14 weeks',
      priority: 'medium'
    },
    {
      id: 'blog_to_demand',
      title: 'From Blog Posts to Demand Engine',
      origin: 'Content Marketing',
      destination: 'Integrated Demand Generation',
      layovers: ['SEO & Distribution', 'Lead Capture', 'Nurture Programs'],
      description: 'Transform your content library into a lead generation machine with strategic distribution and conversion optimization.',
      nextSteps: [
        'Conduct content audit and map existing assets to buyer journey stages',
        'Develop content pillars aligned to product value propositions and SEO keywords',
        'Create gated assets (ebooks, webinars, tools) for lead capture at each stage',
        'Build multi-channel distribution strategy including syndication and paid promotion',
        'Implement content-to-pipeline tracking with attribution modeling'
      ],
      techRequired: ['SEMrush', 'HubSpot', 'Canva', 'Vidyard'],
      estimatedTime: '12-16 weeks',
      priority: 'medium'
    },
    {
      id: 'siloed_to_aligned',
      title: 'From Siloed to Sales-Marketing Alignment',
      origin: 'Disconnected Teams',
      destination: 'Revenue Operations',
      layovers: ['Shared Metrics', 'Process Definition', 'Technology Integration'],
      description: 'Break down barriers between sales and marketing to create a unified revenue engine with shared goals and accountability.',
      nextSteps: [
        'Define Service Level Agreement (SLA) between sales and marketing teams',
        'Establish lead lifecycle stages and handoff criteria with sales input',
        'Create shared revenue dashboards visible to both teams',
        'Implement regular sales-marketing alignment meetings (weekly/bi-weekly)',
        'Build closed-loop feedback system for lead quality and conversion insights'
      ],
      techRequired: ['Salesforce', 'Gong', 'Clari', 'Slack'],
      estimatedTime: '8-10 weeks',
      priority: 'high'
    },
    {
      id: 'local_to_global',
      title: 'From Local Tools to Integrated Stack',
      origin: 'Point Solutions',
      destination: 'Unified Marketing Platform',
      layovers: ['Technology Audit', 'Integration Architecture', 'Data Governance'],
      description: 'Consolidate your fragmented martech stack into an integrated ecosystem that shares data and enables sophisticated workflows.',
      nextSteps: [
        'Audit current martech stack and identify redundancies and gaps',
        'Design integration architecture with customer data platform (CDP) at center',
        'Implement middleware or iPaaS to connect marketing, sales, and customer success tools',
        'Establish data governance policies and master data management practices',
        'Build unified reporting layer across all marketing systems'
      ],
      techRequired: ['Segment', 'mParticle', 'Zapier', 'Salesforce'],
      estimatedTime: '14-18 weeks',
      priority: 'medium'
    },
    {
      id: 'reactive_to_predictive',
      title: 'From Reactive to Predictive Marketing',
      origin: 'Historical Reporting',
      destination: 'AI-Powered Insights',
      layovers: ['Data Warehouse', 'ML Models', 'Real-time Analytics'],
      description: 'Leverage AI and machine learning to predict customer behavior, optimize campaigns, and proactively prevent churn.',
      nextSteps: [
        'Build data warehouse with historical customer engagement and conversion data',
        'Implement predictive lead scoring using machine learning algorithms',
        'Create propensity models for upsell, cross-sell, and churn prediction',
        'Deploy real-time recommendation engine for content and next-best-action',
        'Set up automated alerts and triggers based on predictive insights'
      ],
      techRequired: ['Salesforce Einstein', 'Adobe Sensei', 'Google Analytics 4', 'Python/R'],
      estimatedTime: '16-20 weeks',
      priority: 'medium'
    },
    {
      id: 'generic_to_personalized',
      title: 'From Generic to 1:1 Personalization',
      origin: 'Mass Marketing',
      destination: 'Hyper-Personalization',
      layovers: ['Customer Data Platform', 'Segmentation', 'Dynamic Content'],
      description: 'Deliver individualized experiences across every touchpoint using behavioral data, AI, and real-time personalization.',
      nextSteps: [
        'Implement customer data platform (CDP) to unify customer profiles',
        'Build advanced segmentation based on behavior, firmographics, and intent',
        'Create dynamic content modules for email, web, and advertising',
        'Deploy AI-powered product and content recommendation engines',
        'Test and optimize personalization strategies with A/B and multivariate testing'
      ],
      techRequired: ['Segment', 'Optimizely', 'Dynamic Yield', 'Salesforce Marketing Cloud'],
      estimatedTime: '12-16 weeks',
      priority: 'medium'
    }
  ];

  const getWeakAreas = () => {
    if (!results || !results.reao_scores) return [];

    const areas = [
      { name: 'Readiness', score: results.reao_scores.readiness, key: 'readiness' },
      { name: 'Efficiency', score: results.reao_scores.efficiency, key: 'efficiency' },
      { name: 'Alignment', score: results.reao_scores.alignment, key: 'alignment' },
      { name: 'Opportunity', score: results.reao_scores.opportunity, key: 'opportunity' }
    ];

    return areas.sort((a, b) => a.score - b.score).slice(0, 2);
  };

  const getRecommendedJourneys = () => {
    if (!results) return [];

    const weakAreas = getWeakAreas();
    const assessmentScore = results.assessment_score || 0;
    const techScore = results.tech_score || 0;
    const techTools = results.tech_tools || [];
    
    // Normalize tech tool names for comparison
    const normalizedTools = techTools.map(t => t.toLowerCase());

    let recommended = [];

    // Check for tech gaps - missing critical tools
    const hasMarketingAutomation = normalizedTools.some(t => 
      ['hubspot', 'marketo', 'pardot', 'activecampaign', 'eloqua'].includes(t)
    );
    const hasABMPlatform = normalizedTools.some(t => 
      ['6sense', 'demandbase', 'terminus', 'engagio'].includes(t)
    );
    const hasAnalyticsPlatform = normalizedTools.some(t => 
      ['google-analytics', 'adobe-analytics', 'mixpanel', 'amplitude', 'bizible'].includes(t)
    );
    const hasCRM = normalizedTools.some(t => 
      ['salesforce', 'hubspot', 'dynamics', 'pipedrive'].includes(t)
    );

    // Prioritize based on weak areas, scores, AND tech gaps
    if (!hasMarketingAutomation && (assessmentScore < 50 || techScore < 4)) {
      recommended.push(journeyCatalog.find(j => j.id === 'manual_to_automated'));
    }

    if (techTools.length < 5 || techScore < 3) {
      recommended.push(journeyCatalog.find(j => j.id === 'local_to_global'));
    }

    if (weakAreas.find(a => a.key === 'alignment') || !hasCRM) {
      recommended.push(journeyCatalog.find(j => j.id === 'siloed_to_aligned'));
    }

    if (weakAreas.find(a => a.key === 'efficiency')) {
      recommended.push(journeyCatalog.find(j => j.id === 'blog_to_demand'));
    }

    if (!hasABMPlatform && assessmentScore >= 40 && assessmentScore < 70) {
      recommended.push(journeyCatalog.find(j => j.id === 'spray_to_abm'));
    }

    if (!hasAnalyticsPlatform || weakAreas.find(a => a.key === 'opportunity')) {
      recommended.push(journeyCatalog.find(j => j.id === 'vanity_to_revenue'));
    }

    if (assessmentScore >= 70 && techScore >= 6) {
      recommended.push(journeyCatalog.find(j => j.id === 'reactive_to_predictive'));
      recommended.push(journeyCatalog.find(j => j.id === 'generic_to_personalized'));
    }

    // Remove duplicates and undefined
    return [...new Set(recommended.filter(Boolean))].slice(0, 4);
  };

  const getTechGapInfo = (journey) => {
    if (!results || !results.tech_tools) return { missing: [], hasAny: false };
    
    const techTools = results.tech_tools || [];
    const normalizedTools = techTools.map(t => t.toLowerCase());
    const normalizedRequired = journey.techRequired.map(t => t.toLowerCase());
    
    const missing = journey.techRequired.filter((tool, idx) => 
      !normalizedTools.includes(normalizedRequired[idx])
    );
    
    const hasAny = journey.techRequired.some((tool, idx) =>
      normalizedTools.includes(normalizedRequired[idx])
    );

    return { missing, hasAny, total: journey.techRequired.length };
  };

  const handleFeelLucky = () => {
    const shuffled = [...journeyCatalog].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setLuckyJourneys(selected);
    setShowLuckyJourneys(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading Flight Deck...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No assessment data found</p>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const totalPoints = Math.round(results.combined_score * 10);
  const planeLevel = results.plane_level || { name: 'Unknown', emoji: '✈️' };
  const weakAreas = getWeakAreas();
  const recommendedJourneys = getRecommendedJourneys();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(`/results/${results.id}`)}
              className="mb-4 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Results
            </button>
            <div className="flex items-center gap-3 mb-3">
              <Map className="w-10 h-10 text-cyan-400" />
              <h1 className="text-4xl font-bold text-white">Flight Deck</h1>
            </div>
            <p className="text-xl text-blue-200">Your Personalized Journey Planner</p>
          </div>

          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Plane Level */}
            <div className="bg-slate-900/50 border-2 border-blue-900/30 rounded-xl p-6 text-center">
              <p className="text-5xl mb-3">{planeLevel.emoji}</p>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">{planeLevel.name}</h3>
              <p className="text-3xl font-bold text-white mb-1">{totalPoints}</p>
              <p className="text-sm text-blue-300">Flight Miles</p>
            </div>

            {/* Weak Areas */}
            <div className="md:col-span-2 bg-slate-900/50 border-2 border-orange-900/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-bold text-white">Priority Focus Areas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weakAreas.map((area, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-orange-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-300 font-semibold">{area.name}</span>
                      <span className="text-2xl font-bold text-orange-400">{Math.round(area.score)}</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-600 to-orange-400 h-2 rounded-full"
                        style={{ width: `${area.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-orange-200 mt-2">
                      {area.score < 40 ? 'Needs immediate attention' : area.score < 60 ? 'Room for improvement' : 'Building momentum'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Journeys */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Recommended Flight Plans</h2>
                <p className="text-blue-300">Personalized journeys based on your current capabilities and gaps</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendedJourneys.map((journey, idx) => {
                const techGap = getTechGapInfo(journey);
                return (
                <div key={idx} className="bg-gradient-to-br from-slate-900/70 to-slate-800/70 border-2 border-cyan-500/40 rounded-xl p-6 hover:border-cyan-400/80 hover:shadow-xl hover:shadow-cyan-500/20 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-cyan-400">{journey.title}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ml-2 ${
                      journey.priority === 'high' 
                        ? 'bg-red-600/30 text-red-300 border border-red-500/50' 
                        : 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/50'
                    }`}>
                      {journey.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium">{journey.origin}</span>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-300 font-medium">{journey.destination}</span>
                  </div>

                  <p className="text-sm text-blue-200 mb-4 leading-relaxed">{journey.description}</p>

                  {/* Layovers */}
                  <div className="mb-4">
                    <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-2">Required Layovers</p>
                    <div className="flex flex-wrap gap-2">
                      {journey.layovers.map((layover, lIdx) => (
                        <span
                          key={lIdx}
                          className="px-3 py-1 text-xs bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/30"
                        >
                          {layover}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="mb-4">
                    <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wide mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Next Steps
                    </p>
                    <div className="space-y-1.5">
                      {journey.nextSteps.slice(0, 3).map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs">
                          <span className="text-cyan-400 mt-0.5 shrink-0">{sIdx + 1}.</span>
                          <span className="text-blue-200">{step}</span>
                        </div>
                      ))}
                      {journey.nextSteps.length > 3 && (
                        <p className="text-xs text-cyan-400 italic pl-4">+ {journey.nextSteps.length - 3} more steps...</p>
                      )}
                    </div>
                  </div>

                  {/* Tech Required with Gap Analysis */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">Tech Stack Analysis</p>
                      {techGap.missing.length > 0 && (
                        <span className="text-xs text-orange-400">
                          {techGap.missing.length} missing
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {journey.techRequired.map((tool, tIdx) => {
                        const isMissing = techGap.missing.includes(tool);
                        return (
                          <span
                            key={tIdx}
                            className={`px-2 py-1 text-xs rounded border ${
                              isMissing
                                ? 'bg-orange-600/20 text-orange-300 border-orange-500/30'
                                : 'bg-green-600/20 text-green-300 border-green-500/30'
                            }`}
                          >
                            {isMissing ? '⚠️ ' : '✓ '}{tool}
                          </span>
                        );
                      })}
                    </div>
                    {techGap.missing.length > 0 && (
                      <p className="text-xs text-orange-300 mt-2 italic">
                        Consider adding {techGap.missing.length === 1 ? 'this tool' : 'these tools'} to accelerate this journey
                      </p>
                    )}
                  </div>

                  {/* Estimated Time */}
                  <div className="pt-4 border-t border-blue-900/30">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-400">Estimated Journey Time:</span>
                      <span className="text-cyan-300 font-semibold">{journey.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 bg-slate-900/30 border border-blue-900/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Explore More Tools</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(`/scenario-simulator/${results.id}`)}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:shadow-green-500/50 transition-all"
              >
                🎛️ What-If Simulator
              </button>
              <button
                onClick={() => navigate('/story/company-a')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                📖 See Company A Example
              </button>
            </div>
          </div>

          {/* I Feel Lucky Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Explore New Routes</h3>
              </div>
              <p className="text-blue-200 mb-4 max-w-xl mx-auto">
                Discover unexpected journey ideas that could transform your marketing strategy - even if they're not your top priority right now
              </p>
              <button
                onClick={handleFeelLucky}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center gap-3 mx-auto shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                I Feel Lucky - Show Random Journeys
                <Sparkles className="w-5 h-5" />
              </button>
            </div>

            {/* Lucky Journeys Display */}
            {showLuckyJourneys && luckyJourneys.length > 0 && (
              <div className="mt-8 pt-8 border-t border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                    ✨ Your Random Journey Ideas
                  </h4>
                  <button
                    onClick={() => setShowLuckyJourneys(false)}
                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    Hide
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {luckyJourneys.map((journey, idx) => (
                    <div key={idx} className="bg-slate-900/60 border-2 border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                      <h4 className="text-lg font-bold text-purple-300 mb-3">{journey.title}</h4>
                      
                      <div className="flex items-center gap-2 mb-3 text-sm">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <span className="text-green-300">{journey.origin}</span>
                        <ArrowRight className="w-4 h-4 text-blue-400" />
                        <MapPin className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300">{journey.destination}</span>
                      </div>
                      
                      <p className="text-sm text-blue-200 mb-4 leading-relaxed">{journey.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-xs text-purple-400 font-semibold mb-2">Layovers Required</p>
                        <div className="flex flex-wrap gap-1.5">
                          {journey.layovers.map((layover, lIdx) => (
                            <span key={lIdx} className="px-2 py-1 text-xs bg-purple-600/20 text-purple-300 rounded border border-purple-500/30">
                              {layover}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-purple-900/30">
                        <div className="flex justify-between text-xs text-purple-300">
                          <span>Journey Time:</span>
                          <span className="font-semibold">{journey.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDeckPage;
