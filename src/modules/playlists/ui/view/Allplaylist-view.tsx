import React from "react";
import Playlistlist from '../list/playlist-list';
import { useAuth } from "@/contexts/auth-context";

export default function Allplaylist() {
  const { user } = useAuth();

  return (
    <div>
      {user?.sub ? (
        <Playlistlist userId={user.sub} />
      ) : (
        <p>Không tìm thấy user</p>
      )}
    </div>
  );
}
