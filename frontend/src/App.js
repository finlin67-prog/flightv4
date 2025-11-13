import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProfileProvider } from './context/UserProfileContext';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import DeepDivePage from './pages/DeepDivePage';
import TechStackPage from './pages/TechStackPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import ScenarioPage from './pages/ScenarioPage';
import OperationsCenterPage from './pages/OperationsCenterPage';
import './App.css';

function App() {
  return (
    <UserProfileProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/deep-dive" element={<DeepDivePage />} />
            <Route path="/tech-stack" element={<TechStackPage />} />
            <Route path="/results/:assessmentId" element={<ResultsPage />} />
            <Route path="/scenario/:assessmentId" element={<ScenarioPage />} />
            <Route path="/operations-center/:assessmentId" element={<OperationsCenterPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProfileProvider>
  );
}

export default App;
