"use client";

import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function MentorPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm your AI Exam Guide. How can I help you prepare for your government exams today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.content }),
            });

            if (!response.ok) throw new Error("Failed to fetch response");

            const data = await response.json();
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply,
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error);
            // Fallback for demo/error
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: "I apologize, but I'm having trouble connecting to the server. Please try again later.",
                    },
                ]);
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-4rem)]">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Bot className="w-6 h-6 text-blue-600" /> AI Personalized Mentor
                </h1>
                <p className="text-gray-500 text-sm">Ask detailed questions about your syllabus, cutoff trends, or study plans.</p>
            </div>

            <Card className="w-full h-[calc(100%-4rem)] flex flex-col bg-white/50 backdrop-blur-sm border-gray-200 shadow-xl rounded-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">GovGuide AI Mentor</h2>
                        <p className="text-xs text-blue-100">Always here to help</p>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((m) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`flex gap-3 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"
                                        }`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-blue-600" : "bg-purple-600"
                                            }`}
                                    >
                                        {m.role === "user" ? (
                                            <User className="w-5 h-5 text-white" />
                                        ) : (
                                            <Bot className="w-5 h-5 text-white" />
                                        )}
                                    </div>
                                    <div
                                        className={`p-4 rounded-2xl ${m.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                                        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about exam syllabus, dates, or study tips..."
                            className="flex-1 rounded-full border-gray-300 focus:ring-blue-500 py-6"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="rounded-full w-12 h-12 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
