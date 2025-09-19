const API_BASE = "http://localhost:8080/api/playlists";

function jsonHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

export const playlistService = {
  create: async (
    data: { userId: string; title: string; description?: string; type: string }
  ) => {
    if (!data.userId) throw new Error("UserId is required");

    const res = await fetch(`${API_BASE}/create`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create playlist");
    return res.json();
  },

  getByUser: async (userId: string) => {
    if (!userId) throw new Error("UserId is required");

    const response = await fetch(`${API_BASE}/user/${userId}`, {
      headers: jsonHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    return await response.json();
  },

  getByType: async (userId: string, playlistType: string) => {
    if (!userId) throw new Error("UserId is required");

    const res = await fetch(
      `${API_BASE}/${userId}/playlistType?playlistType=${playlistType}`,
      { headers: jsonHeaders() }
    );
    if (!res.ok) throw new Error("Failed to fetch playlists by type");

    const json = await res.json();
    return json.data || json.playlists || json || [];
  },

  getDetail: async (playlistId: string) => {
    if (!playlistId) throw new Error("PlaylistVideoId is required");

    const res = await fetch(`${API_BASE}/detail/${playlistId}`, {
      headers: jsonHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch playlist detail");
    return res.json();
  },

  addVideo: async (playlistId: string, videoId: string) => {
    if (!playlistId || !videoId) throw new Error("PlaylistId and VideoId required");

    const res = await fetch(`${API_BASE}/videos/add`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ playlistId, videoId }),
    });
    if (!res.ok) throw new Error("Failed to add video to playlist");
    return res.json();
  },

  removeVideo: async (videoId: string, playlistVideoId: string) => {
    if (!videoId || !playlistVideoId) throw new Error("VideoId and PlaylistVideoId required");

    const res = await fetch(`${API_BASE}/${videoId}/${playlistVideoId}`, {
      method: "DELETE",
      headers: jsonHeaders(),
    });
    if (!res.ok) throw new Error("Failed to remove video from playlist");
    return res.json();
  },

  removePlaylist: async (playlistId: string) => {
    if (!playlistId) throw new Error("PlaylistId is required");

    const res = await fetch(`${API_BASE}/${playlistId}`, {
      method: "DELETE",
      headers: jsonHeaders(),
    });
    if (!res.ok) throw new Error("Failed to remove playlist");
    return res.json();
  },

  getRecentlyAdded: async (userId: string, limit: number = 5) => {
    if (!userId) throw new Error("UserId is required");

    const res = await fetch(`${API_BASE}/recentlyadded/${userId}?limit=${limit}`, {
      headers: jsonHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch recently added playlists");

    const json = await res.json();
    return json.data || json.playlists || json || [];
  },
};
