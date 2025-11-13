import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, User, Target, Building2, ArrowRight, CheckCircle } from 'lucide-react';
import { useUserProfile } from '../context/UserProfileContext';

/**
 * @deprecated This component is no longer used as the primary onboarding flow.
 * The new Pre-flight Check landing page (HomePage.js at route `/`) has replaced this 3-step wizard.
 * This file is kept for reference but is not accessible via any route in App.js.
 * 
 * To restore if needed: Add route in App.js like:
 * <Route path="/welcome-legacy" element={<WelcomePage />} />
 */
const WelcomePage = () => {
  const navigate = useNavigate();
  const { updateProfile } = useUserProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    objectives: [],
    companySize: '',
    industry: '',
    goToMarket: '',
    teamSize: ''
  });

  const roles = [
    { value: 'cmo', label: 'CMO', icon: '🎯' },
    { value: 'marketing-ops', label: 'Marketing Operations', icon: '⚙️' },
    { value: 'campaigns', label: 'Campaigns', icon: '📢' },
    { value: 'brand', label: 'Brand', icon: '✨' },
    { value: 'product', label: 'Product Marketing', icon: '📦' },
    { value: 'other', label: 'Other', icon: '👤' }
  ];

  const objectives = [
    { value: 'improve-performance', label: 'Improve current performance', description: 'Optimize and enhance what we\'re doing today' },
    { value: 'understand-future', label: 'Understand possibilities / future state', description: 'Explore what\'s possible and where we can go' },
    { value: 'budget-planning', label: 'Determine budget requirements', description: 'Plan resources and investment needed' }
  ];

  const companySizes = [
    { value: 'startup', label: 'Startup', range: '< $5M revenue' },
    { value: 'small', label: 'Small Business', range: '$5M - $50M revenue' },
    { value: 'mid-market', label: 'Mid-Market', range: '$50M - $500M revenue' },
    { value: 'enterprise', label: 'Enterprise', range: '$500M+ revenue' }
  ];

  const goToMarketTypes = [
    { value: 'b2b', label: 'B2B', icon: '🏢' },
    { value: 'b2c', label: 'B2C', icon: '👥' },
    { value: 'both', label: 'Both', icon: '🔄' },
    { value: 'other', label: 'Other', icon: '📊' }
  ];

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleObjectiveToggle = (objective) => {
    const newObjectives = formData.objectives.includes(objective)
      ? formData.objectives.filter(o => o !== objective)
      : [...formData.objectives, objective];
    setFormData({ ...formData, objectives: newObjectives });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    updateProfile(formData);
    navigate('/assessment');
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.role !== '';
    if (currentStep === 2) return formData.objectives.length > 0;
    if (currentStep === 3) return formData.companySize && formData.goToMarket && formData.teamSize;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Plane className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Marketing Flight Deck</h1>
          </div>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Prepare for departure: Chart your marketing journey from current position to future destinations
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step === currentStep 
                  ? 'bg-cyan-600 text-white scale-110' 
                  : step < currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-800 text-slate-500'
              }`}>
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-1 ${step < currentStep ? 'bg-green-600' : 'bg-slate-800'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/50 border border-blue-900/30 rounded-2xl p-8 backdrop-blur-sm">
          {/* Step 1: Define Your Role */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <User className="w-4 h-4" />
                  STEP 1 OF 3
                </div>
                <h2 className="text-2xl font-bold text-white">Define Your Role</h2>
                <p className="text-blue-300">Who's filing this flight plan?</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value)}
                    className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
                      formData.role === role.value
                        ? 'bg-gradient-to-br from-cyan-600 to-blue-600 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50'
                        : 'bg-slate-800/50 border-2 border-blue-900/30 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{role.icon}</div>
                    <div className={`text-sm font-semibold ${
                      formData.role === role.value ? 'text-white' : 'text-blue-200'
                    }`}>
                      {role.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: What to Address */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Target className="w-4 h-4" />
                  STEP 2 OF 3
                </div>
                <h2 className="text-2xl font-bold text-white">What Do You Want to Address?</h2>
                <p className="text-blue-300">Select your flight objectives (choose all that apply)</p>
              </div>

              <div className="space-y-4">
                {objectives.map((objective) => (
                  <button
                    key={objective.value}
                    onClick={() => handleObjectiveToggle(objective.value)}
                    className={`w-full p-6 rounded-xl text-left transition-all ${
                      formData.objectives.includes(objective.value)
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-2 border-cyan-400'
                        : 'bg-slate-800/50 border-2 border-blue-900/30 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${
                          formData.objectives.includes(objective.value) ? 'text-white' : 'text-blue-100'
                        }`}>
                          {objective.label}
                        </h3>
                        <p className={`text-sm ${
                          formData.objectives.includes(objective.value) ? 'text-blue-100' : 'text-blue-300'
                        }`}>
                          {objective.description}
                        </p>
                      </div>
                      {formData.objectives.includes(objective.value) && (
                        <CheckCircle className="w-6 h-6 text-white flex-shrink-0 ml-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Define Organization */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Building2 className="w-4 h-4" />
                  STEP 3 OF 3
                </div>
                <h2 className="text-2xl font-bold text-white">Define Your Organization</h2>
                <p className="text-blue-300">Tell us about your airline</p>
              </div>

              <div className="space-y-6">
                {/* Company Size */}
                <div>
                  <label className="block text-blue-200 font-semibold mb-3">Company Size</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {companySizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setFormData({ ...formData, companySize: size.value })}
                        className={`p-4 rounded-lg text-left transition-all ${
                          formData.companySize === size.value
                            ? 'bg-cyan-600 border-2 border-cyan-400'
                            : 'bg-slate-800/50 border-2 border-blue-900/30 hover:border-cyan-500/50'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.companySize === size.value ? 'text-white' : 'text-blue-100'
                        }`}>
                          {size.label}
                        </div>
                        <div className={`text-xs ${
                          formData.companySize === size.value ? 'text-blue-100' : 'text-blue-300'
                        }`}>
                          {size.range}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-blue-200 font-semibold mb-3">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g., SaaS, Healthcare, Financial Services"
                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-blue-900/30 rounded-lg text-white placeholder-blue-400/50 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Go-to-Market Type */}
                <div>
                  <label className="block text-blue-200 font-semibold mb-3">Go-to-Market Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {goToMarketTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, goToMarket: type.value })}
                        className={`p-4 rounded-lg transition-all ${
                          formData.goToMarket === type.value
                            ? 'bg-cyan-600 border-2 border-cyan-400'
                            : 'bg-slate-800/50 border-2 border-blue-900/30 hover:border-cyan-500/50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className={`text-sm font-semibold ${
                          formData.goToMarket === type.value ? 'text-white' : 'text-blue-200'
                        }`}>
                          {type.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marketing Team Size */}
                <div>
                  <label className="block text-blue-200 font-semibold mb-3">Marketing Team Size</label>
                  <input
                    type="number"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    placeholder="Number of people on your marketing team"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-blue-900/30 rounded-lg text-white placeholder-blue-400/50 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-blue-900/30">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 1
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 text-blue-200 hover:bg-slate-700 border border-blue-900/30'
              }`}
            >
              Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/50'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-green-500/50'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Plane className="w-5 h-5" />
                Continue to Assessment
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-blue-400 text-sm">
          <p>✈️ Visualizing marketing readiness as a global journey</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
