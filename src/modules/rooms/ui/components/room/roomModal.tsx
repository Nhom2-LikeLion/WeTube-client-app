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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { customAlphabet } from "nanoid";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 4);

function generateMeetStyleId() {
    return `${nanoid()}-${nanoid()}-${nanoid()}`;
}

export default function RoomModal({
                                      open,
                                      onOpenChange,
                                      onRoomCreated,
                                  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRoomCreated?: (roomId: string, username: string) => void;
}) {
    const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleJoin = () => {
        if (!roomId.trim() || !username.trim()) return;
        console.log("Joining room:", roomId, "as", username);
        onOpenChange(false);
        onRoomCreated?.(roomId, username);
        router.push(`/rooms/${roomId}?username=${encodeURIComponent(username)}`);
    };

    const handleCreate = () => {
        if (!username.trim()) return;
        const newRoomId = generateMeetStyleId();
        onOpenChange(false);
        router.push(`/rooms/${newRoomId}?username=${encodeURIComponent(username)}`);
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
                                disabled={!roomId.trim() || !username.trim()}
                            >
                                Join
                            </Button>
                        </div>
                    </div>

                    {/* Create Room */}
                    <div>
                        <label className="text-sm font-medium">Create New Room</label>
                        <div className="flex flex-col gap-2 mt-1">
                            <Input
                                placeholder="Enter Room Name (optional)"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            <Button
                                variant="secondary"
                                onClick={handleCreate}
                                disabled={!username.trim()}
                            >
                                Create Room
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
