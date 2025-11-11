import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ScenarioPage = () => {
  const { assessmentId } = useParams();
  const [baseResults, setBaseResults] = useState(null);
  const [scenarioResults, setScenarioResults] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Scenario controls
  const [budget, setBudget] = useState(0);
  const [headcount, setHeadcount] = useState(0);
  const [techUtil, setTechUtil] = useState(0);
  const [process, setProcess] = useState(0);

  useEffect(() => {
    fetchBaseResults();
  }, [assessmentId]);

  const fetchBaseResults = async () => {
    try {
      const response = await axios.get(`${API}/assessment/results/${assessmentId}`);
      setBaseResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  const runSimulation = async () => {
    try {
      const response = await axios.post(`${API}/scenarios/estimate?assessment_id=${assessmentId}`, {
        budget_pct: budget,
        headcount: headcount,
        tech_utilization_pct: techUtil,
        process_maturity_pct: process
      });
      setScenarioResults(response.data);
    } catch (error) {
      console.error('Error running simulation:', error);
    }
  };

  useEffect(() => {
    if (baseResults && (budget !== 0 || headcount !== 0 || techUtil !== 0 || process !== 0)) {
      const debounce = setTimeout(() => {
        runSimulation();
      }, 500);
      return () => clearTimeout(debounce);
    }
  }, [budget, headcount, techUtil, process, baseResults]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading scenario simulator...</div>
      </div>
    );
  }

  if (!baseResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Assessment not found</div>
          <Link to="/">
            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg">Go Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const baseScores = baseResults.reao_scores || {};
  const adjustedScores = scenarioResults?.adjusted_scores || baseScores;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <div className="border-b border-blue-900/30 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-400 uppercase tracking-wide mb-1">What-If Scenario Simulator</p>
              <h1 className="text-3xl font-bold text-white">Resource Impact Analysis</h1>
            </div>
            <div className="flex gap-3">
              <Link to={`/results/${assessmentId}`}>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Back to Results
                </button>
              </Link>
              <Link to="/">
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6">Adjust Resources</h3>
              
              {/* Budget Slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-blue-300 text-sm font-semibold">Budget</label>
                  <span className="text-cyan-400 font-bold">{budget > 0 ? '+' : ''}{budget}%</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-blue-400 mt-1">
                  <span>-50%</span>
                  <span>0</span>
                  <span>+50%</span>
                </div>
              </div>

              {/* Headcount Slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-blue-300 text-sm font-semibold">Headcount</label>
                  <span className="text-cyan-400 font-bold">{headcount > 0 ? '+' : ''}{headcount} FTE</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-blue-400 mt-1">
                  <span>-10</span>
                  <span>0</span>
                  <span>+10</span>
                </div>
              </div>

              {/* Tech Utilization Slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-blue-300 text-sm font-semibold">Tech Utilization</label>
                  <span className="text-cyan-400 font-bold">{techUtil > 0 ? '+' : ''}{techUtil}%</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={techUtil}
                  onChange={(e) => setTechUtil(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-blue-400 mt-1">
                  <span>-30%</span>
                  <span>0</span>
                  <span>+30%</span>
                </div>
              </div>

              {/* Process Maturity Slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-blue-300 text-sm font-semibold">Process Maturity</label>
                  <span className="text-cyan-400 font-bold">{process > 0 ? '+' : ''}{process}%</span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={process}
                  onChange={(e) => setProcess(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-blue-400 mt-1">
                  <span>-20%</span>
                  <span>0</span>
                  <span>+20%</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setBudget(0);
                  setHeadcount(0);
                  setTechUtil(0);
                  setProcess(0);
                }}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
              >
                Reset All
              </button>
            </div>

            {/* Plane Level Comparison */}
            {scenarioResults && (
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-2 border-cyan-500/30 rounded-lg p-6">
                <h4 className="text-sm font-semibold text-white mb-4">Projected Plane Level</h4>
                <div className="text-center">
                  <p className="text-6xl mb-3">{scenarioResults.new_plane_level.emoji}</p>
                  <p className="text-xl font-bold text-cyan-400">{scenarioResults.new_plane_level.name}</p>
                  <p className="text-sm text-blue-300 mt-2">{scenarioResults.new_plane_level.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Comparison */}
          <div className="lg:col-span-2 space-y-6">
            {/* R/E/A/O Comparison */}
            <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Impact on 4-Dimension Scores</h3>
              <div className="space-y-6">
                {['readiness', 'efficiency', 'alignment', 'opportunity'].map((dim) => {
                  const baseVal = baseScores[dim] || 0;
                  const newVal = adjustedScores[dim] || baseVal;
                  const delta = newVal - baseVal;
                  const icons = { readiness: '🎯', efficiency: '⚡', alignment: '🎯', opportunity: '🚀' };
                  
                  return (
                    <div key={dim} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{icons[dim]}</span>
                          <span className="text-white font-semibold capitalize">{dim}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400 text-sm">{baseVal.toFixed(1)}</span>
                          {delta !== 0 && (
                            <>
                              <ArrowRight className="w-4 h-4 text-blue-500" />
                              <span className={`text-lg font-bold ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {newVal.toFixed(1)}
                              </span>
                              <span className={`text-sm flex items-center gap-1 ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {delta > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {Math.abs(delta).toFixed(1)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* Base bar */}
                        <div className="flex-1">
                          <div className="w-full bg-slate-800/50 rounded h-3">
                            <div
                              className="bg-blue-500/50 h-3 rounded transition-all"
                              style={{ width: `${baseVal}%` }}
                            />
                          </div>
                        </div>
                        {/* New bar */}
                        <div className="flex-1">
                          <div className="w-full bg-slate-800/50 rounded h-3">
                            <div
                              className={`${delta > 0 ? 'bg-green-500' : delta < 0 ? 'bg-red-500' : 'bg-blue-500'} h-3 rounded transition-all`}
                              style={{ width: `${newVal}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delta Insights */}
            {scenarioResults?.delta_insights && scenarioResults.delta_insights.length > 0 && (
              <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6">
                <h4 className="text-lg font-bold text-white mb-4">Scenario Impact Summary</h4>
                <div className="space-y-2">
                  {scenarioResults.delta_insights.map((insight, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-cyan-300">
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">How to Use</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li>• Adjust the sliders to simulate resource changes</li>
                <li>• See real-time impact on your R/E/A/O scores</li>
                <li>• Compare baseline (left bar) vs projected (right bar)</li>
                <li>• Green = improvement, Red = decline</li>
                <li>• Use insights to plan resource investments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPage;
