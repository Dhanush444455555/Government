import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Exams from './pages/Exams';
import MockTests from './pages/MockTests';
import Jobs from './pages/Jobs';
import DsaPractice from './pages/DsaPractice';
import CoreCS from './pages/CoreCS';
import InterviewPrep from './pages/InterviewPrep';
import MLAnalytics from './pages/MLAnalytics';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UPSCRoadmap from './pages/UPSCRoadmap';
import GovResources from './pages/GovResources';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/upsc" element={<UPSCRoadmap />} />
              <Route path="/resources" element={<GovResources />} />
              <Route path="/tests" element={<MockTests />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/dsa" element={<DsaPractice />} />
              <Route path="/core-cs" element={<CoreCS />} />
              <Route path="/interview" element={<InterviewPrep />} />
              <Route path="/ml-predict" element={<MLAnalytics />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
