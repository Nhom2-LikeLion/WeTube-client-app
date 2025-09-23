import { Room, WatchMember } from "@/types/room";
import { create } from "zustand";


interface RoomState {
    room: Room | null;
    setRoom: (room: Room) => void;
    updateMembers: (members: WatchMember[]) => void;
    clearRoom: () => void;
}

export const useRoomStore = create<RoomState>((set) => ({
    room: null,
    setRoom: (room) => set({ room }),
    updateMembers: (members) =>
        set((state) => {
            if (!state.room) return state;

            // if (equal(state.room.members, members)) {
            //     return state; // không thay đổi gì
            // }

            return {
                room: {
                    ...state.room,
                    members,
                },
            };
        }),
    clearRoom: () => set({ room: null }),
}));