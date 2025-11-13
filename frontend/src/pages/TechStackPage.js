import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, X, ChevronRight, ChevronLeft } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TechStackPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    const saved = localStorage.getItem('tech_tools');
    if (saved) {
      setSelectedTools(JSON.parse(saved));
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/tech/categories`);
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tech categories:', error);
      setLoading(false);
    }
  };

  const toggleTool = (toolId) => {
    const newSelection = selectedTools.includes(toolId)
      ? selectedTools.filter(id => id !== toolId)
      : [...selectedTools, toolId];
    setSelectedTools(newSelection);
    localStorage.setItem('tech_tools', JSON.stringify(newSelection));
  };

  const selectAll = () => {
    const allTools = categories.flatMap(cat => cat.tools.map(t => t.id));
    setSelectedTools(allTools);
    localStorage.setItem('tech_tools', JSON.stringify(allTools));
  };

  const clearAll = () => {
    setSelectedTools([]);
    localStorage.setItem('tech_tools', JSON.stringify([]));
  };

  const handleSubmit = async () => {
    try {
      const responses = JSON.parse(localStorage.getItem('assessment_responses') || '{}');
      
      const submission = {
        responses,
        tech_tools: selectedTools
      };

      const result = await axios.post(`${API}/assessment/submit`, submission);
      
      // Save assessment ID
      localStorage.setItem('current_assessment_id', result.data.id);
      localStorage.setItem('latestAssessmentId', result.data.id);
      
      // Navigate to results
      navigate(`/results/${result.data.id}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Error submitting assessment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading tech stack...</div>
      </div>
    );
  }

  const totalTools = categories.reduce((sum, cat) => sum + cat.tools.length, 0);
  const coveragePercent = Math.round((selectedTools.length / totalTools) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-sm bg-slate-950/80 border-b border-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-blue-400 uppercase tracking-wide">Step 2 of 2: Tech Stack</p>
              <h1 className="text-2xl font-bold text-white">Marketing Tech Stack Inventory</h1>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-cyan-400">{selectedTools.length}/{totalTools}</p>
              <p className="text-xs text-blue-300">Tools Selected</p>
            </div>
          </div>
          <div className="w-full bg-slate-800/50 rounded h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded transition-all"
              style={{ width: `${coveragePercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Instructions */}
        <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Select Your Marketing Technology</h2>
          <p className="text-blue-300 mb-4">
            Choose the tools and platforms your team currently uses. Coverage across categories helps identify integration gaps.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              Select All
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-all"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
            <div className="ml-auto text-sm text-blue-300">
              Coverage: <strong className="text-cyan-400">{coveragePercent}%</strong>
            </div>
          </div>
        </div>

        {/* Tool Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <div key={category.name} className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{category.name}</h3>
              <div className="space-y-2">
                {category.tools.map((tool) => {
                  const isSelected = selectedTools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className={`w-full p-3 rounded border transition-all text-left flex items-center gap-3 ${
                        isSelected
                          ? 'bg-cyan-600/20 border-cyan-500 text-cyan-400'
                          : 'bg-slate-800/30 border-slate-700/30 hover:border-cyan-500/50 text-white'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-medium flex-1">{tool.name}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          tool.tier === 'enterprise'
                            ? 'bg-blue-600/20 text-blue-400'
                            : tool.tier === 'mid'
                            ? 'bg-cyan-600/20 text-cyan-400'
                            : 'bg-slate-700/20 text-slate-400'
                        }`}
                      >
                        {tool.tier}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-blue-400 mt-3">
                {selectedTools.filter(id => category.tools.map(t => t.id).includes(id)).length}/{category.tools.length} selected
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-2 border-cyan-500/30 rounded-lg p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Ready to See Your Results?</h3>
              <p className="text-blue-300 text-sm">View your marketing readiness score and personalized recommendations</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/assessment')}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/50"
              >
                View Results
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;
