"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Book, FileText, Video, FolderOpen, Youtube, BrainCircuit, Calculator, Download, Eye, X, Radio, Tv, User, Users, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

import VideoGrid from "@/components/features/courses/VideoGrid";
import FormulaSheet from "@/components/features/courses/FormulaSheet";
import CourseAI from "@/components/features/ai/CourseAI";
import QuizList from "@/components/features/quiz/QuizList";
import QuizInterface from "@/components/features/quiz/QuizInterface";
import LiveClassStudio from "@/components/features/live/LiveClassStudio";
import LiveClassViewer from "@/components/features/live/LiveClassViewer";

// Tabs Component
function Tabs({ activeTab, setActiveTab, tabs }: any) {
    return (
        <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-lg px-2 overflow-x-auto">
            {tabs.map((tab: any) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                        "flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                        activeTab === tab.id
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

// Mock Data (Same as before)
const courseData: Record<string, any> = {
    upsc: {
        title: "UPSC Civil Services",
        modules: [
            {
                id: "hist",
                title: "History",
                type: "folder",
                items: 12,
                color: "text-orange-600 bg-orange-50",
                content: [
                    { title: "Indus Valley Civilization", type: "pdf", pages: "12 pages" },
                    { title: "Vedic Age & Mahajanapadas", type: "note", pages: "Summary" },
                    { title: "Mauryan Empire", type: "pdf", pages: "18 pages" },
                    { title: "Gupta Period", type: "pdf", pages: "15 pages" },
                    { title: "Delhi Sultanate", type: "note", pages: "Key Points" },
                    { title: "Mughal Architecture", type: "pdf", pages: "Visual Guide" },
                    { title: "Advent of Europeans", type: "pdf", pages: "Timeline" },
                    { title: "Revolt of 1857", type: "note", pages: "Causes & Impact" },
                    { title: "Indian National Congress", type: "pdf", pages: "Sessions List" },
                    { title: "Gandhian Era", type: "pdf", pages: "Movements" },
                    { title: "Partition of India", type: "note", pages: "Critical Analysis" },
                    { title: "Post-Independence Consolidation", type: "pdf", pages: "10 pages" }
                ]
            },
            {
                id: "geo",
                title: "Geography",
                type: "folder",
                items: 8,
                color: "text-green-600 bg-green-50",
                content: [
                    { title: "Solar System & Earth", type: "pdf", pages: "Diagrams" },
                    { title: "Geomorphology: Landforms", type: "pdf", pages: "20 pages" },
                    { title: "Climatology: Atmosphere", type: "note", pages: "Layers" },
                    { title: "Oceanography", type: "pdf", pages: "Currents Map" },
                    { title: "Indian Physiography", type: "pdf", pages: "Mountains & Rivers" },
                    { title: "Monsoon Mechanism", type: "note", pages: "Flowchart" },
                    { title: "Soils of India", type: "pdf", pages: "Map Based" },
                    { title: "Agriculture & Resources", type: "pdf", pages: "Data Sheet" }
                ]
            },
            {
                id: "pol",
                title: "Indian Polity",
                type: "folder",
                items: 15,
                color: "text-blue-600 bg-blue-50",
                content: [
                    { title: "Preamble of Constitution", type: "note", pages: "Text & Keywords" },
                    { title: "Fundamental Rights (Art 12-35)", type: "pdf", pages: "Detailed" },
                    { title: "Directive Principles (DPSP)", type: "pdf", pages: "List" },
                    { title: "Fundamental Duties", type: "note", pages: "11 Duties" },
                    { title: "President & Vice President", type: "pdf", pages: "Powers" },
                    { title: "Parliament", type: "pdf", pages: "Lok Sabha vs Rajya Sabha" },
                    { title: "Supreme Court & High Courts", type: "pdf", pages: "Jurisdiction" },
                    { title: "Governor & State Legislature", type: "pdf", pages: "Comparison" },
                    { title: "Emergency Provisions", type: "note", pages: "Types" },
                    { title: "Panchayati Raj", type: "pdf", pages: "73rd Amendment" }
                ]
            },
        ],
        videos: [
            { id: "v1", title: "UPSC CSE: Complete Modern History Marathon", duration: "11:30:00", thumbnail: "https://i.ytimg.com/vi/S7t7a0CjT-s/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=S7t7a0CjT-s" },
            { id: "v2", title: "Indian Polity by M. Laxmikanth - Full Playlist", duration: "Playlist", thumbnail: "https://i.ytimg.com/vi/M84jJdD2Z1s/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=M84jJdD2Z1s" },
            { id: "v3", title: "Geography NCERT Class 6-12 Summary", duration: "5:45:20", thumbnail: "https://i.ytimg.com/vi/yi7dRfJc-pI/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=yi7dRfJc-pI" },
            { id: "v4", title: "Economy for UPSC - Mural Sir", duration: "2:10:15", thumbnail: "https://i.ytimg.com/vi/zTi8kKqW6mE/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=zTi8kKqW6mE" },
        ],
        formulas: [],
        quizzes: [
            { id: "q1", title: "History: Freedom Struggle", questionsCount: 5, duration: "10", difficulty: "Easy" },
            { id: "q2", title: "Polity: Constitution", questionsCount: 10, duration: "15", difficulty: "Medium" },
        ]
    },
    ssc: {
        title: "SSC CGL",
        modules: [
            {
                id: "quant",
                title: "Quantitative Aptitude",
                type: "folder",
                items: 20,
                color: "text-blue-600 bg-blue-50",
                content: [
                    { title: "Number Systems", type: "pdf", pages: "Formulas" },
                    { title: "HCF & LCM", type: "note", pages: "Tricks" },
                    { title: "Percentage & Profit Loss", type: "pdf", pages: "Practice Sheet" },
                    { title: "Simple & Compound Interest", type: "pdf", pages: "Calculations" },
                    { title: "Ratio & Proportion", type: "note", pages: "Concepts" },
                    { title: "Time & Work", type: "pdf", pages: "Problem Types" },
                    { title: "Speed, Time & Distance", type: "pdf", pages: "Trains & Boats" },
                    { title: "Algebra", type: "pdf", pages: "Identities" },
                    { title: "Trigonometry", type: "pdf", pages: "Tables" },
                    { title: "Geometry", type: "pdf", pages: "Triangles & Circles" }
                ]
            },
        ],
        videos: [
            { id: "v1", title: "Maths for SSC CGL - Percentage Tricks", duration: "25:10", thumbnail: "https://i.ytimg.com/vi/h2lM5gT_5C0/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=h2lM5gT_5C0" },
            { id: "v2", title: "Reasoning: Missing Number Series", duration: "18:45", thumbnail: "https://i.ytimg.com/vi/3wVq2qT-d5s/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=3wVq2qT-d5s" },
            { id: "v3", title: "English Grammar: Subject Verb Agreement", duration: "32:00", thumbnail: "https://i.ytimg.com/vi/6qQ1qJ-p3t0/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=6qQ1qJ-p3t0" },
        ],
        formulas: [
            { id: "f1", title: "Pythagoras Theorem", expression: "a² + b² = c²", description: "For right-angled triangles." },
            { id: "f2", title: "Compound Interest", expression: "A = P(1 + r/n)^(nt)", description: "Calculate final amount." },
        ],
        quizzes: [
            { id: "q1", title: "Quant: Profit & Loss", questionsCount: 5, duration: "10", difficulty: "Hard" },
        ]
    },
};

// Mock Questions Database
const quizQuestions: Record<string, any[]> = {
    "q1": [ // History / Quant
        { id: 1, text: "Who was the first Governor-General of Bengal?", options: ["Lord Clive", "Warren Hastings", "Lord Cornwallis", "Lord Dalhousie"], correctAnswer: 1 },
        { id: 2, text: "The 'Quit India Movement' was launched in which year?", options: ["1920", "1930", "1942", "1947"], correctAnswer: 2 },
        { id: 3, text: "Who wrote 'Discovery of India'?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Rabindranath Tagore"], correctAnswer: 1 },
        { id: 4, text: "When did the Jallianwala Bagh massacre take place?", options: ["1913", "1919", "1923", "1929"], correctAnswer: 1 },
        { id: 5, text: "Who founded the Indian National Congress?", options: ["A.O. Hume", "W.C. Banerjee", "Dadabhai Naoroji", "Annie Besant"], correctAnswer: 0 },
    ],
    "q2": [ // Polity
        { id: 1, text: "Which Article of the Constitution deals with Fundamental Rights?", options: ["Article 12-35", "Article 36-51", "Article 51A", "Article 370"], correctAnswer: 0 }
    ]
}

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const courseId = params.courseId as string;

    // Check auth
    if (!isAuthenticated && typeof window !== 'undefined') {
        router.push('/login');
    }

    const [activeTab, setActiveTab] = useState("modules");
    const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [isLive, setIsLive] = useState(false); // Global live state (mock)
    const [isWatching, setIsWatching] = useState(false); // Student watching state

    const data = courseData[courseId] || { title: "Course Not Found", modules: [], videos: [], formulas: [], quizzes: [] };

    const tabs = [
        { id: "modules", label: "Study Modules", icon: <FolderOpen className="w-4 h-4" /> },
        { id: "videos", label: "Video Lectures", icon: <Youtube className="w-4 h-4" /> },
        { id: "ai", label: "AI Tutor", icon: <BrainCircuit className="w-4 h-4" /> },
        { id: "formulas", label: "Formula Sheets", icon: <Calculator className="w-4 h-4" /> },
        { id: "quizzes", label: "Quizzes", icon: <Book className="w-4 h-4" /> },
    ];

    const handleStartQuiz = (quizId: string) => {
        setActiveQuizId(quizId);
    };

    if (activeQuizId) {
        // Fallback for demo questions if quizId not found in mock DB
        const questions = quizQuestions[activeQuizId] || quizQuestions["q1"];
        const quiz = data.quizzes?.find((q: any) => q.id === activeQuizId) || { title: "Quiz" };

        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <QuizInterface
                    quizTitle={quiz.title}
                    questions={questions}
                    onExit={() => setActiveQuizId(null)}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
                    </div>
                </div>

                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === "modules" && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {data.modules.length > 0 ? (
                                            data.modules.map((item: any, index: number) => (
                                                <Card
                                                    key={item.id}
                                                    className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 group"
                                                    style={{ borderLeftColor: item.color.includes('orange') ? '#ea580c' : item.color.includes('blue') ? '#2563eb' : item.color.includes('green') ? '#16a34a' : '#9ca3af' }}
                                                    onClick={() => setSelectedModule(item)}
                                                >
                                                    <CardContent className="p-6 flex items-start gap-4">
                                                        <div className={`p-3 rounded-lg ${item.color} group-hover:scale-110 transition-transform`}>
                                                            <FolderOpen className="w-8 h-8" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
                                                            <p className="text-sm text-gray-500">{item.content?.length || item.items} Topics | Resources</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-20 text-gray-400">
                                                <Book className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                                <p>No modules available.</p>
                                            </div>
                                        )}
                                    </div>

                                    <Dialog open={!!selectedModule} onOpenChange={(open) => !open && setSelectedModule(null)}>
                                        <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 overflow-hidden">
                                            <DialogHeader className="p-6 border-b border-gray-100 bg-gray-50/50">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${selectedModule?.color}`}>
                                                        <FolderOpen className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <DialogTitle className="text-2xl">{selectedModule?.title}</DialogTitle>
                                                        <DialogDescription>
                                                            {selectedModule?.content?.length || 0} Topics Available
                                                        </DialogDescription>
                                                    </div>
                                                </div>
                                            </DialogHeader>

                                            <ScrollArea className="flex-1 p-6">
                                                <div className="space-y-4">
                                                    {selectedModule?.content?.map((topic: any, idx: number) => (
                                                        <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm hover:border-blue-200 transition-all group">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-sm">
                                                                    {idx + 1}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                                                                        {topic.title}
                                                                    </h4>
                                                                    <div className="flex gap-3 text-xs text-gray-400 mt-1">
                                                                        <span className="flex items-center gap-1">
                                                                            {topic.type === 'pdf' ? <FileText className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                                                                            {topic.type === 'pdf' ? 'PDF Document' : 'Revision Note'}
                                                                        </span>
                                                                        <span>•</span>
                                                                        <span>{topic.pages}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button variant="outline" size="sm" className="h-8 gap-2">
                                                                    <Eye className="w-3 h-3" /> View
                                                                </Button>
                                                                <Button size="sm" className="h-8 gap-2 bg-blue-600 hover:bg-blue-700">
                                                                    <Download className="w-3 h-3" /> Save
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {(!selectedModule?.content || selectedModule?.content.length === 0) && (
                                                        <div className="text-center py-12 text-gray-400">
                                                            <p>No content uploaded for this module yet.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </ScrollArea>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}

                            {activeTab === "videos" && (
                                <div className="space-y-8">
                                    {/* TEACHER VIEW */}
                                    {user?.role === 'teacher' && (
                                        <>
                                            {isLive ? (
                                                <LiveClassStudio onEndClass={() => setIsLive(false)} />
                                            ) : (
                                                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-500 text-white rounded-full">
                                                            <Tv className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-blue-900">Teacher Dashboard</h3>
                                                            <p className="text-xs text-blue-600">You are in Teacher Mode. Start a class below.</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="default"
                                                        onClick={() => setIsLive(true)}
                                                        className="gap-2 transition-all"
                                                    >
                                                        <Radio className="w-4 h-4" />
                                                        Go Live
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* STUDENT VIEW */}
                                    {user?.role === 'student' && (
                                        <>
                                            {isWatching ? (
                                                <LiveClassViewer onLeaveClass={() => setIsWatching(false)} />
                                            ) : (
                                                <AnimatePresence>
                                                    {/* NOTE: In a real app, isLive would come from backend. Here we mock it if teacher simulates it, but for student login it might default to false unless we persist it. For demo, we can assume 'isLive' is false by default or managed via localStorage/backend later. For now, we'll auto-show it for demo purposes if we want, OR just show the banner statically for the demo effect. 
                                                    
                                                    But user asked for separation. 
                                                    Let's Keep isLive local for now. If you login as Student, you won't see Live unless we mock it or use Context for isLive (which we didn't add to AuthContext).
                                                    
                                                    To make the demo "Pop", let's assume there IS a live class for students to see.
                                                    */}
                                                    {/* Simulating a Live Class is Active for Students */}
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <Card className="bg-red-50 border-red-100 border-l-4 border-l-red-500 shadow-sm mb-6">
                                                            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                                <div className="flex items-start gap-4">
                                                                    <span className="flex h-3 w-3 relative mt-1.5 ">
                                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                                    </span>
                                                                    <div>
                                                                        <h3 className="font-bold text-red-900 text-lg flex items-center gap-2">
                                                                            Live Now
                                                                            <span className="px-2 py-0.5 bg-red-200 text-red-800 text-[10px] rounded-full uppercase tracking-wider font-extrabold">Live</span>
                                                                        </h3>
                                                                        <p className="text-gray-900 font-medium">Daily Current Affairs Analysis</p>
                                                                        <p className="text-red-700 text-sm mt-1">Started 5 minutes ago • 1.2k watching</p>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    className="bg-red-600 hover:bg-red-700 text-white gap-2 w-full sm:w-auto shadow-sm shadow-red-200"
                                                                    onClick={() => setIsWatching(true)}
                                                                >
                                                                    <Video className="w-4 h-4" />
                                                                    Join Class Now
                                                                </Button>
                                                            </CardContent>
                                                        </Card>
                                                    </motion.div>
                                                </AnimatePresence>
                                            )}
                                        </>
                                    )}

                                    {/* Everyone sees video list unless watching live */}
                                    {!isWatching && (
                                        data.videos && data.videos.length > 0 ? <VideoGrid videos={data.videos} /> : (
                                            <div className="text-center py-20 text-gray-400">
                                                <Youtube className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                                <p>No video lectures available for this course yet.</p>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {activeTab === "formulas" && (
                                data.formulas && data.formulas.length > 0 ? <FormulaSheet formulas={data.formulas} /> : (
                                    <div className="text-center py-20 text-gray-400">
                                        <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                        <p>No formula sheets available. (Try SSC CGL for a demo)</p>
                                    </div>
                                )
                            )}

                            {activeTab === "ai" && (
                                <div className="w-full max-w-4xl mx-auto">
                                    <CourseAI subject={data.title} />
                                </div>
                            )}

                            {activeTab === "quizzes" && (
                                data.quizzes && data.quizzes.length > 0 ? (
                                    <QuizList quizzes={data.quizzes} onStartQuiz={handleStartQuiz} />
                                ) : (
                                    <div className="text-center py-20 text-gray-400">
                                        <Book className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                        <p>No quizzes available for this course yet.</p>
                                    </div>
                                )
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
