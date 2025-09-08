"use client";

import { useTracks, ParticipantTile } from "@livekit/components-react";

export default function VideoPlayer() {
    const tracks = useTracks(); // lấy tất cả track trong room

    if (tracks.length === 0) {
        return (
            <div className="w-full h-full bg-black flex items-center justify-center text-neutral-500">
                No stream yet
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full h-full">
            {tracks.map((trackRef) => (
                <ParticipantTile key={trackRef.publication.trackSid} trackRef={trackRef} />
            ))}
        </div>
    );
}
