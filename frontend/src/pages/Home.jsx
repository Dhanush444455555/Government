import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Terminal,
  Database,
  Layers,
  Shield,
  Video,
  Award,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function Home() {
  const highlightFeatures = [
    {
      title: "IAS & IPS (UPSC CSE) Premier Hub",
      desc: "Complete civil service preparation for IAS, IPS, IFS, IRS. Cadre details, 3-stage roadmap (Prelims, Mains, Interview), and official syllabus breakdown.",
      icon: Shield,
      link: "/upsc",
      tag: "Main Focus • IAS/IPS",
      gradient: "from-blue-600/30 to-indigo-600/10",
      border: "border-blue-500/40"
    },
    {
      title: "Free Textbooks & YouTube Playlists",
      desc: "Instant access to NCERT PDFs (Class 6-12), Economic Survey, Union Budget, and curated YouTube playlists from top educators (StudyIQ, Unacademy, Adda247).",
      icon: Video,
      link: "/resources",
      tag: "100% Free Learning",
      gradient: "from-red-600/30 to-rose-600/10",
      border: "border-red-500/40"
    },
    {
      title: "All Government Exams Directory",
      desc: "Full coverage for 30+ exams: UPSC, SSC CGL/CHSL, IBPS/SBI Bank PO, Railways RRB NTPC/Group D, Armed Forces NDA/CDS, and State PSCs (UPPSC, BPSC).",
      icon: BookOpen,
      link: "/exams",
      tag: "All National & State Exams",
      gradient: "from-emerald-600/30 to-teal-600/10",
      border: "border-emerald-500/30"
    },
    {
      title: "14 DSA Topics with C++ Solutions",
      desc: "Arrays, Two Pointers, Sliding Window, DP, Trees/Graphs, Greedy, Backtracking, and Heaps with clean C++20 implementations.",
      icon: Code2,
      link: "/dsa",
      tag: "C++ Primary Language",
      gradient: "from-purple-600/30 to-pink-600/10",
      border: "border-purple-500/30"
    },
    {
      title: "Core CS Concepts (From Uploaded Image)",
      desc: "Deep conceptual coverage of Data Structures & Algorithms, DBMS (Normalization, B+ Trees), Operating Systems (Paging, Semaphores), and ML.",
      icon: Cpu,
      link: "/core-cs",
      tag: "Image Requirement",
      gradient: "from-amber-600/30 to-orange-600/10",
      border: "border-amber-500/30"
    },
    {
      title: "Machine Learning Intelligence (Scikit-learn)",
      desc: "Practical ML performance predictor, readiness analyzer, TF-IDF course recommender, and student progress classifier.",
      icon: BrainCircuit,
      link: "/ml-predict",
      tag: "Scikit-Learn ML",
      gradient: "from-cyan-600/30 to-blue-600/10",
      border: "border-cyan-500/30"
    },
  ];

  const govExamCategories = [
    { name: "Civil Services", count: "IAS, IPS, IFS, IRS", color: "from-blue-600 to-indigo-600", link: "/upsc" },
    { name: "Staff Selection (SSC)", count: "CGL, CHSL, CPO, MTS", color: "from-cyan-600 to-blue-600", link: "/resources" },
    { name: "Banking & Finance", count: "IBPS PO, SBI PO, RBI Gr B", color: "from-emerald-600 to-teal-600", link: "/resources" },
    { name: "Indian Railways", count: "RRB NTPC, ALP, Group D", color: "from-amber-600 to-orange-600", link: "/resources" },
    { name: "Defense Forces", count: "NDA, CDS, AFCAT, CAPF", color: "from-rose-600 to-red-600", link: "/resources" },
    { name: "State PSCs", count: "UPPSC, BPSC, MPPSC, KPSC", color: "from-purple-600 to-pink-600", link: "/resources" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/20 blur-[140px] -z-10 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/15 blur-[120px] -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-xs font-semibold text-cyan-400 mb-6 shadow-lg shadow-blue-900/20">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Dedicated Government Exam & Placement Platform • IAS / IPS Specialization</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Master IAS, IPS & All Government Exams,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              C++ DSA & Technical Placements
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The unified platform built strictly with <strong>React + Vite</strong>, <strong>FastAPI</strong>, <strong>MySQL</strong>, and <strong>Scikit-learn</strong>. Supporting all major government examinations with free NCERT textbooks, curated YouTube lecture links, C++ DSA solutions, and conventional ML predictions.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/upsc"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> IAS & IPS (UPSC) Hub <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/resources"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-red-600/25 transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Video className="w-4 h-4" /> Free Textbooks & Videos
            </Link>

            <Link
              to="/dsa"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-bold text-sm transition-all hover:border-slate-600 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" /> C++ DSA (14 Topics)
            </Link>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="text-2xl font-black text-white">IAS & IPS</div>
              <div className="text-xs text-slate-400 mt-0.5">UPSC CSE Complete Guide</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="text-2xl font-black text-cyan-400">30+ Exams</div>
              <div className="text-xs text-slate-400 mt-0.5">UPSC, SSC, Banking, Railways</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="text-2xl font-black text-emerald-400">Free Books</div>
              <div className="text-xs text-slate-400 mt-0.5">NCERT PDFs & Verified Notes</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="text-2xl font-black text-red-400">YouTube Hub</div>
              <div className="text-xs text-slate-400 mt-0.5">Top Educator Video Lessons</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sector Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">All Government Examinations Supported</h2>
            <p className="text-xs text-slate-400 mt-1">Direct access to syllabus, exam patterns, free notes, and video playlists</p>
          </div>
          <Link to="/resources" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
            Browse All Exams →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {govExamCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl transition hover:scale-[1.03] group shadow-md"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-xs font-black mb-3`}>
                {cat.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition">{cat.name}</h3>
              <p className="text-[11px] text-slate-400 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Uploaded Image Special Highlight: Concepts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-cyan-400 flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4" /> Core Technical Requirements (From Uploaded Image)
              </span>
              <h2 className="text-2xl font-black text-white">
                Concepts: Data Structures & Algorithms, DBMS, Operating Systems, Machine Learning
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Integrated modules with deep theoretical foundations, C++ problem implementations, database normalization rules, OS paging mechanics, and Scikit-learn evaluation metrics.
              </p>
            </div>
            <Link
              to="/core-cs"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm whitespace-nowrap shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105"
            >
              Open Core CS Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white">Full-Stack Capability Architecture</h2>
          <p className="text-sm text-slate-400 mt-2">
            Every feature is backed by dedicated models, SQLite / MySQL persistence, and native Python intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link
                key={i}
                to={f.link}
                className={`group relative bg-gradient-to-br ${f.gradient} bg-slate-900/90 border ${f.border} p-6 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-all duration-200 shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  Access Module <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
