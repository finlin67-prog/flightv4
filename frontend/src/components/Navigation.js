import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Plane, Wrench, TrendingUp, Map, Settings, Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [latestAssessmentId, setLatestAssessmentId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('latestAssessmentId');
    if (storedId) {
      setLatestAssessmentId(storedId);
    }
  }, [location]);

  const isActive = (path) => {
    if (path === '/home') return location.pathname === '/home';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      path: '/home',
      label: 'Control Tower',
      icon: Home,
      emoji: '🏠',
      alwaysShow: true
    },
    {
      path: '/assessment',
      label: 'Assessments',
      icon: Plane,
      emoji: '✈️',
      alwaysShow: true
    },
    {
      path: '/tech-stack',
      label: 'Tech Stack',
      icon: Wrench,
      emoji: '🔧',
      alwaysShow: true
    },
    {
      path: latestAssessmentId ? `/results/${latestAssessmentId}` : '/history',
      label: 'Flight Status',
      icon: TrendingUp,
      emoji: '📊',
      alwaysShow: false
    },
    {
      path: latestAssessmentId ? `/flight-deck/${latestAssessmentId}` : '/history',
      label: 'Flight Deck',
      icon: Map,
      emoji: '🗺️',
      alwaysShow: false
    },
    {
      path: latestAssessmentId ? `/scenario-simulator/${latestAssessmentId}` : '/history',
      label: 'Simulator',
      icon: Settings,
      emoji: '🎛️',
      alwaysShow: false
    }
  ];

  // Don't show nav on welcome page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-slate-900/95 border-b border-blue-900/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link to="/home" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
              <span className="text-2xl">✈️</span>
              <span className="text-xl font-bold">Flight Deck</span>
            </Link>

            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                if (!item.alwaysShow && !latestAssessmentId) return null;
                
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      active
                        ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-blue-300 hover:bg-blue-900/30 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-slate-900/95 border-b border-blue-900/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 text-white">
            <span className="text-2xl">✈️</span>
            <span className="text-lg font-bold">Flight Deck</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-blue-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-slate-900/98 border-b border-blue-900/30 backdrop-blur-sm">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                if (!item.alwaysShow && !latestAssessmentId) return null;
                
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-blue-300 hover:bg-blue-900/30 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
