import PlaylistDetail from "@/modules/playlists/ui/list/playlistdetail-list";

export default function PlaylistDetailPage({
  params,
}: {
  params: { playlistId: string };
}) {
  return <PlaylistDetail playlistId={params.playlistId} />;
}