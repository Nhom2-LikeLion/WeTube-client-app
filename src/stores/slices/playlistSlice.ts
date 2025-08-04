import { StateCreator } from 'zustand';
import { Playlist, PlaylistItem, PlaylistControls } from '@/modules/watch/types/playlist.types';

export interface PlaylistSlice {
  // State
  playlist: {
    current: Playlist | null;
    currentIndex: number;
    controls: PlaylistControls;
    isVisible: boolean;
    isCollapsed: boolean;
    autoplayNext: boolean;
    history: string[]; // Video IDs
    queue: string[]; // Video IDs
  };

  // Actions
  playlistActions: {
    setPlaylist: (playlist: Playlist) => void;
    setCurrentIndex: (index: number) => void;
    nextVideo: () => void;
    previousVideo: () => void;
    shufflePlaylist: () => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    toggleAutoplay: () => void;
    addToQueue: (videoId: string) => void;
    removeFromQueue: (videoId: string) => void;
    reorderPlaylist: (fromIndex: number, toIndex: number) => void;
    toggleVisibility: () => void;
    toggleCollapse: () => void;
    clearPlaylist: () => void;
    // Batch operations
    updateControls: (controls: Partial<PlaylistControls>) => void;
    updatePlaylistState: (updates: Partial<{
      currentIndex: number;
      isVisible: boolean;
      isCollapsed: boolean;
      autoplayNext: boolean;
    }>) => void;
  };
}

export const createPlaylistSlice: StateCreator<
  PlaylistSlice,
  [['zustand/immer', never]],
  [],
  PlaylistSlice
> = (set, get) => ({
  playlist: {
    current: null,
    currentIndex: 0,
    controls: {
      shuffle: false,
      repeat: 'none',
      autoplay: true,
    },
    isVisible: false,
    isCollapsed: false,
    autoplayNext: true,
    history: [],
    queue: [],
  },

  playlistActions: {
    setPlaylist: (playlist) =>
      set((state) => {
        state.playlist.current = playlist;
        state.playlist.currentIndex = playlist.currentIndex || 0;
        state.playlist.isVisible = true;
      }),

    setCurrentIndex: (index) =>
      set((state) => {
        if (state.playlist.current && index >= 0 && index < state.playlist.current.items.length) {
          const currentVideoId = state.playlist.current.items[state.playlist.currentIndex]?.video.id;
          if (currentVideoId && !state.playlist.history.includes(currentVideoId)) {
            state.playlist.history.push(currentVideoId);
          }
          state.playlist.currentIndex = index;
        }
      }),

    nextVideo: () =>
      set((state) => {
        if (!state.playlist.current) return;
        
        const { items } = state.playlist.current;
        const { currentIndex, controls } = state.playlist;
        
        let nextIndex = currentIndex + 1;
        
        if (nextIndex >= items.length) {
          if (controls.repeat === 'all') {
            nextIndex = 0;
          } else if (controls.repeat === 'one') {
            nextIndex = currentIndex;
          } else {
            return; // End of playlist
          }
        }
        
        // Add current video to history
        const currentVideoId = items[currentIndex]?.video.id;
        if (currentVideoId && !state.playlist.history.includes(currentVideoId)) {
          state.playlist.history.push(currentVideoId);
        }
        
        state.playlist.currentIndex = nextIndex;
      }),

    previousVideo: () =>
      set((state) => {
        if (!state.playlist.current) return;
        
        const { items } = state.playlist.current;
        const { currentIndex } = state.playlist;
        
        let prevIndex = currentIndex - 1;
        
        if (prevIndex < 0) {
          prevIndex = items.length - 1;
        }
        
        state.playlist.currentIndex = prevIndex;
      }),

    shufflePlaylist: () =>
      set((state) => {
        if (!state.playlist.current) return;
        
        const { items } = state.playlist.current;
        const currentItem = items[state.playlist.currentIndex];
        
        // Fisher-Yates shuffle
        const shuffled = [...items];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Ensure current item stays at index 0
        const currentItemIndex = shuffled.findIndex(item => item.id === currentItem.id);
        if (currentItemIndex !== -1) {
          [shuffled[0], shuffled[currentItemIndex]] = [shuffled[currentItemIndex], shuffled[0]];
        }
        
        state.playlist.current.items = shuffled;
        state.playlist.currentIndex = 0;
        state.playlist.controls.shuffle = true;
      }),

    toggleShuffle: () =>
      set((state) => {
        state.playlist.controls.shuffle = !state.playlist.controls.shuffle;
        if (state.playlist.controls.shuffle) {
          // Trigger shuffle
          get().playlistActions.shufflePlaylist();
        }
      }),

    toggleRepeat: () =>
      set((state) => {
        const modes: Array<'none' | 'one' | 'all'> = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(state.playlist.controls.repeat);
        const nextIndex = (currentIndex + 1) % modes.length;
        state.playlist.controls.repeat = modes[nextIndex];
      }),

    toggleAutoplay: () =>
      set((state) => {
        state.playlist.controls.autoplay = !state.playlist.controls.autoplay;
        state.playlist.autoplayNext = state.playlist.controls.autoplay;
      }),

    addToQueue: (videoId) =>
      set((state) => {
        if (!state.playlist.queue.includes(videoId)) {
          state.playlist.queue.push(videoId);
        }
      }),

    removeFromQueue: (videoId) =>
      set((state) => {
        state.playlist.queue = state.playlist.queue.filter(id => id !== videoId);
      }),

    reorderPlaylist: (fromIndex, toIndex) =>
      set((state) => {
        if (!state.playlist.current) return;
        
        const { items } = state.playlist.current;
        const [movedItem] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, movedItem);
        
        // Update current index if needed
        if (state.playlist.currentIndex === fromIndex) {
          state.playlist.currentIndex = toIndex;
        } else if (fromIndex < state.playlist.currentIndex && toIndex >= state.playlist.currentIndex) {
          state.playlist.currentIndex -= 1;
        } else if (fromIndex > state.playlist.currentIndex && toIndex <= state.playlist.currentIndex) {
          state.playlist.currentIndex += 1;
        }
      }),

    toggleVisibility: () =>
      set((state) => {
        state.playlist.isVisible = !state.playlist.isVisible;
      }),

    toggleCollapse: () =>
      set((state) => {
        state.playlist.isCollapsed = !state.playlist.isCollapsed;
      }),

    clearPlaylist: () =>
      set((state) => {
        state.playlist.current = null;
        state.playlist.currentIndex = 0;
        state.playlist.isVisible = false;
        state.playlist.history = [];
        state.playlist.queue = [];
      }),

    // Shallow merge for controls
    updateControls: (controls) =>
      set((state) => {
        Object.assign(state.playlist.controls, controls);
      }),

    // Shallow merge for playlist state
    updatePlaylistState: (updates) =>
      set((state) => {
        Object.assign(state.playlist, updates);
      }),
  },
});