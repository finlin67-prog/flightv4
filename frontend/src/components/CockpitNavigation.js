import React from 'react';
import { NavLink } from 'react-router-dom';
import { Plane } from 'lucide-react';

const CockpitNavigation = () => {
  const navItems = [
    { path: '/home', label: 'Control Tower', emoji: '🏠', description: 'Home' },
    { path: '/assessment', label: 'Quick Scan', emoji: '📋', description: 'Assessment' },
    { path: '/deep-dive', label: 'Deep Dives', emoji: '🔍', description: 'Detailed Topics' },
    { path: '/tech-stack', label: 'Tech Hangar', emoji: '🧰', description: 'Your Stack' },
    { path: '/results', label: 'Flight Status', emoji: '📊', description: 'Results' },
    { path: '/flight-deck', label: 'Flight Deck', emoji: '🗺️', description: 'Journeys' },
    { path: '/scenario-simulator', label: 'Simulator', emoji: '🎛️', description: 'What-If' },
    { path: '/history', label: 'Flight Log', emoji: '📜', description: 'History' },
    { path: '/story/company-a', label: 'Company A', emoji: '📖', description: 'Example' },
  ];

  const getNavPath = (path) => {
    const assessmentId = localStorage.getItem('latestAssessmentId');
    if ((path === '/results' || path === '/flight-deck' || path === '/scenario-simulator') && assessmentId) {
      return `${path}/${assessmentId}`;
    }
    return path;
  };

  return (
    <aside className="w-64 bg-slate-900/50 border-r border-blue-900/30 flex flex-col overflow-y-auto">
      {/* Logo/Header */}
      <div className="p-6 border-b border-blue-900/30">
        <div className="flex items-center gap-3">
          <Plane className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Flight Deck</h1>
            <p className="text-xs text-blue-400">Marketing Cockpit</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={getNavPath(item.path)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive
                  ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-300'
                  : 'text-blue-200 hover:bg-slate-800/50 hover:text-cyan-400'
              }`
            }
          >
            <span className="text-xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{item.label}</div>
              <div className="text-xs opacity-70 truncate">{item.description}</div>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-900/30">
        <div className="text-xs text-blue-400 text-center">
          ✈️ Ready for Takeoff
        </div>
      </div>
    </aside>
  );
};

export default CockpitNavigation;
