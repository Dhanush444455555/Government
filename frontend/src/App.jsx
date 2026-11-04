import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Guidance from './pages/Guidance';
import Mentor from './pages/Mentor';
import Recommender from './pages/Recommender';
import Materials from './pages/Materials';
import Tests from './pages/Tests';
import Community from './pages/Community';
import Employment from './pages/Employment';
import PartTimeJobs from './pages/PartTimeJobs';
import Prediction from './pages/Prediction';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white relative">
          <div>
            <Navbar />
            <main>
              <Routes>
                {/* Core Navigation Matching ExamGuru AI / GovGuide AI */}
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/guidance" element={<Guidance />} />
                <Route path="/guidance/mentor" element={<Mentor />} />
                <Route path="/guidance/recommender" element={<Recommender />} />
                <Route path="/guidance/materials" element={<Materials />} />
                <Route path="/guidance/tests" element={<Tests />} />
                <Route path="/guidance/community" element={<Community />} />
                <Route path="/employment" element={<Employment />} />
                <Route path="/employment/part-time" element={<PartTimeJobs />} />
                <Route path="/jobs" element={<Employment />} />
                <Route path="/prediction" element={<Prediction />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />

                {/* Legacy redirects */}
                <Route path="/tests" element={<Navigate to="/guidance/tests" replace />} />
                <Route path="/resources" element={<Navigate to="/guidance/materials" replace />} />
                <Route path="/ml-predict" element={<Navigate to="/prediction" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>

          <Footer />

          {/* Floating AI Exam Guidance & Career Chatbot */}
          <Chatbot />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
