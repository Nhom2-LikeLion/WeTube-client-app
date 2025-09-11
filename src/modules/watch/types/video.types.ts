export interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  uploadDate: Date;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  tags: string[];
  category: string;
  language: string;
  isLive: boolean;
  isPrivate: boolean;
  ageRestricted: boolean;
  videoUrl: string;
}

export interface VideoSource {
  url: string;
  quality: VideoQuality;
  format: VideoFormat;
  size?: number; // file size in bytes
}

export type VideoQuality = '144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '2160p' | 'auto';
export type VideoFormat = 'mp4' | 'webm' | 'hls' | 'dash';

export interface VideoPlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  isBuffering: boolean;
  isMuted: boolean;
  volume: number; // 0-1
  currentTime: number;
  duration: number;
  playbackRate: number;
  quality: VideoQuality;
  isFullscreen: boolean;
  error: string | null;
}

export interface VideoPlayerEvents {
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
  onVolumeChange?: (volume: number) => void;
  onQualityChange?: (quality: VideoQuality) => void;
  onError?: (error: string) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onBufferStart?: () => void;
  onBufferEnd?: () => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export interface UseVideoPlayerReturn {
  playerState: VideoPlayerState;
  playerRef: React.RefObject<HTMLVideoElement>;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
  setPlaybackRate: (rate: number) => void;
  setQuality: (quality: VideoQuality) => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
}