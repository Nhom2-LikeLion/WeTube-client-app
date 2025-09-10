"use client";

import Image from "next/image";
import {useRef} from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDndMonitor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Play} from "lucide-react";

export interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
    url: string;
}

function SortableVideo({
                           video,
                           isActive,
                           onPlay,
                       }: {
    video: VideoItem;
    isActive: boolean;
    onPlay: (video: VideoItem) => void;
}) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: video.id,
    });

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
            className={`relative w-40 h-24 rounded-lg overflow-hidden cursor-move group ${
                isActive ? "ring-2 ring-blue-500" : ""
            }`}
        >
            <Image
                src={video.thumbnail}
                alt={video.title}
                width={160}
                height={96}
                className="w-full h-full object-cover"
                onClick={() => onPlay(video)}
            />
            {/* Overlay khi hover */}
            <div
                className={`absolute inset-0 bg-black/40 transition flex items-center justify-center
        ${isActive ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"}`}
            >
                <button
                    onClick={() => onPlay(video)}
                    className="bg-white/80 rounded-full p-2 hover:bg-white"
                >
                    <Play className="w-6 h-6 text-black"/>
                </button>
            </div>
        </div>
    );
}

function DraggableVideoList({
                                videos,
                                currentVideoId,
                                onPlay,
                            }: {
    videos: VideoItem[];
    currentVideoId: number;
    onPlay: (id: number) => void;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useDndMonitor({
        onDragMove(event) {
            if (!scrollRef.current) return;
            const container = scrollRef.current;
            const {activatorEvent} = event;

            if (
                activatorEvent &&
                "clientX" in activatorEvent &&
                typeof activatorEvent.clientX === "number"
            ) {
                const rect = container.getBoundingClientRect();
                const x = activatorEvent.clientX;

                const edgeThreshold = 80;
                const scrollSpeed = 10;

                if (x < rect.left + edgeThreshold) {
                    container.scrollLeft -= scrollSpeed;
                } else if (x > rect.right - edgeThreshold) {
                    container.scrollLeft += scrollSpeed;
                }
            }
        },
    });

    return (
        <SortableContext items={videos.map((v) => v.id)} strategy={horizontalListSortingStrategy}>
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-400"
            >
                {videos.map((v) => (
                    <SortableVideo
                        key={v.id}
                        video={v}
                        isActive={v.id === currentVideoId}
                        onPlay={() => onPlay(v.id)}
                    />
                ))}
            </div>
        </SortableContext>
    );
}

export default function UpcomingList({
                                         videos,
                                         setVideos,
                                         currentVideoId,
                                         onPlay,
                                     }: {
    videos: VideoItem[];
    setVideos: (videos: VideoItem[]) => void;
    currentVideoId: number;
    onPlay: (id: number) => void;
}) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    );

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = videos.findIndex((v) => v.id === active.id);
            const newIndex = videos.findIndex((v) => v.id === over.id);
            setVideos(arrayMove(videos, oldIndex, newIndex));
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <DraggableVideoList videos={videos} currentVideoId={currentVideoId} onPlay={onPlay}/>
        </DndContext>
    );
}



