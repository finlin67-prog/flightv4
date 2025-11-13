import React, { createContext, useContext, useState, useEffect } from 'react';

const AssessmentContext = createContext();

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider = ({ children }) => {
  const [latestAssessment, setLatestAssessment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const assessmentId = localStorage.getItem('latestAssessmentId');
    if (assessmentId) {
      fetchAssessmentData(assessmentId);
    }
  }, []);

  const fetchAssessmentData = async (assessmentId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/assessment/results/${assessmentId}`);
      if (response.ok) {
        const data = await response.json();
        setLatestAssessment(data);
      }
    } catch (error) {
      console.error('Error fetching assessment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLatestAssessment = (assessmentData) => {
    setLatestAssessment(assessmentData);
    if (assessmentData?.id) {
      localStorage.setItem('latestAssessmentId', assessmentData.id);
    }
  };

  const getFlightMiles = () => {
    if (!latestAssessment?.combined_score) return 0;
    return Math.round(latestAssessment.combined_score * 100);
  };

  const getPlaneLevel = () => {
    if (!latestAssessment?.plane_level) {
      return { name: 'Not Yet Assessed', emoji: '✈️', description: 'Complete an assessment to see your aircraft level' };
    }
    return latestAssessment.plane_level;
  };

  const getReaoScores = () => {
    if (!latestAssessment?.reao_scores) {
      return { readiness: 0, efficiency: 0, alignment: 0, opportunity: 0 };
    }
    return latestAssessment.reao_scores;
  };

  return (
    <AssessmentContext.Provider
      value={{
        latestAssessment,
        loading,
        updateLatestAssessment,
        fetchAssessmentData,
        getFlightMiles,
        getPlaneLevel,
        getReaoScores,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};
