import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { useUserProfile } from '../context/UserProfileContext';
import { Sparkles, Map, Gauge } from 'lucide-react';

const FlightInstrumentsPanel = () => {
  const navigate = useNavigate();
  const { getFlightMiles, getPlaneLevel, getReaoScores, latestAssessment } = useAssessment();
  const { userProfile } = useUserProfile();

  const flightMiles = getFlightMiles();
  const planeLevel = getPlaneLevel();
  const reaoScores = getReaoScores();

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
    <aside className="w-80 bg-slate-900/50 border-l border-blue-900/30 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-blue-900/30 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Flight Instruments</h2>
          </div>
          <p className="text-xs text-blue-400">Your Marketing Status</p>
        </div>

        {/* Current Aircraft */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-800/40 rounded-xl p-4">
          <div className="text-xs text-cyan-400 uppercase tracking-wide mb-2">Current Aircraft</div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{planeLevel.emoji}</span>
            <div>
              <div className="text-lg font-bold text-white">{planeLevel.name}</div>
              {latestAssessment && (
                <div className="text-xs text-blue-300 mt-1">{planeLevel.description}</div>
              )}
            </div>
          </div>
        </div>

        {/* Flight Miles */}
        <div className="bg-slate-800/50 border border-blue-900/30 rounded-xl p-4">
          <div className="text-xs text-cyan-400 uppercase tracking-wide mb-2">Flight Miles</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{flightMiles}</span>
            <span className="text-sm text-blue-400">/ 1000</span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-600 to-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((flightMiles / 1000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* REAO Scores */}
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
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-all text-sm"
          >
            <Sparkles className="w-4 h-4" />
            I Feel Lucky
          </button>

          <button
            onClick={handleOpenMap}
            className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 transition-all text-sm"
          >
            <Map className="w-4 h-4" />
            Open Journey Map
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FlightInstrumentsPanel;
