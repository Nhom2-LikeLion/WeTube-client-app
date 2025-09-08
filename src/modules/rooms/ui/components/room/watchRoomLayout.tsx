"use client";
import VideoPlayer from "../video/videoPlayer";
import ChatPanel from "./roomChat";
import UpcomingList from "./upcomingList";
import MemberList from "./membersList";

export default function WatchRoomLayout({roomId}: { roomId: string }) {
    return (
        <div className="flex flex-col w-full h-full bg-white text-black">
            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left: Video */}
                <div className="flex flex-col flex-[3] border-r border-neutral-800">
                    <div className="w-full max-w-5xl aspect-video">
                        <VideoPlayer/>
                    </div>

                    <div className="p-3 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-neutral-600">#Room {roomId}</div>
                            <MemberList/>
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                            <UpcomingList/>
                        </div>
                    </div>
                </div>

                {/* Right: Chat */}
                <div className="flex-[1.2] flex flex-col">
                    <ChatPanel roomId={roomId}/>
                </div>
            </div>
        </div>
    );
}
