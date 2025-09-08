"use client";

import { useParticipants } from "@livekit/components-react";
import { Users } from "lucide-react";
import { useState } from "react";

export default function MemberList() {
    const participants = useParticipants();
    const [showList, setShowList] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setShowList(!showList)}
                className="flex items-center gap-1 text-sm text-neutral-600 hover:text-black"
            >
                <Users size={16} />
                <span>{participants.length}</span>
            </button>

            {showList && (
                <div className="absolute bottom-full mb-2 left-0 bg-neutral-100 rounded-lg shadow-lg w-48 p-2 z-10">
                    <div className="text-xs text-neutral-500 mb-1">Members</div>
                    <ul className="space-y-1">
                        {participants.map((p) => (
                            <li
                                key={p.identity}
                                className="px-2 py-1 text-sm rounded hover:bg-neutral-300"
                            >
                                {p.identity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
