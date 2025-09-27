import { MediaPlayerState, Room, VideoRoom, WatchMember } from "@/types/room";
import { create } from "zustand";

interface RoomStore {
  room: Room | null;
  myUsername: string;
  host: boolean;
  setRoom: (room: Room) => void;
  clearRoom: () => void;
  setMyUsername: (username: string) => void;
  clearMyUsername: () => void;
  addSong: (song: VideoRoom) => void;
  setMediaState: (mediaState: MediaPlayerState) => void;
  setCurrentSongId: (id: string) => void;
  addMember: (member: WatchMember) => void;
  subtractMember: (username: string) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  room: null,
  myUsername: "",
  host: false,

  setRoom: (room) =>
    set((state) => {
      const hostMember = room.members.find((m) => m.host);
      const isHost = hostMember!.username === state.myUsername;
      return {
        room,
        host: isHost,
      };
    }),

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
        ? {
            ...state.room,
            playerState: {
              ...state.room.playerState,
              ...mediaState,
            },
          }
        : null,
    })),

  addMember: (member: WatchMember) =>
    set((state) =>
      state.room
        ? {
            room: {
              ...state.room,
              members: state.room.members.some(
                (m) => m.username === member.username
              )
                ? state.room.members
                : [...state.room.members, member],
            },
          }
        : state
    ),

  subtractMember: (username: string) =>
    set((state) =>
      state.room
        ? {
            room: {
              ...state.room,
              members: state.room.members.filter(
                (m) => m.username !== username
              ),
            },
          }
        : state
    ),
}));
