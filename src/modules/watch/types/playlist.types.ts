import { VideoMetadata } from './video.types';
import { User } from './comment.types';

export interface PlaylistItem {
  id: string;
  video: VideoMetadata;
  position: number;
  addedAt: Date;
  addedBy?: User;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  creator: User;
  items: PlaylistItem[];
  totalDuration: number;
  videoCount: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  currentIndex: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
}

export interface PlaylistControls {
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
  autoplay: boolean;
}