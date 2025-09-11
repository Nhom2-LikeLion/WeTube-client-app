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
import axios from "axios";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 4); // mỗi block 4 ký tự

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
    onRoomCreated?: (roomId: string) => void;
}) {
    const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("");
    const router = useRouter();

    const handleJoin = async () => {
        if (!roomId.trim()) return;
        try {
             await axios.post(`http://localhost:8080/api/rooms/${roomId}/join`, {
                userId: "user-" + Math.random().toString(36).slice(2, 8), // TODO: thay bằng userId từ auth
                username: roomName || "Guest",
            });

            onOpenChange(false);
            onRoomCreated?.(roomId);
            router.push(
                `/rooms/${roomId}`
            );
        } catch (err) {
            console.error("Failed to join room", err);
        }
    };

    const handleCreate = async () => {
        const newRoomId = generateMeetStyleId();
        try {
            await axios.post("http://localhost:8080/api/rooms/create", null, {
                params: { roomId: newRoomId, roomName, userId: "host-123" }, // TODO: thay hostId từ auth
            });

            const res = await axios.post(`http://localhost:8080/api/rooms/${newRoomId}/join`, {
                userId: "host-123",
                username: roomName || "Host",
            });

            onOpenChange(false);
            onRoomCreated?.(newRoomId);
            router.push(
                `/rooms/${newRoomId}`
            );
        } catch (err) {
            console.error("Failed to create room", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Join or Create a Room</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-6">
                    {/* Join Room */}
                    <div>
                        <label className="text-sm font-medium">Join with Room ID</label>
                        <div className="flex gap-2 mt-1">
                            <Input
                                placeholder="Enter Room ID"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                            <Button onClick={handleJoin} disabled={!roomId.trim()}>
                                Join
                            </Button>
                        </div>
                    </div>

                    {/* Create Room */}
                    <div>
                        <label className="text-sm font-medium">Create New Room</label>
                        <div className="flex flex-col gap-2 mt-1">
                            <Input
                                placeholder="Enter Room Name"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            <Button variant="secondary" onClick={handleCreate}>
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
