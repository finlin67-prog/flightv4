import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Map, TrendingUp, CheckCircle, Plane } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm bg-slate-950/80 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <Plane className="w-6 h-6" />
            Flight Deck
          </h1>
          <Link to="/assessment">
            <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all">
              Start Assessment
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20 space-y-8">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
            Strategic Marketing Transformation
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Chart Your Marketing <span className="text-cyan-400">Flight Path</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Discover your current marketing capabilities, audit your technology stack, and receive personalized
            transformation recommendations to reach your strategic destination.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/assessment">
            <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/50">
              <Plane className="w-5 h-5" />
              Begin Your Flight
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <a href="#how-it-works">
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-blue-200 font-semibold text-lg rounded-lg border border-blue-900/30 transition-all">
              Learn How It Works
            </button>
          </a>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-slate-900/30 py-16 border-t border-b border-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto">
                <BarChart3 className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Assess Your Maturity</h3>
              <p className="text-sm text-blue-300">
                Answer 10 strategic questions to evaluate your marketing capabilities across strategy, operations, and execution.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-600/20 flex items-center justify-center mx-auto">
                <Map className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Inventory Your Stack</h3>
              <p className="text-sm text-blue-300">
                Select from 30+ marketing tools across 6 categories to show your current technology investments.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto">
                <TrendingUp className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Get Recommendations</h3>
              <p className="text-sm text-blue-300">
                Receive personalized transformation journeys with gap analysis, timelines, and implementation roadmaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 md:px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How Your Flight Plan Works</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            The Marketing Flight Deck guides you through a structured assessment to understand your current state and identify optimal transformation pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Step 1 */}
          <div className="bg-slate-900/50 border-l-4 border-l-blue-500 rounded-lg p-8 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex-shrink-0 font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Marketing Assessment</h3>
                <p className="text-sm text-blue-200 mb-3">
                  Answer 10 strategic questions about your marketing strategy, operations, technology, and team capabilities.
                </p>
                <div className="p-3 bg-blue-600/10 rounded border border-blue-500/20 text-xs text-blue-300">
                  Each question is scored from 0-100 to build your marketing maturity profile.
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/50 border-l-4 border-l-cyan-500 rounded-lg p-8 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-600/20 text-cyan-400 flex-shrink-0 font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Tech Stack Inventory</h3>
                <p className="text-sm text-blue-200 mb-3">
                  Select the marketing tools your team currently uses across CRM, automation, analytics, and more.
                </p>
                <div className="p-3 bg-cyan-600/10 rounded border border-cyan-500/20 text-xs text-cyan-300">
                  Enterprise tools score higher than basic tools, reflecting sophistication.
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/50 border-l-4 border-l-blue-500 rounded-lg p-8 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex-shrink-0 font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Results Dashboard</h3>
                <p className="text-sm text-blue-200 mb-3">
                  View your combined readiness score, plane level, capability gaps, and key insights.
                </p>
                <div className="p-3 bg-blue-600/10 rounded border border-blue-500/20 text-xs text-blue-300">
                  Your readiness score combines assessment quality and tech maturity.
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900/50 border-l-4 border-l-cyan-500 rounded-lg p-8 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-600/20 text-cyan-400 flex-shrink-0 font-bold text-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Journey Recommendations</h3>
                <p className="text-sm text-blue-200 mb-3">
                  Get transformation journeys tailored to your weak areas with timelines and tool requirements.
                </p>
                <div className="p-3 bg-cyan-600/10 rounded border border-cyan-500/20 text-xs text-cyan-300">
                  Gap analysis shows which tools you need to add for each journey.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plane Levels */}
      <section className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 py-16 border-y border-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">The Plane Metaphor</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Your marketing readiness is visualized as a plane that evolves with your scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "🛩️", name: "Single Engine", description: "Basic marketing foundation with essential capabilities" },
              { emoji: "🛫", name: "Commercial Jet", description: "Advanced marketing maturity with sophisticated tools" },
              { emoji: "🛫", name: "Airbus 380", description: "Enterprise-grade capabilities for complex campaigns" }
            ].map((plane, idx) => (
              <div key={idx} className="bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg p-8 text-center space-y-4">
                <p className="text-6xl">{plane.emoji}</p>
                <h3 className="text-2xl font-bold text-cyan-400">{plane.name}</h3>
                <p className="text-sm text-blue-300">{plane.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-16">What You'll Discover</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Marketing Maturity Assessment", desc: "Understand capabilities across 10 key dimensions" },
            { title: "Tech Stack Analysis", desc: "Identify gaps in your marketing platform architecture" },
            { title: "Personalized Roadmap", desc: "Tailored transformation journeys with timelines" },
            { title: "Gap Analysis", desc: "Know which tools and capabilities you're missing" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-blue-900/30 hover:border-blue-500/50 rounded-lg p-8 space-y-4 transition-all">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-blue-300">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-2 border-cyan-500/30 rounded-xl p-12 space-y-6">
          <h2 className="text-4xl font-bold text-white">Ready to Take Flight?</h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Start your marketing assessment now and get personalized transformation recommendations.
          </p>
          <Link to="/assessment">
            <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg rounded-lg inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/50">
              <Plane className="w-5 h-5" />
              Begin Your Flight
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/30 bg-slate-900/30 py-8 text-center text-blue-400 text-sm">
        <p>Flight Deck - Chart your strategic marketing destination</p>
      </footer>
    </div>
  );
};

export default HomePage;
