"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Award, Heart, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CommunityPage() {
    const posts = [
        {
            user: "Riya Sharma",
            rank: "AIR 45 (UPSC 2023)",
            content: "My strategy for Ethics (GS-4) was simple: focus on case studies and use examples from daily life. Here are my short notes...",
            likes: 1205,
            comments: 340,
            time: "2h ago",
            tags: ["UPSC", "Strategy"]
        },
        {
            user: "Aman Gupta",
            rank: "SSC CGL Topper",
            content: "Cleared CGL in first attempt! The key is consistency with mock tests. Don't ignore typing practice.",
            likes: 890,
            comments: 120,
            time: "5h ago",
            tags: ["SSC", "Success Story"]
        },
        {
            user: "Priya Singh",
            rank: "Expert Mentor",
            content: "Join my live session tonight at 8 PM for a detailed breakdown of the new exam pattern for Banking exams.",
            likes: 2500,
            comments: 800,
            time: "1d ago",
            tags: ["Live Session", "Banking"]
        }
    ];

    const mentors = [
        { name: "Suresh Kumar", role: "Ex-IAS Officer", expertise: "Interview Guidance" },
        { name: "Dr. Anjali", role: "Psychologist", expertise: "Stress Management" },
        { name: "Rahul Verma", role: "Quant Wizard", expertise: "Maths Shortcuts" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-black text-gray-900 mb-6">Community Discussions</h1>
                        <Card className="p-4 mb-6 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-white transition-colors cursor-pointer flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <span className="text-gray-500 font-medium">Start a new discussion or ask a doubt...</span>
                        </Card>
                    </motion.div>

                    {posts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-10 h-10 border-2 border-blue-100">
                                            <AvatarFallback className="bg-blue-600 text-white font-bold">{post.user[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{post.user}</h3>
                                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                                {post.rank}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">{post.time}</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                                <div className="flex items-center gap-6 text-gray-500 text-sm">
                                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                                        <Heart className="w-4 h-4" /> {post.likes}
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                        <MessageSquare className="w-4 h-4" /> {post.comments}
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Sidebar: Mentors & Groups */}
                <div className="space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-none shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="w-8 h-8 text-yellow-400" />
                            <h2 className="text-xl font-bold">Top Mentors</h2>
                        </div>
                        <div className="space-y-4">
                            {mentors.map((mentor, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                                    <Avatar className="w-10 h-10 border border-white/30">
                                        <AvatarFallback className="bg-purple-500 text-white">{mentor.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm">{mentor.name}</p>
                                        <p className="text-xs text-indigo-200">{mentor.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-6 bg-white text-indigo-900 hover:bg-gray-100 font-bold">
                            Find a Mentor
                        </Button>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-6 h-6 text-green-600" />
                            <h2 className="text-lg font-bold">Popular Study Groups</h2>
                        </div>
                        <ul className="space-y-3">
                            {["UPSC 2025 Warriors", "SSC Daily Quiz", "Banking Mains Prep"].map((group, i) => (
                                <li key={i} className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                    <span className="font-medium text-gray-700">#{group.replace(/\s/g, "")}</span>
                                    <span className="text-xs text-gray-400">2.5k mems</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
}
