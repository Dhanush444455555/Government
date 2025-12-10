"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LiveClassStudioProps {
    onEndClass: () => void;
}

export default function LiveClassStudio({ onEndClass }: LiveClassStudioProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Could not access camera/microphone. Please check permissions.");
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
            setIsVideoOff(!isVideoOff);
        }
    };

    return (
        <Card className="overflow-hidden bg-gray-900 border-gray-800 text-white shadow-2xl">
            {/* Main Video Area */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted // Local preview should be muted to avoid feedback
                    className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
                />

                {isVideoOff && (
                    <div className="flex flex-col items-center text-gray-400">
                        <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                            <VideoOff className="w-10 h-10" />
                        </div>
                        <p>Camera is off</p>
                    </div>
                )}

                {/* Overlays */}
                <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-md text-sm font-bold animate-pulse flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    LIVE
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Users className="w-4 h-4" /> 1,245 Students
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="p-4 flex items-center justify-between border-t border-gray-800 bg-gray-900">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg">Daily Current Affairs Analysis</h3>
                        <p className="text-gray-400 text-xs">UPSC Batch 2025 • 45:20 elapsed</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="secondary"
                        size="icon"
                        className={`rounded-full w-12 h-12 ${isMuted ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-gray-800 hover:bg-gray-700'}`}
                        onClick={toggleMute}
                    >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>

                    <Button
                        variant="secondary"
                        size="icon"
                        className={`rounded-full w-12 h-12 ${isVideoOff ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-gray-800 hover:bg-gray-700'}`}
                        onClick={toggleVideo}
                    >
                        {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                    </Button>

                    <Button
                        variant="destructive"
                        className="rounded-full px-6 font-semibold bg-red-600 hover:bg-red-700"
                        onClick={onEndClass}
                    >
                        <PhoneOff className="w-4 h-4 mr-2" />
                        End Class
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="text-gray-400 hover:text-white">
                        <MessageSquare className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
