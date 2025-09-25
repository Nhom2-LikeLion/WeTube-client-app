"use client";

import { useAuth } from "@/contexts/auth-context";
import HistoryList from "./history-list";

export default function Playlisthistory() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Đang tải thông tin người dùng...</p>;
  }

  if (!user?.sub) {
    return <p>Bạn cần đăng nhập để xem lịch sử</p>;
  }

  return <HistoryList userId={user?.sub} />;
}
