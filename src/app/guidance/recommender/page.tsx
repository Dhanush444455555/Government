"use client";

import CareerRecommender from "@/components/guidance/CareerRecommender";
import { Sparkles } from "lucide-react";
import dynamic from 'next/dynamic';

const SolarSystem3D = dynamic(() => import('@/components/3d/SolarSystem3D'), { ssr: false });

export default function RecommenderPage() {
    return (
        <div className="min-h-screen relative overflow-hidden text-white">
            {/* Vibrant Background - "AI Image Design" Style */}
            <div className="fixed inset-0 -z-50 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 animate-gradient-slow p-1">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-repeat bg-center mix-blend-overlay"></div>
                {/* Glowing AI Blobs */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/40 rounded-full blur-[120px] animate-blob translate-x-[-20%] translate-y-[-20%]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/30 rounded-full blur-[100px] animate-blob translate-x-[20%] translate-y-[20%]" />

                {/* 3D Solar System Overlay */}
                <div className="absolute inset-0 z-0 opacity-70">
                    <SolarSystem3D
                        centerText="AI FUTURE"
                        orbitTerms={["Neural Networks", "Deep Learning", "Career Path", "Success", "Analytics", "Prediction"]}
                        color="#d946ef"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-7xl h-[calc(100vh-4rem)] relative z-10 flex flex-col">
                <div className="mb-6 text-center">
                    <motion_div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-indigo-300 flex items-center justify-center gap-3 drop-shadow-2xl mb-3">
                            <Sparkles className="w-8 h-8 text-fuchsia-400" /> AI Career Predictor
                        </h1>
                        <p className="text-purple-100 max-w-2xl mx-auto text-lg backdrop-blur-md bg-white/10 p-3 rounded-2xl border border-white/10 shadow-lg">
                            Analyze your potential with our advanced Neural Engine.
                        </p>
                    </motion_div>
                </div>

                <div className="flex-1 min-h-0 perspective-1000">
                    <CareerRecommender />
                </div>
            </div>
        </div>
    );
}

function motion_div(props: any) {
    // Simple wrapper since we can't use framer-motion directly in the server-client boundary sometimes without 'use client' which is already there, 
    // but just ensuring compatibility or I could just import motion from framer-motion
    const { motion } = require("framer-motion");
    return <motion.div {...props} />;
}
