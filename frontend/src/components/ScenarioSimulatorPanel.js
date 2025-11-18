import React, { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import axios from "axios";

import { API_BASE_URL } from "../config/api";
import FlightInstrumentsPanel from "./FlightInstrumentsPanel";
import { mapAssessmentToInstruments } from "../utils/mapAssessmentToInstruments";

const API = API_BASE_URL;

/**
 * ScenarioSimulatorPanel
 *
 * Props:
 *  - baseResults: full assessment result object (same shape returned by /assessment/submit)
 *  - compact?: boolean  (optional – kept for future use, but main page uses full layout)
 *  - className?: string
 */
const ScenarioSimulatorPanel = ({
  baseResults,
  compact = false,
  className = "",
}) => {
  const [scenarioResults, setScenarioResults] = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [error, setError] = useState(null);

  // Scenario inputs
  const [budgetPct, setBudgetPct] = useState(0);
  const [headcount, setHeadcount] = useState(0);
  const [techUtilizationPct, setTechUtilizationPct] = useState(0);
  const [processMaturityPct, setProcessMaturityPct] = useState(0);

  // If there’s no base assessment yet, show a friendly message
  if (!baseResults) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300">
        <div className="text-sm font-semibold mb-1">What-If Simulator</div>
        <p className="text-sm text-slate-400">
          Complete a flight assessment first to unlock the simulator and model
          the impact of budget, headcount, tech utilization, and process
          changes.
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Derived values for comparison + instruments
  // ---------------------------------------------------------------------------

  const baseTotalMiles = Math.round(baseResults.combined_score * 100);
  const basePlane = baseResults.plane_level || {
    name: "Unknown",
    emoji: "✈️",
    description: "",
  };

  // Scenario API currently returns:
  //  - adjusted_combined_score
  //  - adjusted_plane_level
  //  - adjusted_reao_scores
  //  - delta_insights
  const projectedTotalMiles = scenarioResults
    ? Math.round(scenarioResults.adjusted_combined_score * 100)
    : null;

  const projectedPlane = scenarioResults?.adjusted_plane_level || null;

  const baseInstruments = mapAssessmentToInstruments(baseResults, baseResults.profile);

  const projectedAssessment =
    baseResults && scenarioResults
      ? {
          ...baseResults,
          combined_score: scenarioResults.adjusted_combined_score,
          plane_level: scenarioResults.adjusted_plane_level,
          reao_scores: scenarioResults.adjusted_reao_scores,
        }
      : null;

  const projectedInstruments = projectedAssessment
    ? mapAssessmentToInstruments(projectedAssessment, baseResults.profile)
    : null;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleSimulate = async () => {
    if (!baseResults) {
      setError("No assessment data available.");
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
          process_maturity_pct: processMaturityPct,
        },
      });

      setScenarioResults(response.data);
    } catch (err) {
      console.error("Error simulating scenario:", err);
      setError("Error running simulation. Please try again.");
    } finally {
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

  // ---------------------------------------------------------------------------
  // Small helper component for sliders
  // ---------------------------------------------------------------------------

  const SliderRow = ({
    label,
    helpText,
    min,
    max,
    step,
    value,
    suffix,
    marks,
    onChange,
  }) => {
    const tone =
      value > 0 ? "text-emerald-400" : value < 0 ? "text-rose-400" : "text-sky-400";

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <div>
            <div className="font-medium text-slate-100">{label}</div>
            {helpText && (
              <div className="text-slate-400 text-[11px] md:text-xs">
                {helpText}
              </div>
            )}
          </div>
          <div className={`font-semibold ${tone}`}>
            {value > 0 ? "+" : ""}
            {value}
            {suffix}
          </div>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg bg-slate-800 accent-cyan-500 cursor-pointer"
        />

        {marks && marks.length > 0 && (
          <div className="flex justify-between text-[11px] text-slate-500">
            {marks.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Layout
  // ---------------------------------------------------------------------------

  const gridClass = compact
    ? `space-y-4 ${className}`
    : `grid grid-cols-1 xl:grid-cols-[minmax(0,2.1fr)_minmax(320px,380px)] gap-6 ${className}`;

  return (
    <div className={gridClass}>
      {/* LEFT: Sliders + comparison */}
      <div className="space-y-6">
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-lg shadow-slate-900/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-cyan-400">
                What-If Simulator
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-slate-50">
                Scenario Parameters
              </h2>
            </div>
            <div className="text-right text-[11px] text-slate-400 max-w-[160px]">
              Model how changes in budget, headcount, tech utilization, and
              process maturity impact your flight miles and aircraft level.
            </div>
          </div>

          {error && (
            <div className="mb-4 text-xs md:text-sm text-rose-300 bg-rose-950/60 border border-rose-800/60 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-4 md:space-y-5">
            <SliderRow
              label="Budget Change"
              helpText="Total marketing budget change vs. current plan."
              min={-50}
              max={50}
              step={5}
              value={budgetPct}
              suffix="%"
              marks={["-50%", "0%", "+50%"]}
              onChange={setBudgetPct}
            />

            <SliderRow
              label="Headcount Change"
              helpText="Net change in marketing headcount."
              min={-10}
              max={10}
              step={1}
              value={headcount}
              suffix=""
              marks={["-10", "0", "+10"]}
              onChange={setHeadcount}
            />

            <SliderRow
              label="Tech Utilization"
              helpText="How much better (or worse) you’ll use your current tools."
              min={-30}
              max={30}
              step={5}
              value={techUtilizationPct}
              suffix="%"
              marks={["-30%", "0%", "+30%"]}
              onChange={setTechUtilizationPct}
            />

            <SliderRow
              label="Process Maturity"
              helpText="Improvements in workflows, governance, and operating model."
              min={-20}
              max={20}
              step={5}
              value={processMaturityPct}
              suffix="%"
              marks={["-20%", "0%", "+20%"]}
              onChange={setProcessMaturityPct}
            />
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-cyan-500/30 transition"
            >
              <Play className="w-4 h-4" />
              {simulating ? "Simulating..." : "Run Simulation"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs md:text-sm font-medium text-slate-200 hover:bg-slate-800/70 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Aircraft + REAO comparison */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-slate-50">
              Aircraft Comparison
            </h3>
            <span className="text-[11px] text-slate-400">
              See how your aircraft changes under this scenario.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current */}
            <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] uppercase tracking-wide text-slate-400">
                  Current
                </div>
                <div className="text-xs bg-slate-800/90 rounded-full px-2 py-0.5 text-slate-300">
                  {baseTotalMiles} miles
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-1">{basePlane.emoji || "✈️"}</div>
                  <div className="font-semibold text-slate-50">
                    {basePlane.name}
                  </div>
                  {basePlane.description && (
                    <div className="text-[11px] text-slate-400 mt-1">
                      {basePlane.description}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Projected */}
            <div className="rounded-xl bg-slate-950/60 border border-cyan-800/80 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] uppercase tracking-wide text-cyan-300">
                  Projected
                </div>
                <div className="text-xs bg-cyan-500/10 border border-cyan-500/40 rounded-full px-2 py-0.5 text-cyan-200">
                  {projectedTotalMiles !== null
                    ? `${projectedTotalMiles} miles`
                    : "Run simulation"}
                </div>
              </div>

              {projectedPlane && projectedTotalMiles !== null ? (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl mb-1">
                      {projectedPlane.emoji || "✈️"}
                    </div>
                    <div className="font-semibold text-slate-50">
                      {projectedPlane.name}
                    </div>
                    {projectedPlane.description && (
                      <div className="text-[11px] text-slate-400 mt-1">
                        {projectedPlane.description}
                      </div>
                    )}
                  </div>

                  {projectedTotalMiles !== baseTotalMiles && (
                    <div className="text-right text-xs">
                      <div
                        className={
                          projectedTotalMiles > baseTotalMiles
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }
                      >
                        {projectedTotalMiles > baseTotalMiles ? "▲" : "▼"}{" "}
                        {Math.abs(projectedTotalMiles - baseTotalMiles)} pts
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        vs current
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-slate-400">
                  Adjust the sliders and run the simulation to see your projected
                  aircraft level.
                </div>
              )}
            </div>
          </div>

          {/* REAO deltas */}
          {scenarioResults && scenarioResults.adjusted_reao_scores && (
            <div className="mt-4 space-y-2">
              <div className="text-xs font-semibold text-slate-300">
                REAO changes
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] md:text-xs">
                {["readiness", "efficiency", "alignment", "opportunity"].map(
                  (dimension) => {
                    const baseScore =
                      baseResults.reao_scores?.[dimension] ?? 0;
                    const adjustedScore =
                      scenarioResults.adjusted_reao_scores?.[dimension] ?? 0;
                    const delta = adjustedScore - baseScore;

                    const tone =
                      delta > 0
                        ? "text-emerald-400"
                        : delta < 0
                        ? "text-rose-300"
                        : "text-slate-300";

                    const label =
                      dimension.charAt(0).toUpperCase() + dimension.slice(1);

                    return (
                      <div
                        key={dimension}
                        className="rounded-lg bg-slate-950/70 border border-slate-800/90 px-3 py-2"
                      >
                        <div className="text-[11px] text-slate-400">
                          {label}
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-slate-100 font-semibold">
                            {Math.round(baseScore)} →{" "}
                            {Math.round(adjustedScore)}
                          </span>
                          {delta !== 0 && (
                            <span className={tone}>
                              {delta > 0 ? "+" : ""}
                              {delta.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* Scenario delta insights */}
          {scenarioResults &&
            scenarioResults.delta_insights &&
            scenarioResults.delta_insights.length > 0 && !compact && (
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-300 mb-2">
                  Scenario insights
                </div>
                <ul className="space-y-1.5 text-[11px] md:text-xs text-slate-300">
                  {scenarioResults.delta_insights.map((insight, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 items-start text-slate-300"
                    >
                      <span className="mt-[2px] text-cyan-400">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>

      {/* RIGHT: Shared Flight Instruments panel */}
      {!compact && (
        <div className="space-y-4">
          <FlightInstrumentsPanel
            {...(projectedInstruments || baseInstruments)}
            showLiveBadge={!!scenarioResults}
          />
        </div>
      )}
    </div>
  );
};

export default ScenarioSimulatorPanel;
