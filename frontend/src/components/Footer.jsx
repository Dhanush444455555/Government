import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, MessageSquare, Mail, BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070b14] text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                GovGuide AI
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering aspirants with AI-driven guidance for government exams (UPSC, SSC, Banking, Railways) and employment opportunities.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">Courses</Link></li>
              <li><Link to="/guidance" className="hover:text-blue-400 transition-colors">AI Guidance</Link></li>
              <li><Link to="/employment" className="hover:text-blue-400 transition-colors">Employment</Link></li>
              <li><Link to="/prediction" className="hover:text-blue-400 transition-colors">Predictor</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses/upsc" className="hover:text-blue-400 transition-colors">UPSC Civil Services</Link></li>
              <li><Link to="/courses/ssc" className="hover:text-blue-400 transition-colors">SSC CGL / CHSL</Link></li>
              <li><Link to="/guidance/materials" className="hover:text-blue-400 transition-colors">Study Materials</Link></li>
              <li><Link to="/guidance/tests" className="hover:text-blue-400 transition-colors">Live Mock Tests</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:text-blue-400 hover:bg-slate-700 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:text-blue-400 hover:bg-slate-700 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:text-blue-400 hover:bg-slate-700 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:text-blue-400 hover:bg-slate-700 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-400">
              ExamGuru AI • Full-Stack React + Python FastAPI + MySQL
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} GovGuide AI. All rights reserved.</p>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            Crafted for Government Exam Aspirants
          </p>
        </div>
      </div>
    </footer>
  );
}
