import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { useUserProfile } from '../context/UserProfileContext';
import { useFlightStatus } from '../context/FlightStatusContext';
import { getPlaneLevel, toFlightMiles } from '../utils/flightMetrics';
import { Sparkles, Map, Gauge, Activity } from 'lucide-react';

const FlightInstrumentsPanel = () => {
  const navigate = useNavigate();
  const { getFlightMiles, getPlaneLevel: getSavedPlaneLevel, getReaoScores, latestAssessment } = useAssessment();
  const { userProfile } = useUserProfile();
  const { liveStatus } = useFlightStatus();

  // Use live status if active, otherwise use saved assessment data
  const isLiveActive = liveStatus.isActive && liveStatus.answeredCount > 0;
  
  const flightMiles = isLiveActive 
    ? toFlightMiles(liveStatus.combinedScore) 
    : getFlightMiles();
  
  const planeLevel = isLiveActive 
    ? getPlaneLevel(liveStatus.combinedScore)
    : getSavedPlaneLevel();
  
  const reaoScores = getReaoScores(); // REAO scores only available from completed assessments

  const handleFeelLucky = () => {
    const assessmentId = localStorage.getItem('latestAssessmentId');
    if (assessmentId) {
      navigate(`/flight-deck/${assessmentId}`, { state: { triggerLucky: true } });
    } else {
      navigate('/flight-deck');
    }
  };

  const handleOpenMap = () => {
    const assessmentId = localStorage.getItem('latestAssessmentId');
    if (assessmentId) {
      navigate(`/flight-deck/${assessmentId}`);
    } else {
      navigate('/flight-deck');
    }
  };

  return (
    <aside className="w-80 bg-slate-900/50 border-l border-blue-900/30 overflow-y-auto flex-shrink-0">
      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="border-b border-blue-900/30 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Flight Instruments</h2>
          </div>
          <p className="text-xs text-blue-400">Your Marketing Status</p>
        </div>

        {/* Live Status Indicator */}
        {isLiveActive && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-green-400">LIVE FLIGHT STATUS</span>
            </div>
            <p className="text-xs text-green-200">
              Based on {liveStatus.answeredCount} of {liveStatus.totalQuestions} questions answered
            </p>
          </div>
        )}

        {/* Current Aircraft */}
        <div className={`bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border rounded-xl p-4 transition-all ${
          isLiveActive 
            ? 'border-green-500/40 shadow-lg shadow-green-500/10' 
            : 'border-blue-800/40'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-cyan-400 uppercase tracking-wide">Current Aircraft</div>
            {isLiveActive && (
              <div className="text-xs text-green-400 font-semibold flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Live
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{planeLevel.emoji}</span>
            <div>
              <div className="text-lg font-bold text-white">{planeLevel.name}</div>
              <div className="text-xs text-blue-300 mt-1">{planeLevel.description}</div>
            </div>
          </div>
        </div>

        {/* Flight Miles */}
        <div className={`bg-slate-800/50 border rounded-xl p-4 transition-all ${
          isLiveActive ? 'border-green-500/30' : 'border-blue-900/30'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-cyan-400 uppercase tracking-wide">Flight Miles</div>
            {isLiveActive && (
              <div className="text-xs text-orange-400">Preview</div>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{flightMiles}</span>
            <span className="text-sm text-blue-400">/ 1000</span>
          </div>
          {isLiveActive && (
            <div className="text-xs text-blue-300 mt-1">
              Score: {liveStatus.currentScore}/100
            </div>
          )}
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isLiveActive
                  ? 'bg-gradient-to-r from-green-500 to-cyan-500'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600'
              }`}
              style={{ width: `${Math.min((flightMiles / 1000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Assessment Progress (Live Only) */}
        {isLiveActive && (
          <div className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 border border-green-500/30 rounded-xl p-4">
            <div className="text-xs text-cyan-400 uppercase tracking-wide mb-3">Assessment Progress</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-200">Questions Answered</span>
                <span className="text-sm font-bold text-white">
                  {liveStatus.answeredCount} / {liveStatus.totalQuestions}
                </span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(liveStatus.answeredCount / liveStatus.totalQuestions) * 100}%` }}
                />
              </div>
              <div className="text-xs text-green-300 mt-2">
                Keep going! Your score updates with each answer.
              </div>
            </div>
          </div>
        )}

        {/* REAO Scores (Only shown for completed assessments) */}
        {!isLiveActive && latestAssessment && (
          <div className="bg-slate-800/50 border border-blue-900/30 rounded-xl p-4">
            <div className="text-xs text-cyan-400 uppercase tracking-wide mb-3">REAO Dimensions</div>
            <div className="space-y-3">
              {[
                { key: 'readiness', label: 'Readiness', color: 'from-green-600 to-emerald-600' },
                { key: 'efficiency', label: 'Efficiency', color: 'from-blue-600 to-cyan-600' },
                { key: 'alignment', label: 'Alignment', color: 'from-purple-600 to-pink-600' },
                { key: 'opportunity', label: 'Opportunity', color: 'from-orange-600 to-yellow-600' },
              ].map((dimension) => {
                const score = reaoScores[dimension.key] || 0;
                const displayScore = Math.round(score * 100);
                return (
                  <div key={dimension.key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-blue-200">{dimension.label}</span>
                      <span className="text-xs font-semibold text-white">{displayScore}</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                      <div
                        className={`bg-gradient-to-r ${dimension.color} h-1.5 rounded-full transition-all`}
                        style={{ width: `${Math.min(displayScore, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Profile Summary */}
        {(userProfile.role || userProfile.industry) && (
          <div className="bg-slate-800/50 border border-blue-900/30 rounded-xl p-4">
            <div className="text-xs text-cyan-400 uppercase tracking-wide mb-3">Flight Profile</div>
            <div className="space-y-2 text-sm">
              {userProfile.role && (
                <div>
                  <span className="text-blue-400">Role:</span>{' '}
                  <span className="text-white">{userProfile.role}</span>
                </div>
              )}
              {userProfile.industry && (
                <div>
                  <span className="text-blue-400">Industry:</span>{' '}
                  <span className="text-white">{userProfile.industry}</span>
                </div>
              )}
              {userProfile.companySize && (
                <div>
                  <span className="text-blue-400">Company:</span>{' '}
                  <span className="text-white">{userProfile.companySize}</span>
                </div>
              )}
              {userProfile.teamSize && (
                <div>
                  <span className="text-blue-400">Team:</span>{' '}
                  <span className="text-white">{userProfile.teamSize}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-3 pt-4 border-t border-blue-900/30">
          <div className="text-xs text-cyan-400 uppercase tracking-wide mb-3">Quick Actions</div>
          
          <button
            onClick={handleFeelLucky}
            disabled={isLiveActive}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            I Feel Lucky
          </button>

          <button
            onClick={handleOpenMap}
            disabled={isLiveActive}
            className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Map className="w-4 h-4" />
            Open Journey Map
          </button>

          {isLiveActive && (
            <div className="text-xs text-blue-400 text-center mt-2">
              Complete assessment to access journeys
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default FlightInstrumentsPanel;
