"use client";

import LiveKitRoomWrapper from "@/modules/rooms/ui/components/room/liveKitRoom";
import WatchRoomLayout from "@/modules/rooms/ui/components/room/watchRoomLayout";

export default function WatchRoomPage({ params }: { params: { roomId: string } }) {
    const userId = "user-" + Math.floor(Math.random() * 1000);

    return (
        <LiveKitRoomWrapper roomId={params.roomId} userId={userId}>
            <WatchRoomLayout roomId={params.roomId} />
        </LiveKitRoomWrapper>
    );
}
