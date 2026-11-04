import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  Cpu,
  Database,
  Layers,
  BrainCircuit,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Terminal
} from 'lucide-react';

export default function CoreCS() {
  const [domains, setDomains] = useState([
    "Data Structures & Algorithms",
    "DBMS",
    "Operating Systems",
    "Machine Learning"
  ]);
  const [activeDomain, setActiveDomain] = useState("DBMS");
  const [concepts, setConcepts] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConcepts(activeDomain);
  }, [activeDomain]);

  const fetchConcepts = async (domain) => {
    setLoading(true);
    try {
      const res = await api.get('/core-cs/concepts', { params: { domain } });
      setConcepts(res.data);
      if (res.data.length > 0) {
        setSelectedConcept(res.data[0]);
      } else {
        setSelectedConcept(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getDomainIcon = (d) => {
    if (d.includes('Data')) return Terminal;
    if (d.includes('DBMS')) return Database;
    if (d.includes('Operating')) return Cpu;
    return BrainCircuit;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Uploaded Image Spec Banner */}
      <div className="mb-8 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/40 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" /> Specified Concept Requirements (From Uploaded Image)
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Concepts: Data Structures & Algorithms, DBMS, Operating Systems, Machine Learning
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          The four foundational pillars of Computer Science engineering and technical civil services recruitment. Master high-frequency interview queries, theoretical proofs, and practical systems knowledge.
        </p>
      </div>

      {/* 4 Domain Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {domains.map((d) => {
          const Icon = getDomainIcon(d);
          const isActive = activeDomain === d;
          return (
            <button
              key={d}
              onClick={() => setActiveDomain(d)}
              className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                isActive
                  ? 'bg-blue-600/20 border-cyan-400 text-white shadow-lg shadow-cyan-950/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold leading-tight">{d}</span>
                <span className="text-[10px] text-slate-500 font-mono">Core Module</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Layout: Concept Cards on Left (4 cols), Full Deep-Dive on Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Concept Topics */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            {activeDomain} Topics ({concepts.length})
          </h2>

          {loading ? (
            <div className="text-xs text-slate-500 py-10 text-center">Loading concepts...</div>
          ) : concepts.length === 0 ? (
            <div className="text-xs text-slate-500 py-10 text-center bg-slate-900/40 rounded-xl border border-slate-800">
              No topics in this domain yet.
            </div>
          ) : (
            concepts.map((c) => {
              const isSelected = selectedConcept?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedConcept(c)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-blue-950/50 border-cyan-400/60 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{c.topic}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold whitespace-nowrap">
                      {c.interview_frequency}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5">{c.summary}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8">
          {selectedConcept ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="border-b border-slate-800 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    {selectedConcept.domain}
                  </span>
                  <span className="text-xs font-mono text-slate-500">•</span>
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    Interview Frequency: {selectedConcept.interview_frequency}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white">{selectedConcept.topic}</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {selectedConcept.summary}
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                  Technical Architecture & In-Depth Concepts
                </h4>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                  {selectedConcept.detailed_explanation}
                </div>
              </div>

              {/* Key Takeaways */}
              {selectedConcept.key_takeaways && (
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/50">
                  <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Key Architectural Takeaways
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedConcept.key_takeaways}
                  </p>
                </div>
              )}

              {/* Sample Interview Questions */}
              {selectedConcept.sample_questions && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> High-Probability Interview Question
                  </h4>
                  <p className="text-xs text-slate-300 italic">
                    "{selectedConcept.sample_questions}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-slate-900/40 rounded-2xl border border-slate-800 text-xs text-slate-500">
              Select a concept from the left panel.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
