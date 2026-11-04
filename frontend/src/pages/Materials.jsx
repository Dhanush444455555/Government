import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Download, Eye, FileText, Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Materials() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [readingDoc, setReadingDoc] = useState(null);

  const materials = [
    {
      id: 1,
      title: "Indian Polity: Constitutional Articles & Amendments Compendium",
      exam: "UPSC & State PSC",
      subject: "Polity",
      pages: "42 pages",
      type: "PDF Summary",
      author: "Senior Faculty, GovGuide AI"
    },
    {
      id: 2,
      title: "Modern Indian History: Freedom Movement Chronological Atlas",
      exam: "UPSC / SSC / Railways",
      subject: "History",
      pages: "65 pages",
      type: "Comprehensive Notes",
      author: "GovGuide Editorial Team"
    },
    {
      id: 3,
      title: "Quantitative Aptitude: 100 Speed Calculation Shortcuts",
      exam: "Banking & SSC CGL",
      subject: "Aptitude",
      pages: "28 pages",
      type: "Formula Booklet",
      author: "Quantitative Expert"
    },
    {
      id: 4,
      title: "Macroeconomics & Union Budget High-Yield Factsheet",
      exam: "UPSC CSE & RBI Grade B",
      subject: "Economics",
      pages: "36 pages",
      type: "Budget Factsheet",
      author: "Economic Analyst"
    },
    {
      id: 5,
      title: "General Science & Environment: NCERT Compilation (Class 9-10)",
      exam: "Railways RRB & State Exams",
      subject: "Science",
      pages: "54 pages",
      type: "NCERT Summary",
      author: "Science Research Cell"
    },
    {
      id: 6,
      title: "Banking Awareness: RBI Monetary Policy Tools & Banking Laws",
      exam: "SBI PO / IBPS PO",
      subject: "Banking",
      pages: "30 pages",
      type: "Quick Revision",
      author: "Banking Academy"
    }
  ];

  const filtered = materials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "all" || m.subject.toLowerCase() === selectedSubject.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/guidance')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Guidance Center
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4" />
            Verified Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight">
            Smart Study Materials Repository
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Download summaries, formula sheets, NCERT compilations, and previous decade question bank solutions.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, NCERTs, topics..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm shadow-md"
          />
        </div>

        {/* Subject Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {["all", "Polity", "History", "Economics", "Aptitude", "Science", "Banking"].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                selectedSubject.toLowerCase() === sub.toLowerCase()
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((mat) => (
            <div
              key={mat.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                    {mat.subject}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{mat.pages}</span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-400 mb-6">Target: {mat.exam}</p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setReadingDoc(mat)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" /> Read Online
                </button>
                <button
                  onClick={() => alert(`Downloading verified PDF: ${mat.title}`)}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reading Modal */}
        {readingDoc && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">{readingDoc.title}</h3>
                </div>
                <button
                  onClick={() => setReadingDoc(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-300 space-y-4 max-h-[60vh] overflow-y-auto">
                <p className="font-bold text-cyan-300">
                  GovGuide AI Verified Document Summary:
                </p>
                <p>
                  This official material contains structured revision pointers for <strong>{readingDoc.subject}</strong>, compiled by our subject experts.
                </p>
                <p className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  💡 <strong>Study Strategy:</strong> Review the core tables first. Memorize the constitutional article index / numerical formulas before attempting mock quizzes.
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setReadingDoc(null)}
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

