"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, ArrowRight, ShieldCheck, Mail, Lock, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e?: React.FormEvent) => {
        e?.preventDefault();
        setLoading(true);
        // Simulate network delay for effect
        setTimeout(() => {
            // Use provided email or existing state
            login(role, email || undefined);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side: Branding & Info */}
            <div className="bg-blue-600 text-white p-12 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-white rounded-lg">
                            <ShieldCheck className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">SarkariSaathi AI</h1>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <h2 className="text-5xl font-extrabold leading-tight">
                            Master Your <br />
                            <span className="text-blue-200">Govt Exams</span> <br />
                            With AI.
                        </h2>
                        <p className="text-blue-100 text-lg">
                            The ultimate platform for UPSC, SSC, and Banking aspirants.
                            Live classes, AI tutoring, and personalized roadmaps in one place.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 flex gap-8 text-sm text-blue-200 font-medium">
                    <span>© 2025 GovtAI Platform</span>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="bg-gray-50 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-gray-500">Sign in to your account to continue</p>
                    </div>

                    <Tabs defaultValue="student" onValueChange={(v) => setRole(v as 'student' | 'teacher')} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
                            <TabsTrigger value="student" className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
                                <GraduationCap className="w-4 h-4" /> Student
                            </TabsTrigger>
                            <TabsTrigger value="teacher" className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
                                <Users className="w-4 h-4" /> Teacher
                            </TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={role === 'student' ? "student@example.com" : "teacher@example.com"}
                                        className="pl-9"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-9"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base group" disabled={loading}>
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In as {role === 'student' ? 'Student' : 'Teacher'}
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Tabs>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full h-11 gap-2 border-gray-300 hover:bg-gray-50" onClick={() => handleLogin()}>
                        <Chrome className="w-5 h-5 text-gray-900" />
                        Google
                    </Button>

                    <div className="text-center text-sm">
                        <p className="text-gray-500">
                            Don't have an account? <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 underline">Register for free</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
