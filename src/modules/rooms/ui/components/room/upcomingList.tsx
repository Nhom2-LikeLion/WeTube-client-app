"use client";

import Image from "next/image";
import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
}

const initialVideos: VideoItem[] = [
    { id: 1, title: "Funny Cats Compilation", thumbnail: "/thumb1.jpg" },
    { id: 2, title: "Lo-fi Study Beats", thumbnail: "/thumb2.jpg" },
    { id: 3, title: "React Tutorial", thumbnail: "/thumb3.jpg" },
    { id: 4, title: "Travel Vlog", thumbnail: "/thumb4.jpg" },
];

// Component video có thể kéo
function SortableVideo({ video }: { video: VideoItem }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: video.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex items-center gap-2 bg-neutral-100 rounded-lg overflow-hidden cursor-move"
        >
            <Image
                src={video.thumbnail}
                alt={video.title}
                width={128}
                height={72}
                className="w-32 h-20 object-cover"
            />
            <div className="flex-1">
                <div className="text-sm truncate">{video.title}</div>
            </div>
        </div>
    );
}

export default function UpcomingList() {
    const [videos, setVideos] = useState(initialVideos);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = videos.findIndex((v) => v.id === active.id);
            const newIndex = videos.findIndex((v) => v.id === over.id);
            setVideos(arrayMove(videos, oldIndex, newIndex));
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={videos.map((v) => v.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3">
                    {videos.map((v) => (
                        <SortableVideo key={v.id} video={v} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
