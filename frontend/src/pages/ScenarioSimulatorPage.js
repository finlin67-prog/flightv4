import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import ScenarioSimulatorPanel from '../components/ScenarioSimulatorPanel';
import { API_BASE_URL } from '../config/api';

const API = API_BASE_URL;

const ScenarioSimulatorPage = () => {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [baseResults, setBaseResults] = useState(null);
  const [loading, setLoading] = useState(true);

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


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading Scenario Simulator...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            {baseResults && (
              <button
                onClick={() => navigate(`/results/${baseResults.id}`)}
                className="mb-4 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Results
              </button>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">🎛️</div>
              <h1 className="text-4xl font-bold text-white">What-If Simulator</h1>
            </div>
            <p className="text-xl text-blue-200">
              Model how changes in resources and processes impact your marketing maturity
            </p>
          </div>

          {/* Reusable Simulator Panel */}
          <ScenarioSimulatorPanel baseResults={baseResults} compact={false} />
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulatorPage;
