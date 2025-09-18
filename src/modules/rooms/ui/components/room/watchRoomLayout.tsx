"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "../video/videoPlayer";
import UpcomingList, { VideoItem } from "./upcomingList";
import MemberList from "./membersList";
import RoomChat from "./roomChat";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRouter } from "next/navigation";
import { API_PREFIX } from "@/constants/appConstant";

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
    {
        id: 3,
        title: "Travel Vlog",
        thumbnail: "/thumb4.jpg",
        url: "https://res.cloudinary.com/demo/video/upload/travel.mp4",
    },
];

interface WatchRoomLayoutProps {
    roomId: string;
    username: string;
}

export default function WatchRoomLayout({ roomId, username }: WatchRoomLayoutProps) {
    const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
    const [currentVideoId, setCurrentVideoId] = useState<number>(videos[0]?.id ?? -1);
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const router = useRouter();

    useEffect(() => {
        const socket = new SockJS(`${API_PREFIX}/ws`);
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log("[STOMP]", str),
            reconnectDelay: 5000,
        });

        client.onConnect = (frame) => {
            console.log("✅ Connected STOMP to room", roomId);
            console.log("STOMP frame:", frame);

            client.publish({
                destination: `/app/chat.${roomId}`,
                body: JSON.stringify({ type: "JOIN", sender: username }),
            });
        };

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [roomId, username]);

    const handleLeaveRoom = () => {
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/chat.${roomId}`,
                body: JSON.stringify({ type: "LEAVE", sender: username }),
            });
        }
        router.push("/");
    };

    return (
        <div className="flex flex-col flex-1 w-full h-full bg-white text-black p-4 overflow-hidden">
            {/* Main container */}
            <div className="flex flex-col md:flex-row w-full flex-1 gap-3 overflow-hidden min-w-0">
                {/* Left section */}
                <div className="flex flex-col flex-1 flex-auto md:flex-[2] gap-3 overflow-hidden">
                    {/* Video Player */}
                    <div className="w-full max-w-4xl mx-auto aspect-video bg-black rounded-lg shadow-lg overflow-hidden border border-gray-200">
                        <VideoPlayer
                            videos={videos}
                            currentVideoId={currentVideoId}
                            onChangeVideo={setCurrentVideoId}
                        />
                    </div>

                    {/* Upcoming + Members */}
                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col border border-gray-200 overflow-hidden">
                        {stompClient && (
                            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold text-gray-800">Upcoming Videos</h2>
                                <button
                                    onClick={handleLeaveRoom}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
                                >
                                    Leave Room
                                </button>
                            </div>
                        )}

                        <div className="flex-1 overflow-x-auto overflow-y-hidden">
                            <div className="flex gap-3">
                                <UpcomingList
                                    videos={videos}
                                    setVideos={setVideos}
                                    currentVideoId={currentVideoId}
                                    onPlay={setCurrentVideoId}
                                />
                            </div>
                        </div>

                        {/* Member list - không cần flex chiếm chỗ */}
                        {stompClient && (
                            <div className="mt-2">
                                <MemberList roomId={roomId} stompClient={stompClient} />
                            </div>
                        )}
                    </div>

                </div>

                {/* Right section: Room Chat */}
                <div className="flex flex-col md:flex-[1.1] bg-gray-100 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    {stompClient && (
                        <div className="flex-1 overflow-y-auto">
                            <RoomChat
                                roomId={roomId}
                                username={username}
                                stompClient={stompClient}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}