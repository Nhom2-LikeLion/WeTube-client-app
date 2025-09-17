export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  createdAt: string;
  author?: Author;
  userId?: string;
  views?: number;
}

export interface RecommendedVideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  totalView: number;
  createAt: string;
  name: string;       // ChannelName
  duration: number;
  picture: string;    // avatar
  uploadedAgo?: string; // Computing from createdAt
}
