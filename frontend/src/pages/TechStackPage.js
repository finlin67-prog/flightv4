import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, X, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API = API_BASE_URL;

const TechStackPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Category collapse state - default expanded on desktop, collapsed on mobile
  const [expandedCategories, setExpandedCategories] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024; // Expand all on desktop
    }
    return true;
  });
  
  // Category optimization/utilization scores (0-100 per category)
  // TODO: Send this to backend when scoring logic is updated to use it
  const [categoryOptimization, setCategoryOptimization] = useState({});

  useEffect(() => {
    fetchCategories();
    const saved = localStorage.getItem('tech_tools');
    if (saved) {
      setSelectedTools(JSON.parse(saved));
    }
    
    // Load saved optimization scores
    const savedOptimization = localStorage.getItem('tech_optimization');
    if (savedOptimization) {
      setCategoryOptimization(JSON.parse(savedOptimization));
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

  const toggleCategory = (categoryName) => {
    if (typeof expandedCategories === 'boolean') {
      // Convert from single boolean to object
      const allCategories = {};
      categories.forEach(cat => {
        allCategories[cat.name] = cat.name === categoryName ? !expandedCategories : expandedCategories;
      });
      setExpandedCategories(allCategories);
    } else {
      setExpandedCategories(prev => ({
        ...prev,
        [categoryName]: !prev[categoryName]
      }));
    }
  };

  const isCategoryExpanded = (categoryName) => {
    if (typeof expandedCategories === 'boolean') {
      return expandedCategories;
    }
    return expandedCategories[categoryName] !== false;
  };

  const selectAllInCategory = (categoryTools) => {
    const categoryToolIds = categoryTools.map(t => t.id);
    const newSelection = [...new Set([...selectedTools, ...categoryToolIds])];
    setSelectedTools(newSelection);
    localStorage.setItem('tech_tools', JSON.stringify(newSelection));
  };

  const clearCategory = (categoryTools) => {
    const categoryToolIds = categoryTools.map(t => t.id);
    const newSelection = selectedTools.filter(id => !categoryToolIds.includes(id));
    setSelectedTools(newSelection);
    localStorage.setItem('tech_tools', JSON.stringify(newSelection));
  };

  const updateOptimization = (categoryName, value) => {
    const newOptimization = {
      ...categoryOptimization,
      [categoryName]: value
    };
    setCategoryOptimization(newOptimization);
    localStorage.setItem('tech_optimization', JSON.stringify(newOptimization));
  };

  const handleSubmit = async () => {
    try {
      const responses = JSON.parse(localStorage.getItem('assessment_responses') || '{}');
      
      const submission = {
        responses,
        tech_tools: selectedTools
        // TODO: Include categoryOptimization when backend scoring is updated
        // tech_optimization: categoryOptimization
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

        {/* Tool Categories - Collapsible with Optimization Sliders */}
        <div className="space-y-4 mb-8">
          {categories.map((category) => {
            const categorySelectedCount = selectedTools.filter(id => 
              category.tools.map(t => t.id).includes(id)
            ).length;
            const isExpanded = isCategoryExpanded(category.name);
            const optimizationValue = categoryOptimization[category.name] || 0;

            return (
              <div key={category.name} className="bg-slate-900/50 border border-blue-900/30 rounded-lg overflow-hidden">
                {/* Category Header - Always Visible */}
                <div className="p-4 border-b border-blue-900/20">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="flex items-center gap-3 hover:text-cyan-400 transition-colors flex-1"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-400" />
                      )}
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <span className="text-sm text-cyan-400 font-medium">
                        {categorySelectedCount}/{category.tools.length} tools
                      </span>
                    </button>
                    
                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => selectAllInCategory(category.tools)}
                        className="px-3 py-1 text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded border border-blue-500/30 transition-all"
                        title="Select all in category"
                      >
                        All
                      </button>
                      <button
                        onClick={() => clearCategory(category.tools)}
                        className="px-3 py-1 text-xs bg-slate-700/20 hover:bg-slate-700/30 text-slate-400 rounded border border-slate-600/30 transition-all"
                        title="Clear category"
                      >
                        None
                      </button>
                    </div>
                  </div>

                  {/* Optimization Slider - Always Visible */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Sliders className="w-4 h-4 text-purple-400" />
                      <label className="text-sm text-purple-300 font-medium">Optimization:</label>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="25"
                        value={optimizationValue}
                        onChange={(e) => updateOptimization(category.name, parseInt(e.target.value))}
                        className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        style={{
                          background: `linear-gradient(to right, rgb(168 85 247 / 0.5) 0%, rgb(168 85 247 / 0.5) ${optimizationValue}%, rgb(51 65 85) ${optimizationValue}%, rgb(51 65 85) 100%)`
                        }}
                      />
                      <span className="text-sm font-semibold text-purple-400 w-12 text-right">
                        {optimizationValue}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Collapsible Tool List */}
                {isExpanded && (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.tools.map((tool) => {
                        const isSelected = selectedTools.includes(tool.id);
                        return (
                          <button
                            key={tool.id}
                            onClick={() => toggleTool(tool.id)}
                            className={`p-2.5 rounded border transition-all text-left flex items-center gap-2.5 ${
                              isSelected
                                ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-400'
                                : 'bg-slate-800/30 border-slate-700/30 hover:border-cyan-500/40 text-white hover:bg-slate-800/50'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm font-medium flex-1 truncate">{tool.name}</span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${
                                tool.tier === 'enterprise'
                                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                                  : tool.tier === 'mid'
                                  ? 'bg-cyan-600/30 text-cyan-400 border border-cyan-500/30'
                                  : 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
                              }`}
                            >
                              {tool.tier === 'enterprise' ? 'ENT' : tool.tier === 'mid' ? 'MID' : 'BASE'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
