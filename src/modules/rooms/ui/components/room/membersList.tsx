"use client";

import { Users } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useRoomStore } from "@/store/zustand/useRoomStore";

export default function MemberList() {
    const members = useRoomStore((s) => s.room?.members || []);
    const count = members.length;

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
                        <li key={m.username} className="px-2 py-1 rounded hover:bg-muted">
                            {m.username}
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    );
}
