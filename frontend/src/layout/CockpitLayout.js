import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CockpitNavigation from '../components/CockpitNavigation';
import FlightInstrumentsPanel from '../components/FlightInstrumentsPanel';

const CockpitLayout = ({ children, hideInstruments = false }) => {
  // Check screen size and localStorage for initial state
  const getInitialState = () => {
    // Check if user has a saved preference
    const saved = localStorage.getItem('cockpitInstrumentsPanelExpanded');
    if (saved !== null) {
      return saved === 'true';
    }
    // Default: collapsed on small screens, expanded on desktop
    return window.innerWidth >= 1280; // xl breakpoint
  };

  const [isPanelExpanded, setIsPanelExpanded] = useState(getInitialState);

  // Save preference to localStorage
  useEffect(() => {
    localStorage.setItem('cockpitInstrumentsPanelExpanded', isPanelExpanded.toString());
  }, [isPanelExpanded]);

  const togglePanel = () => {
    setIsPanelExpanded(!isPanelExpanded);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <CockpitNavigation />

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isPanelExpanded && !hideInstruments ? 'mr-0' : 'mr-0'
      }`}>
        {children}
      </main>

      {/* Right Sidebar - Flight Instruments with Toggle */}
      {!hideInstruments && (
        <div className="relative">
          {/* Toggle Button */}
          <button
            onClick={togglePanel}
            className={`absolute top-4 z-10 transition-all duration-300 ${
              isPanelExpanded 
                ? '-left-10 bg-cyan-600/20 hover:bg-cyan-600/30' 
                : '-left-10 bg-slate-800/80 hover:bg-slate-800'
            } border border-blue-900/30 hover:border-cyan-500/50 rounded-l-lg px-2 py-3 text-cyan-400 hover:text-cyan-300 shadow-lg backdrop-blur-sm`}
            title={isPanelExpanded ? 'Collapse Instruments Panel' : 'Expand Instruments Panel'}
          >
            {isPanelExpanded ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          {/* Flight Instruments Panel */}
          <div className={`transition-all duration-300 ease-in-out ${
            isPanelExpanded 
              ? 'w-80 opacity-100' 
              : 'w-0 opacity-0 overflow-hidden'
          }`}>
            {isPanelExpanded && <FlightInstrumentsPanel />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CockpitLayout;
