"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle, BarChart2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function MockTestsPage() {
    const tests = [
        {
            title: "UPSC CSE Prelims Full Mock 1",
            subject: "General Studies",
            duration: "2 Hours",
            questions: 100,
            status: "Live",
            attempts: 1205,
            level: "Hard"
        },
        {
            title: "SSC CGL Tier 1 - Quant",
            subject: "Quantitative Aptitude",
            duration: "60 Mins",
            questions: 50,
            status: "Live",
            attempts: 850,
            level: "Medium"
        },
        {
            title: "RRB NTPC General Awareness",
            subject: "General Awareness",
            duration: "45 Mins",
            questions: 40,
            status: "Upcoming",
            attempts: 0,
            level: "Easy"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex items-end justify-between"
                >
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Live Mock Tests</h1>
                        <p className="text-lg text-gray-600">
                            Compete with thousands of aspirants in real-time.
                        </p>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-bold text-gray-800">12 Tests Taken</span>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-blue-500" />
                            <span className="font-bold text-gray-800">Top 15% Rank</span>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-6">
                    {tests.map((test, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all border-l-4 border-l-blue-600">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Badge variant={test.status === "Live" ? "destructive" : "secondary"} className="animate-pulse">
                                            {test.status}
                                        </Badge>
                                        <span className="text-sm font-medium text-gray-500">{test.subject}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{test.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-1">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> {test.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {test.questions} Questions
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" /> {test.attempts} Attempts
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-auto flex flex-col items-end gap-2">
                                    <Button
                                        size="lg"
                                        className={`w-full md:w-40 font-bold ${test.status === "Upcoming" ? "bg-gray-200 text-gray-500 hover:bg-gray-300 pointer-events-none" : "bg-blue-600 hover:bg-blue-700"}`}
                                    >
                                        {test.status === "Upcoming" ? "Opens Soon" : "Start Test"}
                                    </Button>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        Difficulty: {test.level}
                                    </span>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
