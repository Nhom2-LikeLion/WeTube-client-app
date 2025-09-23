"use client";

import {useParams, useRouter, useSearchParams } from "next/navigation";
import WatchRoomLayout from "@/modules/rooms/ui/components/room/watchRoomLayout";

export default function WatchRoomPageClient({ initialRoomId }: { initialRoomId?: string }) {
    const params = useParams();
    const searchParams = useSearchParams();
    // roomId từ dynamic route: /rooms/[roomId]
    const roomId = params?.roomId as string;
    // username từ query string: ?username=abc
    const username = searchParams.get("username");

    return (
        <div className="relative h-full w-full">
            {roomId && username && (
                <WatchRoomLayout roomId={roomId} username={username} />
            )}
        </div>
    );
}