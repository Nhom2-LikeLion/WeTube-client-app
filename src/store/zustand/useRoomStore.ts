import { create } from "zustand";
import { Room, VideoRoom } from "@/types/room";

interface RoomStore {
  room: Room | null;
  myUsername: string;
  setRoom: (room: Room) => void;
  clearRoom: () => void;
  setMyUsername: (username: string) => void;
  clearMyUsername: () => void;
  addSong: (song: VideoRoom) => void;
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
            ...state.room, // giữ nguyên các thuộc tính khác trong room
            playerState: {
              ...state.room.playerState, // giữ nguyên các thuộc tính trong playerState
              currentSongId: id, // cập nhật currentSongId
            },
          }
        : null,
    })),
}));
