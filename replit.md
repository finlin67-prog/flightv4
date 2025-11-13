# Flight Deck - Marketing Assessment Platform

## Overview
Flight Deck is a comprehensive marketing assessment platform designed to help businesses evaluate their marketing maturity across key dimensions: Readiness, Efficiency, Alignment, and Opportunity (REAO). It provides personalized insights and recommendations based on current marketing capabilities and technology stack, aiming to guide businesses through a "flight journey" of marketing improvement. The platform offers quick and deep-dive assessments, tech stack evaluation, scenario planning, and personalized journey recommendations, all presented with a unique flight-themed metaphor to enhance user engagement and understanding.

## User Preferences
- None documented yet

## System Architecture

### UI/UX Decisions
The platform utilizes a strong flight-themed metaphor throughout its UI, including "Flight Miles," "Current Aircraft" levels (Grounded, Single Engine, Regional Jet, Commercial Jet, Wide-Body Jet), "Flight Instrument Panel," and "Flight Crew Insights." Navigation uses flight-themed labels like "Control Tower (Home)," "Assessments," and "Flight Deck." The design incorporates `shadcn/ui` components built on Radix UI, styled with Tailwind CSS, ensuring a modern and responsive user experience. Interactive elements like sliders for scenario planning and progress indicators for guided walkthroughs are central to the user interface.

### Technical Implementations
- **Quick Marketing Assessment**: A 10-question assessment across key marketing capabilities with a 5-option scale (0-100), leading to R/E/A/O dimensional analysis.
- **Deep Dive Assessments**: Topic-specific assessments with 5 detailed questions per topic for in-depth evaluation of 10 marketing functions.
- **Tech Stack Evaluation**: Categorization and selection of tools across 6 major categories with weighted scoring based on enterprise vs. SMB tools.
- **Results & Insights**: Displays "Flight Miles" (combined score 0-100), "Current Aircraft" level, "Flight Instrument Panel" (REAO scores), "Flight Crew Insights," and a "What Now?" section with personalized journeys.
- **Flight Deck - Journey Planner**: Provides personalized journey recommendations based on assessment results, highlighting weak REAO dimensions and offering 8 detailed journey templates with actionable steps, required tech, and estimated timelines. Includes an "I Feel Lucky" feature for random recommendations.
- **What-If Simulator**: Interactive scenario modeling with adjustable parameters (budget, headcount, tech utilization, process maturity) to simulate impact on aircraft level and REAO dimensions.
- **Company A Story - Guided Walkthrough**: An 8-step interactive, non-editable walkthrough demonstrating platform usage with a pre-filled example for a fictional company.
- **Global Navigation System**: Persistent, responsive top navigation bar across all pages with active page highlighting.
- **Onboarding**: A 3-step "Choose Your Adventure" flow for user profile setup (Role, Objectives, Organization).

### System Design Choices
- **Data Flow**: Frontend collects user input, sends to backend API, backend calculates scores, stores results in MongoDB, and frontend displays visualizations.
- **Scoring Algorithm**: Combines an assessment score (average of question responses), a weighted tech score, and integrates both into a combined score. R/E/A/O scores are derived by mapping question responses to dimensions with tech bonuses.
- **Database Schema**: MongoDB stores assessment results including `assessment_score`, `tech_score`, `combined_score`, `plane_level`, `responses`, `tech_tools`, `reao_scores`, `insights`, and `recommendations`.
- **Development Environment**: Frontend on port 5000, backend on port 8000, both accessible via Replit proxy and domain. Utilizes Replit Secrets Manager for sensitive environment variables like `MONGO_URL`.

## External Dependencies

- **Database**: MongoDB Atlas (external cloud database)
- **Frontend Framework**: React 18.3.1
- **UI Components**: shadcn/ui (built on Radix UI)
- **Styling**: Tailwind CSS
- **Mapping**: Mapbox GL
- **Backend Framework**: FastAPI
- **Database Driver**: Motor (async MongoDB driver for Python)
- **Authentication**: JWT, OAuth
- **Server**: Uvicorn
- **HTTP Client**: Axios
- **Routing**: React Router DOM