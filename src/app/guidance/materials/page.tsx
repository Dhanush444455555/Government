"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Download, PlayCircle, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudyMaterialsPage() {
    const materials = [
        {
            title: "General Studies",
            desc: "History, Geography, Polity, and Economy basics.",
            icon: BookOpen,
            color: "bg-blue-500",
            files: 45
        },
        {
            title: "Current Affairs",
            desc: "Monthly digests and daily news analysis.",
            icon: FileText,
            color: "bg-green-500",
            files: 120
        },
        {
            title: "CSAT / Aptitude",
            desc: "Maths, Reasoning, and English comprehension.",
            icon: PlayCircle,
            color: "bg-purple-500",
            files: 80
        },
        {
            title: "NCERT Summaries",
            desc: "Class 6-12 summary notes for quick revision.",
            icon: Star,
            color: "bg-orange-500",
            files: 60
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Smart Study Materials</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Curated notes, cheat sheets, and videos tailored for your exam success.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {materials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-gray-200">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 rounded-2xl ${item.color} bg-opacity-10`}>
                                        <item.icon className={`w-8 h-8 ${item.color.replace("bg-", "text-")}`} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                        {item.files} Resources
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 mb-6">{item.desc}</p>
                                <div className="space-y-3">
                                    {/* Mock File List */}
                                    {[1, 2, 3].map((file) => (
                                        <div key={file} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                                <span className="text-sm font-medium text-gray-700">Chapter {file}: Key Concepts PDF</span>
                                            </div>
                                            <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-6 bg-gray-900 hover:bg-black text-white rounded-xl py-6">
                                    View All Resources
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
