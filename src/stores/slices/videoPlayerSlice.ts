// import { StateCreator } from 'zustand';
// import { VideoPlayerState, VideoQuality } from '@/modules/watch/types/video.types';

// export interface VideoPlayerSlice {
//   // State
//   videoPlayer: {
//     currentVideo: string | null;
//     playerState: VideoPlayerState;
//     bufferedRanges: TimeRanges | null;
//     error: string | null;
//     isInitialized: boolean;
//   };

//   // Actions
//   videoPlayerActions: {
//     // Player control actions
//     setPlaying: (isPlaying: boolean) => void;
//     setPaused: (isPaused: boolean) => void;
//     setCurrentTime: (time: number) => void;
//     setDuration: (duration: number) => void;
//     setVolume: (volume: number) => void;
//     setMuted: (isMuted: boolean) => void;
//     setPlaybackRate: (rate: number) => void;
//     setQuality: (quality: VideoQuality) => void;
//     setBuffering: (isBuffering: boolean) => void;
//     setLoading: (isLoading: boolean) => void;
//     setError: (error: string | null) => void;

//     // Batch updates for performance
//     updatePlayerState: (updates: Partial<VideoPlayerState>) => void;
//     resetPlayer: () => void;
//     initializePlayer: (videoId: string) => void;
//   };
// }

// const initialPlayerState: VideoPlayerState = {
//   isPlaying: false,
//   isPaused: true,
//   isLoading: false,
//   isBuffering: false,
//   isMuted: false,
//   volume: 1,
//   currentTime: 0,
//   duration: 0,
//   playbackRate: 1,
//   quality: 'auto',
//   isFullscreen: false,
//   error: null,
// };

// export const createVideoPlayerSlice: StateCreator<
//   VideoPlayerSlice,
//   [['zustand/immer', never]],
//   [],
//   VideoPlayerSlice
// > = (set, get) => ({
//   videoPlayer: {
//     currentVideo: null,
//     playerState: initialPlayerState,
//     bufferedRanges: null,
//     error: null,
//     isInitialized: false,
//   },

//   videoPlayerActions: {
//     setPlaying: (isPlaying) =>
//       set((state) => {
//         state.videoPlayer.playerState.isPlaying = isPlaying;
//         state.videoPlayer.playerState.isPaused = !isPlaying;
//       }),

//     setPaused: (isPaused) =>
//       set((state) => {
//         state.videoPlayer.playerState.isPaused = isPaused;
//         state.videoPlayer.playerState.isPlaying = !isPaused;
//       }),

//     setCurrentTime: (time) =>
//       set((state) => {
//         state.videoPlayer.playerState.currentTime = time;
//       }),

//     setDuration: (duration) =>
//       set((state) => {
//         state.videoPlayer.playerState.duration = duration;
//       }),

//     setVolume: (volume) =>
//       set((state) => {
//         state.videoPlayer.playerState.volume = Math.max(0, Math.min(1, volume));
//       }),

//     setMuted: (isMuted) =>
//       set((state) => {
//         state.videoPlayer.playerState.isMuted = isMuted;
//       }),

//     setPlaybackRate: (rate) =>
//       set((state) => {
//         state.videoPlayer.playerState.playbackRate = rate;
//       }),

//     setQuality: (quality) =>
//       set((state) => {
//         state.videoPlayer.playerState.quality = quality;
//       }),

//     setBuffering: (isBuffering) =>
//       set((state) => {
//         state.videoPlayer.playerState.isBuffering = isBuffering;
//       }),

//     setLoading: (isLoading) =>
//       set((state) => {
//         state.videoPlayer.playerState.isLoading = isLoading;
//       }),

//     setError: (error) =>
//       set((state) => {
//         state.videoPlayer.error = error;
//         state.videoPlayer.playerState.error = error;
//       }),

//     // Batch update for performance - shallow merge
//     updatePlayerState: (updates) =>
//       set((state) => {
//         Object.assign(state.videoPlayer.playerState, updates);
//       }),

//     resetPlayer: () =>
//       set((state) => {
//         state.videoPlayer.playerState = { ...initialPlayerState };
//         state.videoPlayer.error = null;
//         state.videoPlayer.bufferedRanges = null;
//       }),

//     initializePlayer: (videoId) =>
//       set((state) => {
//         state.videoPlayer.currentVideo = videoId;
//         state.videoPlayer.isInitialized = true;
//         state.videoPlayer.playerState = { ...initialPlayerState };
//       }),
//   },
// });
