"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toastEmitter } from "@/lib/toastEmitter";
import { useRoomStore } from "@/store/zustand/useRoomStore";
import { useStompStore } from "@/store/zustand/useStompStore";
import { Room } from "@/types/room";
import { StompSubscription } from "@stomp/stompjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface RoomProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RoomModal({ open, onOpenChange }: RoomProps) {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { setRoom } = useRoomStore();
  const stomp = useStompStore();
  const createdRoomSubRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    return () => {
      // cleanup khi component unmount
      if (createdRoomSubRef.current) {
        stomp.unsubscribe(createdRoomSubRef.current);
        createdRoomSubRef.current = null;
      }
    };
  }, []);
  // -------------------
  // JOIN ROOM
  // -------------------
  const handleJoin = () => {
    if (!roomId.trim() || !username.trim()) return;

    // onOpenChange(false);
    // joinRoom(roomId, username, (roomIdFromServer) => {
    //     router.push(`/rooms/${roomIdFromServer}?username=${encodeURIComponent(username)}`);
    // });
  };

  // -------------------
  // CREATE ROOM
  // -------------------
  const handleCreate = async () => {
    if (!username.trim()) return;

    onOpenChange(false);
    const toastId = toastEmitter.loading("🐱‍🏍 Connecting...");

    try {
      await stomp.connect();
      toastEmitter.updateSuccess(toastId, "Connected Successfully!");
    } catch (err) {
      toastEmitter.updateError(toastId, "Connection failed!");
      return;
    }

    // Ngăn chặn sub nhiều lần nếu user bấm liên tục
    if (createdRoomSubRef.current) {
      stomp.unsubscribe(createdRoomSubRef.current);
      createdRoomSubRef.current = null;
    }

    // Subscribe để nhận phản hồi khi phòng được tạo thành công
    const subscription = stomp.subscribe(
      "/user/queue/room/created",
      (message) => {
        try {
          const room: Room = JSON.parse(message.body);

          //const room: Room = message;
          console.log("Received room:", room);

          setRoom(room);
          toastEmitter.success("Room created!");
          router.push("/rooms");
        } catch (err) {
          toastEmitter.error("Failed to parse room data");
          console.error(err);
        }
      }
    );

    createdRoomSubRef.current = subscription;

    // Gửi yêu cầu tạo phòng
    stomp.publish("/app/room/create", username);
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
