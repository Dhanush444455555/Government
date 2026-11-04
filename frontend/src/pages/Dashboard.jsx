import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  LayoutDashboard,
  Award,
  Clock,
  BookOpen,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Target,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "Student Aspirant",
    target_exam: "UPSC Civil Services (CSE)",
    education: "B.Tech Computer Science",
    study_hours_per_day: 6,
    streak_days: 14
  });

  useEffect(() => {
    const stored = localStorage.getItem('gov_user');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUser((prev) => ({ ...prev, ...u }));
      } catch (e) {}
    }
  }, []);

  const progressData = [
    { name: 'Mock 1', score: 48, cutoff: 60 },
    { name: 'Mock 2', score: 55, cutoff: 60 },
    { name: 'Mock 3', score: 62, cutoff: 60 },
    { name: 'Mock 4', score: 71, cutoff: 60 },
    { name: 'Mock 5', score: 69, cutoff: 60 },
    { name: 'Mock 6', score: 78, cutoff: 60 },
    { name: 'Mock 7', score: 85, cutoff: 60 },
  ];

  const subjectData = [
    { subject: 'Polity', score: 82 },
    { subject: 'History', score: 74 },
    { subject: 'Aptitude', score: 88 },
    { subject: 'Reasoning', score: 91 },
    { subject: 'Current Affairs', score: 68 },
    { subject: 'Science/Tech', score: 84 },
  ];

  const timeAllocation = [
    { name: 'General Studies', value: 45, color: '#0ea5e9' },
    { name: 'Aptitude / CSAT', value: 25, color: '#3b82f6' },
    { name: 'Current Affairs', value: 15, color: '#10b981' },
    { name: 'DSA / Technical', value: 15, color: '#a855f7' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Candidate Portal</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Primary Target: <strong className="text-cyan-400">{user.target_exam}</strong> • Active Study Streak: <strong className="text-amber-400">{user.streak_days || 14} Days</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/tests"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30"
          >
            Take Scheduled Mock
          </Link>
          <Link
            to="/dsa"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
          >
            Review C++ DSA
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
            <Award className="w-4 h-4 text-cyan-400" /> Average Mock Score
          </span>
          <p className="text-2xl font-black text-white mt-2">76.4%</p>
          <span className="text-[10px] text-emerald-400 font-mono">+12% vs last month</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
            <Clock className="w-4 h-4 text-blue-400" /> Daily Target Hours
          </span>
          <p className="text-2xl font-black text-white mt-2">{user.study_hours_per_day || 6} hrs</p>
          <span className="text-[10px] text-slate-400 font-mono">Consistently Maintained</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tests Completed
          </span>
          <p className="text-2xl font-black text-white mt-2">18</p>
          <span className="text-[10px] text-cyan-400 font-mono">8 Full-Length + 10 Topic</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
            <Flame className="w-4 h-4 text-amber-400" /> Prelims Countdown
          </span>
          <p className="text-2xl font-black text-white mt-2">142 Days</p>
          <span className="text-[10px] text-amber-400 font-mono">Scheduled 2026 Cycle</span>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Mock Test Score Progression (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Mock Test Score Trajectory (Recharts LineChart)
            </h3>
            <span className="text-xs font-mono text-slate-400">Baseline Cutoff: 60%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="score" name="Your Score" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="cutoff" name="Cutoff Threshold" stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Time Allocation PieChart (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800">
            Weekly Study Allocation (Recharts)
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {timeAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
            {timeAllocation.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Accuracy Mastery BarChart (12 cols) */}
        <div className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              Subject Accuracy & Mastery Breakdown (%)
            </h3>
            <span className="text-xs font-mono text-cyan-400">Target Benchmark: 75%+</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="subject" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="score" name="Mastery Accuracy" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
