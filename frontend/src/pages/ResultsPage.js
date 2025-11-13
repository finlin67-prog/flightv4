import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Home, History, TrendingUp, Award, Sparkles, Compass } from 'lucide-react';
import axios from 'axios';
import ScenarioSimulatorPanel from '../components/ScenarioSimulatorPanel';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ResultsPage = () => {
  const { assessmentId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLuckyJourneys, setShowLuckyJourneys] = useState(false);
  const [luckyJourneys, setLuckyJourneys] = useState([]);

  useEffect(() => {
    fetchResults();
    // Store latest assessment ID for navigation
    if (assessmentId) {
      localStorage.setItem('latestAssessmentId', assessmentId);
    }
  }, [assessmentId]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${API}/assessment/results/${assessmentId}`);
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  // Sample journey templates for "I feel lucky" feature
  const journeyTemplates = [
    {
      title: "Content Marketing → Demand Engine",
      description: "Transform content from blog posts to a full demand generation machine",
      stages: ["Content audit and gap analysis", "Editorial calendar with buyer journey mapping", "Multi-channel distribution strategy", "Lead capture and nurture integration", "Performance analytics dashboard"],
      timeline: "12-16 weeks",
      required_tools: ["hubspot", "semrush", "canva"],
      current_score: 40,
      priority: "High"
    },
    {
      title: "Email → Marketing Automation",
      description: "Evolve from basic email blasts to sophisticated automated campaigns",
      stages: ["Audience segmentation and persona mapping", "Behavioral trigger setup", "Lead scoring implementation", "Dynamic content personalization", "A/B testing framework"],
      timeline: "10-14 weeks",
      required_tools: ["marketo", "salesforce", "segment"],
      current_score: 30,
      priority: "High"
    },
    {
      title: "Analytics → Revenue Attribution",
      description: "Move from vanity metrics to full revenue attribution and forecasting",
      stages: ["Data integration and cleanup", "Multi-touch attribution model setup", "Pipeline analytics dashboard", "Predictive scoring implementation", "Executive reporting automation"],
      timeline: "14-18 weeks",
      required_tools: ["google-analytics", "bizible", "tableau"],
      current_score: 35,
      priority: "Medium"
    },
    {
      title: "Social → Community Platform",
      description: "Build an engaged community around your brand on social channels",
      stages: ["Community platform selection", "Content pillar strategy", "Engagement playbook creation", "Influencer partnership program", "Community metrics dashboard"],
      timeline: "16-20 weeks",
      required_tools: ["hootsuite", "discord", "circle"],
      current_score: 25,
      priority: "Medium"
    },
    {
      title: "Events → Virtual Experience Hub",
      description: "Create scalable virtual events and webinar programs that drive pipeline",
      stages: ["Virtual event platform setup", "Webinar series planning", "On-demand content library", "Integration with CRM/MAP", "Engagement scoring system"],
      timeline: "10-12 weeks",
      required_tools: ["zoom", "on24", "hubspot"],
      current_score: 20,
      priority: "Medium"
    },
    {
      title: "SEO → Organic Growth Engine",
      description: "Build a sustainable organic traffic acquisition program",
      stages: ["Technical SEO audit and fixes", "Keyword research and mapping", "Content cluster development", "Backlink acquisition strategy", "Performance tracking dashboard"],
      timeline: "16-24 weeks",
      required_tools: ["semrush", "ahrefs", "google-search-console"],
      current_score: 30,
      priority: "High"
    },
    {
      title: "Account-Based → Enterprise Sales Machine",
      description: "Implement sophisticated ABM to close enterprise deals",
      stages: ["Target account identification", "Multi-stakeholder mapping", "Personalized campaign orchestration", "Sales alignment and SLAs", "Account health scoring"],
      timeline: "12-16 weeks",
      required_tools: ["6sense", "demandbase", "salesforce"],
      current_score: 25,
      priority: "High"
    }
  ];

  const handleFeelLucky = () => {
    // Shuffle and pick 5 random journeys
    const shuffled = [...journeyTemplates].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setLuckyJourneys(selected);
    setShowLuckyJourneys(true);
  };

  // Calculate plane level thresholds and next level info
  const getPlaneLevelInfo = (points) => {
    const levels = [
      { min: 0, max: 19, name: 'Grounded', emoji: '✈️', description: 'Building the runway', color: 'red' },
      { min: 20, max: 39, name: 'Single Engine', emoji: '🛩️', description: 'Taking off with basics', color: 'yellow' },
      { min: 40, max: 59, name: 'Regional Jet', emoji: '✈️', description: 'Flying regional routes', color: 'blue' },
      { min: 60, max: 79, name: 'Commercial Jet', emoji: '🛫', description: 'Serving major markets', color: 'cyan' },
      { min: 80, max: 100, name: 'Wide-Body Jet', emoji: '🛫', description: 'Global operations excellence', color: 'green' }
    ];

    const currentLevel = levels.find(level => points >= level.min && points <= level.max) || levels[0];
    const currentIndex = levels.findIndex(level => level === currentLevel);
    const nextLevel = currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;

    let progressToNext = 0;
    let pointsToNext = 0;
    
    if (nextLevel) {
      const rangeSize = currentLevel.max - currentLevel.min + 1;
      const pointsInRange = points - currentLevel.min;
      progressToNext = (pointsInRange / rangeSize) * 100;
      pointsToNext = nextLevel.min - points;
    } else {
      progressToNext = 100; // Max level reached
    }

    return { currentLevel, nextLevel, progressToNext, pointsToNext };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading results...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Results not found</div>
          <Link to="/">
            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg">Go Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const { assessment_score, tech_score, combined_score, plane_level, insights, recommendations, reao_scores } = results;
  
  // Convert combined_score (0-10 scale) to points (0-100 scale)
  const totalPoints = Math.round(combined_score * 10);
  const levelInfo = getPlaneLevelInfo(totalPoints);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <div className="border-b border-blue-900/30 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-400 uppercase tracking-wide mb-1">Assessment Complete</p>
              <h1 className="text-3xl font-bold text-white">Your Flight Status</h1>
            </div>
            <div className="flex gap-3">
              <Link to="/history">
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2">
                  <History className="w-4 h-4" />
                  History
                </button>
              </Link>
              <Link to="/">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Points Hero Section */}
        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-2 border-cyan-500/40 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-yellow-400" />
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {totalPoints} Flight Miles
              </h2>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-lg text-blue-200">Your total marketing readiness score</p>
          </div>

          {/* Current Aircraft Card */}
          <div className="bg-slate-900/60 rounded-xl p-8 border border-cyan-500/30 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-7xl">{plane_level.emoji}</div>
                <div className="text-left">
                  <p className="text-sm text-blue-400 uppercase tracking-wide mb-1">Current Aircraft</p>
                  <h3 className="text-3xl font-bold text-white mb-2">{plane_level.name}</h3>
                  <p className="text-blue-200">{plane_level.description}</p>
                </div>
              </div>
              {levelInfo.nextLevel && (
                <div className="text-center md:text-right">
                  <p className="text-sm text-cyan-400 mb-1">Next Destination</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{levelInfo.nextLevel.emoji}</span>
                    <span className="text-xl font-semibold text-white">{levelInfo.nextLevel.name}</span>
                  </div>
                  <p className="text-xs text-blue-300 mt-1">{levelInfo.pointsToNext} miles to upgrade</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress to Next Level */}
          {levelInfo.nextLevel && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-300">Progress to {levelInfo.nextLevel.name}</span>
                <span className="text-cyan-400 font-semibold">{Math.round(levelInfo.progressToNext)}%</span>
              </div>
              <div className="relative w-full bg-slate-800/50 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 h-6 rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                  style={{ width: `${levelInfo.progressToNext}%` }}
                >
                  {levelInfo.progressToNext > 15 && (
                    <TrendingUp className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
              <p className="text-xs text-blue-400 text-center">
                Keep improving to unlock {levelInfo.nextLevel.name} status and reach new destinations!
              </p>
            </div>
          )}
          {!levelInfo.nextLevel && (
            <div className="text-center py-4">
              <p className="text-lg text-green-400 font-semibold flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Maximum Level Achieved! You're operating at world-class excellence.
              </p>
            </div>
          )}
        </div>

        {/* R/E/A/O Dashboard with Insights */}
        {reao_scores && (
          <div className="bg-slate-900/50 border border-blue-900/30 rounded-xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Flight Instrument Panel</h3>
              <p className="text-blue-300">Four key dimensions of marketing readiness</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { key: 'readiness', label: 'Readiness', icon: '🎯', description: 'Foundation strength' },
                { key: 'efficiency', label: 'Efficiency', icon: '⚡', description: 'Operational speed' },
                { key: 'alignment', label: 'Alignment', icon: '🤝', description: 'Team coordination' },
                { key: 'opportunity', label: 'Opportunity', icon: '🚀', description: 'Growth potential' }
              ].map((dim) => {
                const score = reao_scores[dim.key] || 0;
                const insight = insights.find(i => i.toLowerCase().includes(dim.label.toLowerCase()));
                
                return (
                  <div key={dim.key} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-6 border border-blue-900/20 hover:border-cyan-500/50 transition-all">
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{dim.icon}</div>
                      <h4 className="text-sm font-semibold text-cyan-400 mb-1 uppercase tracking-wide">{dim.label}</h4>
                      <p className="text-xs text-blue-400 mb-3">{dim.description}</p>
                      <p className="text-4xl font-bold text-white mb-2">{score.toFixed(0)}</p>
                    </div>
                    
                    <div className="w-full bg-slate-700/50 rounded-full h-3 mb-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          score >= 75 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          score >= 50 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          'bg-gradient-to-r from-yellow-500 to-orange-500'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    
                    {insight && (
                      <p className="text-xs text-blue-200 leading-relaxed">
                        {insight.replace(/^[🎯⚡🤝🚀]\s+\w+:\s+/, '')}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Score Breakdown */}
          <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Mile Breakdown</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-blue-300">Assessment Miles</span>
                  <span className="text-xl font-bold text-blue-400">{assessment_score.toFixed(0)}/100</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full transition-all"
                    style={{ width: `${assessment_score}%` }}
                  />
                </div>
                <p className="text-xs text-blue-400 mt-1">Based on 10 strategic capability questions</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-cyan-300">Tech Stack Miles</span>
                  <span className="text-xl font-bold text-cyan-400">{(tech_score * 10).toFixed(0)}/100</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-3 rounded-full transition-all"
                    style={{ width: `${tech_score * 10}%` }}
                  />
                </div>
                <p className="text-xs text-cyan-400 mt-1">Based on tool sophistication and coverage</p>
              </div>

              <div className="pt-4 border-t border-blue-900/30">
                <div className="flex justify-between mb-2">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Total Flight Miles
                  </span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {totalPoints}
                  </span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 h-4 rounded-full transition-all"
                    style={{ width: `${totalPoints}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Flight Crew Insights</h3>
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800/30 p-3 rounded-lg border border-blue-900/20">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-200 text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Journeys Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Compass className="w-8 h-8 text-cyan-400" />
              <h3 className="text-4xl font-bold text-white">What Now?</h3>
            </div>
            <p className="text-xl text-blue-200 mb-2">Your Best Next Trips</p>
            <p className="text-blue-300 max-w-2xl mx-auto">
              Strategic flight plans designed to close your gaps and accelerate your marketing journey
            </p>
          </div>

          {/* Recommended Journeys from Backend */}
          {recommendations && recommendations.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                  🛫 Personalized for You
                </h4>
                <span className="text-sm text-blue-300">{recommendations.length} journey{recommendations.length !== 1 ? 's' : ''} recommended</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-900/70 to-slate-800/70 border-2 border-cyan-500/40 rounded-xl p-6 hover:border-cyan-400/80 hover:shadow-xl hover:shadow-cyan-500/20 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✈️</span>
                        <h4 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{rec.title}</h4>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                        rec.priority === 'High' 
                          ? 'bg-red-600/30 text-red-300 border border-red-500/50' 
                          : 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/50'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    
                    <p className="text-sm text-blue-200 mb-5 leading-relaxed">{rec.description}</p>
                    
                    {/* Flight Plan Stages */}
                    <div className="space-y-2 mb-5">
                      <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wide flex items-center gap-1">
                        <span>🗺️</span> Flight Plan
                      </p>
                      <div className="space-y-1.5">
                        {rec.stages.slice(0, 5).map((stage, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2 text-xs">
                            <span className="text-cyan-400 mt-0.5 shrink-0">✈</span>
                            <span className="text-blue-200">{stage}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Required Tools */}
                    {rec.required_tools && rec.required_tools.length > 0 && (
                      <div className="mb-5">
                        <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-2">Required Tools</p>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.required_tools.map((tool, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 text-xs bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/30 font-medium"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Journey Metrics */}
                    <div className="pt-4 border-t border-blue-900/30 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">Journey Time:</span>
                        <span className="text-cyan-300 font-semibold">{rec.timeline}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">Current Score:</span>
                        <span className="text-cyan-300 font-semibold">{rec.current_score}/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* I Feel Lucky Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h4 className="text-2xl font-bold text-white">Feeling Adventurous?</h4>
              </div>
              <p className="text-blue-200 mb-4 max-w-xl mx-auto">
                Discover unexpected journey ideas that could transform your marketing - even if they're not on your radar yet
              </p>
              <button
                onClick={handleFeelLucky}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center gap-3 mx-auto shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                I Feel Lucky - Show Me Random Journeys
                <Sparkles className="w-5 h-5" />
              </button>
            </div>

            {/* Lucky Journeys Display */}
            {showLuckyJourneys && luckyJourneys.length > 0 && (
              <div className="mt-8 pt-8 border-t border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                    ✨ Your Random Journey Ideas
                  </h5>
                  <button
                    onClick={() => setShowLuckyJourneys(false)}
                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    Hide
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {luckyJourneys.map((journey, idx) => (
                    <div key={idx} className="bg-slate-900/60 border-2 border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🎲</span>
                          <h5 className="text-lg font-bold text-purple-300">{journey.title}</h5>
                        </div>
                      </div>
                      
                      <p className="text-sm text-blue-200 mb-4 leading-relaxed">{journey.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-purple-400 font-semibold uppercase tracking-wide flex items-center gap-1">
                          <span>🗺️</span> Flight Plan
                        </p>
                        <div className="space-y-1.5">
                          {journey.stages.slice(0, 3).map((stage, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 text-xs">
                              <span className="text-purple-400 mt-0.5 shrink-0">✈</span>
                              <span className="text-blue-200">{stage}</span>
                            </div>
                          ))}
                          {journey.stages.length > 3 && (
                            <p className="text-xs text-purple-400 italic">+ {journey.stages.length - 3} more steps...</p>
                          )}
                        </div>
                      </div>

                      {journey.required_tools && journey.required_tools.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-2">Tools Needed</p>
                          <div className="flex flex-wrap gap-1.5">
                            {journey.required_tools.map((tool, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-1 text-xs bg-purple-600/20 text-purple-300 rounded-full border border-purple-500/30"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-purple-900/30">
                        <div className="flex justify-between text-xs text-purple-300">
                          <span>Est. Journey Time:</span>
                          <span className="font-semibold">{journey.timeline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* What-If Simulator Embedded */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="text-3xl">🎛️</div>
              <h3 className="text-3xl font-bold text-white">What-If Simulator</h3>
            </div>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Explore how changes in budget, team size, and tech utilization could impact your marketing maturity
            </p>
          </div>
          
          {/* Embedded Compact Simulator */}
          <ScenarioSimulatorPanel baseResults={results} compact={true} />
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-2 border-cyan-500/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready for Takeoff?</h3>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Explore your transformation journeys, simulate different scenarios, or manage your marketing operations from the control center.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link to={`/flight-deck/${assessmentId}`}>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-all">
                🗺️ Open Flight Deck
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to={`/scenario-simulator/${assessmentId}`}>
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:shadow-green-500/50 transition-all">
                🎛️ What-If Simulator
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to={`/operations-center/${assessmentId}`}>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:shadow-cyan-500/50 transition-all">
                🌍 Operations Center
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/assessment">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2">
                Take Another Flight Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/history">
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg flex items-center gap-2">
                View Flight History
                <History className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
