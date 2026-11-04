import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  Cpu,
  Layers,
  ChevronRight,
  Filter,
  Flame,
  Zap,
  Info
} from 'lucide-react';

export default function DsaPractice() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
    fetchProblems('All');
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await api.get('/dsa/topics');
      setTopics(['All', ...res.data]);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProblems = async (topic) => {
    setLoading(true);
    try {
      const params = topic === 'All' ? {} : { topic };
      const res = await api.get('/dsa/problems', { params });
      setProblems(res.data);
      if (res.data.length > 0) {
        setSelectedProblem(res.data[0]);
      } else {
        setSelectedProblem(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (top) => {
    setSelectedTopic(top);
    fetchProblems(top);
  };

  const copyCode = () => {
    if (!selectedProblem) return;
    navigator.clipboard.writeText(selectedProblem.cpp_solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-1">
          <Terminal className="w-4 h-4" /> C++ Placement Mastery
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Code2 className="w-8 h-8 text-cyan-400" />
          Data Structures & Algorithms (All 14 Core Topics)
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Handcrafted canonical problems, algorithmic patterns, and production-grade C++20 solutions for top technical interviews.
        </p>
      </div>

      {/* 14 Topics Horizontal Scroller */}
      <div className="mb-8">
        <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Select DSA Topic:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => handleTopicChange(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTopic === t
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Problem List (4 cols) & C++ Code Workspace (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Problem List */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Problems ({problems.length})
          </h2>
          {loading ? (
            <div className="text-xs text-slate-500 py-10 text-center">Loading problems...</div>
          ) : problems.length === 0 ? (
            <div className="text-xs text-slate-500 py-10 text-center bg-slate-900/40 rounded-xl border border-slate-800">
              No problems found for this category.
            </div>
          ) : (
            problems.map((p) => {
              const isSelected = selectedProblem?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProblem(p)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/60 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-semibold">
                        {p.topic}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1.5">{p.title}</h3>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      p.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400' :
                      p.difficulty === 'Medium' ? 'bg-amber-950 text-amber-400' :
                      'bg-rose-950 text-rose-400'
                    }`}>
                      {p.difficulty}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Time: <strong className="text-cyan-400">{p.time_complexity}</strong></span>
                    <span>Space: <strong className="text-amber-400">{p.space_complexity}</strong></span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right C++ Code Pane */}
        <div className="lg:col-span-8">
          {selectedProblem ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Problem Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-950/50">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                    {selectedProblem.topic}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-400 font-semibold">
                      Time: {selectedProblem.time_complexity}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-amber-400 font-semibold">
                      Space: {selectedProblem.space_complexity}
                    </span>
                  </div>
                </div>
                <h2 className="text-xl font-black text-white">{selectedProblem.title}</h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedProblem.description}</p>

                {selectedProblem.examples && (
                  <div className="mt-3 p-3 rounded-lg bg-black/40 border border-slate-800/80 text-xs font-mono text-slate-300">
                    <strong className="text-cyan-400 block mb-1">Example:</strong>
                    {selectedProblem.examples}
                  </div>
                )}
              </div>

              {/* Code Toolbar */}
              <div className="bg-[#0b101c] px-6 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>solution.cpp (C++20 Idiomatic Standard)</span>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Code Block */}
              <div className="p-6 bg-[#070b14] overflow-x-auto">
                <pre className="font-mono text-xs text-emerald-400 leading-relaxed">
                  <code>{selectedProblem.cpp_solution}</code>
                </pre>
              </div>

              {/* Algorithmic Explanation */}
              {selectedProblem.explanation && (
                <div className="p-6 bg-slate-950/70 border-t border-slate-800">
                  <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" /> Algorithmic Approach & Proof
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedProblem.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-slate-900/40 rounded-2xl border border-slate-800 text-xs text-slate-500">
              Select a DSA problem to inspect the C++ solution.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
