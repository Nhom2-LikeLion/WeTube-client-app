// import { StateCreator } from 'zustand';
// import { ViewMode, ViewModeConfig } from '@/modules/watch/types/viewMode.types';

// export interface ViewModeSlice {
//   // State
//   viewMode: {
//     currentMode: ViewMode;
//     previousMode: ViewMode | null;
//     isTransitioning: boolean;
//     config: ViewModeConfig;
//     miniplayer: {
//       position: { x: number; y: number };
//       size: { width: number; height: number };
//       isDragging: boolean;
//       isVisible: boolean;
//     };
//     fullscreen: {
//       isActive: boolean;
//       elementId: string | null;
//     };
//   };

//   // Actions
//   viewModeActions: {
//     setMode: (mode: ViewMode) => void;
//     toggleTheater: () => void;
//     toggleFullscreen: () => void;
//     enableMiniplayer: () => void;
//     disableMiniplayer: () => void;
//     setTransitioning: (isTransitioning: boolean) => void;
//     updateMiniplayerPosition: (position: { x: number; y: number }) => void;
//     updateMiniplayerSize: (size: { width: number; height: number }) => void;
//     setMiniplayerDragging: (isDragging: boolean) => void;
//     setFullscreenElement: (elementId: string | null) => void;
//   };
// }

// const VIEW_MODE_CONFIGS: Record<ViewMode, ViewModeConfig> = {
//   default: {
//     mode: 'default',
//     containerClass: 'w-full max-w-4xl',
//     videoAspectRatio: '16/9',
//     sidebarVisible: true,
//     overlayVisible: false,
//     zIndex: 1,
//     keyboardShortcut: 'd'
//   },
//   theater: {
//     mode: 'theater',
//     containerClass: 'w-full max-w-none',
//     videoAspectRatio: '16/9',
//     sidebarVisible: true,
//     overlayVisible: false,
//     zIndex: 1,
//     keyboardShortcut: 't'
//   },
//   miniplayer: {
//     mode: 'miniplayer',
//     containerClass: 'fixed bottom-4 right-4 w-80 h-45',
//     videoAspectRatio: '16/9',
//     sidebarVisible: false,
//     overlayVisible: true,
//     zIndex: 1000,
//     keyboardShortcut: 'i'
//   },
//   fullscreen: {
//     mode: 'fullscreen',
//     containerClass: 'fixed inset-0 w-full h-full',
//     videoAspectRatio: '16/9',
//     sidebarVisible: false,
//     overlayVisible: false,
//     zIndex: 9999,
//     keyboardShortcut: 'f'
//   }
// };

// export const createViewModeSlice: StateCreator<
//   ViewModeSlice,
//   [['zustand/immer', never]],
//   [],
//   ViewModeSlice
// > = (set, get) => ({
//   viewMode: {
//     currentMode: 'default',
//     previousMode: null,
//     isTransitioning: false,
//     config: VIEW_MODE_CONFIGS.default,
//     miniplayer: {
//       position: { x: 20, y: 20 },
//       size: { width: 320, height: 180 },
//       isDragging: false,
//       isVisible: false,
//     },
//     fullscreen: {
//       isActive: false,
//       elementId: null,
//     },
//   },

//   viewModeActions: {
//     setMode: (mode) =>
//       set((state) => {
//         if (mode === state.viewMode.currentMode) return;

//         state.viewMode.previousMode = state.viewMode.currentMode;
//         state.viewMode.currentMode = mode;
//         state.viewMode.config = VIEW_MODE_CONFIGS[mode];
//         state.viewMode.isTransitioning = true;

//         // Update miniplayer visibility
//         state.viewMode.miniplayer.isVisible = mode === 'miniplayer';

//         // Update fullscreen state
//         state.viewMode.fullscreen.isActive = mode === 'fullscreen';
//       }),

//     toggleTheater: () =>
//       set((state) => {
//         const newMode = state.viewMode.currentMode === 'theater' ? 'default' : 'theater';
//         state.viewMode.previousMode = state.viewMode.currentMode;
//         state.viewMode.currentMode = newMode;
//         state.viewMode.config = VIEW_MODE_CONFIGS[newMode];
//         state.viewMode.isTransitioning = true;
//       }),

//     toggleFullscreen: () =>
//       set((state) => {
//         const newMode = state.viewMode.currentMode === 'fullscreen' ? 'default' : 'fullscreen';
//         state.viewMode.previousMode = state.viewMode.currentMode;
//         state.viewMode.currentMode = newMode;
//         state.viewMode.config = VIEW_MODE_CONFIGS[newMode];
//         state.viewMode.fullscreen.isActive = newMode === 'fullscreen';
//         state.viewMode.isTransitioning = true;
//       }),

//     enableMiniplayer: () =>
//       set((state) => {
//         state.viewMode.previousMode = state.viewMode.currentMode;
//         state.viewMode.currentMode = 'miniplayer';
//         state.viewMode.config = VIEW_MODE_CONFIGS.miniplayer;
//         state.viewMode.miniplayer.isVisible = true;
//         state.viewMode.isTransitioning = true;
//       }),

//     disableMiniplayer: () =>
//       set((state) => {
//         const previousMode = state.viewMode.previousMode || 'default';
//         state.viewMode.currentMode = previousMode;
//         state.viewMode.config = VIEW_MODE_CONFIGS[previousMode];
//         state.viewMode.miniplayer.isVisible = false;
//         state.viewMode.isTransitioning = true;
//       }),

//     setTransitioning: (isTransitioning) =>
//       set((state) => {
//         state.viewMode.isTransitioning = isTransitioning;
//       }),

//     // Shallow merge for position updates
//     updateMiniplayerPosition: (position) =>
//       set((state) => {
//         Object.assign(state.viewMode.miniplayer.position, position);
//       }),

//     // Shallow merge for size updates
//     updateMiniplayerSize: (size) =>
//       set((state) => {
//         Object.assign(state.viewMode.miniplayer.size, size);
//       }),

//     setMiniplayerDragging: (isDragging) =>
//       set((state) => {
//         state.viewMode.miniplayer.isDragging = isDragging;
//       }),

//     setFullscreenElement: (elementId) =>
//       set((state) => {
//         state.viewMode.fullscreen.elementId = elementId;
//       }),
//   },
// });
