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
  historyDuration?: number;
}

export interface VideoDetailResponseDto {
  detail: VideoDetailDto;
  recommend: RecommendResponseDto;
}

export interface VideoDetailDto {
  id: string; // UUID dạng string
  title: string;
  description: string;
  videoUrl: string;
  createAt: string; // LocalDate -> string (YYYY-MM-DD)
  totalView: number;
  name: string;
  picture: string;
  totalSubscribers:number;
  comments: Comment[];
  subscribed: boolean;
  channelId: string;
}

export interface RecommendResponseDto {
  video: RecommendVideoDto[];
  tags: TagDto[];
}

export interface RecommendVideoDto {
  id: string;
  title: string;
  thumbnailUrl: string;
  totalView: number;
  createAt: string; // LocalDate -> string
  name: string;
  duration: number; // Long -> number
  picture: string;
}

export interface TagDto {
  id: string;
  name: string;
  createdAt: string; // LocalDateTime -> string (ISO format)
  count: number;
}

export interface ApiUser {
    id: string;
    name: string;
    picture: string;
}

export interface ApiComment {
    id: string;
    content: string;
    user: ApiUser;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
    replyCount: number | null;
    replies: ApiComment[] | null;
}

export interface Short {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl?: string;
    views: number;
    channel?: {
        id: string;
        name: string;
        avatar?: string;
    };
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


export interface VideoDetailResponseDto {
  detail: VideoDetailDto;
  recommend: RecommendResponseDto;
}

export interface VideoDetailDto {
  id: string; // UUID dạng string
  title: string;
  description: string;
  videoUrl: string;
  createAt: string; // LocalDate -> string (YYYY-MM-DD)
  totalView: number;
  name: string;
  picture: string;
  totalSubscribers: number;
  comments: Comment[];
}

export interface RecommendResponseDto {
  video: RecommendVideoDto[];
  tags: TagDto[];
}

export interface RecommendVideoDto {
  id: string;
  title: string;
  thumbnailUrl: string;
  totalView: number;
  createAt: string; // LocalDate -> string
  name: string;
  duration: number; // Long -> number
  picture: string;
}

export interface TagDto {
  id: string;
  name: string;
  createdAt: string; // LocalDateTime -> string (ISO format)
  count: number;
}

export interface ApiUser {
  id: string;
  name: string;
  picture: string;
}

export interface ApiComment {
  id: string;
  content: string;
  user: ApiUser;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  replyCount: number | null;
  replies: ApiComment[] | null;
}

export interface RelatedVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  totalView: number;
  createAt: string;
  name: string;
  duration: number;
  picture: string;
}

