"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // backend socket server

interface Member {
    id: string;
    name: string;
}

export function useSocket(roomId: string) {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        socket.emit("join_room", roomId);

        socket.on("user_joined", (user: Member) => {
            setMembers((prev) => [...prev, user]);
        });

        socket.on("user_list", (list: Member[]) => {
            setMembers(list);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    return { members };
}
