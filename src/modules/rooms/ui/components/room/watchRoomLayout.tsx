"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "../video/videoPlayer";
import UpcomingList, { VideoItem } from "./upcomingList";
import MemberList from "./membersList";
import RoomChat from "./roomChat";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";

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
        title: "Another Travel Vlog",
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
    const [chatOpen, setChatOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const socket = new SockJS(`https://wetube.name.vn/ws`);
        const client = new Client({
            webSocketFactory: () => socket,
            // debug: (str) => console.log("[STOMP]", str),
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
        <div className="flex flex-col flex-1 w-full h-full bg-white text-black p-3 md:p-4 overflow-hidden">
            <div className="flex flex-col lg:flex-row w-full h-full gap-4 overflow-hidden">

                <div className="flex flex-col flex-1 gap-4 min-w-0">

                    <div className="flex-1 w-full aspect-video bg-black rounded-lg shadow-lg overflow-hidden">
                        <VideoPlayer
                            videos={videos}
                            currentVideoId={currentVideoId}
                            onChangeVideo={setCurrentVideoId}
                        />
                    </div>

                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col border border-gray-200 overflow-hidden">
                        {stompClient && (
                            <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-2">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                                    Upcoming Videos
                                </h2>
                                <button
                                    onClick={handleLeaveRoom}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
                                >
                                    Leave Room
                                </button>
                            </div>
                        )}

                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
                            <UpcomingList
                                videos={videos}
                                setVideos={setVideos}
                                currentVideoId={currentVideoId}
                                onPlay={setCurrentVideoId}
                            />
                        </div>

                        {stompClient && (
                            <div className="mt-3">
                                <MemberList
                                    roomId={roomId}
                                    stompClient={stompClient}
                                    username={username}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden lg:flex w-full lg:w-[30%] flex-col bg-gray-100 rounded-lg shadow-lg border border-gray-200 overflow-hidden min-h-[300px]">
                    {stompClient && (
                        <div className="flex-1 overflow-y-auto">
                            <RoomChat roomId={roomId} username={username} stompClient={stompClient} />
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={() => setChatOpen(true)}
                className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {chatOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
                    <div className="bg-white w-full h-3/4 rounded-t-lg shadow-lg flex flex-col">
                        <div className="flex justify-between items-center p-3 border-b">
                            <h2 className="font-semibold text-lg">Room Chat</h2>
                            <button
                                onClick={() => setChatOpen(false)}
                                className="text-gray-600 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {stompClient && (
                                <RoomChat roomId={roomId} username={username} stompClient={stompClient} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
