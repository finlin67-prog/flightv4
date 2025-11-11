import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Home, History } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ResultsPage = () => {
  const { assessmentId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <div className="border-b border-blue-900/30 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-400 uppercase tracking-wide mb-1">Assessment Results</p>
              <h1 className="text-3xl font-bold text-white">Your Marketing Flight Path</h1>
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
        {/* Plane Level Card */}
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-2 border-cyan-500/30 rounded-lg p-12 text-center mb-8">
          <p className="text-8xl mb-6">{plane_level.emoji}</p>
          <h2 className="text-4xl font-bold text-cyan-400 mb-3">{plane_level.name}</h2>
          <p className="text-xl text-blue-200 mb-6">{plane_level.description}</p>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-blue-300 mb-2">
              <span>Combined Readiness</span>
              <span className="font-bold text-cyan-400">{combined_score.toFixed(1)}/10</span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all"
                style={{ width: `${Math.min(combined_score / 10, 1) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Score Breakdown */}
          <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Score Breakdown</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-blue-300">Assessment Score</span>
                  <span className="text-xl font-bold text-blue-400">{assessment_score.toFixed(1)}/100</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded h-3">
                  <div
                    className="bg-blue-500 h-3 rounded transition-all"
                    style={{ width: `${assessment_score}%` }}
                  />
                </div>
                <p className="text-xs text-blue-400 mt-1">Based on 10 strategic questions</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-cyan-300">Tech Stack Score</span>
                  <span className="text-xl font-bold text-cyan-400">{tech_score.toFixed(1)}/10</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded h-3">
                  <div
                    className="bg-cyan-500 h-3 rounded transition-all"
                    style={{ width: `${(tech_score / 10) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-cyan-400 mt-1">Based on tool sophistication and coverage</p>
              </div>

              <div className="pt-4 border-t border-blue-900/30">
                <div className="flex justify-between mb-2">
                  <span className="text-white font-semibold">Combined Readiness</span>
                  <span className="text-2xl font-bold text-cyan-400">{combined_score.toFixed(1)}/10</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded transition-all"
                    style={{ width: `${(combined_score / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Key Insights</h3>
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-200">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-6">Recommended Transformation Journeys</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-bold text-cyan-400">{rec.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      rec.priority === 'High' ? 'bg-red-600/20 text-red-400' : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-blue-300 mb-4">{rec.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-blue-400 font-semibold">Implementation Stages:</p>
                    {rec.stages.map((stage, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2">
                        <span className="text-cyan-400 text-xs mt-0.5">•</span>
                        <span className="text-xs text-blue-200">{stage}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-blue-900/30">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-400">Timeline:</span>
                      <span className="text-cyan-400 font-semibold">{rec.timeline}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-blue-400">Current Score:</span>
                      <span className="text-cyan-400 font-semibold">{rec.current_score}/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-2 border-cyan-500/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">What's Next?</h3>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Review your transformation journeys and start implementing the highest priority recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2">
                Take Another Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/history">
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg flex items-center gap-2">
                View All Assessments
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
