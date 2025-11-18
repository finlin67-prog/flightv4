// frontend/src/utils/mapAssessmentToInstruments.js

/**
 * Map a backend assessment result + profile into props
 * expected by <FlightInstrumentsPanel />.
 *
 * @param {any} result  Assessment result from /api/assessment/submit or /assessment/results/{id}
 * @param {any} profile Pre-flight profile (role, industry, revenue, team size)
 */
export function mapAssessmentToInstruments(result, profile) {
  if (!result) {
    return {};
  }

  const plane = result.plane_level || {};

  const responses = result.responses || {};
  const questionCount = Object.keys(responses).length;

  // You can tweak this mapping if you prefer a different miles scale.
  const combined = typeof result.combined_score === "number"
    ? result.combined_score
    : 0;
  const flightMiles = Math.round(combined * 10); // e.g. 73.2 → 732 miles

  return {
    currentAircraft: {
      name: plane.name || "Not Yet Assessed",
      description: plane.description || "",
      emoji: plane.emoji || "✈️",
    },
    flightMiles,
    maxFlightMiles: 1000,
    questionsAnswered: questionCount,
    totalQuestions: 10, // adjust if you add more questions
    reaoScores: result.reao_scores || {},
    profile: profile
      ? {
          role: profile.role,
          industry: profile.industry,
          companySize: profile.companyRevenue,
          teamSize: profile.teamSize,
        }
      : undefined,
  };
}
