import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  Award,
  BookOpen,
  Calendar,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const userName = user?.name || "Aspirant Rahul";
  const userRole = user?.role || "student";

  const enrolledCourses = [
    {
      id: "upsc",
      title: "UPSC Civil Services (Prelims + Mains)",
      progress: 68,
      lastAccessed: "Indian Polity: Fundamental Rights",
      category: "Civil Services"
    },
    {
      id: "ssc",
      title: "SSC CGL (Tier 1 Sprint)",
      progress: 45,
      lastAccessed: "Quantitative Aptitude: Number Systems",
      category: "Staff Selection"
    }
  ];

  const recentTests = [
    {
      title: "UPSC GS Paper 1 All-India Mock 04",
      score: "128 / 200",
      percentile: "94.2%",
      date: "Nov 02, 2026",
      status: "Qualified"
    },
    {
      title: "SSC CGL Quantitative Speed Drill 02",
      score: "44 / 50",
      percentile: "91.8%",
      date: "Oct 29, 2026",
      status: "Qualified"
    },
    {
      title: "Banking Awareness Sectional 01",
      score: "32 / 40",
      percentile: "88.0%",
      date: "Oct 24, 2026",
      status: "Needs Revision"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                Welcome back, {userName}!
              </h1>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                {userRole} Mode
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Target: <strong>Civil Services (UPSC) 2026</strong> • Your AI study plan is active.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/guidance/tests"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <Play className="w-3.5 h-3.5" /> Take Mock Test
            </Link>
            <Link
              to="/prediction"
              className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-slate-700 transition-colors"
            >
              Check Probability
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Days to Exam
              </span>
              <h3 className="text-3xl font-black text-white">114 Days</h3>
              <p className="text-[11px] text-cyan-400 mt-1">UPSC Prelims Countdown</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-cyan-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Study Time Logged
              </span>
              <h3 className="text-3xl font-black text-white">5.5 hrs</h3>
              <p className="text-[11px] text-emerald-400 mt-1">Goal: 6.0 hrs / day (92%)</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Mock Test Average
              </span>
              <h3 className="text-3xl font-black text-white">76.4%</h3>
              <p className="text-[11px] text-purple-400 mt-1">Rank Percentile: Top 6%</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Active Courses
              </span>
              <h3 className="text-3xl font-black text-white">2 Enrolled</h3>
              <p className="text-[11px] text-amber-400 mt-1">18 Modules Complete</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Main 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses Progress */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Your Ongoing Courses
                </h3>
                <Link to="/courses" className="text-xs font-bold text-cyan-400 hover:text-cyan-300">
                  Explore Catalog →
                </Link>
              </div>

              <div className="space-y-5">
                {enrolledCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                          {c.category}
                        </span>
                        <h4 className="font-bold text-base text-white">{c.title}</h4>
                      </div>
                      <Link
                        to={`/courses/${c.id}`}
                        className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        Resume <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Course Completion: {c.progress}%</span>
                        <span className="text-slate-400 truncate max-w-[200px]">Last: {c.lastAccessed}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Mock Test History */}
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Recent Mock Test Results
              </h3>

              <div className="space-y-3">
                {recentTests.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-white">{t.title}</h4>
                      <p className="text-xs text-slate-400">{t.date} • Percentile: {t.percentile}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-cyan-300 block">{t.score}</span>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick AI Advisor & Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-950/70 via-purple-950/50 to-slate-900 border border-blue-500/30 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">AI Study Recommendation</h4>
                  <span className="text-[10px] text-cyan-300 font-bold uppercase">Today's Focus</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Based on your last mock test, you scored 85% in Indian Polity but dropped marks in Climatology (Geography).
                Spend <strong>45 minutes</strong> reviewing Pressure Belts and Monsoon Wind systems.
              </p>

              <Link
                to="/guidance/mentor"
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                Discuss with AI Mentor <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-3">
              <h4 className="font-bold text-white text-sm">Quick Jump Links</h4>
              <Link
                to="/employment"
                className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                💼 Explore Active Government Vacancies
              </Link>
              <Link
                to="/guidance/materials"
                className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                📚 Smart Study Notes & NCERTs
              </Link>
              <Link
                to="/prediction"
                className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                🧠 Recalculate Exam Probability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
