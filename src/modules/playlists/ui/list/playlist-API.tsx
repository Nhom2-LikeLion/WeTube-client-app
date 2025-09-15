const API_BASE = "http://localhost:8080/api/playlists";

export const playlistService = {
  // Tạo playlist
  create: async (
    data: {
      userId: string;
      title: string;
      description?: string;
      type: string;
    },
    token?: string
  ) => {
    const res = await fetch(`${API_BASE}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create playlist");
    return res.json();
  },

  // Lấy tất cả playlist theo userId
  getByUser: async (userId: string, token?: string) => {
    const res = await fetch(`${API_BASE}/user/${userId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Failed to fetch playlists");

    const json = await res.json();
   
    return Array.isArray(json) ? json : json.data ?? [];
  },

  // Lấy playlist theo loại (playlistType)
  getByType: async (userId: string, playlistType: string, token?: string) => {
    const res = await fetch(
      `${API_BASE}/${userId}/playlistType?playlistType=${playlistType}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    if (!res.ok) throw new Error("Failed to fetch playlists by type");

    const json = await res.json();
    return Array.isArray(json) ? json : json.data ?? [];
  },

  // Xem chi tiết playlist
  getDetail: async (playlistVideoId: string, token?: string) => {
    const res = await fetch(`${API_BASE}/detail/${playlistVideoId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Failed to fetch playlist detail");

    return res.json();
  },

  // Thêm video vào playlist
  addVideo: async (playlistId: string, videoId: string, token?: string) => {
    const res = await fetch(`${API_BASE}/videos/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ playlistId, videoId }),
    });
    if (!res.ok) throw new Error("Failed to add video to playlist");
    return res.json();
  },

  // Xóa video khỏi playlist
  removeVideo: async (
    videoId: string,
    playlistVideoId: string,
    token?: string
  ) => {
    const res = await fetch(`${API_BASE}/${videoId}/${playlistVideoId}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Failed to remove video from playlist");
    return res.json();
  },

  // Xóa cả playlist
  removePlaylist: async (playlistId: string, token?: string) => {
    const res = await fetch(`${API_BASE}/${playlistId}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Failed to remove playlist");
    return res.json();
  },
};
