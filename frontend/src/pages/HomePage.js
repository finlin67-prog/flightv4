import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Plane, Users, Building2, DollarSign, Target, Sparkles, Map, TrendingUp } from 'lucide-react';
import { useUserProfile } from '../context/UserProfileContext';
import DropdownSelect from '../components/ui/DropdownSelect';

const HomePage = () => {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useUserProfile();
  const preflightRef = useRef(null);

  const [formData, setFormData] = useState({
    role: userProfile.role || '',
    industry: userProfile.industry || '',
    companySize: userProfile.companySize || '',
    teamSize: userProfile.teamSize || '',
    budget: '',
    goals: userProfile.objectives || []
  });

  const scrollToPreflight = () => {
    preflightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleBeginFlight = () => {
    updateProfile({
      role: formData.role,
      industry: formData.industry,
      companySize: formData.companySize,
      teamSize: formData.teamSize,
      objectives: formData.goals
    });
    navigate('/assessment');
  };

  const popularJourneys = [
    {
      title: "Content → Demand Engine",
      icon: "📝",
      description: "Transform content creation into a full demand generation machine",
      bestFor: "Teams with strong content but weak pipeline contribution",
      timeline: "12-16 weeks",
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Manual → Marketing Automation",
      icon: "⚙️",
      description: "Evolve from spreadsheets and manual tasks to sophisticated automation",
      bestFor: "Teams doing repetitive work without proper automation",
      timeline: "10-14 weeks",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Analytics → Revenue Attribution",
      icon: "📊",
      description: "Move from vanity metrics to full revenue attribution and forecasting",
      bestFor: "Teams measuring clicks but not pipeline or revenue impact",
      timeline: "14-18 weeks",
      color: "from-emerald-600 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="text-center space-y-8">
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
            ✈️ Marketing Flight Deck
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Chart Your Marketing <span className="text-cyan-400">Flight Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
            Discover your current marketing capabilities, map your tech stack, and receive personalized transformation journeys for your team.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={scrollToPreflight}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-lg rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/50"
            >
              <Plane className="w-5 h-5" />
              Begin Pre-flight Check
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link to="/story/company-a">
              <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-blue-200 font-semibold text-lg rounded-lg border border-blue-900/30 transition-all">
                📖 See Company A Example
              </button>
            </Link>
            <a href="#how-it-works">
              <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-blue-200 font-semibold text-lg rounded-lg border border-blue-900/30 transition-all">
                Learn How It Works
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Pre-flight Check Form Section */}
      <section ref={preflightRef} className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/40 border-2 border-cyan-500/30 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
              Step 1 of 2
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">
              Pre-flight Check: Tell Us About Your Crew
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Help us understand your context so we can recommend the right journeys and destinations for your team.
            </p>
          </div>

          <div className="space-y-5 mb-8">
            {/* Role Selection - Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">
                <Users className="w-4 h-4" />
                Your Role
              </label>
              <DropdownSelect
                value={formData.role}
                onChange={(value) => handleInputChange('role', value)}
                options={['CMO', 'Head of Marketing', 'Marketing Operations', 'Demand Gen / Campaigns', 'Brand / Product Marketing', 'Other']}
                placeholder="Select Role..."
              />
            </div>

            {/* Industry Selection - Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">
                <Building2 className="w-4 h-4" />
                Industry
              </label>
              <DropdownSelect
                value={formData.industry}
                onChange={(value) => handleInputChange('industry', value)}
                options={['SaaS / Technology', 'Healthcare', 'Financial Services', 'Manufacturing', 'E-commerce / Retail', 'Professional Services', 'Other']}
                placeholder="Select Industry..."
              />
            </div>

            {/* Company Revenue - Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">
                <DollarSign className="w-4 h-4" />
                Company Revenue
              </label>
              <DropdownSelect
                value={formData.companySize}
                onChange={(value) => handleInputChange('companySize', value)}
                options={['<$10M', '$10M - $50M', '$50M - $250M', '$250M - $1B', '>$1B']}
                placeholder="Select Company Revenue..."
              />
            </div>

            {/* Marketing Team Size - Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">
                <Users className="w-4 h-4" />
                Marketing Team Size
              </label>
              <DropdownSelect
                value={formData.teamSize}
                onChange={(value) => handleInputChange('teamSize', value)}
                options={['1-5 people', '6-15 people', '16-30 people', '31-50 people', '50+ people']}
                placeholder="Select Team Size..."
              />
            </div>
          </div>

          {/* Goals Selection - Compact Checkboxes */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">
              <Target className="w-4 h-4" />
              Your Goals (select all that apply)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Improve marketing performance',
                'Understand current capabilities',
                'Build business case for investment',
                'Evaluate technology gaps',
                'Plan team expansion',
                'Benchmark against peers'
              ].map(goal => (
                <label
                  key={goal}
                  className="flex items-start gap-3 px-4 py-2.5 bg-slate-800/30 border border-slate-700 hover:border-cyan-600/50 rounded-lg cursor-pointer transition-all group"
                >
                  <input
                    type="checkbox"
                    checked={formData.goals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                    className="mt-0.5 w-4 h-4 rounded border-2 border-slate-600 bg-slate-700 text-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-blue-200 group-hover:text-white transition-colors">
                    {goal}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4 border-t border-blue-900/30">
            <button
              onClick={handleBeginFlight}
              disabled={!formData.role || !formData.industry || !formData.companySize || !formData.teamSize}
              className={`px-10 py-4 rounded-lg font-bold text-lg flex items-center gap-3 mx-auto transition-all shadow-lg ${
                formData.role && formData.industry && formData.companySize && formData.teamSize
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white hover:shadow-cyan-500/50'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Plane className="w-5 h-5" />
              Proceed to Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
            {(!formData.role || !formData.industry || !formData.companySize || !formData.teamSize) && (
              <p className="text-sm text-orange-400 mt-3">
                Please complete all required fields to continue
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Popular Journeys Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-sm font-medium mb-4">
            Explore Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Popular Flight Paths</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            See the most common transformation journeys marketing teams are taking right now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularJourneys.map((journey, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border-2 border-blue-900/30 hover:border-cyan-500/50 rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group"
            >
              <div className="text-5xl mb-4">{journey.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {journey.title}
              </h3>
              <p className="text-blue-300 mb-4 leading-relaxed">
                {journey.description}
              </p>
              <div className="space-y-3 pt-4 border-t border-blue-900/30">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                  <p className="text-sm text-blue-200">
                    <span className="font-semibold">Best for:</span> {journey.bestFor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <p className="text-sm text-emerald-400 font-semibold">
                    {journey.timeline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-blue-300 mb-4">
            Complete the pre-flight check above to see personalized journey recommendations
          </p>
          <button
            onClick={scrollToPreflight}
            className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-cyan-400 font-semibold rounded-lg border border-cyan-900/30 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Get Personalized Recommendations
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-slate-900/30 border-y border-blue-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Your Flight Plan Works</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              The Marketing Flight Deck guides you through a structured assessment to understand your current state and identify optimal transformation pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                icon: <Users className="w-6 h-6" />,
                title: 'Pre-flight Check',
                description: 'Tell us about your team, industry, and goals',
                color: 'blue'
              },
              {
                step: 2,
                icon: <Target className="w-6 h-6" />,
                title: 'Quick Assessment',
                description: 'Answer 10 strategic questions about your marketing capabilities',
                color: 'cyan'
              },
              {
                step: 3,
                icon: <Map className="w-6 h-6" />,
                title: 'Tech Stack Audit',
                description: 'Map your current tools and identify gaps',
                color: 'blue'
              },
              {
                step: 4,
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Flight Plan',
                description: 'Get personalized journey recommendations with timelines',
                color: 'cyan'
              }
            ].map((item) => (
              <div key={item.step} className="bg-slate-900/50 border-2 border-blue-900/30 rounded-xl p-6 text-center space-y-4">
                <div className={`w-12 h-12 rounded-full bg-${item.color}-600/20 flex items-center justify-center mx-auto text-${item.color}-400`}>
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-cyan-400">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-blue-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">What You'll Discover</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { emoji: '✈️', title: 'Your Current Aircraft', desc: 'Understand your marketing maturity level' },
            { emoji: '🎯', title: 'Capability Gaps', desc: 'Identify weak areas and opportunities' },
            { emoji: '🧰', title: 'Tech Stack Analysis', desc: 'See which tools you need vs. have' },
            { emoji: '🗺️', title: 'Personalized Journeys', desc: 'Tailored transformation roadmaps' },
            { emoji: '⏱️', title: 'Realistic Timelines', desc: 'Know how long each journey will take' },
            { emoji: '📊', title: 'What-If Scenarios', desc: 'Model impact of budget and headcount changes' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-blue-900/30 hover:border-cyan-500/50 rounded-xl p-6 transition-all hover:shadow-lg">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-blue-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-2 border-cyan-500/30 rounded-2xl p-12 space-y-6">
          <h2 className="text-4xl font-bold text-white">Ready to Take Flight?</h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Complete your pre-flight check and start your marketing transformation journey today.
          </p>
          <button
            onClick={scrollToPreflight}
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-lg rounded-lg inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            <Plane className="w-5 h-5" />
            Start Pre-flight Check
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/30 bg-slate-900/30 py-8 text-center text-blue-400 text-sm">
        <p>✈️ Flight Deck - Chart your strategic marketing destination</p>
      </footer>
    </div>
  );
};

export default HomePage;
