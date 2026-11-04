import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, GraduationCap, Terminal, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070b14] border-t border-slate-800 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-base">Government-1</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Integrated National Exam Preparation, Placement Training, C++ DSA Mastery, and Scikit-learn Machine Learning Performance Intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full-Stack Verified</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Target Government Exams</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/exams" className="hover:text-cyan-400 transition-colors">UPSC Civil Services (CSE)</Link></li>
              <li><Link to="/exams" className="hover:text-cyan-400 transition-colors">State PSC (UPPSC, MPPSC, KPSC)</Link></li>
              <li><Link to="/exams" className="hover:text-cyan-400 transition-colors">IBPS & SBI Probationary Officer</Link></li>
              <li><Link to="/exams" className="hover:text-cyan-400 transition-colors">SSC CGL, CHSL, CPO</Link></li>
              <li><Link to="/exams" className="hover:text-cyan-400 transition-colors">RRB Railways NTPC & JE</Link></li>
              <li><Link to="/exams" className="hover:text-cyan-400 transition-colors">Defense: NDA & CDS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Placement & Technical Prep</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dsa" className="hover:text-cyan-400 transition-colors">14 DSA Topics with C++ Solutions</Link></li>
              <li><Link to="/core-cs" className="hover:text-cyan-400 transition-colors">DBMS & Normalization (Image Spec)</Link></li>
              <li><Link to="/core-cs" className="hover:text-cyan-400 transition-colors">Operating Systems & Paging</Link></li>
              <li><Link to="/core-cs" className="hover:text-cyan-400 transition-colors">Machine Learning Foundations</Link></li>
              <li><Link to="/interview" className="hover:text-cyan-400 transition-colors">Technical & HR Interview Questions</Link></li>
              <li><Link to="/interview" className="hover:text-cyan-400 transition-colors">Company-Wise Papers (NIC, DRDO, TCS)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Strict Technology Stack</h4>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs space-y-1.5 font-mono">
              <div className="text-cyan-400">Frontend: React.js + Vite + Tailwind</div>
              <div className="text-blue-400">Backend: Python + FastAPI + Pydantic</div>
              <div className="text-amber-400">Database: MySQL + SQLAlchemy ORM</div>
              <div className="text-emerald-400">ML: Scikit-learn + Pandas + NumPy</div>
              <div className="text-purple-400">DSA: C++ 20 Standard</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Government-1 Platform. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0 font-medium">
            <span>MySQL 8.0</span>
            <span>FastAPI 0.110</span>
            <span>React 19</span>
            <span>C++ 20</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
