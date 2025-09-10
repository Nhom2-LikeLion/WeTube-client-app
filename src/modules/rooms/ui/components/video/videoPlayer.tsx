"use client";

import { useEffect, useRef } from "react";
import { VideoItem } from "../room/upcomingList";

interface VideoPlayerProps {
    videos: VideoItem[];
    currentVideoId: number;
    onChangeVideo: (id: number) => void;
}

export default function VideoPlayer({
                                        videos,
                                        currentVideoId,
                                        onChangeVideo,
                                    }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const currentVideo = videos.find((v) => v.id === currentVideoId);

    useEffect(() => {
        if (videoRef.current && currentVideo) {
            videoRef.current.load();
            videoRef.current.play().catch(() => {
                console.log("Autoplay bị chặn, user cần click vào video.");
            });
        }
    }, [currentVideoId]);

    const handleEnded = () => {
        const currentIndex = videos.findIndex((v) => v.id === currentVideoId);
        if (currentIndex >= 0 && currentIndex < videos.length - 1) {
            onChangeVideo(videos[currentIndex + 1].id);
        } else {
            onChangeVideo(videos[0].id);
        }
    };

    if (!currentVideo) return null;

    return (
        <video
            ref={videoRef}
            key={currentVideo.id}
            src={currentVideo.url}
            controls
            autoPlay
            className="w-full h-full rounded-lg"
            onEnded={handleEnded}
        />
    );
}
