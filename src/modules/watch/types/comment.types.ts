export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
  subscriberCount?: number;
  channelUrl?: string;
  joinDate?: Date;
}

export interface Channel extends User {
  description: string;
  bannerImage: string;
  videoCount: number;
  totalViews: number;
  isSubscribed: boolean;
  notificationLevel: 'all' | 'personalized' | 'none';
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  editedAt?: Date;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
  isPinned: boolean;
  isHeartedByCreator: boolean;
  replies?: Comment[];
  replyCount: number;
  isReply: boolean;
  parentId?: string;
  mentionedUsers?: User[];
}

export interface CommentSortOption {
  value: 'top' | 'newest' | 'oldest';
  label: string;
}

export interface CommentFormData {
  content: string;
  parentId?: string;
  mentionedUsers?: string[];
}

export interface CommentSectionState {
  comments: Comment[];
  totalCount: number;
  isLoading: boolean;
  hasMore: boolean;
  sortBy: CommentSortOption['value'];
  error: string | null;
}