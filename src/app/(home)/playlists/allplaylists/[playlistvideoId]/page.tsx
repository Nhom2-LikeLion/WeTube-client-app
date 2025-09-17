import PlaylistDetail from "@/modules/playlists/ui/list/seelater-list";

export default function PlaylistDetailPage({
  params,
}: {
  params: { playlistId: string };
}) {
  return <PlaylistDetail playlistId={params.playlistId} />;
}