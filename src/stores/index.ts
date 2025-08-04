import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { subscribeWithSelector } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { createVideoPlayerSlice, VideoPlayerSlice } from './slices/videoPlayerSlice';
import { createViewModeSlice, ViewModeSlice } from './slices/viewModeSlice';
import { createCommentSlice, CommentSlice } from './slices/commentSlice';
import { createPlaylistSlice, PlaylistSlice } from './slices/playlistSlice';
import { createUISlice, UISlice } from './slices/uiSlice';

export type WatchStore = VideoPlayerSlice & 
                        ViewModeSlice & 
                        CommentSlice & 
                        PlaylistSlice & 
                        UISlice;

export const useWatchStore = create<WatchStore>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createVideoPlayerSlice(...a),
        ...createViewModeSlice(...a),
        ...createCommentSlice(...a),
        ...createPlaylistSlice(...a),
        ...createUISlice(...a),
      }))
    ),
    {
      name: 'watch-store',
    }
  )
);

// Selector hooks for performance optimization
export const useVideoPlayerState = () =>
  useWatchStore(useShallow((state) => state.videoPlayer));

export const useVideoPlayerActions = () =>
  useWatchStore((state) => state.videoPlayerActions);

export const useViewModeState = () =>
  useWatchStore(useShallow((state) => state.viewMode));

export const useViewModeActions = () =>
  useWatchStore((state) => state.viewModeActions);

export const useCommentState = (videoId: string) =>
  useWatchStore(useShallow((state) => state.comments.byVideoId[videoId]));

export const useCommentActions = () =>
  useWatchStore((state) => state.commentActions);

export const usePlaylistState = () =>
  useWatchStore(useShallow((state) => state.playlist));

export const usePlaylistActions = () =>
  useWatchStore((state) => state.playlistActions);

export const useUIState = () =>
  useWatchStore(useShallow((state) => state.ui));

export const useUIActions = () =>
  useWatchStore((state) => state.uiActions);

// Export shallow hook for external use
export { useShallow };