import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Users,
  BrainCircuit,
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';
import SolarSystem3D from '../components/SolarSystem3D';

export default function Home() {
  const features = [
    {
      icon: <BrainCircuit className="w-9 h-9 text-white" />,
      title: "AI Exam Guidance",
      description: "Personalized study plans and 24/7 doubt clearing powered by advanced machine learning models.",
      color: "bg-gradient-to-br from-blue-500 to-cyan-400",
      href: "/guidance"
    },
    {
      icon: <Briefcase className="w-9 h-9 text-white" />,
      title: "Employment Support",
      description: "Real-time government job notifications and career path recommendations based on your educational profile.",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      href: "/employment"
    },
    {
      icon: <BookOpen className="w-9 h-9 text-white" />,
      title: "Smart Study Materials",
      description: "Curated NCERT summaries, previous year question papers, and interactive formula revision sheets.",
      color: "bg-gradient-to-br from-emerald-500 to-teal-400",
      href: "/courses"
    },
    {
      icon: <Users className="w-9 h-9 text-white" />,
      title: "Community Mentorship",
      description: "Connect with successful candidates, experienced faculty, and rank-holders for live expert counseling.",
      color: "bg-gradient-to-br from-orange-500 to-amber-500",
      href: "/guidance/community"
    },
  ];

  const successStories = [
    {
      name: "Ananya Sharma",
      exam: "Cleared UPSC CSE (Rank 48 - IAS)",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
      quote: "The AI syllabus breakdown and daily current affairs synthesis saved me hundreds of hours. The mock test analytics pinpointed my exact weak areas in GS Paper 2."
    },
    {
      name: "Rohit Verma",
      exam: "Cleared SBI PO (All India Rank 14)",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
      quote: "Speed math drills and the probability predictor were spot on! Practicing daily with the live mock interface gave me immense exam-day confidence."
    },
    {
      name: "Pooja Hegde",
      exam: "Cleared SSC CGL (Income Tax Inspector)",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja",
      quote: "ExamGuru AI's formula sheet and interactive quizzes helped me master the quantitative aptitude section. Best all-in-one preparation platform!"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden text-white pt-16">
      {/* Dynamic Animated Background - matching govern-delta.vercel.app */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 animate-gradient-slow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
        {/* Animated glowing blobs */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[120px] animate-blob pointer-events-none" />
        <div className="absolute top-[25%] right-[-5%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[25%] w-[450px] h-[450px] bg-pink-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000 pointer-events-none" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-16 pb-12 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0.2 }}
            className="backdrop-blur-xl bg-black/30 p-8 sm:p-12 rounded-[3rem] border border-white/10 shadow-2xl mb-14 max-w-5xl mx-auto"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Unified Government Exam & Employment Ecosystem
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 drop-shadow-xl leading-tight">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Government Dream
              </span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
              The Ultimate AI-Powered Platform for Exam Preparation & Career Success.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link to="/guidance">
                <button className="w-full sm:w-auto h-15 rounded-full text-lg font-bold px-9 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/40 transform hover:scale-105 transition-all flex items-center justify-center gap-2 text-white">
                  Start AI Guidance <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/employment">
                <button className="w-full sm:w-auto h-15 rounded-full text-lg font-bold px-9 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60 backdrop-blur-md shadow-lg transform hover:scale-105 transition-all">
                  Explore Jobs
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Interactive Live System Preview Window (Solar System Orbit) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-5xl mx-auto relative rounded-3xl overflow-hidden border border-white/20 bg-slate-950/70 backdrop-blur-2xl shadow-2xl p-6"
          >
            {/* macOS / Terminal style top bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                <span className="text-white/60 text-xs font-mono ml-4 px-2.5 py-1 bg-white/5 rounded-md border border-white/5">
                  /system/core/dashboard
                </span>
              </div>
              <div className="text-cyan-400 text-xs font-bold font-mono flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                LIVE SYSTEM
              </div>
            </div>

            {/* Cosmic Orbit Preview */}
            <div className="w-full h-80 relative flex items-center justify-center">
              <SolarSystem3D
                centerText="PLATFORM"
                orbitTerms={["Guidance 🤖", "Employment 💼", "Mentorship 🤝", "Mock Tests 📝", "Analytics 📊", "Classes 🎥"]}
                color="#3b82f6"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
              <span className="text-white/40 uppercase tracking-widest font-bold">
                Neural Engine: Active (Scikit-Learn ML + MySQL)
              </span>
              <Link to="/courses" className="text-cyan-300 hover:text-cyan-200 font-bold flex items-center gap-1">
                Browse Courses →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Power-Packed Features Section */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-md">
              Power-Packed Features
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Everything you need to crack government exams, in one vibrant ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                <Link
                  to={feature.href}
                  className="block h-full p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-xl hover:shadow-cyan-500/20 group cursor-pointer relative overflow-hidden transition-all"
                >
                  <div className={`w-18 h-18 ${feature.color} rounded-2xl flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-xs font-bold text-cyan-300 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    Explore feature →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 relative z-10 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-3">
              Success Stories
            </h2>
            <p className="text-lg text-blue-200">
              Thousands of aspirants have achieved their government career with GovGuide AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-[2rem] border border-white/10 shadow-xl backdrop-blur-md flex flex-col justify-between"
              >
                <p className="text-gray-200 italic text-base leading-relaxed mb-6">
                  "{story.quote}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-13 h-13 rounded-full border-2 border-cyan-400 bg-white/10 p-0.5"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-white">{story.name}</h4>
                    <p className="text-xs text-cyan-300 font-semibold">{story.exam}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-indigo-900/60 p-12 rounded-[3rem] border border-white/20 shadow-2xl backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Take free live mock tests, get personalized AI study recommendations, and access comprehensive notes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses">
                <button className="px-8 py-4 bg-white text-blue-950 font-extrabold rounded-full hover:bg-blue-50 transition-colors shadow-lg">
                  Explore All Exam Courses
                </button>
              </Link>
              <Link to="/prediction">
                <button className="px-8 py-4 bg-transparent border-2 border-white/40 text-white font-extrabold rounded-full hover:bg-white/10 transition-colors">
                  Try AI Predictor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
