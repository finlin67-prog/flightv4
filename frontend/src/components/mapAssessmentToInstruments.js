// frontend/src/utils/mapAssessmentToInstruments.js

/**
 * Map a backend assessment result + profile into props expected
 * by <FlightInstrumentsPanel />.
 *
 * This is intentionally very defensive so it won't crash if fields
 * are missing or shaped a little differently.
 */
export function mapAssessmentToInstruments(result, profile) {
  if (!result) {
    return {
      currentAircraft: undefined,
      flightMiles: 0,
      maxFlightMiles: 1000,
      questionsAnswered: undefined,
      totalQuestions: undefined,
      reaoScores: {},
      profile: profile || {},
    };
  }

  const plane = result.plane_level || {};
  const combinedScore = typeof result.combined_score === "number"
    ? result.combined_score
    : 0;

  const responses = result.responses || result.answers || {};
  const questionsAnswered = Array.isArray(responses)
    ? responses.length
    : Object.keys(responses).length;

  const totalQuestions = result.total_questions || 10;

  const reao_scores =
    result.reao_scores ||
    result.reao ||
    {
      readiness: result.readiness_score,
      efficiency: result.efficiency_score,
      alignment: result.alignment_score,
      opportunity: result.opportunity_score,
    };

  return {
    currentAircraft: {
      name: plane.name || plane.label || "Not Yet Assessed",
      description:
        plane.description ||
        plane.subtitle ||
        "Complete an assessment to see your aircraft level.",
      emoji: plane.emoji || "✈️",
    },
    // Example mapping: 0–100 assessment score -> 0–1000 miles
    flightMiles: Math.round(combinedScore * 10),
    maxFlightMiles: 1000,
    questionsAnswered,
    totalQuestions,
    reaoScores: {
      readiness: reao_scores.readiness ?? null,
      efficiency: reao_scores.efficiency ?? null,
      alignment: reao_scores.alignment ?? null,
      opportunity: reao_scores.opportunity ?? null,
    },
    profile: profile || {},
  };
}
