"use client";
import { useState } from "react";
import { Users } from "lucide-react";

const mockMembers = [
    { id: "1", name: "FastSalmon" },
    { id: "2", name: "BlueWhale" },
    { id: "3", name: "RedPanda" },
];

export default function MemberList() {
    const [showList, setShowList] = useState(false);

    return (
        <div className="relative">
            {/* Button hiển thị số members */}
            <button
                onClick={() => setShowList(!showList)}
                className="flex items-center gap-1 text-sm text-neutral-600 hover:text-black"
            >
                <Users size={16} />
                <span>{mockMembers.length}</span>
            </button>

            {/* Popup list members */}
            {showList && (
                <div className="absolute bottom-full mb-2 left-0 bg-neutral-100 rounded-lg shadow-lg w-48 p-2 z-10">
                    <div className="text-xs text-neutral-500 mb-1">Members</div>
                    <ul className="space-y-1">
                        {mockMembers.map((m) => (
                            <li
                                key={m.id}
                                className="px-2 py-1 text-sm rounded hover:bg-neutral-300"
                            >
                                {m.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
