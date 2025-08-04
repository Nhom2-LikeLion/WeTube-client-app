import { StateCreator } from 'zustand';

export interface UISlice {
  // State
  ui: {
    // Loading states
    isLoading: boolean;
    loadingStates: Record<string, boolean>;
    
    // Modal states
    modals: {
      share: { isOpen: boolean; videoId: string | null };
      report: { isOpen: boolean; videoId: string | null };
      settings: { isOpen: boolean };
      playlist: { isOpen: boolean; videoId: string | null };
    };
    
    // Toast notifications
    toasts: Array<{
      id: string;
      type: 'success' | 'error' | 'warning' | 'info';
      message: string;
      duration?: number;
    }>;
    
    // Sidebar states
    sidebar: {
      isCollapsed: boolean;
      activeSection: string | null;
    };
    
    // Search states
    search: {
      query: string;
      isActive: boolean;
      suggestions: string[];
      recentSearches: string[];
    };
    
    // Keyboard shortcuts
    shortcuts: {
      enabled: boolean;
      customBindings: Record<string, string>;
    };
  };

  // Actions
  uiActions: {
    // Loading actions
    setLoading: (isLoading: boolean) => void;
    setLoadingState: (key: string, isLoading: boolean) => void;
    
    // Modal actions
    openModal: (modal: keyof UISlice['ui']['modals'], data?: { videoId?: string }) => void;
    closeModal: (modal: keyof UISlice['ui']['modals']) => void;
    closeAllModals: () => void;
    
    // Toast actions
    addToast: (toast: Omit<UISlice['ui']['toasts'][0], 'id'>) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
    
    // Sidebar actions
    toggleSidebar: () => void;
    setSidebarSection: (section: string | null) => void;
    
    // Search actions
    setSearchQuery: (query: string) => void;
    setSearchActive: (isActive: boolean) => void;
    addRecentSearch: (query: string) => void;
    clearRecentSearches: () => void;
    
    // Shortcuts actions
    toggleShortcuts: () => void;
    setCustomBinding: (key: string, action: string) => void;
    
    // Batch updates
    updateUIState: (updates: Partial<UISlice['ui']>) => void;
  };
}

export const createUISlice: StateCreator<
  UISlice,
  [['zustand/immer', never]],
  [],
  UISlice
> = (set, get) => ({
  ui: {
    isLoading: false,
    loadingStates: {},
    modals: {
      share: { isOpen: false, videoId: null },
      report: { isOpen: false, videoId: null },
      settings: { isOpen: false },
      playlist: { isOpen: false, videoId: null },
    },
    toasts: [],
    sidebar: {
      isCollapsed: false,
      activeSection: null,
    },
    search: {
      query: '',
      isActive: false,
      suggestions: [],
      recentSearches: [],
    },
    shortcuts: {
      enabled: true,
      customBindings: {},
    },
  },

  uiActions: {
    setLoading: (isLoading) =>
      set((state) => {
        state.ui.isLoading = isLoading;
      }),

    setLoadingState: (key, isLoading) =>
      set((state) => {
        if (isLoading) {
          state.ui.loadingStates[key] = true;
        } else {
          delete state.ui.loadingStates[key];
        }
      }),

    openModal: (modal, data) =>
      set((state) => {
        state.ui.modals[modal].isOpen = true;
        if (data?.videoId && 'videoId' in state.ui.modals[modal]) {
          const modalWithVideoId = state.ui.modals[modal] as { isOpen: boolean; videoId: string | null };
          modalWithVideoId.videoId = data.videoId;
        }
      }),

    closeModal: (modal) =>
      set((state) => {
        state.ui.modals[modal].isOpen = false;
        if ('videoId' in state.ui.modals[modal]) {
          const modalWithVideoId = state.ui.modals[modal] as { isOpen: boolean; videoId: string | null };
          modalWithVideoId.videoId = null;
        }
      }),

    closeAllModals: () =>
      set((state) => {
        Object.keys(state.ui.modals).forEach((key) => {
          const modal = key as keyof typeof state.ui.modals;
          state.ui.modals[modal].isOpen = false;
          if ('videoId' in state.ui.modals[modal]) {
            const modalWithVideoId = state.ui.modals[modal] as { isOpen: boolean; videoId: string | null };
            modalWithVideoId.videoId = null;
          }
        });
      }),

    addToast: (toast) =>
      set((state) => {
        const id = Date.now().toString();
        state.ui.toasts.push({ ...toast, id });
        
        // Auto-remove toast after duration
        if (toast.duration !== 0) {
          setTimeout(() => {
            get().uiActions.removeToast(id);
          }, toast.duration || 5000);
        }
      }),

    removeToast: (id) =>
      set((state) => {
        state.ui.toasts = state.ui.toasts.filter(toast => toast.id !== id);
      }),

    clearToasts: () =>
      set((state) => {
        state.ui.toasts = [];
      }),

    toggleSidebar: () =>
      set((state) => {
        state.ui.sidebar.isCollapsed = !state.ui.sidebar.isCollapsed;
      }),

    setSidebarSection: (section) =>
      set((state) => {
        state.ui.sidebar.activeSection = section;
      }),

    setSearchQuery: (query) =>
      set((state) => {
        state.ui.search.query = query;
      }),

    setSearchActive: (isActive) =>
      set((state) => {
        state.ui.search.isActive = isActive;
      }),

    addRecentSearch: (query) =>
      set((state) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery && !state.ui.search.recentSearches.includes(trimmedQuery)) {
          state.ui.search.recentSearches.unshift(trimmedQuery);
          // Keep only last 10 searches
          state.ui.search.recentSearches = state.ui.search.recentSearches.slice(0, 10);
        }
      }),

    clearRecentSearches: () =>
      set((state) => {
        state.ui.search.recentSearches = [];
      }),

    toggleShortcuts: () =>
      set((state) => {
        state.ui.shortcuts.enabled = !state.ui.shortcuts.enabled;
      }),

    setCustomBinding: (key, action) =>
      set((state) => {
        state.ui.shortcuts.customBindings[key] = action;
      }),

    // Deep merge for complex UI updates
    updateUIState: (updates) =>
      set((state) => {
        Object.assign(state.ui, updates);
      }),
  },
});