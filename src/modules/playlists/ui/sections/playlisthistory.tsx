"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { playlistService } from "../list/playlist-API";
import HistoryList from "./history-list";

export default function PlaylistWatch() {
  const { user } = useAuth();
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.sub) {
      setLoading(false);
      return;
    }

    const fetchWatchLater = async () => {
      try {
        const data = await playlistService.getByUserAndType(
          user.sub,
          "HISTORY"
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

  if (loading) return <p>Đang tải Watch Later...</p>;
  if (!playlistId) return <p>Không có playlist Watch Later</p>;

  return <HistoryList playlistId={playlistId} />;
}
