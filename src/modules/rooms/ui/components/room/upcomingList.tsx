"use client";
import Image from "next/image";

const mockVideos = [
    { id: 1, title: "Funny Cats Compilation", thumbnail: "/thumb1.jpg" },
    { id: 2, title: "Lo-fi Study Beats", thumbnail: "/thumb2.jpg" },
    { id: 3, title: "React Tutorial", thumbnail: "/thumb3.jpg" },
    { id: 4, title: "Travel Vlog", thumbnail: "/thumb4.jpg" },
];

export default function UpcomingList() {
    return (
        <div className="flex gap-3 overflow-x-auto">
            {mockVideos.map((v) => (
                <div
                    key={v.id}
                    className="w-32 flex-shrink-0 bg-neutral-800 rounded-lg overflow-hidden"
                >
                    <Image
                        src={v.thumbnail}
                        alt={v.title}
                        width={128}
                        height={72}
                        className="w-full h-20 object-cover"
                    />
                    <div className="text-xs p-2 truncate">{v.title}</div>
                </div>
            ))}
        </div>
    );
}
