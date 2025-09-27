"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Client } from "@stomp/stompjs";
import { Users } from "lucide-react";
import { useState } from "react";

interface MemberPayload {
  count: number;
  members: string[];
}

interface MemberListProps {
  roomId: string;
  stompClient: Client;
  username: string;
}

export default function MemberList({
  roomId,
  stompClient,
  username,
}: MemberListProps) {
  const [members, setMembers] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);

  // useEffect(() => {
  //     if (!stompClient.connected) return;

  //     const subscription = stompClient.subscribe(
  //         `/topic/rooms.${roomId}.members`,
  //         (msg) => {
  //             if (msg.body) {
  //                 const payload: MemberPayload = JSON.parse(msg.body);
  //                 setMembers(payload.members);
  //                 setCount(payload.count);
  //             }
  //         }
  //     );

  //     stompClient.publish({
  //         destination: `/app/rooms.members.${roomId}`,
  //         body: JSON.stringify({ username }),
  //     });

  //     return () => {
  //         stompClient.publish({
  //             destination: `/app/rooms.members.leave.${roomId}`,
  //             body: JSON.stringify({ username }),
  //         });
  //         subscription.unsubscribe();
  //     };
  // }, [stompClient, roomId, username]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative flex items-center gap-1 p-2 rounded-lg hover:bg-muted">
          <Users className="w-5 h-5" />
          {count > 0 && (
            <Badge className="absolute -top-1 -right-2 px-2 py-0.5 text-xs">
              {count}
            </Badge>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Room Members ({count})</DialogTitle>
        </DialogHeader>
        <ul className="mt-2 space-y-1 text-sm">
          {members.length === 0 && (
            <li className="text-muted-foreground italic">No members</li>
          )}
          {members.map((m) => (
            <li key={m} className="px-2 py-1 rounded hover:bg-muted">
              {m}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
