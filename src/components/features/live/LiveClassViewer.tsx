"use client";

import { Video, PhoneOff, Users, MessageSquare, Heart, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface LiveClassViewerProps {
    onLeaveClass: () => void;
}

export default function LiveClassViewer({ onLeaveClass }: LiveClassViewerProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
            {/* Main Video Area */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="flex-1 bg-black border-gray-800 overflow-hidden relative shadow-lg">
                    {/* Simulated Video Player */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 group">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/S7t7a0CjT-s?autoplay=1&mute=1&controls=0&modestbranding=1"
                            title="Live Class"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className="pointer-events-none opacity-80"
                        />

                        {/* Live Overlay */}
                        <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-md text-sm font-bold text-white flex items-center gap-2 z-10">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            LIVE
                        </div>

                        {/* Controls Overlay (Hover) */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center text-white">
                                <div className="flex items-center gap-4">
                                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                                        <Video className="w-5 h-5" />
                                    </Button>
                                    <div className="text-sm">
                                        <p className="font-semibold">Current Affairs: Dec 11</p>
                                        <p className="text-gray-300 text-xs">Dr. Vikas Divyakirti</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-red-600 px-2 py-0.5 rounded text-xs font-bold">HD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Video Info Bar */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Daily Current Affairs Analysis (The Hindu)</h2>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 1,245 Watching</span>
                            <span>•</span>
                            <span>Started 45 mins ago</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="w-4 h-4" /> Share
                        </Button>
                        <Button variant="destructive" size="sm" onClick={onLeaveClass}>
                            Leave Class
                        </Button>
                    </div>
                </div>
            </div>

            {/* Live Chat Area */}
            <Card className="lg:col-span-1 flex flex-col h-full border-gray-200 shadow-sm bg-white">
                <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Live Chat</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>

                <ScrollArea className="flex-1 p-4 bg-gray-50/50">
                    <div className="space-y-4">
                        {/* Mock Chat Messages */}
                        <div className="flex gap-2 items-start opacity-70">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">R</div>
                            <div>
                                <p className="text-xs font-semibold text-gray-700">Rahul Kumar</p>
                                <p className="text-sm text-gray-600">Sir, what about Article 370?</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-start opacity-70">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">P</div>
                            <div>
                                <p className="text-xs font-semibold text-gray-700">Priya Singh</p>
                                <p className="text-sm text-gray-600">Voice is clear now, thank you sir.</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-start opacity-70">
                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">A</div>
                            <div>
                                <p className="text-xs font-semibold text-gray-700">Amit Verma</p>
                                <p className="text-sm text-gray-600">Please explain the last point again.</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-start">
                            <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">S</div>
                            <div>
                                <p className="text-xs font-semibold text-gray-700">Sneha Gupta</p>
                                <p className="text-sm text-gray-600">Yes, verified.</p>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="p-3 border-t border-gray-100 bg-white">
                    <div className="flex gap-2">
                        <Input placeholder="Chat as Student..." className="bg-gray-50 border-gray-200" />
                        <Button size="icon" className="bg-blue-600 text-white shrink-0">
                            <Heart className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
