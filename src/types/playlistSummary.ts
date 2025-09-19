export interface PlaylistSummary {
  playlistId: string;
  playlistTitle: string;
  playlistType: string;
  totalVideos: number;
  createdAt: string;
}

export interface VideoFromApi {
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  historyDuration: number;
}

export interface PlaylistDetail extends PlaylistSummary {
  videos: VideoFromApi[];
}

export interface VideoFromPlaylist {
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  thumbnailUrl: string;
}
