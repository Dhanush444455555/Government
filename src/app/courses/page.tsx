"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CourseFolder from "@/components/CourseFolder";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CoursesPage() {
    const courses = [
        {
            id: "upsc",
            title: "UPSC Civil Services",
            description: "Comprehensive materials for Prelims and Mains. Includes NCERT summaries, daily current affairs, and CSAT guides.",
            color: "bg-orange-500",
            resourceCount: 1240,
        },
        {
            id: "ssc",
            title: "SSC CGL & CHSL",
            description: "Targeted preparation for Staff Selection Commission exams with mock tests and quantitative aptitude shortcuts.",
            color: "bg-blue-500",
            resourceCount: 850,
        },
        {
            id: "banking",
            title: "Banking & Insurance",
            description: "SBI PO, IBPS, and RBI Grade B focused content with banking awareness and data interpretation sets.",
            color: "bg-green-500",
            resourceCount: 920,
        },
        {
            id: "railways",
            title: "Indian Railways (RRB)",
            description: "NTPC and Group D specific study plans specializing in General Science and General Awareness.",
            color: "bg-red-500",
            resourceCount: 650,
        },
        {
            id: "gate",
            title: "GATE & ESE",
            description: "Technical subjects notes for CS, ME, EE, and EC streams along with previous year question papers.",
            color: "bg-purple-500",
            resourceCount: 1500,
        },
        {
            id: "def",
            title: "Defence (NDA/CDS)",
            description: "Preparation strategy for National Defence Academy and CDS exams with physical training tips.",
            color: "bg-teal-500",
            resourceCount: 430,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Select Your Exam Course
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Browse through our organized repositories of study materials. Pick your path and start preparing.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-16 relative">
                    <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    <Input placeholder="Search for an exam..." className="pl-10 py-6 text-lg rounded-full shadow-sm border-gray-300 focus:border-blue-500" />
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/courses/${course.id}`} className="block h-full">
                                <CourseFolder
                                    title={course.title}
                                    description={course.description}
                                    color={course.color}
                                    resourceCount={course.resourceCount}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
