import { Room } from "@/types/room";
import { create } from "zustand";

interface RoomStore {
    room: Room | null;
    myUsername: string;
    setRoom: (room: Room) => void;
    clearRoom: () => void;
    setMyUsername: (username: string) => void;
    clearMyUsername: () => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
    room: null,
    myUsername: "",
    setRoom: (room) => set({ room }),
    clearRoom: () => set({ room: null }),
    setMyUsername: (username) => set({ myUsername: username }),
    clearMyUsername: () => set({ myUsername: "" }),
}));
