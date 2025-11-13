# Flight Deck - Marketing Assessment Platform

## Overview
Flight Deck is a comprehensive marketing assessment platform that helps businesses evaluate their marketing maturity across multiple dimensions (Readiness, Efficiency, Alignment, and Opportunity). The platform provides personalized insights and recommendations based on current capabilities and technology stack.

## Project Structure
```
.
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components (shadcn/ui)
│   │   ├── pages/        # Main application pages
│   │   ├── data/         # Static data (cities, etc.)
│   │   ├── hooks/        # React custom hooks
│   │   └── lib/          # Utility functions
│   ├── public/           # Static assets
│   └── craco.config.js   # CRACO configuration for dev server
├── backend/           # FastAPI backend server
│   ├── server.py         # Main FastAPI application
│   └── start_backend.sh  # Backend startup script
└── tests/             # Test files
```

## Technology Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Create React App with CRACO
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Maps**: Mapbox GL

### Backend
- **Framework**: FastAPI
- **Database**: MongoDB (Motor async driver)
- **Authentication**: JWT, OAuth
- **Server**: Uvicorn

## Environment Setup

### Required Secrets (via Replit Secrets Manager)
**IMPORTANT**: For security, set these as Replit Secrets, not in .env files:

- `MONGO_URL`: MongoDB connection string (e.g., mongodb+srv://username:password@cluster.mongodb.net/)
- `DB_NAME`: Database name (e.g., flightv4)

**To set Replit Secrets:**
1. Open the "Secrets" tab in the left sidebar
2. Click "New Secret"
3. Add each secret with its value
4. Secrets are automatically available as environment variables

### Local Environment Variables

**Backend** (`backend/.env`):
- References secrets via `${MONGO_URL}` and `${DB_NAME}`
- `CORS_ORIGINS`: Allowed CORS origins (default: `*`)

**Frontend** (`frontend/.env`):
- `REACT_APP_BACKEND_URL`: Backend API URL (uses Replit domain)
- `PORT`: Frontend server port (default: 5000)

## Development Setup

### Current Configuration
- **Frontend**: Runs on port 5000 (0.0.0.0) - publicly accessible via Replit proxy
- **Backend**: Runs on port 8000 (0.0.0.0) - accessible via Replit domain
- **Database**: MongoDB Atlas (external)

### Running the Application

**Frontend** (automatic via workflow):
The frontend workflow is configured to start automatically. It runs:
```bash
cd frontend && npm start
```

**Backend** (manual start):
To start the backend server manually:
```bash
cd backend && python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

Or use the provided script:
```bash
./backend/start_backend.sh
```

### Key Features

1. **Quick Marketing Assessment**
   - 10-question assessment across key marketing capabilities:
     - Marketing Strategy & Goals
     - Content Marketing
     - Demand Generation
     - Sales & Marketing Alignment
     - Marketing Operations
     - Tech Stack Foundation
     - Account-Based Marketing
     - Analytics & Insights
     - Team & Skills
     - Budget & Resources
   - 5-option scale per question (0, 25, 50, 75, 100)
   - Direct submission to backend API
   - Scoring from 0-100 for each category
   - R/E/A/O dimensional analysis

1a. **Deep Dive Assessments** _(NEW)_
   - Topic selection screen with 10 marketing functions
   - 5 detailed questions per topic for in-depth evaluation
   - Progressive maturity options (0-100 scale)
   - Submits to same backend endpoint
   - Navigation from Quick Assessment sidebar
   - Flight metaphor: "Explore Specific Terminals"

2. **Tech Stack Evaluation**
   - Multi-tier technology categorization
   - Tool selection across 6 major categories
   - Weighted scoring based on enterprise vs SMB tools

3. **Results & Insights (Points & Planes Metaphor)**
   - **Flight Miles**: Combined score converted to 0-100 points system
   - **Current Aircraft**: Plane level with emoji, name, and description
   - **Progress to Next Level**: Visual progress bar showing miles to upgrade
   - **Flight Instrument Panel**: REAO dimension scores (Readiness, Efficiency, Alignment, Opportunity)
   - **Flight Crew Insights**: Personalized insights from assessment
   - **"What Now?" Section**: Answers next steps with concrete journeys
     - **Personalized Journeys**: Backend recommendations with flight plan stages and required tools
     - **"I Feel Lucky"**: Random journey generator for inspiration (7 templates available)
     - Required tools displayed as pill badges
     - Flight-themed UI with ✈️, 🛫, 🧭, ✨ icons
   - Plane levels: Grounded → Single Engine → Regional Jet → Commercial Jet → Wide-Body Jet

4. **Scenario Planning**
   - What-if analysis for resource changes
   - Budget, headcount, tech utilization modeling
   - Impact visualization

5. **History & Tracking**
   - Assessment history storage
   - MongoDB-based persistence
   - Result comparison over time

## API Endpoints

### Assessment
- `GET /api/assessment/questions` - Get all assessment questions
- `POST /api/assessment/submit` - Submit assessment and get results
- `GET /api/assessment/results/{assessment_id}` - Get specific assessment
- `GET /api/assessment/history` - Get assessment history
- `DELETE /api/assessment/{assessment_id}` - Delete assessment

### Tech Stack
- `GET /api/tech/categories` - Get all tech categories and tools

### Scenarios
- `POST /api/scenarios/estimate` - Calculate scenario impact

## Deployment

The application is configured for Replit autoscale deployment:
- Build process compiles the React frontend
- Backend and frontend run together in production
- Frontend is served from the build directory on port 5000

## Recent Changes
- **2025-11-13**: Added Deep Dive Assessments Feature
  - **Deep Dive Page**: New dedicated page for topic-specific assessments
    - 10 marketing function topics to choose from
    - 5 detailed questions per topic with maturity-based options
    - Submits to same backend endpoint as Quick Assessment
    - Flight/travel themed UI ("Explore Specific Terminals")
  - **Navigation**: Added "Explore Deep Dive" CTA in Assessment page sidebar
  - **Topics Available**: Strategy, Content, Demand Gen, Sales Alignment, Operations, Tech Stack, ABM, Analytics, Team, Budget
  - **Question Scale**: Each question has 5 options (0, 25, 50, 75, 100) representing maturity levels

- **2025-11-13**: Enhanced Quick Assessment and Onboarding
  - **Quick Assessment**: Added direct "Submit Quick Assessment" button
    - Submits to POST /api/assessment/submit with responses and empty tech_tools
    - Navigates directly to results page after submission
    - Added informational banner explaining assessment purpose
    - Users can still choose "Add Tech Stack" for detailed assessment
  - **Onboarding**: Created "Choose Your Adventure" 3-step flow
    - UserProfileContext for global state management
    - WelcomePage with Role, Objectives, Organization selection
    - Flight/travel themed copy throughout
    - User profile data persists across the app
  
- **2025-11-12**: Initial Replit setup completed
  - Fixed React/date-fns version compatibility issues
  - Configured CRACO dev server for Replit proxy (allowedHosts: all)
  - Set up frontend on port 5000 (0.0.0.0), backend on port 8000 (0.0.0.0)
  - Created environment configuration files with secrets placeholder
  - Configured deployment settings for autoscale
  - **Security**: Removed hardcoded MongoDB credentials - must use Replit Secrets

## Development Notes

### Replit-Specific Configuration
- Frontend dev server configured with `allowedHosts: 'all'` to work with Replit's iframe proxy
- Frontend binds to `0.0.0.0:5000` for external access
- Backend binds to `0.0.0.0:8000` for access via Replit domain
- Backend URL uses full Replit domain for CORS

### Known Issues
- None currently

## User Preferences
- None documented yet

## Project Architecture

### Data Flow
1. User completes assessment in frontend
2. Frontend sends responses + tech tools to backend API
3. Backend calculates scores using R/E/A/O algorithm
4. Results stored in MongoDB
5. Frontend displays results with visualizations

### Scoring Algorithm
- **Assessment Score**: Average of all question responses (0-100)
- **Tech Score**: Weighted score based on tool tier and category
- **Combined Score**: Average of normalized assessment and tech scores
- **R/E/A/O Scores**: Question responses mapped to 4 dimensions with tech bonuses

### Database Schema
- `assessments` collection: Stores all assessment results with metadata
  - `id`: Unique assessment identifier
  - `assessment_score`: Calculated assessment score
  - `tech_score`: Calculated tech stack score
  - `combined_score`: Overall score
  - `plane_level`: Classification level
  - `responses`: User question responses
  - `tech_tools`: Selected technology tools
  - `reao_scores`: Four-dimensional scores
  - `insights`: Generated insights
  - `recommendations`: Personalized recommendations
  - `created_at`: Timestamp
