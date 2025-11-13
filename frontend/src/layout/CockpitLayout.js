import React from 'react';
import CockpitNavigation from '../components/CockpitNavigation';
import FlightInstrumentsPanel from '../components/FlightInstrumentsPanel';

const CockpitLayout = ({ children, hideInstruments = false }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <CockpitNavigation />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Right Sidebar - Flight Instruments */}
      {!hideInstruments && <FlightInstrumentsPanel />}
    </div>
  );
};

export default CockpitLayout;
