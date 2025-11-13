import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * FlightStatusContext - Provides live flight status during assessments
 * Used to update Flight Instruments panel in real-time as user answers questions
 */

const FlightStatusContext = createContext();

export const useFlightStatus = () => {
  const context = useContext(FlightStatusContext);
  if (!context) {
    throw new Error('useFlightStatus must be used within FlightStatusProvider');
  }
  return context;
};

export const FlightStatusProvider = ({ children }) => {
  const [liveStatus, setLiveStatus] = useState({
    isActive: false,           // Whether live status is active (during assessment)
    currentScore: 0,           // Current assessment score (0-100)
    combinedScore: 0,          // Combined score (0-10)
    answeredCount: 0,          // Number of questions answered
    totalQuestions: 0,         // Total number of questions
    responses: {}              // Current responses map
  });

  /**
   * Update live flight status (called by Quick Assessment as user answers)
   */
  const updateLiveStatus = useCallback((status) => {
    setLiveStatus(prev => ({
      ...prev,
      ...status,
      isActive: true
    }));
  }, []);

  /**
   * Clear live status (called when assessment is submitted or user leaves)
   */
  const clearLiveStatus = useCallback(() => {
    setLiveStatus({
      isActive: false,
      currentScore: 0,
      combinedScore: 0,
      answeredCount: 0,
      totalQuestions: 0,
      responses: {}
    });
  }, []);

  const value = {
    liveStatus,
    updateLiveStatus,
    clearLiveStatus
  };

  return (
    <FlightStatusContext.Provider value={value}>
      {children}
    </FlightStatusContext.Provider>
  );
};
