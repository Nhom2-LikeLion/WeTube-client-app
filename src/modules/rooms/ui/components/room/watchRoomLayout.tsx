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
        <div className="flex flex-col h-screen bg-white text-black p-4 space-y-4 md:space-y-0">
            {/* Main container - flex-col on mobile, flex-row on larger screens */}
            <div className="flex flex-col md:flex-row w-full flex-1 gap-4 overflow-hidden">

                {/* Left section: Video Player & Upcoming List */}
                <div className="flex flex-col flex-auto md:flex-[3] space-y-4">
                    {/* Video Player Card */}
                    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden border border-gray-200 aspect-video">
                        <VideoPlayer
                            videos={videos}
                            currentVideoId={currentVideoId}
                            onChangeVideo={setCurrentVideoId}
                        />
                    </div>

                    {/* Upcoming List & Members Card */}
                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 space-y-4 flex flex-col flex-1 border border-gray-200">
                        {stompClient && (
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-4">
                                <h2 className="text-xl font-semibold text-gray-800">Upcoming Videos</h2>
                                <button
                                    onClick={handleLeaveRoom}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
                                >
                                    Leave Room
                                </button>
                            </div>
                        )}
                        <UpcomingList
                            videos={videos}
                            setVideos={setVideos}
                            currentVideoId={currentVideoId}
                            onPlay={setCurrentVideoId}
                        />
                        {stompClient && (
                            <MemberList roomId={roomId} stompClient={stompClient} />
                        )}
                    </div>
                </div>

                {/* Right section: Room Chat */}
                <div className="flex flex-col md:flex-[1.2] min-h-[40vh] md:min-h-0 bg-gray-100 rounded-lg shadow-lg border border-gray-200">
                    {stompClient && (
                        <RoomChat roomId={roomId} username={username} stompClient={stompClient} />
                    )}
                </div>

            </div>
        </div>
    );
}