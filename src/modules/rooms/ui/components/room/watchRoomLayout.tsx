"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import VideoPlayer from "../video/videoPlayer";
import UpcomingList, { VideoItem } from "./upcomingList";
import MemberList from "./membersList";
import RoomChat from "@/modules/rooms/ui/components/room/roomChat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import axios from "axios";

const initialVideos: VideoItem[] = [
    {
        id: 1,
        title: "Funny Cats Compilation",
        thumbnail: "/thumb1.jpg",
        url: "https://res.cloudinary.com/demo/video/upload/cat.mp4",
    },
    {
        id: 2,
        title: "Travel Vlog",
        thumbnail: "/thumb4.jpg",
        url: "https://res.cloudinary.com/demo/video/upload/travel.mp4",
    },
];

export default function WatchRoomLayout() {
    const { roomId } = useParams<{ roomId: string }>();
    const [roomName, setRoomName] = useState("");
    const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
    const [currentVideoId, setCurrentVideoId] = useState<number>(
        videos[0]?.id ?? -1
    );
    const [livekitToken, setLivekitToken] = useState("");
    const [livekitUrl, setLivekitUrl] = useState("");
    const [userId] = useState("user-" + Math.floor(Math.random() * 1000));

    // fetch room info
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/rooms/${roomId}`);
                setRoomName(res.data.roomName);
            } catch (e) {
                console.error("❌ Cannot fetch room info", e);
            }
        };
        if (roomId) fetchRoom();
    }, [roomId]);

    // join room (only once per roomId)
    useEffect(() => {
        if (!roomId) return;
        if (livekitToken) return; // tránh gọi lặp

        const joinRoom = async () => {
            try {
                const res = await axios.post(
                    `http://localhost:8080/api/rooms/${roomId}/join`,
                    {
                        userId,
                        username: userId,
                    }
                );

                setLivekitToken(res.data.token);
                setLivekitUrl(res.data.livekitUrl);

                console.log("✅ Joined room:", roomId);
                console.log("🔗 LiveKit URL:", res.data.livekitUrl);
                console.log("🔑 Token:", res.data.token);
            } catch (e) {
                console.error("❌ Cannot join room", e);
            }
        };

        joinRoom();
    }, [roomId, livekitToken, userId]);

    const handleCopy = async () => {
        if (!roomId) return;
        await navigator.clipboard.writeText(roomId);
    };

    return (
        <div className="flex flex-col w-full h-full bg-white text-black">
            <div className="flex flex-1 overflow-hidden">
                {/* Left: Video + Playlist */}
                <div className="flex flex-col flex-[3] border-r border-neutral-300">
                    {/* Video */}
                    <div className="w-full max-w-5xl aspect-video">
                        <VideoPlayer
                            videos={videos}
                            currentVideoId={currentVideoId}
                            onChangeVideo={setCurrentVideoId}
                        />
                    </div>

                    {/* Playlist */}
                    <div className="p-3 space-y-3 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={handleCopy}
                                            className="text-sm text-neutral-700 font-medium hover:underline"
                                        >
                                            {roomName || "Untitled Room"}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Room ID: {roomId}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

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
                    {livekitToken && livekitUrl && (
                        <RoomChat roomId={roomId} token={livekitToken} livekitUrl={livekitUrl} />
                    )}
                </div>
            </div>
        </div>
    );
}
