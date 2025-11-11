import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Home, Plane, TrendingUp, Target, Zap, Users } from 'lucide-react';
import axios from 'axios';
import { MARKETING_CITIES, getCityById } from '../data/citiesData';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmluZGxpbmc2NyIsImEiOiJjbWd6Z3d2eDcwNmR4eWtvbGkyZWd1YXV4In0.Erljxlgwjmx1L-Fj3tDKzg';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const OperationsCenterPage = () => {
  const { assessmentId } = useParams();
  const [results, setResults] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewState, setViewState] = useState({
    longitude: 10,
    latitude: 30,
    zoom: 1.8
  });

  useEffect(() => {
    if (assessmentId) {
      fetchResults();
    }
  }, [assessmentId]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${API}/assessment/results/${assessmentId}`);
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  // Calculate city heat based on R/E/A/O scores
  const getCityHeat = (cityId) => {
    if (!results || !results.reao_scores) return 0;
    
    // Map city functions to R/E/A/O dimensions
    const dimensionMap = {
      'abm': 'opportunity',
      'analytics': 'efficiency',
      'brand': 'readiness',
      'content': 'efficiency',
      'automation': 'efficiency',
      'martech': 'efficiency',
      'ops': 'alignment',
      'strategy': 'alignment'
    };
    
    const dimension = dimensionMap[cityId] || 'readiness';
    return results.reao_scores[dimension] || 50;
  };

  // Get city color based on heat
  const getCityColor = (heat) => {
    if (heat >= 75) return '#10b981'; // Green - strong
    if (heat >= 50) return '#f59e0b'; // Amber - moderate  
    return '#ef4444'; // Red - needs attention
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading Operations Center...</div>
      </div>
    );
  }

  const reao = results?.reao_scores || {};
  const avgScore = (reao.readiness + reao.efficiency + reao.alignment + reao.opportunity) / 4 || 0;

  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      {/* Top Panel - KPIs & Navigation */}
      <div className="bg-slate-900/95 border-b border-cyan-500/30 px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Marketing Journey 360</h1>
          </div>
          <div className="h-8 w-px bg-blue-500/30" />
          <div className="text-sm text-blue-300">Operations Center</div>
        </div>

        <div className="flex items-center gap-8">
          {/* Quick KPIs */}
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-300">Readiness:</span>
            <span className="text-sm font-bold text-cyan-400">{reao.readiness?.toFixed(0) || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-blue-300">Efficiency:</span>
            <span className="text-sm font-bold text-cyan-400">{reao.efficiency?.toFixed(0) || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-300">Alignment:</span>
            <span className="text-sm font-bold text-cyan-400">{reao.alignment?.toFixed(0) || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-blue-300">Opportunity:</span>
            <span className="text-sm font-bold text-cyan-400">{reao.opportunity?.toFixed(0) || 0}</span>
          </div>

          <div className="h-8 w-px bg-blue-500/30" />

          <Link to={`/results/${assessmentId}`}>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg">
              Back to Results
            </button>
          </Link>
          <Link to="/">
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Controls & Filters */}
        <div className="w-80 bg-slate-900/95 border-r border-cyan-500/30 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Plane Level */}
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-500/30 rounded-lg p-4 text-center">
              <p className="text-6xl mb-2">{results?.plane_level?.emoji}</p>
              <p className="text-lg font-bold text-cyan-400">{results?.plane_level?.name}</p>
              <p className="text-xs text-blue-300 mt-1">{results?.plane_level?.description}</p>
              <div className="mt-3">
                <div className="text-2xl font-bold text-white">{avgScore.toFixed(1)}/100</div>
                <div className="text-xs text-blue-400">Overall Readiness</div>
              </div>
            </div>

            {/* City Legend */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase">City Heat Legend</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-blue-300">Strong (75+) - Ready to scale</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-blue-300">Moderate (50-74) - Build momentum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-blue-300">Needs Focus (&lt;50) - Priority area</span>
                </div>
              </div>
            </div>

            {/* Selected City Info */}
            {selectedCity && (
              <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{selectedCity.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedCity.name}</h4>
                    <p className="text-xs text-blue-400">{selectedCity.country}</p>
                  </div>
                </div>
                <p className="text-xs text-cyan-400 font-semibold mb-2">{selectedCity.function}</p>
                <p className="text-xs text-blue-300 mb-3">{selectedCity.description}</p>
                <div className="space-y-1">
                  <p className="text-xs text-blue-400 font-semibold">Key Metrics:</p>
                  {selectedCity.keyMetrics.map((metric, idx) => (
                    <div key={idx} className="text-xs text-blue-300 flex items-center gap-1">
                      <span>•</span>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-blue-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-400">Readiness:</span>
                    <span className="text-sm font-bold text-cyan-400">
                      {getCityHeat(selectedCity.id).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase">Global Presence</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-2xl font-bold text-cyan-400">{MARKETING_CITIES.length}</div>
                  <div className="text-xs text-blue-300">Cities</div>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-2xl font-bold text-cyan-400">
                    {MARKETING_CITIES.filter(c => getCityHeat(c.id) >= 75).length}
                  </div>
                  <div className="text-xs text-blue-300">Strong</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Map */}
        <div className="flex-1 relative">
          <ReactMapGL
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: '100%', height: '100%' }}
          >
            {/* City Markers */}
            {MARKETING_CITIES.map((city) => {
              const heat = getCityHeat(city.id);
              const color = getCityColor(heat);
              const size = heat / 5 + 10; // Marker size based on heat
              
              return (
                <Marker
                  key={city.id}
                  longitude={city.coordinates[0]}
                  latitude={city.coordinates[1]}
                  anchor="center"
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="relative cursor-pointer group">
                    {/* Pulse animation for active cities */}
                    {heat >= 75 && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: color }}
                      />
                    )}
                    {/* Main marker */}
                    <div
                      className="relative rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white hover:scale-125 transition-transform"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        fontSize: `${Math.max(8, size / 3)}px`
                      }}
                    >
                      {city.icon}
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-slate-900 border border-cyan-500/50 rounded px-3 py-2 whitespace-nowrap shadow-xl">
                        <div className="text-xs font-bold text-white">{city.name}</div>
                        <div className="text-xs text-cyan-400">{city.function}</div>
                        <div className="text-xs text-blue-300">Score: {heat.toFixed(0)}</div>
                      </div>
                    </div>
                  </div>
                </Marker>
              );
            })}
          </Map>
        </div>

        {/* Right Panel - AI Insights */}
        <div className="w-96 bg-slate-900/95 border-l border-cyan-500/30 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Strategic Insights
              </h3>
              
              {results?.insights && (
                <div className="space-y-3">
                  {results.insights.map((insight, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-sm text-blue-200">{insight}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Journeys */}
            {results?.recommendations && results.recommendations.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Recommended Journeys</h3>
                <div className="space-y-3">
                  {results.recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-500/30 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-bold text-cyan-400">{rec.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          rec.priority === 'High' ? 'bg-red-600/20 text-red-400' : 'bg-yellow-600/20 text-yellow-400'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-xs text-blue-300 mb-3">{rec.description}</p>
                      <div className="text-xs text-blue-400">
                        <div className="flex justify-between">
                          <span>Timeline:</span>
                          <span className="text-cyan-400 font-semibold">{rec.timeline}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Current Score:</span>
                          <span className="text-cyan-400 font-semibold">{rec.current_score}/100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsCenterPage;
