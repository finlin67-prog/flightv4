/**
 * Shared utility functions for flight metrics and plane level calculations
 * Used by both Quick Assessment and Flight Instruments to ensure consistency
 */

/**
 * Convert a combined score (0-10 scale) to Flight Miles (0-1000 scale)
 */
export const toFlightMiles = (combinedScore) => {
  return Math.round(combinedScore * 100);
};

/**
 * Get plane level based on combined score (0-10 scale)
 * Matches backend logic in server.py get_plane_level()
 */
export const getPlaneLevel = (combinedScore) => {
  if (combinedScore < 2) {
    return {
      name: 'Grounded',
      emoji: '✈️',
      description: 'Foundation building phase'
    };
  } else if (combinedScore < 3) {
    return {
      name: 'Single Engine',
      emoji: '🛩️',
      description: 'Basic capabilities emerging'
    };
  } else if (combinedScore < 4.5) {
    return {
      name: 'Regional Jet',
      emoji: '✈️',
      description: 'Growing sophistication'
    };
  } else if (combinedScore < 6) {
    return {
      name: 'Commercial Jet',
      emoji: '🛫',
      description: 'Advanced readiness'
    };
  } else if (combinedScore < 7.5) {
    return {
      name: 'Wide-body Jet',
      emoji: '✈️',
      description: 'Enterprise capability'
    };
  } else {
    return {
      name: 'Airbus 380',
      emoji: '🛫',
      description: 'Maximum operational capability'
    };
  }
};

/**
 * Calculate live combined score from assessment responses
 * @param {Object} responses - Map of questionId -> value (0-100)
 * @param {number} techScore - Tech stack score (0-10), defaults to 0
 * @returns {number} Combined score (0-10 scale)
 */
export const calculateLiveCombinedScore = (responses, techScore = 0) => {
  const scores = Object.values(responses);
  
  if (scores.length === 0) {
    // No answers yet - return just tech score if available
    return techScore;
  }
  
  // Calculate average assessment score (0-100 scale)
  const avgAssessmentScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  // Convert to 0-10 scale
  const normalizedAssessmentScore = avgAssessmentScore / 10;
  
  // Combine with tech score (matches backend formula)
  const combinedScore = (normalizedAssessmentScore + techScore) / 2;
  
  return combinedScore;
};

/**
 * Calculate average assessment score from responses
 * @param {Object} responses - Map of questionId -> value (0-100)
 * @returns {number} Average score (0-100 scale)
 */
export const calculateAverageScore = (responses) => {
  const scores = Object.values(responses);
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};
