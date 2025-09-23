"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { Play, Pause } from "lucide-react";

interface VideoEvent {
    type: "PLAY" | "PAUSE" | "SEEK" | "LOAD";
    url?: string;
    time?: number;
    sender?: string;
}

interface VideoSyncProps {
    roomId: string;
    username: string;
    stompClient: Client;
    initialUrl: string;
    isHost?: boolean;
}

export default function VideoSync({
                                      roomId,
                                      username,
                                      stompClient,
                                      initialUrl,
                                      isHost = true,
                                  }: VideoSyncProps) {
    const playerRef = useRef<ReactPlayer>(null);

    const [url, setUrl] = useState(initialUrl);
    const [playing, setPlaying] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!stompClient) return;

        let subscription: StompSubscription | undefined;

        stompClient.onConnect = () => {
            console.log("📌 Subscribed to video topic:", `/topic/rooms.${roomId}.video`);

            subscription = stompClient.subscribe(
                `/topic/rooms.${roomId}.video`,
                (msg: IMessage) => {
                    const payload: VideoEvent = JSON.parse(msg.body);
                    console.log("📩 Video event:", payload);

                    switch (payload.type) {
                        case "PLAY":
                            setPlaying(true);
                            if (payload.time && ready) {
                                playerRef.current?.seekTo(payload.time, "seconds");
                            }
                            break;
                        case "PAUSE":
                            setPlaying(false);
                            if (payload.time && ready) {
                                playerRef.current?.seekTo(payload.time, "seconds");
                            }
                            break;
                        case "SEEK":
                            if (payload.time && ready) {
                                playerRef.current?.seekTo(payload.time, "seconds");
                            }
                            break;
                        case "LOAD":
                            if (payload.url) {
                                setUrl(payload.url);
                                setPlaying(false);
                            }
                            break;
                    }
                }
            );
        };

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [stompClient, roomId, ready]);

    // gửi event qua server
    const sendEvent = (event: VideoEvent) => {
        if (!stompClient || !stompClient.connected) return;
        stompClient.publish({
            destination: `/app/video.${roomId}`,
            body: JSON.stringify({ ...event, sender: username }),
        });
    };

    // Play / Pause
    const handlePlayPause = () => {
        if (!isHost) return;
        const currentTime = playerRef.current?.getCurrentTime() || 0;
        if (playing) {
            setPlaying(false);
            sendEvent({ type: "PAUSE", time: currentTime });
        } else {
            setPlaying(true);
            sendEvent({ type: "PLAY", time: currentTime });
        }
    };

    // Seek
    const handleSeek = (seconds: number) => {
        if (!isHost) return;
        sendEvent({ type: "SEEK", time: seconds });
    };

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <ReactPlayer
                ref={playerRef}
                url={url}
                playing={playing}
                controls
                width="100%"
                height="480px"
                onReady={() => setReady(true)}
                onSeek={handleSeek}
            />

            {isHost && (
                <button
                    onClick={handlePlayPause}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    {playing ? (
                        <span className="flex items-center gap-1">
              <Pause className="w-4 h-4" /> Pause
            </span>
                    ) : (
                        <span className="flex items-center gap-1">
              <Play className="w-4 h-4" /> Play
            </span>
                    )}
                </button>
            )}
        </div>
    );
}
