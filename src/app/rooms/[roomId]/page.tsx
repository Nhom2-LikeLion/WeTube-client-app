import WatchRoomPageClient from "@/modules/rooms/watchRoomPageClient";

export default async function Page({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params; // unwrap Promise

    return <WatchRoomPageClient initialRoomId={roomId} />;
}
