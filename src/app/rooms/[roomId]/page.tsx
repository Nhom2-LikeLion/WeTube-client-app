import WatchRoomPageClient from "@/modules/rooms/watchRoomPageClient";

interface RoomPageProps {
  params: Promise<{ roomId: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { roomId } = await params;
  return <WatchRoomPageClient initialRoomId={roomId} />;
}
