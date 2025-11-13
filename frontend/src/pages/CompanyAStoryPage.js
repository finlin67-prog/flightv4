import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const CompanyAStoryPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: 1,
      title: "Meet Company A",
      emoji: "🏢",
      content: [
        "Company A is a $1B revenue healthcare company with a 10-person B2B marketing team and a $1M annual marketing budget.",
        "They have strong content capabilities but no real SEO strategy, no ABM program, and an under-utilized tech stack.",
        "They currently use HubSpot as CRM and marketing automation, plus GA4 and a basic CMS."
      ]
    },
    {
      number: 2,
      title: "Boarding: Setting the Context",
      emoji: "🎫",
      content: [
        "The Marketing Ops Manager at Company A logs into the Flight Deck.",
        "They select: Role = Marketing Operations, Goals = Improve performance & understand possibilities.",
        "They define the company profile: $1B revenue, 10-person team, Healthcare, B2B.",
        "This context helps size the aircraft and shape the recommended journeys."
      ]
    },
    {
      number: 3,
      title: "Quick Scan: Where Are We Now?",
      emoji: "✈️",
      content: [
        "Company A completes the 10-question Quick Assessment.",
        "They score well on Content and Team, but lower on Demand Gen, Tech Stack, and ABM.",
        "The system calculates a combined score of about 4.2, or ~420 points.",
        "Their current aircraft is a Regional Jet ✈️ — capable of meaningful trips, but not long-haul global programs yet."
      ]
    },
    {
      number: 4,
      title: "Deep Dives and Tech Hangar",
      emoji: "🔍",
      content: [
        "Next, Company A runs Deep Dives on Demand Gen and SEO.",
        "They discover that while content is strong, there's almost no SEO strategy, and limited measurement of organic impact.",
        "In the Tech Stack Hangar, they list HubSpot, GA4, and their CMS — but realize utilization, reporting clarity, and ownership are all only mid-level.",
        "The Flight Deck now understands both their capabilities and the actual tools in their hangar."
      ]
    },
    {
      number: 5,
      title: "Recommended Journeys",
      emoji: "🗺️",
      content: [
        "With assessments and tech stack in place, the Flight Deck recommends three journeys for Company A:",
        "",
        "1. From Content Islands to Connected SEO Journeys (Content → SEO & Demand)",
        "2. From Spray & Pray to Targeted ABM (Demand Gen → ABM)",
        "3. From AI Ideas to Integrated Stack (AI → MarTech Integration)",
        "",
        "Each journey shows origin and destination, required layovers (like Operations and Analytics), and a suggested flight plan of next steps.",
        "For example, the Content → SEO journey focuses on making their strong content discoverable and tied to pipeline."
      ]
    },
    {
      number: 6,
      title: "Testing What-If Scenarios",
      emoji: "🎛️",
      content: [
        "Company A opens the Scenario Simulator and tries a few scenarios:",
        "",
        "Scenario 1: Add 3 headcount (SEO, Analytics, Ops). Result: a jump from Regional Jet to Commercial Jet 🛫 and a significant increase in Opportunity.",
        "",
        "Scenario 2: Migrate from HubSpot to Salesforce + Marketo. Result: only a small improvement unless processes and SEO are improved, too.",
        "",
        "Scenario 3: Improve SEO sophistication and tech utilization by 20%. Result: stronger gains in efficiency and opportunity than a pure platform swap.",
        "",
        "The takeaway: investing in SEO and operationalizing existing tools yields more impact than a disruptive platform migration."
      ]
    },
    {
      number: 7,
      title: "From Score to Flight Plan",
      emoji: "🧭",
      content: [
        "Instead of leaping straight into an expensive CRM/MAP migration, Company A sees a clearer, lower-risk path:",
        "",
        "• Establish a strategic SEO function.",
        "• Connect content, SEO, and Demand Gen more tightly.",
        "• Improve HubSpot utilization and reporting before considering a platform change.",
        "",
        "The Flight Deck gives them not just a maturity score, but a practical flight plan and a way to communicate tradeoffs to leadership."
      ]
    },
    {
      number: 8,
      title: "Your Turn to Fly",
      emoji: "🚀",
      content: [
        "You can use the Flight Deck the same way as Company A:",
        "",
        "• Onboarding: Define your role and company profile.",
        "• Assessments: Run a Quick Scan, Deep Dives, and map your Tech Stack.",
        "• Results: See your aircraft, points, and REAO profile.",
        "• Flight Deck: Explore suggested journeys and what-if scenarios.",
        "",
        "The goal isn't a perfect score — it's choosing the best next trips for your team with eyes wide open."
      ]
    }
  ];

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/home')}
              className="mb-4 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Company A Story</h1>
              <p className="text-xl text-blue-200">A Guided Example of the Marketing Flight Deck in Action</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-blue-400 font-semibold">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-blue-400">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content Card */}
          <div className="bg-slate-900/70 border-2 border-blue-900/50 rounded-xl p-8 mb-8 shadow-2xl">
            {/* Step Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{currentStepData.emoji}</div>
              <div>
                <div className="text-sm text-cyan-400 uppercase tracking-wide mb-1">
                  Step {currentStepData.number}
                </div>
                <h2 className="text-3xl font-bold text-white">{currentStepData.title}</h2>
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-4">
              {currentStepData.content.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`text-lg leading-relaxed ${
                    paragraph === '' ? 'h-2' : paragraph.startsWith('•') || paragraph.match(/^\d+\./) 
                      ? 'text-cyan-200 ml-4' 
                      : 'text-blue-100'
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Special CTA for Last Step */}
            {isLastStep && (
              <div className="mt-8 pt-6 border-t border-blue-900/30">
                <button
                  onClick={handleGetStarted}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 transition-all text-lg"
                >
                  Get Started with Your Own Flight Deck
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={isFirstStep}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                isFirstStep
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStep(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentStep
                      ? 'bg-cyan-400 w-8'
                      : idx < currentStep
                      ? 'bg-blue-600'
                      : 'bg-slate-700'
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isLastStep}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                isLastStep
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/50'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Navigation Hint */}
          <div className="mt-6 text-center">
            <p className="text-sm text-blue-400">
              💡 Tip: Click the dots above to jump to any step
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAStoryPage;
