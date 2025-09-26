"use client";
import { useRoomStore } from "@/store/zustand/useRoomStore";
import { useStompStore } from "@/store/zustand/useStompStore";
import { VideoRoom } from "@/types/room";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoPlayer from "../video/videoPlayer";
import MemberList from "./membersList";
import RoomChat from "./roomChat";
import UpcomingList from "./upcomingList";

export default function WatchRoomLayout() {
  const [chatOpen, setChatOpen] = useState(false);
  const router = useRouter();
  const { client, connected, connect, publish, subscribe } = useStompStore();
  const { room, myUsername } = useRoomStore();
  const [videos, setVideos] = useState<VideoRoom[]>(room?.playlist ?? []);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(
    videos.length > 0 ? videos[0].id : null
  );

  useEffect(() => {
    if (!connected) {
      connect().catch((err) => {
        console.error("Failed to connect STOMP:", err);
      });
    }
  }, []);

  const handleLeaveRoom = () => {
    if (client?.connected) {
      publish(`/app/chat/${room?.roomId}`, {
        type: "LEAVE",
        sender: myUsername,
      });
    }
    router.push("/"); // Redirect to home or other page after leaving the room
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full bg-white text-black p-3 md:p-4 overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full gap-4 overflow-hidden">
        <div className="flex flex-col flex-1 gap-4 min-w-0">
          {/* Video Player */}
          <div className="flex-1 w-full aspect-video bg-black rounded-lg shadow-lg overflow-hidden">
            <VideoPlayer onChangeVideo={setCurrentVideoId} />
          </div>

          {/* Upcomming Video and Leave Room */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col border border-gray-200 overflow-hidden">
            {room && (
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
              <UpcomingList onPlay={setCurrentVideoId} roomId={room!.roomId} />
            </div>

            {room && client && (
              <div className="mt-3">
                <MemberList
                  roomId={room?.roomId}
                  stompClient={client}
                  username={myUsername}
                />
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-[30%] flex-col bg-gray-100 rounded-lg shadow-lg border border-gray-200 overflow-hidden min-h-[300px]">
          {room && (
            <div className="flex-1 overflow-y-auto">
              <RoomChat
                roomId={room.roomId}
                username={myUsername}
                stompClient={client!}
              />
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
              {room && client && (
                <RoomChat
                  roomId={room?.roomId}
                  username={myUsername}
                  stompClient={client}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
