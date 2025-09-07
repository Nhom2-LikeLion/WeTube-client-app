import WatchRoomLayout from "@/modules/rooms/ui/components/room/watchRoomLayout";

export default function WatchRoomPage({ params }: { params: { roomId: string } }) {
    return <WatchRoomLayout roomId={params.roomId} />;
}
