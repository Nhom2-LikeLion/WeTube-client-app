import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toastEmitter } from "@/lib/toastEmitter";
import { useStompClient } from "@/app/api/Socket/useStompClient";
import { Room } from "@/types/room";
import { useRoomStore } from "@/store/zustand/useRoomStore";

// Cập nhật RefProps để sử dụng đối tượng Room thay vì chỉ roomId
interface RefProps {
    username: string;
    onRoomCreated?: (room: Room) => void;
}

export function useRoomAction() {
    const router = useRouter();
    const { client, connected, connect } = useStompClient();
    const pendingCreate = useRef<RefProps | null>(null);
    const { setRoom } = useRoomStore();

    // Khi vừa connected => nếu có hành động chờ thì chạy
    useEffect(() => {
        if (connected && pendingCreate.current && client) {
            const { username, onRoomCreated } = pendingCreate.current;
            pendingCreate.current = null;
            _createRoom(username, onRoomCreated); // thực thi lại
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
                connect(); // Gọi kết nối
                console.log("Reconnecting...");
                return;
            }

            _createRoom(username, onRoomCreated);
        },
        [client, connected, connect, _createRoom]
    );

    return { createRoom };
}
