export type ViewMode = 'default' | 'theater' | 'miniplayer' | 'fullscreen';

export interface ViewModeConfig {
  mode: ViewMode;
  containerClass: string;
  videoAspectRatio: string;
  sidebarVisible: boolean;
  overlayVisible: boolean;
  zIndex: number;
  keyboardShortcut?: string;
}

export interface ViewModeTransition {
  from: ViewMode;
  to: ViewMode;
  duration: number;
  ease: string;
}

export interface ViewModeContextType {
  currentMode: ViewMode;
  previousMode: ViewMode | null;
  setMode: (mode: ViewMode) => void;
  toggleTheater: () => void;
  toggleFullscreen: () => void;
  enableMiniplayer: () => void;
  disableMiniplayer: () => void;
  isTransitioning: boolean;
  canTransition: boolean;
  config: ViewModeConfig;
}

export interface UseViewModeReturn {
  currentMode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleTheater: () => void;
  toggleFullscreen: () => void;
  enableMiniplayer: () => void;
  disableMiniplayer: () => void;
  isTransitioning: boolean;
  config: ViewModeConfig;
}

export interface UseKeyboardShortcutsOptions {
  onPlay?: () => void;
  onPause?: () => void;
  onMute?: () => void;
  onVolumeUp?: () => void;
  onVolumeDown?: () => void;
  onSeekForward?: () => void;
  onSeekBackward?: () => void;
  onFullscreen?: () => void;
  onTheater?: () => void;
  onMiniplayer?: () => void;
  onSeekToPercent?: (percent: number) => void;
  enabled?: boolean;
  target?: React.RefObject<HTMLElement>;
}