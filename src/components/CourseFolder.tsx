"use client";

import { motion } from "framer-motion";
import { Folder, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseFolderProps {
    title: string;
    description: string;
    color: string;
    resourceCount: number;
    onClick?: () => void;
}

export default function CourseFolder({
    title,
    description,
    color,
    resourceCount,
    onClick,
}: CourseFolderProps) {
    // Map tailwind bg colors to richer gradients
    const getGradient = (c: string) => {
        if (c.includes("blue")) return "from-blue-500 via-cyan-500 to-teal-400";
        if (c.includes("purple")) return "from-purple-500 via-pink-500 to-rose-400";
        if (c.includes("green")) return "from-emerald-500 via-green-500 to-lime-400";
        if (c.includes("orange")) return "from-orange-500 via-amber-500 to-yellow-400";
        if (c.includes("indigo")) return "from-indigo-600 via-violet-600 to-purple-500";
        return "from-gray-500 to-gray-400";
    };

    const getShadow = (c: string) => {
        if (c.includes("blue")) return "shadow-blue-500/30";
        if (c.includes("purple")) return "shadow-purple-500/30";
        if (c.includes("green")) return "shadow-green-500/30";
        if (c.includes("orange")) return "shadow-orange-500/30";
        if (c.includes("indigo")) return "shadow-indigo-500/30";
        return "shadow-gray-500/30";
    };

    return (
        <motion.div
            whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="group cursor-pointer perspective-1000"
            onClick={onClick}
        >
            <div className={`relative transform transition-all duration-500 rounded-3xl`}>
                {/* 3D Depth Layer / Glow */}
                <div className={cn("absolute inset-0 bg-gradient-to-br rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500", getGradient(color))} />

                {/* Folder Tab - 3D Pop */}
                <div
                    className={cn(
                        "absolute -top-4 left-0 w-2/5 h-10 rounded-t-2xl z-0 bg-gradient-to-br shadow-inner",
                        getGradient(color)
                    )}
                />

                {/* Main Folder Body - Glassmorphism */}
                <div className={cn(
                    "relative z-10 bg-white dark:bg-gray-900 border border-white/20 p-6 rounded-b-3xl rounded-tr-3xl shadow-xl transition-all h-full flex flex-col justify-between overflow-hidden",
                    "group-hover:shadow-2xl",
                    getShadow(color)
                )}>

                    {/* Decorative Shine */}
                    <div className={cn("absolute top-0 right-0 w-40 h-40 bg-gradient-to-br to-transparent rounded-bl-full pointer-events-none opacity-10", getGradient(color))} />

                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-4 rounded-2xl shadow-lg bg-gradient-to-br text-white transform group-hover:rotate-12 transition-transform", getGradient(color))}>
                                <Folder className="w-8 h-8 drop-shadow-md" />
                            </div>
                            <span className="text-xs font-bold px-3 py-1 bg-gray-50 border border-gray-100/50 backdrop-blur-sm text-gray-700 rounded-full flex items-center gap-1 shadow-sm group-hover:scale-105 transition-transform">
                                <BookOpen className="w-3 h-3" /> {resourceCount} resources
                            </span>
                        </div>

                        <h3 className="text-2xl font-black text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all">
                            {title}
                        </h3>

                        <p className="text-sm font-medium text-gray-500 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex items-center text-sm font-bold text-gray-400 mt-6 group-hover:text-current transition-colors">
                        <span className={cn("w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all bg-gradient-to-r", getGradient(color))}>
                            <ArrowRight className="w-4 h-4" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                            Open Folder
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
