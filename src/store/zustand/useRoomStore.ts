import { MediaPlayerState, Room, VideoRoom } from "@/types/room";
import { create } from "zustand";
interface RoomStore {
  room: Room | null;
  myUsername: string;
  setRoom: (room: Room) => void;
  clearRoom: () => void;
  setMyUsername: (username: string) => void;
  clearMyUsername: () => void;
  addSong: (song: VideoRoom) => void;
  setMediaState: (mediaState: MediaPlayerState) => void;
  setCurrentSongId: (id: string) => void;
}
export const useRoomStore = create<RoomStore>((set) => ({
  room: null,
  myUsername: "",
  setRoom: (room) => set({ room }),
  clearRoom: () => set({ room: null }),
  setMyUsername: (username) => set({ myUsername: username }),
  clearMyUsername: () => set({ myUsername: "" }),
  addSong: (song) =>
    set((state) => ({
      room: {
        ...state.room,
        playlist: [...(state.room?.playlist || []), song],
      } as Room,
    })),
  setCurrentSongId: (id: string) =>
    set((state) => ({
      room: state.room
        ? {
            ...state.room,
            playerState: { ...state.room.playerState, currentSongId: id },
          }
        : null,
    })),
  setMediaState: (mediaState: MediaPlayerState) =>
    set((state) => ({
      room: state.room
        ? { ...state.room, playerState: { ...state.room.playerState } }
        : null,
    })),
}));
