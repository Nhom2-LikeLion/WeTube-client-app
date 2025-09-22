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

export interface VideoDetail {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  createAt: string;
  totalView: number;
  name: string;
  picture: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  count: number;
}

export interface RecommendResponse {
  video: RecommendedVideoItem[];
  tags: Tag[];
}

export interface VideoDetailResponse {
  detail: VideoDetail;
  recommend: RecommendResponse;
}

export interface VideoFormDetail {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  status: "ACTIVE" | "PRIVATE" | "UNLISTED" | "PENDING" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  duration: number;
}