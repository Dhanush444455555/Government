"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CourseFolder from "@/components/CourseFolder";
import Link from "next/link";
import dynamic from 'next/dynamic';

const SolarSystem3D = dynamic(() => import('@/components/3d/SolarSystem3D'), { ssr: false });

export default function EmploymentPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const jobFolders = [
        {
            id: "govt",
            title: "Government Jobs",
            description: "UPSC, SSC, Banking, Railways, and State PSC notifications.",
            color: "bg-blue-600",
            resourceCount: 120,
            href: "/employment/government"
        },
        {
            id: "private",
            title: "Private Sector",
            description: "MNCs, Startups, Tech Giants, and Corporate roles.",
            color: "bg-purple-600",
            resourceCount: 450,
            href: "/employment/private"
        },
        {
            id: "part-time",
            title: "Part-Time & Near Me",
            description: "Local gigs, delivery partners, tuition, and flexible shifts.",
            color: "bg-green-600",
            resourceCount: 85,
            href: "/employment/part-time",
            isNew: true
        },
        {
            id: "internships",
            title: "Internships",
            description: "Paid internships for students and fresh graduates.",
            color: "bg-orange-600",
            resourceCount: 60,
            href: "/employment/internships"
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
                        centerText="EMPLOYMENT"
                        orbitTerms={["Govt Jobs", "Private", "Internships", "Startups", "MNCs", "Freelance", "Remote"]}
                        color="#10b981"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300 mb-6 drop-shadow-2xl">
                            Find Your Dream Career
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/10 shadow-xl">
                            Explore thousands of opportunities across government and private sectors.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 max-w-3xl mx-auto relative group"
                    >
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/30 rounded-full p-2 shadow-2xl">
                            <Search className="w-6 h-6 text-blue-200 ml-4" />
                            <Input
                                type="text"
                                placeholder="Search by Skill, Designation, or Company..."
                                className="border-0 bg-transparent text-white placeholder-blue-200/70 focus-visible:ring-0 text-lg h-14 flex-1"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="h-8 w-[1px] bg-white/20 mx-2" />
                            <div className="flex items-center text-blue-100 px-4 cursor-pointer hover:text-white transition-colors bg-white/5 py-2 rounded-lg mr-2">
                                <MapPin className="w-5 h-5 mr-2" />
                                <span className="hidden sm:inline font-medium">Location</span>
                            </div>
                            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 h-14 px-8 text-lg font-bold shadow-lg shadow-blue-500/20">
                                Search
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Folder Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-20">
                    {jobFolders.map((folder, index) => (
                        <motion.div
                            key={folder.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                        >
                            <Link href={folder.href} className="block h-full relative group">
                                <CourseFolder
                                    title={folder.title}
                                    description={folder.description}
                                    color={folder.color}
                                    resourceCount={folder.resourceCount}
                                />
                                {folder.isNew && (
                                    <div className="flex justify-center -mt-4 absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                        <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg z-20 animate-pulse border-2 border-white">
                                            New Maps 🗺️
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
