import WatchRoomPageClient from "@/modules/rooms/watchRoomPageClient";

interface RoomPageProps {
    params: { roomId: string };
}

export default async function RoomPage({ params }: RoomPageProps) {
    const {roomId} = params;
    return <WatchRoomPageClient initialRoomId={roomId}/>;
}
