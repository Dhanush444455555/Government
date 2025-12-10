"use client";

import { Building2, MapPin, Briefcase, Wallet, Star, Clock, Bookmark, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JobCardProps {
    title: string;
    company: string;
    rating?: number;
    reviews?: number;
    experience: string;
    salary: string;
    location: string;
    description: string;
    tags: string[];
    postedDaysAgo: number;
    isHot?: boolean;
    type?: string;
}

export default function JobCard({
    title,
    company,
    rating = 4.0,
    reviews = 50,
    experience,
    salary,
    location,
    description,
    tags,
    postedDaysAgo,
    isHot,
    type = "Full Time"
}: JobCardProps) {
    return (
        <Card className="group relative border-0 bg-transparent hover:z-10 transition-all duration-300 transform perspective-1000">
            {/* 3D Visual Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-white/40 transform group-hover:rotate-x-2 group-hover:scale-[1.02] group-hover:-translate-y-1 transition-transform duration-300 ease-out" />

            {/* Colorful Glow on Hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

            <CardContent className="relative p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                            {title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-bold text-gray-700">{company}</span>
                            <div className="flex items-center gap-1 text-xs px-2 py-0.5 bg-yellow-50 rounded-md border border-yellow-100">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="font-bold text-yellow-700">{rating}</span>
                            </div>
                        </div>
                    </div>
                    {isHot && (
                        <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-red-500/30 animate-pulse">
                            Hot Job 🔥
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 p-2 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                        <Briefcase className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        <span>{experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 p-2 rounded-lg group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                        <Wallet className="w-4 h-4 text-gray-400 group-hover:text-green-500" />
                        <span>{salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 p-2 rounded-lg group-hover:bg-purple-50 group-hover:text-purple-700 transition-colors sm:col-span-1 col-span-2">
                        <MapPin className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                        <span>{location}</span>
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100/50">
                    <p className="line-clamp-2 text-sm text-gray-500 leading-relaxed italic">
                        "{description}"
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold text-gray-500 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                        <div className={`w-2 h-2 rounded-full ${postedDaysAgo === 0 ? "bg-green-500 animate-pulse" : "bg-gray-300"}`} />
                        {postedDaysAgo === 0 ? "Posted Today" : `${postedDaysAgo}d ago`}
                    </div>

                    <button className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 flex items-center gap-2">
                        Apply Now <Sparkles className="w-3 h-3" />
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
