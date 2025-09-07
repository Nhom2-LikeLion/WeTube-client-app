import { Users } from "lucide-react";

interface Member {
    id: string;
    name: string;
}

export default function RoomMembers({ members }: { members: Member[] }) {
    return (
        <div className="flex items-center gap-2">
            <Users size={20} />
            <span>{members.length}</span>
            <div className="flex gap-2">
                {members.map((m) => (
                    <div
                        key={m.id}
                        className="px-2 py-1 bg-neutral-100 rounded-lg text-sm"
                    >
                        {m.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
