// PlaylistWatch.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import PlaylistDetail from "../list/playlistdetail-list";
import { playlistService } from "../list/playlist-API";

export default function Playlistliked() {
  const { user } = useAuth();
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.sub) return;

    const fetchWatchLater = async () => {
      try {
        const data = await playlistService.getByUserAndType(
          user.sub,
          "LIKED"
        );

        if (Array.isArray(data) && data.length > 0) {
          setPlaylistId(data[0].playlistId);
        } else {
          console.warn("Không tìm thấy Watch Later playlist");
        }
      } catch (err) {
        console.error("Lỗi fetch Watch Later:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchLater();
  }, [user?.sub]);

  if (loading) return <p>Đang tải...</p>;
  if (!playlistId) return <p>Không có playlist liked</p>;

  return <PlaylistDetail playlistId={playlistId} />;
}
