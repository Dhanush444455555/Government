"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Users, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';

// Dynamic import for 3D component to avoid SSR issues
const SolarSystem3D = dynamic(() => import('@/components/3d/SolarSystem3D'), { ssr: false });
const Course3DCarousel = dynamic(() => import('@/components/3d/Course3DCarousel'), { ssr: false });

export default function Home() {
  const features = [
    {
      icon: <BrainCircuit className="w-10 h-10 text-white" />,
      title: "AI Exam Guidance",
      description: "Personalized study plans and doubt clearing powered by advanced AI models.",
      color: "bg-gradient-to-br from-blue-500 to-cyan-400"
    },
    {
      icon: <Briefcase className="w-10 h-10 text-white" />,
      title: "Employment Support",
      description: "Real-time job notifications and career path recommendations based on your profile.",
      color: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      icon: <BookOpen className="w-10 h-10 text-white" />,
      title: "Smart Study Materials",
      description: "Curated content and mock tests tailored to specific government exams.",
      color: "bg-gradient-to-br from-emerald-500 to-teal-400"
    },
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: "Community Mentorship",
      description: "Connect with successful candidates and mentors for expert advice.",
      color: "bg-gradient-to-br from-orange-500 to-amber-500"
    },
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden text-white">
      {/* Dynamic Animated Background - The "Home Folder Colors" */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 animate-gradient-slow p-1">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-repeat bg-center mix-blend-overlay"></div>
        {/* Animated Blob Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] animate-blob translate-x-[-50%] translate-y-[-50%]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Background 3D Carousel (Subtle) */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Course3DCarousel />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.2, bounce: 0.3 }}
            className="backdrop-blur-md bg-black/20 p-8 rounded-[3rem] border border-white/10 shadow-2xl mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 drop-shadow-lg">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse">
                Government Dream
              </span>
            </h1>
            <p className="mt-6 text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
              The Ultimate AI-Powered Platform for Exam Preparation & Career Success.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/guidance">
                <Button size="lg" className="h-16 rounded-full text-xl font-bold px-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/40 transform hover:scale-105 transition-all">
                  Start AI Guidance <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/employment">
                <Button variant="outline" size="lg" className="h-16 rounded-full text-xl font-bold px-10 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60 hover:text-white backdrop-blur-md shadow-lg transform hover:scale-105 transition-all">
                  Explore Jobs
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* 3D Dashboard Preview Section (Solar System Style) */}
          <motion.div
            initial={{ opacity: 0, rotateX: 20 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative mx-auto max-w-5xl h-[500px] mt-8 perspective-1000 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur-xl" />
            <div className="relative w-full h-full bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:ring-cyan-500/50 transition-all">
              <div className="absolute top-6 left-8 flex items-center justify-between right-8 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 window-button shadow-lg shadow-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 window-button shadow-lg shadow-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500 window-button shadow-lg shadow-green-500/50" />
                  </div>
                  <span className="text-white/50 text-sm font-mono ml-4 px-2 py-1 bg-white/5 rounded-md">/system/core/dashboard</span>
                </div>
                <div className="text-cyan-400 text-xs font-bold font-mono animate-pulse">
                  ● LIVE SYSTEM
                </div>
              </div>

              {/* Focus Solar System for Dashboard Modules */}
              <div className="w-full h-full">
                <SolarSystem3D
                  centerText="PLATFORM"
                  orbitTerms={["Guidance 🤖", "Employment 💼", "Mentorship 🤝", "Mock Tests 📝", "Analytics 📊", "Classes 🎥"]}
                  color="#3b82f6"
                />
              </div>

              <div className="absolute bottom-6 left-8 text-left z-10">
                <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Neural Engine: Active</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-lg">
              Power-Packed Features
            </h2>
            <p className="text-xl text-blue-200">
              Everything you need to crack the exam, in one vibrant ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ y: -15, scale: 1.05 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                className="p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl hover:shadow-cyan-500/20 group cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${feature.color}`} />
                <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-blue-100 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative z-10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-[2rem] border border-white/10 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    U{i}
                  </div>
                  <div>
                    <div className="font-bold text-xl text-white">User {i}</div>
                    <div className="text-sm text-cyan-300 font-medium tracking-wide">Cleared SBI PO</div>
                  </div>
                </div>
                <p className="text-gray-300 italic text-lg leading-relaxed">"The AI guidance was a game changer. It pinpointed my weak areas exactly and the vivid 3D simulations made learning fun!"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}