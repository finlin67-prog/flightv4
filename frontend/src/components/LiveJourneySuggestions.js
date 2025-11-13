import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Wrench, Sparkles } from 'lucide-react';

/**
 * Live Journey Suggestions Component
 * Shows recommended journeys in real-time as user answers assessment questions
 */
const LiveJourneySuggestions = ({ suggestedJourneys, currentPoints, answeredCount, totalQuestions }) => {
  const navigate = useNavigate();

  const handleJourneyClick = (journeyId) => {
    const assessmentId = localStorage.getItem('latestAssessmentId');
    if (assessmentId) {
      navigate(`/flight-deck/${assessmentId}`, { state: { selectedJourneyId: journeyId } });
    } else {
      navigate('/flight-deck', { state: { selectedJourneyId: journeyId } });
    }
  };

  // No answers yet
  if (answeredCount === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl p-8 text-center">
        <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Discover Your Journey</h3>
        <p className="text-blue-200">
          Answer a few questions to see personalized journey recommendations based on your current marketing maturity.
        </p>
      </div>
    );
  }

  // Partial completion
  if (answeredCount < totalQuestions) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">
                Possible Destinations (Based on {answeredCount} of {totalQuestions} answers)
              </h3>
              <p className="text-sm text-green-200">
                These journeys might be a good fit. Complete the assessment to see more precise recommendations with tech gap analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Journey Cards */}
        {suggestedJourneys.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {suggestedJourneys.map((journey) => (
              <button
                key={journey.id}
                onClick={() => handleJourneyClick(journey.id)}
                className="bg-slate-900/50 border-2 border-blue-900/30 hover:border-cyan-500/50 rounded-xl p-5 text-left transition-all hover:shadow-lg hover:shadow-cyan-500/10 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {journey.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-blue-300 mb-2">
                      <span>{journey.origin}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span className="text-cyan-400 font-semibold">{journey.destination}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-cyan-400 flex-shrink-0 ml-3 group-hover:translate-x-1 transition-transform" />
                </div>

                <p className="text-sm text-blue-200 mb-4 line-clamp-2">
                  {journey.summary || journey.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  {/* Required Points */}
                  <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    currentPoints >= journey.minPoints
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                      : 'bg-orange-600/20 text-orange-400 border border-orange-500/30'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    {currentPoints >= journey.minPoints ? (
                      <span>Ready at {journey.minPoints}+ miles</span>
                    ) : (
                      <span>{journey.minPoints - currentPoints} miles to unlock</span>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-full flex items-center gap-1.5 border border-blue-500/30">
                    <Clock className="w-3 h-3" />
                    <span>{journey.estimatedTime}</span>
                  </div>

                  {/* Tech Required */}
                  {journey.techRequired && journey.techRequired.length > 0 && (
                    <div className="px-3 py-1.5 bg-purple-600/20 text-purple-400 rounded-full flex items-center gap-1.5 border border-purple-500/30">
                      <Wrench className="w-3 h-3" />
                      <span>{journey.techRequired.length} tools needed</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-blue-900/30 rounded-xl p-6 text-center">
            <p className="text-blue-300">
              Keep answering questions to unlock personalized journey recommendations!
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
          <p className="text-sm text-cyan-300 text-center">
            💡 <span className="font-semibold">Tip:</span> Complete all questions to unlock detailed tech gap analysis and priority rankings for each journey.
          </p>
        </div>
      </div>
    );
  }

  // All questions answered (shouldn't really show here since they'll submit)
  return null;
};

export default LiveJourneySuggestions;
