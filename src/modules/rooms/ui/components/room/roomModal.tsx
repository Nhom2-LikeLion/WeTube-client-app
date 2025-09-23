"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface RoomProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function RoomModal({ open, onOpenChange }: RoomProps) {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleJoin = async () => {
        if (!roomId.trim() || !username.trim()) return;
        try {
            setLoading(true);
            onOpenChange(false);
            router.push(`/rooms/${roomId}?username=${encodeURIComponent(username)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!username.trim()) return;
        try {
            setLoading(true);
            const newRoomId = uuidv4();
            onOpenChange(false);
            router.push(`/rooms/${newRoomId}?username=${encodeURIComponent(username)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Join or Create a Room</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-6">
                    {/* Username */}
                    <div>
                        <label className="text-sm font-medium">Your Name</label>
                        <Input
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Join Room */}
                    <div>
                        <label className="text-sm font-medium">Join with Room ID</label>
                        <div className="flex gap-2 mt-1">
                            <Input
                                placeholder="Enter Room ID"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                            <Button
                                onClick={handleJoin}
                                disabled={!roomId.trim() || !username.trim() || loading}
                            >
                                {loading ? "Joining..." : "Join"}
                            </Button>
                        </div>
                    </div>

                    {/* Create Room */}
                    <div>
                        <label className="text-sm font-medium">Create New Room</label>
                        <div className="flex flex-col gap-2 mt-1">
                            <Button
                                variant="secondary"
                                onClick={handleCreate}
                                disabled={!username.trim() || loading}
                            >
                                {loading ? "Creating..." : "Create Room"}
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <p className="text-xs text-gray-500">
                        Share the Room ID with friends so they can join your room.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
