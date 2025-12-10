"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, BrainCircuit, GraduationCap, Trophy, ChevronRight, Sparkles } from "lucide-react";

export default function CareerRecommender() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        degree: "",
        percentage: "",
        interest: "",
        extra: ""
    });

    const handlePredict = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Simulate ML Processing
        setTimeout(() => {
            const score = parseFloat(formData.percentage);
            const degree = formData.degree;
            let recommended = {
                course: "UPSC Civil Services",
                probability: "85%",
                reason: "Your high academic performance and general degree suggests strong aptitude for administrative roles.",
                color: "bg-blue-600"
            };

            // Simple Heuristic "ML" Logic
            if (degree === "btech") {
                if (score > 75) {
                    recommended = {
                        course: "GATE & ESE",
                        probability: "92%",
                        reason: "With a strong technical background (B.Tech) and high scores, you are a prime candidate for PSU jobs and M.Tech.",
                        color: "bg-indigo-600"
                    };
                } else {
                    recommended = {
                        course: "SSC CGL (Tech Audit)",
                        probability: "78%",
                        reason: "Your engineering background gives you an edge in quantitative aptitude sections of SSC.",
                        color: "bg-green-600"
                    };
                }
            } else if (degree === "bcom" || degree === "bba") {
                if (score > 70) {
                    recommended = {
                        course: "RBI Grade B & Banking PO",
                        probability: "88%",
                        reason: "Your commerce background aligns perfectly with the financial reasoning required for Banking exams.",
                        color: "bg-emerald-600"
                    };
                }
            } else if (degree === "arts") {
                recommended = {
                    course: "UPSC & State PSC",
                    probability: "82%",
                    reason: "Humanities subjects form the core of the Civil Services syllabus, giving you a massive head start.",
                    color: "bg-orange-600"
                };
            }

            setResult(recommended);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-8 p-4 perspective-1000">
            {/* Input Section - Left Pane */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1"
            >
                <Card className="h-full border-0 shadow-2xl bg-white/80 backdrop-blur-xl hover:shadow-purple-500/20 transition-all duration-500 rounded-3xl overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />

                    {/* Background blob */}
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />

                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-3xl font-black text-gray-800">
                            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-inner">
                                <BrainCircuit className="w-8 h-8 text-purple-600" />
                            </div>
                            AI Path Predictor
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-gray-500 ml-1">
                            Enter your stats. Let our Neural Engine calculate your destiny.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <form onSubmit={handlePredict} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-bold ml-1">Degree Stream</Label>
                                <Select onValueChange={(v) => setFormData({ ...formData, degree: v })}>
                                    <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-white/50 focus:ring-4 ring-purple-500/20 text-lg transition-all hover:bg-white">
                                        <SelectValue placeholder="Select Degree" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="btech">B.Tech / B.E (Engineering)</SelectItem>
                                        <SelectItem value="bsc">B.Sc (Science)</SelectItem>
                                        <SelectItem value="bcom">B.Com / BBA (Commerce)</SelectItem>
                                        <SelectItem value="arts">B.A (Arts / Humanities)</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-700 font-bold ml-1">Percentage</Label>
                                    <Input
                                        type="number"
                                        placeholder="85.5"
                                        onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                                        required
                                        max={100}
                                        className="h-14 rounded-2xl border-gray-200 bg-white/50 focus:ring-4 ring-purple-500/20 text-lg transition-all hover:bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700 font-bold ml-1">Interest</Label>
                                    <Select onValueChange={(v) => setFormData({ ...formData, interest: v })}>
                                        <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-white/50 focus:ring-4 ring-purple-500/20 text-lg transition-all hover:bg-white">
                                            <SelectValue placeholder="Area" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tech">Tech</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button
                                className="w-full h-14 text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/30 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95"
                                disabled={loading || !formData.degree || !formData.percentage}
                            >
                                {loading ? (
                                    <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Neural Processing...</>
                                ) : (
                                    <span className="flex items-center gap-2">Predict My Future <Sparkles className="w-5 h-5 animate-pulse" /></span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Result Section - Right Pane (3D Flip Effect) */}
            <div className="flex-1 perspective-1000 relative">
                {result ? (
                    <motion.div
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 80, damping: 12, mass: 1.2 }}
                        className="h-full"
                    >
                        <div className="h-full relative transform-style-3d group">
                            {/* Floating Elements for 3D feel */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />

                            <div className={`absolute inset-0 bg-gradient-to-br opacity-30 blur-xl rounded-[2.5rem] ${result.color.replace('bg-', 'from-')}-500 to-transparent transform translate-y-4`} />

                            <Card className="h-full bg-gray-900/95 border-0 backdrop-blur-2xl text-white rounded-[2.5rem] overflow-hidden flex flex-col relative z-10 shadow-2xl ring-1 ring-white/10">
                                <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br ${result.color.replace('bg-', 'from-')}-500 to-transparent opacity-20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2`} />

                                <CardHeader className="text-center pt-10 pb-2 relative z-10">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                        className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-500 rounded-3xl rotate-3 flex items-center justify-center shadow-lg shadow-yellow-500/30 mb-6 ring-4 ring-white/10 backdrop-blur-sm"
                                    >
                                        <Trophy className="w-12 h-12 text-white drop-shadow-md" />
                                    </motion.div>
                                    <CardTitle className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                        Top Choice
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-8 flex-1 flex flex-col justify-center relative z-10 px-8">
                                    <div className="text-center">
                                        <h2 className={`text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 drop-shadow-2xl`}>
                                            {result.course}
                                        </h2>
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-md"
                                        >
                                            <Sparkles className="w-5 h-5 text-green-400 fill-green-400" />
                                            <span className="text-green-400 font-bold text-xl tracking-wide">{result.probability} Match</span>
                                        </motion.div>
                                    </div>

                                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md mx-2 hover:bg-white/10 transition-colors">
                                        <h4 className="flex items-center gap-3 font-bold text-purple-300 mb-3 uppercase tracking-wider text-sm">
                                            <BrainCircuit className="w-5 h-5" /> AI Analysis
                                        </h4>
                                        <p className="text-gray-300 leading-relaxed font-medium text-lg">
                                            {result.reason}
                                        </p>
                                    </div>

                                    <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 hover:scale-[1.02] font-black h-16 rounded-2xl shadow-xl shadow-white/10 text-lg transition-all active:scale-95">
                                        View Complete Roadmap <ChevronRight className="w-6 h-6 ml-1" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        className="h-full bg-gray-50/50 border-4 border-dashed border-gray-200/50 rounded-[2.5rem] flex items-center justify-center p-8 backdrop-blur-sm"
                        animate={{ scale: [1, 1.01, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <div className="text-center space-y-6 max-w-sm">
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/5">
                                <GraduationCap className="w-16 h-16 text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-400">Awaiting Data...</h3>
                            <p className="text-gray-400 font-medium text-lg">
                                Fill out your stats to unleash the <span className="text-purple-500 font-bold">Neural Model</span> on your profile!
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
