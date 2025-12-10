"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, Zap, RefreshCcw, Mic, Paperclip, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    attachment?: string;
};

interface CourseAIProps {
    subject: string;
}

export default function CourseAI({ subject }: CourseAIProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: `Hello! I'm your AI Tutor for **${subject}**. \n\nYou can:\n- Ask for **definitions**\n- Request a **study plan**\n- Type **"Quiz me"** to practice!`,
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Voice Input Logic
    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput((prev) => prev + (prev ? " " : "") + transcript);
            };

            recognition.start();
        } else {
            alert("Voice input is not supported in this browser.");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleSubmit = async (e?: React.FormEvent, manualInput?: string) => {
        if (e) e.preventDefault();
        const msgContent = manualInput || input;

        if (!msgContent.trim() && !attachment) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: msgContent,
            attachment: attachment ? attachment.name : undefined
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setAttachment(null);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.content, context: subject }),
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
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "⚠️ *Connection error.* Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full h-[600px] flex flex-col bg-white border-gray-200 shadow-md rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-600 text-white rounded-lg shadow-md">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 leading-tight">AI Tutor: {subject}</h2>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            Powered by GovGuide AI
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex"
                    onClick={() => setMessages([])} // Clear chat (simplified)
                >
                    <RefreshCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 bg-gray-50/50 p-4">
                <div className="space-y-6">
                    {messages.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === "user" ? "bg-blue-600" : "bg-gradient-to-tr from-purple-600 to-pink-600"}`}>
                                    {m.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                </div>

                                {/* Message Bubble */}
                                <div className={`p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${m.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                                    }`}>
                                    {m.attachment && (
                                        <div className="mb-2 p-2 bg-white/20 rounded flex items-center gap-2">
                                            <File className="w-4 h-4" />
                                            <span className="text-xs font-medium truncate max-w-[150px]">{m.attachment}</span>
                                        </div>
                                    )}
                                    <ReactMarkdown
                                        components={{
                                            code({ node, inline, className, children, ...props }: any) {
                                                return inline ? (
                                                    <code className="px-1 py-0.5 rounded bg-black/10 font-mono text-xs" {...props}>{children}</code>
                                                ) : (
                                                    <pre className="p-2 rounded bg-black/10 overflow-x-auto my-2"><code className="font-mono text-xs" {...props}>{children}</code></pre>
                                                )
                                            },
                                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                                            strong: ({ children }) => <span className="font-bold">{children}</span>,
                                            blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-3 italic my-2 text-gray-500">{children}</blockquote>
                                        }}
                                    >
                                        {m.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center opacity-70">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Quick Actions & Input */}
            <div className="p-4 bg-white border-t border-gray-100">

                {/* File Attachment Chip */}
                {attachment && (
                    <div className="flex items-center gap-2 mb-2 p-1.5 bg-blue-50 text-blue-700 rounded-md w-fit text-xs px-3">
                        <Paperclip className="w-3 h-3" />
                        <span className="max-w-[200px] truncate">{attachment.name}</span>
                        <button onClick={() => setAttachment(null)} className="ml-1 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </div>
                )}

                {/* Quick Chips */}
                {messages.length < 3 && !attachment && (
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                        <button onClick={() => handleSubmit(undefined, "Quiz me!")} className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-100 transition-colors whitespace-nowrap border border-purple-100">
                            <Zap className="w-3 h-3" /> Quiz me
                        </button>
                        <button onClick={() => handleSubmit(undefined, "Explain syllabus")} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-100 transition-colors whitespace-nowrap border border-gray-200">
                            Explain syllabus
                        </button>
                    </div>
                )}

                <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2 relative items-end">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileSelect}
                    />

                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-full shrink-0 text-gray-500 hover:text-blue-600"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip className="w-5 h-5" />
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={`rounded-full shrink-0 ${isListening ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'text-gray-500 hover:text-blue-600'}`}
                        onClick={startListening}
                    >
                        <Mic className="w-5 h-5" />
                    </Button>

                    <div className="relative flex-1">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isListening ? "Listening..." : "Type your question here..."}
                            className="w-full pr-10 py-5 bg-gray-50 border-gray-200 focus:bg-white transition-all shadow-sm"
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || (!input.trim() && !attachment)}
                            size="icon"
                            className={`absolute right-1 top-1 h-8 w-8 transition-all ${(input.trim() || attachment) ? 'bg-blue-600 hover:bg-blue-700 scale-100' : 'bg-gray-300 scale-90'}`}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
