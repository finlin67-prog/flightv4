import React, { useState } from 'react';
import { Play, TrendingUp, TrendingDown } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API = API_BASE_URL;

/**
 * Reusable Scenario Simulator Panel Component
 * 
 * @param {Object} props
 * @param {Object} props.baseResults - Base assessment results to simulate from
 * @param {boolean} props.compact - Whether to use compact layout (for embedded use)
 * @param {string} props.className - Additional CSS classes
 */
const ScenarioSimulatorPanel = ({ baseResults, compact = false, className = '' }) => {
  const [scenarioResults, setScenarioResults] = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [error, setError] = useState(null);

  // Scenario inputs
  const [budgetPct, setBudgetPct] = useState(0);
  const [headcount, setHeadcount] = useState(0);
  const [techUtilizationPct, setTechUtilizationPct] = useState(0);
  const [processMaturityPct, setProcessMaturityPct] = useState(0);

  const handleSimulate = async () => {
    if (!baseResults) {
      setError('No assessment data available');
      return;
    }

    setSimulating(true);
    setError(null);
    
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
    } catch (err) {
      console.error('Error simulating scenario:', err);
      setError('Error running simulation. Please try again.');
      setSimulating(false);
    }
  };

  const handleReset = () => {
    setBudgetPct(0);
    setHeadcount(0);
    setTechUtilizationPct(0);
    setProcessMaturityPct(0);
    setScenarioResults(null);
    setError(null);
  };

  if (!baseResults) {
    return (
      <div className={`bg-slate-900/50 border border-blue-900/30 rounded-xl p-6 ${className}`}>
        <p className="text-center text-blue-300">
          Complete an assessment to use the simulator
        </p>
      </div>
    );
  }

  const baseTotalPoints = Math.round(baseResults.combined_score * 100);
  const basePlane = baseResults.plane_level || { name: 'Unknown', emoji: '✈️' };

  const scenarioTotalPoints = scenarioResults ? Math.round(scenarioResults.adjusted_combined_score * 100) : null;
  const scenarioPlane = scenarioResults?.adjusted_plane_level || null;

  // Layout classes based on compact mode
  const containerClass = compact 
    ? 'space-y-4' 
    : 'grid grid-cols-1 lg:grid-cols-2 gap-8';
  
  const controlsClass = compact 
    ? 'bg-slate-900/50 border border-blue-900/30 rounded-xl p-4' 
    : 'bg-slate-900/50 border-2 border-blue-900/30 rounded-xl p-6';
  
  const resultsClass = compact 
    ? 'bg-slate-900/50 border border-cyan-900/30 rounded-xl p-4' 
    : 'bg-slate-900/50 border-2 border-cyan-900/30 rounded-xl p-6';

  return (
    <div className={containerClass + ' ' + className}>
      {/* Left Column - Controls */}
      <div className={compact ? 'space-y-4' : 'space-y-6'}>
        <div className={controlsClass}>
          <h2 className={`font-bold text-white mb-4 ${compact ? 'text-lg' : 'text-2xl'}`}>
            Scenario Parameters
          </h2>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Budget */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-blue-300 font-semibold text-sm">Budget Change</label>
              <span className={`font-bold ${budgetPct > 0 ? 'text-green-400' : budgetPct < 0 ? 'text-red-400' : 'text-blue-400'} ${compact ? 'text-base' : 'text-xl'}`}>
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
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-blue-300 font-semibold text-sm">Headcount Change</label>
              <span className={`font-bold ${headcount > 0 ? 'text-green-400' : headcount < 0 ? 'text-red-400' : 'text-blue-400'} ${compact ? 'text-base' : 'text-xl'}`}>
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
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-blue-300 font-semibold text-sm">Tech Utilization</label>
              <span className={`font-bold ${techUtilizationPct > 0 ? 'text-green-400' : techUtilizationPct < 0 ? 'text-red-400' : 'text-blue-400'} ${compact ? 'text-base' : 'text-xl'}`}>
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
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-blue-300 font-semibold text-sm">Process Maturity</label>
              <span className={`font-bold ${processMaturityPct > 0 ? 'text-green-400' : processMaturityPct < 0 ? 'text-red-400' : 'text-blue-400'} ${compact ? 'text-base' : 'text-xl'}`}>
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
          <div className="flex gap-3">
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className={`flex-1 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${compact ? 'px-4 py-2.5 text-sm' : 'px-6 py-4'}`}
            >
              <Play className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
              {simulating ? 'Simulating...' : 'Run Simulation'}
            </button>
            <button
              onClick={handleReset}
              className={`bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all ${compact ? 'px-4 py-2.5 text-sm' : 'px-6 py-4'}`}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Results */}
      <div className={compact ? 'space-y-4' : 'space-y-6'}>
        {/* Aircraft Comparison */}
        <div className={resultsClass}>
          <h2 className={`font-bold text-white mb-4 ${compact ? 'text-lg' : 'text-2xl'}`}>
            Aircraft Comparison
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Current */}
            <div className="text-center">
              <p className="text-xs text-blue-400 uppercase tracking-wide mb-2">Current</p>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-blue-900/30">
                <p className={compact ? 'text-3xl mb-2' : 'text-5xl mb-3'}>{basePlane.emoji}</p>
                <h3 className={`font-bold text-cyan-400 mb-1 ${compact ? 'text-sm' : 'text-lg'}`}>
                  {basePlane.name}
                </h3>
                <p className={`font-bold text-white mb-1 ${compact ? 'text-xl' : 'text-3xl'}`}>
                  {baseTotalPoints}
                </p>
                <p className="text-xs text-blue-300">Flight Miles</p>
              </div>
            </div>

            {/* Projected */}
            <div className="text-center">
              <p className="text-xs text-blue-400 uppercase tracking-wide mb-2">Projected</p>
              {scenarioResults ? (
                <div className="bg-slate-800/50 rounded-lg p-3 border-2 border-green-500/40">
                  <p className={compact ? 'text-3xl mb-2' : 'text-5xl mb-3'}>{scenarioPlane.emoji}</p>
                  <h3 className={`font-bold text-green-400 mb-1 ${compact ? 'text-sm' : 'text-lg'}`}>
                    {scenarioPlane.name}
                  </h3>
                  <p className={`font-bold text-white mb-1 ${compact ? 'text-xl' : 'text-3xl'}`}>
                    {scenarioTotalPoints}
                  </p>
                  <p className="text-xs text-green-300">Flight Miles</p>
                  {scenarioTotalPoints !== baseTotalPoints && (
                    <div className="mt-2 pt-2 border-t border-green-900/30">
                      <p className={`text-xs font-semibold ${scenarioTotalPoints > baseTotalPoints ? 'text-green-400' : 'text-red-400'}`}>
                        {scenarioTotalPoints > baseTotalPoints ? '↑' : '↓'} {Math.abs(scenarioTotalPoints - baseTotalPoints)} points
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-800/30 rounded-lg p-3 border border-blue-900/20 flex items-center justify-center h-full">
                  <p className="text-blue-400 text-xs">Run to see projection</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* REAO Scores Comparison */}
        {scenarioResults && (
          <div className={resultsClass}>
            <h2 className={`font-bold text-white mb-4 ${compact ? 'text-base' : 'text-2xl'}`}>
              REAO Changes
            </h2>
            
            <div className="space-y-3">
              {['readiness', 'efficiency', 'alignment', 'opportunity'].map((dimension) => {
                const baseScore = baseResults.reao_scores[dimension];
                const adjustedScore = scenarioResults.adjusted_reao_scores[dimension];
                const delta = adjustedScore - baseScore;
                const emoji = dimension === 'readiness' ? '🎯' : dimension === 'efficiency' ? '⚡' : dimension === 'alignment' ? '🤝' : '🚀';
                
                return (
                  <div key={dimension} className="bg-slate-800/50 rounded-lg p-3 border border-blue-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={compact ? 'text-base' : 'text-xl'}>{emoji}</span>
                        <span className={`text-white font-semibold capitalize ${compact ? 'text-xs' : 'text-sm'}`}>
                          {dimension}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 text-xs">{Math.round(baseScore)}</span>
                        <span className="text-blue-600 text-xs">→</span>
                        <span className="text-cyan-400 font-bold text-xs">{Math.round(adjustedScore)}</span>
                        {delta !== 0 && (
                          <span className={`text-xs font-semibold ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {delta > 0 ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
                            {delta > 0 ? '+' : ''}{delta.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full transition-all"
                          style={{ width: `${baseScore}%` }}
                        />
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                        <div
                          className={`bg-gradient-to-r h-1.5 rounded-full transition-all ${
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
        {scenarioResults && scenarioResults.delta_insights && scenarioResults.delta_insights.length > 0 && !compact && (
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
  );
};

export default ScenarioSimulatorPanel;
