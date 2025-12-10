"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, ExternalLink } from "lucide-react";

interface Video {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    url?: string;
}

interface VideoGridProps {
    videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
                <a
                    key={video.id}
                    href={video.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md h-full flex flex-col">
                        <div className="relative aspect-video bg-gray-900 group-hover:opacity-90 transition-opacity">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                <PlayCircle className="w-14 h-14 text-white drop-shadow-lg scale-100 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                                {video.duration}
                            </div>
                            {video.url && (
                                <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                        <CardContent className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors text-base leading-snug">
                                    {video.title}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium">YouTube • Free Lecture</p>
                            </div>
                        </CardContent>
                    </Card>
                </a>
            ))}
        </div>
    );
}
