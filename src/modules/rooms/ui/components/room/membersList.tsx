"use client";

import { Users } from "lucide-react";

interface MemberListProps {
    members: string[];
    username: string;
}

export default function MemberList({ members, username }: MemberListProps) {
    return (
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-gray-600" />
                <h3 className="text-md font-semibold text-gray-700">
                    Members ({members.length})
                </h3>
            </div>

            <ul className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                {members.length === 0 && (
                    <li className="text-gray-500 text-sm italic">No members online</li>
                )}
                {members.map((member, idx) => (
                    <li
                        key={idx}
                        className={`px-2 py-1 rounded-md text-sm ${
                            member === username
                                ? "font-semibold text-blue-600 bg-blue-50"
                                : "text-gray-800 hover:bg-gray-100"
                        }`}
                    >
                        {member}
                        {member === username && " (You)"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
