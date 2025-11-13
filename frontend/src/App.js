import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProfileProvider } from './context/UserProfileContext';
import { AssessmentProvider } from './context/AssessmentContext';
import { FlightStatusProvider } from './context/FlightStatusContext';
import Navigation from './components/Navigation';
import CockpitLayout from './layout/CockpitLayout';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import DeepDivePage from './pages/DeepDivePage';
import TechStackPage from './pages/TechStackPage';
import ResultsPage from './pages/ResultsPage';
import FlightDeckPage from './pages/FlightDeckPage';
import ScenarioSimulatorPage from './pages/ScenarioSimulatorPage';
import CompanyAStoryPage from './pages/CompanyAStoryPage';
import HistoryPage from './pages/HistoryPage';
import ScenarioPage from './pages/ScenarioPage';
import OperationsCenterPage from './pages/OperationsCenterPage';
import './App.css';

function App() {
  return (
    <UserProfileProvider>
      <AssessmentProvider>
        <FlightStatusProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* Public Marketing Home Page - Pre-flight Check Landing */}
              <Route path="/" element={
                <>
                  <Navigation />
                  <HomePage />
                </>
              } />

              {/* Redirect old /home route to new root */}
              <Route path="/home" element={<Navigate to="/" replace />} />

              {/* In-App Pages - With Cockpit Layout */}
              <Route path="/assessment" element={
                <CockpitLayout>
                  <AssessmentPage />
                </CockpitLayout>
              } />
              <Route path="/deep-dive" element={
                <CockpitLayout>
                  <DeepDivePage />
                </CockpitLayout>
              } />
              <Route path="/tech-stack" element={
                <CockpitLayout>
                  <TechStackPage />
                </CockpitLayout>
              } />
              <Route path="/results/:assessmentId" element={
                <CockpitLayout>
                  <ResultsPage />
                </CockpitLayout>
              } />
              <Route path="/flight-deck/:assessmentId" element={
                <CockpitLayout>
                  <FlightDeckPage />
                </CockpitLayout>
              } />
              <Route path="/scenario-simulator/:assessmentId" element={
                <CockpitLayout>
                  <ScenarioSimulatorPage />
                </CockpitLayout>
              } />
              <Route path="/story/company-a" element={
                <CockpitLayout>
                  <CompanyAStoryPage />
                </CockpitLayout>
              } />
              <Route path="/scenario/:assessmentId" element={
                <CockpitLayout>
                  <ScenarioPage />
                </CockpitLayout>
              } />
              <Route path="/operations-center/:assessmentId" element={
                <CockpitLayout>
                  <OperationsCenterPage />
                </CockpitLayout>
              } />
              <Route path="/history" element={
                <CockpitLayout>
                  <HistoryPage />
                </CockpitLayout>
              } />
            </Routes>
          </div>
        </BrowserRouter>
        </FlightStatusProvider>
      </AssessmentProvider>
    </UserProfileProvider>
  );
}

export default App;
