"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { VideoItem } from "@/modules/rooms/room.types";

interface SearchInputProps {
    allVideos: VideoItem[];
    mode?: "home" | "watchTogether"; // Mặc định "home"
    onAddToUpcoming?: (v: VideoItem) => void;
}

export const SearchInput = ({ allVideos, mode = "home", onAddToUpcoming }: SearchInputProps) => {
    return (
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <SearchInputSuspense allVideos={allVideos} mode={mode} onAddToUpcoming={onAddToUpcoming} />
        </Suspense>
    );
};

const SearchInputSuspense = ({ allVideos, mode, onAddToUpcoming }: SearchInputProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const categoryId = searchParams.get("categoryId") || "";
    const [value, setValue] = useState(query || "");
    const [results, setResults] = useState<VideoItem[]>([]);

    useEffect(() => {
        if (!value.trim()) {
            setResults([]);
            return;
        }
        const q = value.toLowerCase();
        const filtered = allVideos.filter(
            v => v.title.toLowerCase().includes(q) || v.channelName.toLowerCase().includes(q)
        );

        if (mode === "home") {
            // Home page: chỉ gợi ý text (title)
            setResults(
                filtered.slice(0, 5).map(v => ({ ...v, showInfo: false })) // dùng flag để biết chỉ show text
            );
        } else {
            // WatchTogether: show full video info
            setResults(filtered.slice(0, 5));
        }
    }, [value, allVideos, mode]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = new URL("/search", window.location.origin);
        const newQuery = value.trim();
        if (newQuery) url.searchParams.set("query", encodeURIComponent(newQuery));
        if (categoryId) url.searchParams.set("categoryId", categoryId);
        setValue(newQuery);
        router.push(url.toString());
    };

    return (
        <div className="relative w-full max-w-[600px]">
            <form className="flex w-full" onSubmit={handleSearch}>
                <div className="relative w-full">
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
                    />
                    {value && (
                        <Button
                            variant="ghost"
                            type="button"
                            size="icon"
                            onClick={() => setValue("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                        >
                            <XIcon className="text-gray-500" />
                        </Button>
                    )}
                </div>
                <button
                    disabled={!value.trim()}
                    type="submit"
                    className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SearchIcon className="size-5" />
                </button>
            </form>

            {/* dropdown gợi ý */}
            {results.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-72 overflow-y-auto">
                    {results.map(video => (
                        <div
                            key={video.id}
                            className={`flex items-center gap-2 p-2 hover:bg-gray-100 relative ${
                                mode === "home" ? "cursor-default" : "cursor-pointer"
                            }`}
                        >
                            {mode === "watchTogether" && (
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    width={100}
                                    height={56}
                                    className="rounded object-cover"
                                />
                            )}
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <span className="font-medium truncate">{video.title}</span>
                                {mode === "watchTogether" && (
                                    <>
                                        <span className="text-sm text-gray-500 truncate">{video.channelName}</span>
                                        <span className="text-xs text-gray-400">{video.views} views</span>
                                    </>
                                )}
                            </div>
                            {mode === "watchTogether" && onAddToUpcoming && (
                                <button
                                    onClick={() => onAddToUpcoming(video)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    +
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
