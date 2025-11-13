import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Plane, Send, Compass } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
    // Load saved responses
    const saved = localStorage.getItem('assessment_responses');
    if (saved) {
      setResponses(JSON.parse(saved));
    }
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API}/assessment/questions`);
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswer = (value) => {
    const newResponses = {
      ...responses,
      [questions[currentQuestion].id]: value
    };
    setResponses(newResponses);
    localStorage.setItem('assessment_responses', JSON.stringify(newResponses));
  };

  const goNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const scores = Object.values(responses);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getPlaneLevel = (score) => {
    if (score < 20) return { name: 'Grounded', emoji: '✈️' };
    if (score < 40) return { name: 'Single Engine', emoji: '🛩️' };
    if (score < 60) return { name: 'Regional Jet', emoji: '✈️' };
    if (score < 80) return { name: 'Commercial Jet', emoji: '🛫' };
    return { name: 'Airbus 380', emoji: '🛫' };
  };

  const handleSubmitQuickAssessment = async () => {
    // Check if all questions are answered
    if (Object.keys(responses).length !== questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const submission = {
        responses: responses,
        tech_tools: [] // Empty array for quick assessment
      };

      const response = await axios.post(`${API}/assessment/submit`, submission);
      
      // Clear saved responses
      localStorage.removeItem('assessment_responses');
      
      // Store latest assessment ID for navigation
      localStorage.setItem('latestAssessmentId', response.data.id);
      
      // Navigate to results page with the assessment ID
      navigate(`/results/${response.data.id}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading assessment...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">No questions available</div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(responses).length;
  const avgScore = calculateScore();
  const plane = getPlaneLevel(avgScore);
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Progress Header */}
      <div className="sticky top-0 z-40 backdrop-blur-sm bg-slate-950/80 border-b border-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-blue-400 uppercase tracking-wide">Quick Assessment</p>
              <h1 className="text-2xl font-bold text-white">Marketing Flight Assessment</h1>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-cyan-400">{avgScore}/100</p>
              <p className="text-xs text-blue-300">Current Score</p>
            </div>
          </div>
          
          {/* Info Banner */}
          {currentQuestion === 0 && answeredCount === 0 && (
            <div className="mb-4 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Plane className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Quick Assessment Overview</h3>
                  <p className="text-sm text-blue-200">
                    This 10-question assessment will give you a high-level view of your current marketing maturity across key dimensions. 
                    Answer all questions to unlock personalized insights and discover your recommended flight path to marketing excellence.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="w-full bg-slate-800/50 rounded h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plane Indicator */}
            <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-8 text-center">
              <p className="text-6xl mb-4">{plane.emoji}</p>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">{plane.name}</h3>
              <p className="text-sm text-blue-300 mb-4">{answeredCount} of {totalQuestions} answered</p>
              <div className="w-full bg-slate-800/50 rounded h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded transition-all"
                  style={{ width: `${Math.min(avgScore, 100)}%` }}
                />
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase">Progress</h4>
              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`flex items-center justify-between text-sm p-2 rounded ${
                      idx === currentQuestion ? 'bg-blue-600/20' : ''
                    }`}
                  >
                    <span className={`${responses[q.id] !== undefined ? 'text-green-400' : 'text-blue-300'}`}>
                      {q.category}
                    </span>
                    {responses[q.id] !== undefined && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Dive CTA */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-5 h-5 text-purple-400" />
                <h4 className="text-sm font-semibold text-white uppercase">Want More Detail?</h4>
              </div>
              <p className="text-sm text-blue-200 mb-4">
                Explore specific marketing terminals with 5-10 detailed questions per topic
              </p>
              <Link to="/deep-dive">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/50">
                  <Compass className="w-4 h-4" />
                  Explore Deep Dive
                </button>
              </Link>
            </div>
          </div>

          {/* Main Question */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-8 space-y-6">
              {/* Question Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/30">
                    Q{currentQuestion + 1}/{totalQuestions}
                  </span>
                  <span className="text-xs text-blue-300">{question.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{question.question}</h2>
                <p className="text-sm text-blue-200">{question.description}</p>
              </div>

              {/* Radio Options */}
              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = responses[question.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-lg border transition-all text-left flex items-start gap-3 ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-500/50'
                          : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50 hover:border-blue-500/30'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{option.label}</div>
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={goPrev}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-blue-200 border border-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex gap-3">
                  {currentQuestion === totalQuestions - 1 ? (
                    <>
                      <button
                        onClick={handleSubmitQuickAssessment}
                        disabled={answeredCount !== totalQuestions || submitting}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-lg hover:shadow-green-500/50"
                      >
                        <Send className="w-4 h-4" />
                        {submitting ? 'Submitting...' : 'Submit Quick Assessment'}
                      </button>
                      <button
                        onClick={() => navigate('/tech-stack')}
                        disabled={responses[question.id] === undefined}
                        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                      >
                        Add Tech Stack
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={goNext}
                      disabled={responses[question.id] === undefined}
                      className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                    >
                      Next Question
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
