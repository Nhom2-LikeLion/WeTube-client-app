// hooks/useRoomAction.ts
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toastEmitter } from "@/lib/toastEmitter";
import { useStompClient } from "@/app/api/Socket/useStompClient";

interface RefProps {
    username: string;
    onRoomCreated?: (roomId: string) => void;
}

export function useRoomAction() {
    const router = useRouter();
    const { client, connected, connect } = useStompClient();
    const pendingCreate = useRef<RefProps| null>(null);

    // Khi vừa connected => nếu có hành động chờ thì chạy
    useEffect(() => {
        if (connected && pendingCreate.current && client) {
            const { username, onRoomCreated } = pendingCreate.current;
            pendingCreate.current = null;
            _createRoom(username, onRoomCreated); // thực thi lại
        }
    }, [connected, client]);

    const _createRoom = useCallback(
        (username: string, onRoomCreated?: (roomId: string) => void) => {
            let handled = false;

            const toastId = toastEmitter.loading("🚀 Creating room...");

            const generalSub = client!.subscribe("/topic/room/created", (message) => {
                console.log("Subscribe topic: " + message.body);
            });

            const subscription = client!.subscribe("/user/queue/room/created", (message) => {
                if (handled) return;
                handled = true;

                try {
                    const room = JSON.parse(message.body);
                    onRoomCreated?.(room.roomId);
                    toastEmitter.updateSuccess(toastId, "✅ Room created successfully!");
                } catch (error) {
                    toastEmitter.updateError(toastId, "❌ Failed to parse room data");
                } finally {
                    subscription.unsubscribe();
                    generalSub.unsubscribe();
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
                generalSub.unsubscribe();
                toastEmitter.updateError(toastId, "❌ Request timed out. Please try again.");
            }, 4000);
        },
        [client]
    );

    const createRoom = useCallback(
        (username: string, onRoomCreated?: (roomId: string) => void) => {
            if (!username.trim()) return;

            if (!connected || !client) {
                // Lưu hành động pending
                pendingCreate.current = { username, onRoomCreated };
                connect(); // Gọi kết nối
                console.log("Reconneting...");
                return;
            }

            _createRoom(username, onRoomCreated);
        },
        [client, connected, connect, _createRoom]
    );

    return { createRoom };
}
