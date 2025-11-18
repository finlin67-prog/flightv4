// frontend/src/components/FlightInstrumentsPanel.js
import React from "react";

/**
 * You can pass props either directly:
 *   <FlightInstrumentsPanel
 *      currentAircraft={{ name: "Grounded", description: "...", emoji: "🛫" }}
 *      flightMiles={120}
 *      maxFlightMiles={1000}
 *      questionsAnswered={3}
 *      totalQuestions={10}
 *      reaoScores={{ readiness: 65, efficiency: 72, alignment: 58, opportunity: 81 }}
 *      profile={{ role: "Head of Marketing", industry: "SaaS", companySize: "<$10M", teamSize: "6–15" }}
 *   />
 *
 * or via a single `data` prop:
 *   const instruments = mapAssessmentToInstruments(result, profile);
 *   <FlightInstrumentsPanel data={instruments} />
 */

function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));
  return (
    <div className="w-full h-1.5 rounded-full bg-slate-800/70 overflow-hidden">
      <div
        className="h-full rounded-full bg-cyan-400/80"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function StatChip({ label, value }) {
  if (value == null && !label) return null;

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-slate-900/70 border border-slate-700/60 px-3 py-2">
      <span className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-50">
        {value != null && value !== "" ? value : "—"}
      </span>
    </div>
  );
}

export default function FlightInstrumentsPanel(props) {
  // Support both `data={...}` and direct props
  const source = props.data || props;

  const {
    currentAircraft,
    flightMiles = 0,
    maxFlightMiles = 1000,
    questionsAnswered,
    totalQuestions,
    reaoScores = {},
    profile = {},
    showLiveBadge,
    children, // if any page was previously injecting custom content
    quickActions, // optional prop for custom quick actions
  } = source;

  const aircraft = currentAircraft || {
    name: "Not Yet Assessed",
    description: "Complete an assessment to see your aircraft level.",
    emoji: "🛫",
  };

  const {
    readiness = null,
    efficiency = null,
    alignment = null,
    opportunity = null,
  } = reaoScores || {};

  const hasReao =
    readiness != null ||
    efficiency != null ||
    alignment != null ||
    opportunity != null;

  const hasAssessmentProgress =
    typeof questionsAnswered === "number" &&
    typeof totalQuestions === "number" &&
    totalQuestions > 0;

  const effectiveQuickActions = quickActions ?? children;

  return (
    <aside className="w-full h-full flex flex-col gap-4 text-sm text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
            Flight Instruments
          </h2>
          <p className="text-[11px] text-slate-500">
            Your marketing status at a glance
          </p>
        </div>
        {showLiveBadge && (
          <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-400/40">
            ● Live
          </span>
        )}
      </div>

      {/* Current Aircraft */}
      <section className="rounded-2xl bg-slate-950/70 border border-slate-800/70 px-4 py-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-400/40 text-lg">
          {aircraft.emoji || "✈️"}
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wide text-slate-400">
            Current Aircraft
          </span>
          <span className="text-[15px] font-semibold leading-tight">
            {aircraft.name}
          </span>
          {aircraft.description && (
            <span className="mt-0.5 text-[11px] text-slate-500">
              {aircraft.description}
            </span>
          )}
        </div>
      </section>

      {/* Flight Miles + Assessment progress (stacked) */}
      <section className="rounded-2xl bg-slate-950/70 border border-slate-800/70 px-4 py-3 flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-slate-400">
              Flight Miles
            </span>
            <span className="text-xs text-slate-300">
              {Math.round(flightMiles)} / {maxFlightMiles}
            </span>
          </div>
          <ProgressBar value={flightMiles} max={maxFlightMiles} />
        </div>

        {hasAssessmentProgress && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wide text-slate-400">
                Assessment Progress
              </span>
              <span className="text-xs text-sky-200">
                {questionsAnswered} / {totalQuestions} answered
              </span>
            </div>
            <ProgressBar value={questionsAnswered} max={totalQuestions} />
          </div>
        )}
      </section>

      {/* REAO mini-grid */}
      {hasReao && (
        <section className="rounded-2xl bg-slate-950/70 border border-slate-800/70 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wide text-slate-400">
              REAO Snapshot
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StatChip
              label="Readiness"
              value={readiness != null ? `${readiness}` : null}
            />
            <StatChip
              label="Efficiency"
              value={efficiency != null ? `${efficiency}` : null}
            />
            <StatChip
              label="Alignment"
              value={alignment != null ? `${alignment}` : null}
            />
            <StatChip
              label="Opportunity"
              value={opportunity != null ? `${opportunity}` : null}
            />
          </div>
        </section>
      )}

      {/* Flight Profile */}
      {(profile.role ||
        profile.industry ||
        profile.companySize ||
        profile.teamSize) && (
        <section className="rounded-2xl bg-slate-950/70 border border-slate-800/70 px-4 py-3 flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wide text-slate-400">
            Flight Profile
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {profile.role && <StatChip label="Role" value={profile.role} />}
            {profile.industry && (
              <StatChip label="Industry" value={profile.industry} />
            )}
            {profile.companySize && (
              <StatChip label="Company" value={profile.companySize} />
            )}
            {profile.teamSize && (
              <StatChip label="Team" value={profile.teamSize} />
            )}
          </div>
        </section>
      )}

      {/* Quick actions / children */}
      <section className="mt-auto rounded-2xl bg-slate-950/70 border border-slate-800/70 px-4 py-3 flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-wide text-slate-400">
          Quick Actions
        </span>

        {effectiveQuickActions ? (
          effectiveQuickActions
        ) : (
          <>
            <button
              type="button"
              className="w-full rounded-xl bg-pink-500 hover:bg-pink-400 text-[13px] font-semibold text-white px-3 py-2 transition-colors"
            >
              ✨ I Feel Lucky – Show Journeys
            </button>
            <button
              type="button"
              className="w-full rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-600/70 text-[13px] font-medium text-slate-100 px-3 py-2 transition-colors"
            >
              🗺️ Open Journey Map
            </button>
          </>
        )}
      </section>
    </aside>
  );
}
