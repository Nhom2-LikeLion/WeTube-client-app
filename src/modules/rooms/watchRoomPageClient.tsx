"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LiveKitRoomWrapper from "@/modules/rooms/ui/components/room/liveKitRoom";
import WatchRoomLayout from "@/modules/rooms/ui/components/room/watchRoomLayout";
import RoomModal from "@/modules/rooms/ui/components/room/roomModal";

export default function WatchRoomPageClient({ initialRoomId }: { initialRoomId?: string }) {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(!initialRoomId);
    const [roomId, setRoomId] = useState(initialRoomId || "");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // tạo userId cố định cho session
        const userId = "user-" + Math.floor(Math.random() * 1000);
        setUserId(userId);
    }, []);

    const handleRoomCreated = (newRoomId: string) => {
        setRoomId(newRoomId);
        setModalOpen(false);
        router.push(`/rooms/${newRoomId}`);
    };

    return (
        <div className="h-screen w-screen">
            {/* Modal tạo hoặc join room */}
            <RoomModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                onRoomCreated={handleRoomCreated}
            />

            {/* Khi đã có roomId và userId thì render LiveKit + layout */}
            {roomId && userId && (
                <LiveKitRoomWrapper roomId={roomId} userId={userId}>
                    <WatchRoomLayout />
                </LiveKitRoomWrapper>
            )}
        </div>
    );
}
