"use client";

import { useState } from "react";
import { useParticipants } from "@livekit/components-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {UserCircle, Users} from "lucide-react";

export default function MemberList() {
    const participants = useParticipants();
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                >
                    <Users className="w-4 h-4" />
                    {participants.length}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Participants ({participants.length})</DialogTitle>
                </DialogHeader>

                <div className="max-h-64 overflow-y-auto space-y-2">
                    {participants.map((p) => (
                        <div
                            key={p.identity}
                            className="p-2 border rounded-md text-sm flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <UserCircle className="w-4 h-4 text-neutral-500" />
                                <span>{p.name || p.identity}</span>
                            </div>
                            {p.isLocal && <span className="text-xs text-blue-500">(You)</span>}
                        </div>
                    ))}

                </div>
            </DialogContent>
        </Dialog>
    );
}
