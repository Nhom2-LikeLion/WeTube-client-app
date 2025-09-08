"use client";

import { useState } from "react";
import VideoPlayer from "../video/videoPlayer";
// import ChatPanel from "./roomChat";
import UpcomingList, { VideoItem } from "./upcomingList";
import MemberList from "./membersList";

const initialVideos: VideoItem[] = [
    { id: 1, title: "Funny Cats Compilation", thumbnail: "/thumb1.jpg", url: "https://res.cloudinary.com/demo/video/upload/cat.mp4" },
    { id: 2, title: "Lo-fi Study Beats", thumbnail: "/thumb2.jpg", url: "https://res.cloudinary.com/demo/video/upload/lofi.mp4" },
];

export default function WatchRoomLayout({ roomId }: { roomId: string }) {
    const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
    const [currentVideoId, setCurrentVideoId] = useState<number>(videos[0]?.id ?? -1);

    const currentVideo = videos.find(v => v.id === currentVideoId);

    return (
        <div className="flex flex-col w-full h-full bg-white text-black">
            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left: Video + Playlist */}
                <div className="flex flex-col flex-[3] border-r border-neutral-300">
                    {/* Video */}
                    <div className="w-full max-w-5xl aspect-video">
                        <VideoPlayer videoUrl={currentVideo?.url ?? ""} />
                    </div>

                    {/* Playlist */}
                    <div className="p-3 space-y-3 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-neutral-600">#Room {roomId}</div>
                            <MemberList />
                        </div>
                        <UpcomingList
                            videos={videos}
                            setVideos={setVideos}
                            currentVideoId={currentVideoId}
                            onPlay={setCurrentVideoId}
                        />
                    </div>
                </div>

                {/* Right: Chat */}
                <div className="flex-[1.2] flex flex-col">
                    {/*<ChatPanel roomId={roomId} />*/}
                </div>
            </div>
        </div>
    );
}
