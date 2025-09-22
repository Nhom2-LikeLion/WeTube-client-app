"use client";

import { useState } from "react";
import RoomModal from "@/modules/rooms/ui/components/room/roomModal";

export default function RoomsPage() {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex h-screen items-center justify-center">
            <RoomModal open={open} onOpenChange={setOpen} />
        </div>
    );
}