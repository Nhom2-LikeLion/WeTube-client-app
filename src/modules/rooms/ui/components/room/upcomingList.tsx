"use client";

import Image from "next/image";
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

export interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
    url: string;
}

function SortableVideo({ video, isActive, onClick }: { video: VideoItem; isActive: boolean; onClick: () => void }) {
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
            onClick={onClick}
            className={`flex items-center gap-2 p-2 rounded-lg overflow-hidden cursor-move 
            ${isActive ? "bg-blue-100 border border-blue-400" : "bg-neutral-100"}`}
        >
            <Image
                src={video.thumbnail}
                alt={video.title}
                width={96}
                height={54}
                className="w-24 h-14 object-cover rounded"
            />
            <div className="flex-1">
                <div className="text-sm truncate">{video.title}</div>
            </div>
        </div>
    );
}

export default function UpcomingList({
                                         videos,
                                         setVideos,
                                         currentVideoId,
                                         onPlay,
                                     }: {
    videos: VideoItem[];
    setVideos: (v: VideoItem[]) => void;
    currentVideoId: number;
    onPlay: (id: number) => void;
}) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = videos.findIndex((v) => v.id === active.id);
            const newIndex = videos.findIndex((v) => v.id === over.id);
            setVideos(arrayMove(videos, oldIndex, newIndex));
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={videos.map((v) => v.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                    {videos.map((v) => (
                        <SortableVideo
                            key={v.id}
                            video={v}
                            isActive={v.id === currentVideoId}
                            onClick={() => onPlay(v.id)}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
