import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map, { Marker } from 'react-map-gl/mapbox';
import { TrendingUp, MapPin, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { MARKETING_CITIES, getCityById } from '../data/citiesData';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmluZGxpbmc2NyIsImEiOiJjbWd6Z3d2eDcwNmR4eWtvbGkyZWd1YXV4In0.Erljxlgwjmx1L-Fj3tDKzg';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const JourneyMapPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const [showConnections, setShowConnections] = useState(true);
  const [viewState, setViewState] = useState({
    longitude: 10,
    latitude: 20,
    zoom: 1.5
  });

  useEffect(() => {
    fetchLatestAssessment();
  }, []);

  const fetchLatestAssessment = async () => {
    try {
      const assessmentId = localStorage.getItem('latestAssessmentId');
      if (assessmentId) {
        const response = await axios.get(`${API}/assessment/results/${assessmentId}`);
        setResults(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assessment results:', error);
      setLoading(false);
    }
  };

  const getCityHeat = (cityId) => {
    if (!results || !results.reao_scores) return 50;
    
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

  const getCityColor = (heat) => {
    if (heat >= 75) return '#10b981';
    if (heat >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getJourneyConnections = () => {
    if (!results || !results.recommendations) return [];
    
    const connections = [];
    const strongCities = MARKETING_CITIES.filter(c => getCityHeat(c.id) >= 75);
    const weakCities = MARKETING_CITIES.filter(c => getCityHeat(c.id) < 50);
    
    weakCities.forEach(weak => {
      if (strongCities.length > 0) {
        connections.push({
          from: weak,
          to: strongCities[0],
          type: 'improvement'
        });
      }
    });
    
    return connections.slice(0, 5);
  };

  const handleMapError = (event) => {
    console.error('Mapbox error:', event);
    setMapError('Map failed to load. Please check your connection or try again later.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading Journey Map...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8">
        <AlertCircle className="w-16 h-16 text-cyan-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Assessment Data</h2>
        <p className="text-blue-300 mb-6 text-center max-w-md">
          Complete an assessment to see your marketing journey mapped across global cities
        </p>
        <button
          onClick={() => navigate('/assessment')}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg"
        >
          Take Assessment
        </button>
      </div>
    );
  }

  const reao = results.reao_scores || {};
  const avgScore = (reao.readiness + reao.efficiency + reao.alignment + reao.opportunity) / 4 || 0;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-950">
      {/* Page Header */}
      <div className="bg-slate-900/80 border-b border-cyan-500/30 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-cyan-400" />
            Journey Map
          </h1>
          <p className="text-sm text-blue-300">Marketing functions visualized across global cities</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <span className="text-xs text-blue-300">Overall Readiness:</span>
            <span className="text-lg font-bold text-cyan-400">{avgScore.toFixed(0)}/100</span>
          </div>
        </div>
      </div>

      {/* Main Content - Map + Sidebars */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Compact Controls */}
        <div className="w-72 bg-slate-900/50 border-r border-blue-900/30 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Current Aircraft */}
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-500/30 rounded-lg p-4 text-center">
              <p className="text-4xl mb-2">{results?.plane_level?.emoji}</p>
              <p className="text-sm font-bold text-cyan-400">{results?.plane_level?.name}</p>
              <div className="mt-2">
                <div className="text-xl font-bold text-white">{avgScore.toFixed(1)}/100</div>
                <div className="text-xs text-blue-400">Readiness</div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-300">Show Connections</span>
                <button
                  onClick={() => setShowConnections(!showConnections)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    showConnections 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-slate-700 text-blue-300'
                  }`}
                >
                  {showConnections ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Legend */}
            <div>
              <h3 className="text-xs font-semibold text-white mb-2 uppercase">City Heat Legend</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-blue-300">Strong (75+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-blue-300">Moderate (50-74)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-blue-300">Needs Focus (&lt;50)</span>
                </div>
              </div>
            </div>

            {/* Selected City Info */}
            {selectedCity && (
              <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{selectedCity.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedCity.name}</h4>
                    <p className="text-xs text-blue-400">{selectedCity.country}</p>
                  </div>
                </div>
                <p className="text-xs text-cyan-400 font-semibold mb-1">{selectedCity.function}</p>
                <p className="text-xs text-blue-300 mb-2">{selectedCity.description}</p>
                <div className="pt-2 border-t border-blue-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-400">Score:</span>
                    <span className="text-sm font-bold text-cyan-400">
                      {getCityHeat(selectedCity.id).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-800/50 rounded p-2 text-center">
                <div className="text-xl font-bold text-cyan-400">{MARKETING_CITIES.length}</div>
                <div className="text-xs text-blue-300">Cities</div>
              </div>
              <div className="bg-slate-800/50 rounded p-2 text-center">
                <div className="text-xl font-bold text-cyan-400">
                  {MARKETING_CITIES.filter(c => getCityHeat(c.id) >= 75).length}
                </div>
                <div className="text-xs text-blue-300">Strong</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - MAP (Dominant) */}
        <div className="flex-1 relative bg-slate-950">
          {mapError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
              <div className="text-center p-6 bg-slate-800 rounded-lg border border-red-500/30 max-w-md">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <p className="text-red-400 font-semibold mb-2">Map Loading Error</p>
                <p className="text-sm text-blue-300">{mapError}</p>
              </div>
            </div>
          ) : (
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              style={{ width: '100%', height: '100%' }}
              projection="mercator"
              maxPitch={0}
              minZoom={1}
              maxZoom={8}
              onError={handleMapError}
            >
              {/* Flight Path Lines */}
              {showConnections && getJourneyConnections().map((connection, idx) => (
                <svg
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                  }}
                >
                  <defs>
                    <linearGradient id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.6 }} />
                      <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.6 }} />
                    </linearGradient>
                  </defs>
                  <line
                    x1={`${((connection.from.coordinates[0] + 180) / 360) * 100}%`}
                    y1={`${((90 - connection.from.coordinates[1]) / 180) * 100}%`}
                    x2={`${((connection.to.coordinates[0] + 180) / 360) * 100}%`}
                    y2={`${((90 - connection.to.coordinates[1]) / 180) * 100}%`}
                    stroke={`url(#gradient-${idx})`}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.5"
                  />
                </svg>
              ))}

              {/* City Markers */}
              {MARKETING_CITIES.map((city) => {
                const heat = getCityHeat(city.id);
                const color = getCityColor(heat);
                const size = heat / 5 + 10;
                
                return (
                  <Marker
                    key={city.id}
                    longitude={city.coordinates[0]}
                    latitude={city.coordinates[1]}
                    anchor="center"
                    onClick={() => setSelectedCity(city)}
                  >
                    <div className="relative cursor-pointer group">
                      {heat >= 75 && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-75"
                          style={{ backgroundColor: color }}
                        />
                      )}
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
          )}
        </div>

        {/* Right Sidebar - Strategic Insights */}
        <div className="w-80 bg-slate-900/50 border-l border-blue-900/30 overflow-y-auto">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Strategic Insights
              </h3>
              
              {results?.insights && results.insights.length > 0 ? (
                <div className="space-y-2">
                  {results.insights.map((insight, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-3">
                      <p className="text-xs text-blue-200">{insight}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-blue-400 italic">Complete an assessment to see insights</p>
              )}
            </div>

            {/* Recommended Journeys */}
            {results?.recommendations && results.recommendations.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Top Journeys</h3>
                <div className="space-y-2">
                  {results.recommendations.slice(0, 3).map((rec, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-500/30 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-xs font-bold text-cyan-400">{rec.title}</h4>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          rec.priority === 'High' ? 'bg-red-600/20 text-red-400' : 'bg-yellow-600/20 text-yellow-400'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-xs text-blue-300 mb-2">{rec.description}</p>
                      <div className="text-xs text-blue-400">
                        <div className="flex justify-between">
                          <span>Timeline:</span>
                          <span className="text-cyan-400 font-semibold">{rec.timeline}</span>
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

export default JourneyMapPage;
