import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import CourseFolder from '../components/CourseFolder';
import SolarSystem3D from '../components/SolarSystem3D';
import { Sparkles, BrainCircuit } from 'lucide-react';

export default function Guidance() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "mentor",
      title: "AI Personalized Mentor",
      description: "Chat with our advanced AI to solve doubts, get study tips, and clear concepts 24/7.",
      color: "bg-blue-600",
      resourceCount: 1,
      href: "/guidance/mentor"
    },
    {
      id: "recommender",
      title: "Career Path Recommender",
      description: "ML-powered tool that analyzes your Degree & Marks to suggest the perfect exam/course.",
      color: "bg-purple-600",
      resourceCount: 1,
      isNew: true,
      href: "/guidance/recommender"
    },
    {
      id: "study-materials",
      title: "Smart Study Materials",
      description: "Curated notes, cheat sheets, and syllabus breakdowns for all major exams.",
      color: "bg-emerald-600",
      resourceCount: 150,
      href: "/guidance/materials"
    },
    {
      id: "mock-tests",
      title: "Live Mock Tests",
      description: "Real-time exam simulations with performance analytics and AI feedback.",
      color: "bg-pink-600",
      resourceCount: 45,
      href: "/guidance/tests"
    },
    {
      id: "community",
      title: "Community & Mentorship",
      description: "Connect with toppers, join study groups, and get expert career counseling.",
      color: "bg-orange-600",
      resourceCount: 1200,
      href: "/guidance/community"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden text-white pt-24 pb-16">
      {/* Dynamic Animated Cosmic Background - matching govern-delta.vercel.app */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 animate-gradient-slow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-25"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/25 rounded-full blur-[120px] animate-blob pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[120px] animate-blob animation-delay-4000 pointer-events-none" />

        {/* 3D Cosmic System Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <SolarSystem3D
            centerText="GUIDANCE"
            orbitTerms={["Mentorship", "AI Chat", "Career ML", "Study Plans", "Mock Tests", "Notes", "Community"]}
            color="#a855f7"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Machine Learning Guided Ecosystem
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white mb-6 drop-shadow-2xl">
              AI Guidance Center
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-5 rounded-3xl border border-white/10 shadow-xl leading-relaxed">
              Leverage the power of Artificial Intelligence to supercharge your exam preparation and career path.
            </p>
          </motion.div>
        </div>

        {/* Grid Layout of Folders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <CourseFolder
                title={category.title}
                description={category.description}
                color={category.color}
                resourceCount={category.resourceCount}
                onClick={() => navigate(category.href)}
              />
              {category.isNew && (
                <div className="flex justify-center absolute -top-1 right-3 z-30">
                  <span className="bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border-2 border-white animate-pulse">
                    NEW FEATURE: ML 🧠
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

