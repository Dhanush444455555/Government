"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CourseFolder from "@/components/CourseFolder";
import dynamic from 'next/dynamic';

const SolarSystem3D = dynamic(() => import('@/components/3d/SolarSystem3D'), { ssr: false });

export default function GuidancePage() {
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
        <div className="min-h-screen relative overflow-x-hidden text-white">
            {/* Same Colorful Background as Home */}
            <div className="fixed inset-0 -z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 animate-gradient-slow p-1">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-repeat bg-center mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] animate-blob translate-x-[-50%] translate-y-[-50%]" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />

                {/* 3D Solar System Overlay */}
                <div className="absolute inset-0 z-0 opacity-60">
                    <SolarSystem3D
                        centerText="GUIDANCE"
                        orbitTerms={["Mentorship", "AI Chat", "Career ML", "Study Plans", "Mock Tests", "Notes", "Community"]}
                        color="#a855f7"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-6 drop-shadow-2xl">
                            AI Guidance Center
                        </h1>
                        <p className="text-xl text-purple-100 max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/10 shadow-xl">
                            Leverage the power of Artificial Intelligence to supercharge your exam preparation.
                        </p>
                    </motion.div>
                </div>

                {/* Grid Layout of Folders */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-20">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={category.href} className="block h-full group">
                                <CourseFolder
                                    title={category.title}
                                    description={category.description}
                                    color={category.color}
                                    resourceCount={category.resourceCount}
                                />
                                {category.isNew && (
                                    <div className="flex justify-center -mt-4 absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                        <span className="bg-purple-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg z-20 animate-pulse border-2 border-white">
                                            NEW FEATURE: ML 🧠
                                        </span>
                                    </div>
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
