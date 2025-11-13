import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, TrendingUp, TrendingDown, Minus, Plane } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ScenarioSimulatorPage = () => {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [baseResults, setBaseResults] = useState(null);
  const [scenarioResults, setScenarioResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  // Scenario inputs
  const [budgetPct, setBudgetPct] = useState(0);
  const [headcount, setHeadcount] = useState(0);
  const [techUtilizationPct, setTechUtilizationPct] = useState(0);
  const [processMaturityPct, setProcessMaturityPct] = useState(0);

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
      setBaseResults(response.data);
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

  const handleSimulate = async () => {
    if (!baseResults) return;

    setSimulating(true);
    try {
      const response = await axios.post(`${API}/scenarios/estimate`, {
        assessment_id: baseResults.id,
        scenario: {
          budget_pct: budgetPct,
          headcount: headcount,
          tech_utilization_pct: techUtilizationPct,
          process_maturity_pct: processMaturityPct
        }
      });
      setScenarioResults(response.data);
      setSimulating(false);
    } catch (error) {
      console.error('Error simulating scenario:', error);
      alert('Error running simulation. Please try again.');
      setSimulating(false);
    }
  };

  const handleReset = () => {
    setBudgetPct(0);
    setHeadcount(0);
    setTechUtilizationPct(0);
    setProcessMaturityPct(0);
    setScenarioResults(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading Scenario Simulator...</div>
      </div>
    );
  }

  if (!baseResults) {
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

  const baseTotalPoints = Math.round(baseResults.combined_score * 10);
  const basePlane = baseResults.plane_level || { name: 'Unknown', emoji: '✈️' };

  const scenarioTotalPoints = scenarioResults ? Math.round(scenarioResults.adjusted_combined_score * 10) : null;
  const scenarioPlane = scenarioResults?.adjusted_plane_level || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(`/results/${baseResults.id}`)}
              className="mb-4 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Results
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">🎛️</div>
              <h1 className="text-4xl font-bold text-white">What-If Simulator</h1>
            </div>
            <p className="text-xl text-blue-200">Model how changes in resources and processes impact your marketing maturity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              <div className="bg-slate-900/50 border-2 border-blue-900/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Scenario Parameters</h2>

                {/* Budget */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-blue-300 font-semibold">Budget Change</label>
                    <span className={`text-xl font-bold ${budgetPct > 0 ? 'text-green-400' : budgetPct < 0 ? 'text-red-400' : 'text-blue-400'}`}>
                      {budgetPct > 0 ? '+' : ''}{budgetPct}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={budgetPct}
                    onChange={(e) => setBudgetPct(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-blue-400 mt-1">
                    <span>-50%</span>
                    <span>0%</span>
                    <span>+50%</span>
                  </div>
                </div>

                {/* Headcount */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-blue-300 font-semibold">Headcount Change</label>
                    <span className={`text-xl font-bold ${headcount > 0 ? 'text-green-400' : headcount < 0 ? 'text-red-400' : 'text-blue-400'}`}>
                      {headcount > 0 ? '+' : ''}{headcount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={headcount}
                    onChange={(e) => setHeadcount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-blue-400 mt-1">
                    <span>-10</span>
                    <span>0</span>
                    <span>+10</span>
                  </div>
                </div>

                {/* Tech Utilization */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-blue-300 font-semibold">Tech Utilization Change</label>
                    <span className={`text-xl font-bold ${techUtilizationPct > 0 ? 'text-green-400' : techUtilizationPct < 0 ? 'text-red-400' : 'text-blue-400'}`}>
                      {techUtilizationPct > 0 ? '+' : ''}{techUtilizationPct}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={techUtilizationPct}
                    onChange={(e) => setTechUtilizationPct(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-blue-400 mt-1">
                    <span>-30%</span>
                    <span>0%</span>
                    <span>+30%</span>
                  </div>
                </div>

                {/* Process Maturity */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-blue-300 font-semibold">Process Maturity Change</label>
                    <span className={`text-xl font-bold ${processMaturityPct > 0 ? 'text-green-400' : processMaturityPct < 0 ? 'text-red-400' : 'text-blue-400'}`}>
                      {processMaturityPct > 0 ? '+' : ''}{processMaturityPct}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={processMaturityPct}
                    onChange={(e) => setProcessMaturityPct(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-blue-400 mt-1">
                    <span>-20%</span>
                    <span>0%</span>
                    <span>+20%</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleSimulate}
                    disabled={simulating}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="w-5 h-5" />
                    {simulating ? 'Simulating...' : 'Run Simulation'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* Aircraft Comparison */}
              <div className="bg-slate-900/50 border-2 border-cyan-900/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Aircraft Comparison</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Current */}
                  <div className="text-center">
                    <p className="text-sm text-blue-400 uppercase tracking-wide mb-3">Current</p>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-900/30">
                      <p className="text-5xl mb-3">{basePlane.emoji}</p>
                      <h3 className="text-lg font-bold text-cyan-400 mb-2">{basePlane.name}</h3>
                      <p className="text-3xl font-bold text-white mb-1">{baseTotalPoints}</p>
                      <p className="text-xs text-blue-300">Flight Miles</p>
                    </div>
                  </div>

                  {/* Projected */}
                  <div className="text-center">
                    <p className="text-sm text-blue-400 uppercase tracking-wide mb-3">Projected</p>
                    {scenarioResults ? (
                      <div className="bg-slate-800/50 rounded-lg p-4 border-2 border-green-500/40">
                        <p className="text-5xl mb-3">{scenarioPlane.emoji}</p>
                        <h3 className="text-lg font-bold text-green-400 mb-2">{scenarioPlane.name}</h3>
                        <p className="text-3xl font-bold text-white mb-1">{scenarioTotalPoints}</p>
                        <p className="text-xs text-green-300">Flight Miles</p>
                        {scenarioTotalPoints !== baseTotalPoints && (
                          <div className="mt-3 pt-3 border-t border-green-900/30">
                            <p className={`text-sm font-semibold ${scenarioTotalPoints > baseTotalPoints ? 'text-green-400' : 'text-red-400'}`}>
                              {scenarioTotalPoints > baseTotalPoints ? '↑' : '↓'} {Math.abs(scenarioTotalPoints - baseTotalPoints)} points
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-slate-800/30 rounded-lg p-4 border border-blue-900/20 flex items-center justify-center h-full">
                        <p className="text-blue-400 text-sm">Run simulation to see projection</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* REAO Scores Comparison */}
              {scenarioResults && (
                <div className="bg-slate-900/50 border-2 border-cyan-900/30 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">REAO Dimension Changes</h2>
                  
                  <div className="space-y-4">
                    {['readiness', 'efficiency', 'alignment', 'opportunity'].map((dimension) => {
                      const baseScore = baseResults.reao_scores[dimension];
                      const adjustedScore = scenarioResults.adjusted_reao_scores[dimension];
                      const delta = adjustedScore - baseScore;
                      const emoji = dimension === 'readiness' ? '🎯' : dimension === 'efficiency' ? '⚡' : dimension === 'alignment' ? '🤝' : '🚀';
                      
                      return (
                        <div key={dimension} className="bg-slate-800/50 rounded-lg p-4 border border-blue-900/20">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{emoji}</span>
                              <span className="text-white font-semibold capitalize">{dimension}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-blue-400">{Math.round(baseScore)}</span>
                              <span className="text-blue-600">→</span>
                              <span className="text-cyan-400 font-bold">{Math.round(adjustedScore)}</span>
                              {delta !== 0 && (
                                <span className={`text-sm font-semibold ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {delta > 0 ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                                  {delta > 0 ? '+' : ''}{delta.toFixed(1)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all"
                                style={{ width: `${baseScore}%` }}
                              />
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                              <div
                                className={`bg-gradient-to-r h-2 rounded-full transition-all ${
                                  delta > 0 ? 'from-green-600 to-green-400' : delta < 0 ? 'from-red-600 to-red-400' : 'from-cyan-600 to-cyan-400'
                                }`}
                                style={{ width: `${adjustedScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Delta Insights */}
              {scenarioResults && scenarioResults.delta_insights && scenarioResults.delta_insights.length > 0 && (
                <div className="bg-slate-900/50 border-2 border-purple-900/30 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Scenario Insights</h2>
                  <div className="space-y-3">
                    {scenarioResults.delta_insights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-800/30 p-3 rounded-lg border border-purple-900/20">
                        <div className="text-purple-400 mt-0.5">💡</div>
                        <p className="text-blue-200 text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulatorPage;
