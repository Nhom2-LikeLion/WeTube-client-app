"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "../video/videoPlayer";
import UpcomingList, { VideoItem } from "./upcomingList";
import MemberList from "./membersList";
import RoomChat from "./roomChat";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

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

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log("[STOMP]", str),
            reconnectDelay: 5000,
        });

        client.onConnect = (frame) => {
            console.log("✅ Connected STOMP to room", roomId);
            console.log("STOMP frame:", frame);

            // Gửi sự kiện JOIN ngay sau khi connect
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

    return (
        <div className="flex flex-col w-full h-full bg-white text-black">
            <div className="flex flex-1 overflow-hidden">
                {/* Left: Video + Playlist */}
                <div className="flex flex-col flex-[3] border-r border-neutral-300">
                    <div className="w-full max-w-5xl aspect-video">
                        <VideoPlayer
                            videos={videos}
                            currentVideoId={currentVideoId}
                            onChangeVideo={setCurrentVideoId}
                        />
                    </div>

                    <div className="p-3 space-y-3 overflow-y-auto">
                        {stompClient && <MemberList roomId={roomId} stompClient={stompClient} />}
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
                    {stompClient && (
                        <RoomChat roomId={roomId} username={username} stompClient={stompClient} />
                    )}
                </div>
            </div>
        </div>
    );
}
