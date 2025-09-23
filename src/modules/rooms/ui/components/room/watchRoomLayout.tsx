"use client";

import { useEffect, useState } from "react";
import UpcomingList, { VideoItem } from "./upcomingList";
import MemberList from "./membersList";
import RoomChat from "./roomChat";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import VideoSync from "../video/videoSync";

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

export default function WatchRoomLayout({
                                            roomId,
                                            username,
                                        }: WatchRoomLayoutProps) {
    const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
    const [currentVideoId, setCurrentVideoId] = useState<number>(
        videos[0]?.id ?? -1
    );
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [members, setMembers] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            console.log("✅ Connected STOMP to room", roomId);

            client.subscribe(`/topic/room.${roomId}`, (msg) => {
                const data = JSON.parse(msg.body);
                handleIncomingMessage(data);
            });

            // Thông báo join
            client.publish({
                destination: `/app/room/${roomId}`,
                body: JSON.stringify({
                    type: "MEMBER",
                    sender: username,
                    action: "JOIN",
                }),
            });
        };

        client.activate();
        setStompClient(client);

        return () => {
            if (client.connected) {
                client.publish({
                    destination: `/app/room/${roomId}`,
                    body: JSON.stringify({
                        type: "MEMBER",
                        sender: username,
                        action: "LEAVE",
                    }),
                });
            }
            client.deactivate();
        };
    }, [roomId, username]);

    const handleIncomingMessage = (data: any) => {
        switch (data.type) {
            case "CHAT":
                // RoomChat sẽ tự subscribe messages qua props
                break;
            case "MEMBER":
                if (data.currentUsers) setMembers(data.currentUsers);
                break;
            case "UPCOMING":
                if (data.action === "ADD") {
                    setVideos((prev) => [
                        ...prev,
                        {
                            id: Number(data.videoId),
                            title: data.content,
                            thumbnail: data.thumbnail,
                            url: data.url,
                        },
                    ]);
                } else if (data.action === "REORDER") {
                    setVideos(data.videos);
                }
                break;
            case "VIDEO":
                break;
            default:
                break;
        }
    };

    const handleLeaveRoom = () => {
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/room/${roomId}`,
                body: JSON.stringify({
                    type: "MEMBER",
                    sender: username,
                    action: "LEAVE",
                }),
            });
        }
        router.push("/");
    };

    const handleAddVideo = (video: VideoItem) => {
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/room/${roomId}`,
                body: JSON.stringify({
                    type: "UPCOMING",
                    action: "ADD",
                    sender: username,
                    videoId: video.id,
                    content: video.title,
                    thumbnail: video.thumbnail,
                    url: video.url,
                }),
            });
        }
    };

    const handleReorderVideos = (newVideos: VideoItem[]) => {
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/room/${roomId}`,
                body: JSON.stringify({
                    type: "UPCOMING",
                    action: "REORDER",
                    sender: username,
                    videos: newVideos,
                }),
            });
        }
        setVideos(newVideos);
    };

    return (
        <div className="flex flex-col flex-1 w-full h-full bg-white text-black p-3 md:p-4 overflow-hidden">
            <div className="flex flex-col lg:flex-row w-full h-full gap-4 overflow-hidden">
                {/* Left Column */}
                <div className="flex flex-col flex-1 gap-4 min-w-0">
                    <div className="flex-1 w-full aspect-video bg-black rounded-lg shadow-lg overflow-hidden">
                        {stompClient && (
                            <VideoSync
                                roomId={roomId}
                                username={username}
                                stompClient={stompClient}
                                initialUrl={
                                    videos.find((v) => v.id === currentVideoId)?.url || ""
                                }
                                isHost={true} // fake host cho test
                            />
                        )}
                    </div>

                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col border border-gray-200 overflow-hidden">
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

                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
                            <UpcomingList
                                videos={videos}
                                setVideos={setVideos}
                                currentVideoId={currentVideoId}
                                onPlay={setCurrentVideoId}
                                onAddVideo={handleAddVideo}
                                onReorderVideos={handleReorderVideos}
                            />
                        </div>

                        <div className="mt-3">
                            <MemberList members={members} username={username} />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="hidden lg:flex w-full lg:w-[30%] flex-col bg-gray-100 rounded-lg shadow-lg border border-gray-200 overflow-hidden min-h-[300px]">
                    <div className="flex-1 overflow-y-auto">
                        {stompClient && (
                            <RoomChat
                                roomId={roomId}
                                username={username}
                                stompClient={stompClient}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Chat Button */}
            <button
                onClick={() => setChatOpen(true)}
                className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Mobile Chat Modal */}
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
                                <RoomChat
                                    roomId={roomId}
                                    username={username}
                                    stompClient={stompClient}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
