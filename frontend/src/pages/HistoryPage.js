import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Trash2, Eye, Calendar } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API = API_BASE_URL;

const HistoryPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API}/assessment/history`);
      setAssessments(response.data.assessments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching history:', error);
      setLoading(false);
    }
  };

  const deleteAssessment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assessment?')) {
      return;
    }

    try {
      await axios.delete(`${API}/assessment/${id}`);
      setAssessments(assessments.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting assessment:', error);
      alert('Error deleting assessment');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <div className="border-b border-blue-900/30 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Assessment History</h1>
              <p className="text-blue-300 mt-1">View and manage your past assessments</p>
            </div>
            <Link to="/">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {assessments.length === 0 ? (
          <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-12 text-center">
            <p className="text-blue-300 text-lg mb-6">No assessments found</p>
            <Link to="/assessment">
              <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg">
                Take Your First Assessment
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="bg-slate-900/50 border border-blue-900/30 hover:border-cyan-500/50 rounded-lg p-6 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-5xl">{assessment.plane_level.emoji}</span>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400">{assessment.plane_level.name}</h3>
                        <p className="text-sm text-blue-300">{assessment.plane_level.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-blue-400">Assessment Score</p>
                        <p className="text-lg font-bold text-white">{assessment.assessment_score.toFixed(1)}/100</p>
                      </div>
                      <div>
                        <p className="text-xs text-cyan-400">Tech Score</p>
                        <p className="text-lg font-bold text-white">{assessment.tech_score.toFixed(1)}/10</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-400">Combined</p>
                        <p className="text-lg font-bold text-cyan-400">{assessment.combined_score.toFixed(1)}/10</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-400">Tools</p>
                        <p className="text-lg font-bold text-white">{assessment.tech_tools.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(assessment.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/results/${assessment.id}`}>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteAssessment(assessment.id)}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
