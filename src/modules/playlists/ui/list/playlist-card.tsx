import Link from "next/link";
import { useState, useEffect } from "react";

export interface Video {
  videoId: string;
  thumbnailUrl: string;
  createdAt: string;
}

export interface Playlists {
  playlistId: string;
  playlistTitle: string;
  playlistType: string;
  totalVideos: number;
  createdAt: string;
  privacy: string;
  lastUpdatedLabel: string | null;
  videos: Video[];
}

export default function PlaylistCard({
  playlist,
  category,
}: {
  playlist: Playlists;
  category: string;
}) {
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (playlist.videos?.length) {
      // Lấy video mới nhất
      const newest = playlist.videos.reduce(
        (latest, current) =>
          new Date(current.createdAt) > new Date(latest.createdAt)
            ? current
            : latest,
        playlist.videos[0]
      );
      setLatestVideo(newest);
    }
  }, [playlist.videos]);

  const thumbnail = latestVideo?.thumbnailUrl || "/default-thumbnail.jpg";

  const href =
    category === "watchlater"
      ? "/playlists/watchlater"
      : category === "liked"
      ? "/playlists/liked"
      : `/playlists/${playlist.playlistId}?category=${category.toLowerCase()}`;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative aspect-video">
        <img src={thumbnail} alt={playlist.playlistTitle} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {playlist.totalVideos} video
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{playlist.playlistTitle}</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p>{playlist.privacy || "Public"} • Danh sách phát</p>
          {playlist.lastUpdatedLabel && <p className="text-gray-500">{playlist.lastUpdatedLabel}</p>}
          <Link href={href} className="text-xs text-black hover:underline font-medium">
            Xem toàn bộ danh sách
          </Link>
        </div>
      </div>
    </div>
  );
}
