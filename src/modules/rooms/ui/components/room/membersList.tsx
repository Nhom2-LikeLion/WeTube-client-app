"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

interface Member {
    username: string;
}

interface MemberPayload {
    count: number;
    members: Member[];
}

interface MemberListProps {
    roomId: string;
    stompClient: Client;
    username: string;
}

export default function MemberList({ roomId, stompClient, username }: MemberListProps) {
    const [members, setMembers] = useState<Member[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        if (!stompClient.connected) return;

        const subscription = stompClient.subscribe(
            `/topic/rooms.${roomId}.members`,
            (msg) => {
                if (msg.body) {
                    const payload: MemberPayload = JSON.parse(msg.body);
                    setMembers(payload.members);
                    setCount(payload.count);
                }
            }
        );

        // join room ngay khi mount
        stompClient.publish({
            destination: `/app/rooms.members.${roomId}`,
            body: JSON.stringify({ username })
        });

        return () => {
            // leave room khi unmount
            stompClient.publish({
                destination: `/app/rooms.members.leave.${roomId}`,
                body: JSON.stringify({ username })
            });
            subscription.unsubscribe();
        };
    }, [stompClient, roomId, username]);

    return (
        <div className="mb-4">
            <div className="font-semibold mb-1">Members ({count}):</div>
            <ul className="text-sm space-y-1">
                {members.map((m) => (
                    <li key={m.username}>{m.username}</li>
                ))}
            </ul>
        </div>
    );
}
