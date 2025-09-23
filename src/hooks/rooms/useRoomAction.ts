import { useCallback, useEffect, useRef } from "react";
import { toastEmitter } from "@/lib/toastEmitter";
import { useStompClient } from "@/app/api/Socket/useStompClient";
import { Room, WatchMember } from "@/types/room";
import { useRoomStore } from "@/store/zustand/useRoomStore";

interface RefProps {
    username: string;
    onRoomCreated?: (room: Room) => void;
}

export function useRoomAction() {
    const { client, connected, connect } = useStompClient();
    const pendingCreate = useRef<RefProps | null>(null);
    const { setRoom, updateMembers } = useRoomStore();
    const membersSubscription = useRef<any>(null);
    
    useEffect(() => {
        if (connected && pendingCreate.current && client) {
            const { username, onRoomCreated } = pendingCreate.current;
            pendingCreate.current = null;
            _createRoom(username, onRoomCreated);
        }
    }, [connected, client]);

    const _createRoom = useCallback(
        (username: string, onRoomCreated?: (room: Room) => void) => {
            let handled = false;
            const toastId = toastEmitter.loading("🚀 Creating room...");
            const subscription = client!.subscribe("/user/queue/room/created", (message) => {
                if (handled) return;
                handled = true;

                try {
                    const room: Room = JSON.parse(message.body);
                    onRoomCreated?.(room);
                    setRoom(room);
                    console.log("[/user/queue/room/created] Subscribe topic: " + message.body);
                    toastEmitter.updateSuccess(toastId, "Room created successfully!");
                } catch (error) {
                    toastEmitter.updateError(toastId, "Failed to parse room data");
                } finally {
                    subscription.unsubscribe();
                }
            });

            client!.publish({
                destination: "/app/room/create",
                body: username,
            });

            setTimeout(() => {
                if (handled) return;
                handled = true;
                subscription.unsubscribe();
                toastEmitter.updateError(toastId, "❌ Request timed out. Please try again.");
            }, 4000);
        },
        [client]
    );

    const createRoom = useCallback(
        (username: string, onRoomCreated?: (room: Room) => void) => {
            if (!username.trim()) return;

            if (!connected || !client) {
                // Lưu hành động pending
                pendingCreate.current = { username, onRoomCreated };
                connect(); 
                console.log("Reconnecting...");
                return;
            }

            _createRoom(username, onRoomCreated);
        },
        [client, connected, connect, _createRoom]
    );

    // Hàm subscribe thành viên cho room hiện tại
    const subscribeRoomMembers = useCallback(
        (roomId: string, username: string) => {
            if (!client) return;

            // Nếu đã subscribe thì unsubscribe trước
            if (membersSubscription.current) {
                membersSubscription.current.unsubscribe();
            }

            membersSubscription.current = client.subscribe(
                `/topic/rooms.${roomId}.members`,
                (msg) => {
                    if (msg.body) {
                        try {
                            const payload: { count: number; members: WatchMember[] } =
                                JSON.parse(msg.body);
                            updateMembers(payload.members);
                            console.log("[room members] updated", payload.members);
                        } catch (e) {
                            console.error("Failed to parse members payload", e);
                        }
                    }
                }
            );

            // Gửi yêu cầu lấy danh sách thành viên hiện tại
            client.publish({
                destination: `/app/rooms.members.${roomId}`,
                body: JSON.stringify({ username }),
            });
        },
        [client, updateMembers]
    );
    // Hàm rời room, unsubscribe members và push về home
    const leaveRoom = useCallback(
        (roomId: string, username: string) => {
            if (client && client.connected) {
                client.publish({
                    destination: `/app/rooms.members.leave.${roomId}`,
                    body: JSON.stringify({ username }),
                });

                if (membersSubscription.current) {
                    membersSubscription.current.unsubscribe();
                    membersSubscription.current = null;
                }
            }
        },
        [client]
    );

    return { createRoom, leaveRoom,subscribeRoomMembers };

}
