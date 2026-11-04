import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  UserCheck,
  Building2,
  FileCheck2,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('technical');
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [resumeGuide, setResumeGuide] = useState(null);
  const [expandedQ, setExpandedQ] = useState(null);

  useEffect(() => {
    fetchQuestions();
    fetchCompanies();
    fetchResumeGuide();
  }, [activeTab]);

  const fetchQuestions = async () => {
    try {
      const categoryMap = {
        technical: 'Technical',
        hr: 'HR',
        company: 'Company-wise',
        project: 'Project'
      };
      const cat = categoryMap[activeTab] || 'Technical';
      const res = await api.get('/interview/questions', { params: { category: cat } });
      setQuestions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/interview/company-list');
      setCompanies(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchResumeGuide = async () => {
    try {
      const res = await api.get('/interview/resume-guide');
      setResumeGuide(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleExpand = (id) => {
    setExpandedQ(expandedQ === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <UserCheck className="w-8 h-8 text-cyan-400" />
          Placement & Interview Preparation Masterclass
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Technical, HR, company recruitment rounds (NIC, DRDO, TCS, Infosys), project explanations, and ATS resume engineering.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-800">
        {[
          { key: 'technical', label: 'Technical Questions' },
          { key: 'hr', label: 'HR & Behavioral' },
          { key: 'company', label: 'Company-Wise Rounds' },
          { key: 'project', label: 'Project Explanation (STAR)' },
          { key: 'resume', label: 'Resume Engineering' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on tab */}
      {activeTab === 'resume' ? (
        /* Resume Guide */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <FileText className="w-7 h-7 text-cyan-400" />
            <div>
              <h2 className="text-xl font-black text-white">{resumeGuide?.title}</h2>
              <p className="text-xs text-slate-400">Strict ATS optimization rules for government & high-tech placement screenings.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeGuide?.sections?.map((sec, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">{sec.section}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{sec.rules}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
              Recommended High-Impact Action Verbs:
            </h4>
            <div className="flex flex-wrap gap-2">
              {resumeGuide?.action_verbs?.map((v, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-mono">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'company' ? (
        /* Company-wise hiring patterns */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map((c, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" /> {c.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-semibold">
                    {c.type}
                  </span>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                  <strong className="text-slate-200 block mb-1">Recruitment Rounds:</strong>
                  {c.rounds}
                </div>
              </div>
            ))}
          </div>

          {/* Company-Specific Questions */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono">
              Sample Company Technical Questions
            </h3>
            {questions.map((q) => (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold">
                    {q.company || 'Company'} • {q.sub_category}
                  </span>
                  <span className="text-xs font-mono text-amber-400">{q.difficulty}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{q.question}</h4>
                <div className="mt-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  <strong className="text-cyan-400 block mb-1">Answer / Model Solution:</strong>
                  {q.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'project' ? (
        /* STAR Project Explanation Guide */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-black text-white">How to Defend Your Projects in Technical Interviews (STAR Method)</h2>
            <p className="text-xs text-slate-400 mt-1">Structure your project explanation to demonstrate architectural thinking and measurable impact.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">1. Situation</span>
              <p className="text-xs text-slate-300">"Government exam aspirants lacked a single verified portal integrating syllabus tracking with C++ DSA placement training and ML performance modeling."</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-blue-400 block mb-1">2. Task</span>
              <p className="text-xs text-slate-300">"My objective was to engineer a high-throughput, responsive platform using React.js, FastAPI, MySQL, and Scikit-learn without external agent bloat."</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">3. Action</span>
              <p className="text-xs text-slate-300">"I designed a normalized MySQL relational schema, implemented JWT authentication, created 14 DSA solutions in C++, and trained Ridge Regression and Random Forest models."</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-purple-400 block mb-1">4. Result</span>
              <p className="text-xs text-slate-300">"Sub-50ms API response latency, complete test coverage, and accurate student performance predictions verified by real-time test evaluations."</p>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Questions Accordion */
        <div className="space-y-4">
          {questions.map((q) => {
            const isExpanded = expandedQ === q.id;
            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-md"
              >
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-5 cursor-pointer flex items-center justify-between gap-4 hover:bg-slate-800/40"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold uppercase">
                        {q.sub_category || q.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">•</span>
                      <span className="text-xs font-mono text-amber-400">{q.difficulty}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{q.question}</h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </div>

                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-slate-800/80 bg-slate-950/60 space-y-3">
                    <div className="text-xs text-slate-300 leading-relaxed pt-4 whitespace-pre-line">
                      <strong className="text-cyan-400 block mb-1">Model Answer:</strong>
                      {q.answer}
                    </div>
                    {q.tips && (
                      <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-200">Interview Tip:</strong> {q.tips}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
