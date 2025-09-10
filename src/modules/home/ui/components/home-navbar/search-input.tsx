"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { VideoItem } from "@/modules/rooms/room.types";

type SearchMode = "home" | "watchTogether";

interface SearchInputProps {
    allVideos: VideoItem[];
    onAddToUpcoming?: (v: VideoItem) => void;
    mode?: SearchMode; // default: home
}

export const SearchInput = ({ allVideos, onAddToUpcoming, mode = "home" }: SearchInputProps) => {
    return (
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <SearchInputSuspense allVideos={allVideos} onAddToUpcoming={onAddToUpcoming} mode={mode} />
        </Suspense>
    )
}

const SearchInputSuspense = ({ allVideos, onAddToUpcoming, mode }: SearchInputProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const categoryId = searchParams.get("categoryId") || "";

    const [value, setValue] = useState(query || "");
    const [results, setResults] = useState<VideoItem[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // Debounce filter
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            if (!value.trim()) {
                setResults([]);
                setActiveIndex(-1);
                return;
            }

            const q = value.toLowerCase();
            const filtered = allVideos.filter(
                v => v.title.toLowerCase().includes(q) || v.channelName.toLowerCase().includes(q)
            );
            setResults(filtered.slice(0, 5));
            setActiveIndex(-1);
        }, 200);

        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, [value, allVideos]);

    // Handle submit
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = new URL("/search", window.location.origin);
        const newQuery = value.trim();
        if (newQuery) url.searchParams.set("query", encodeURIComponent(newQuery));
        if (categoryId) url.searchParams.set("categoryId", categoryId);
        setValue(newQuery);
        router.push(url.toString());
        setIsFocused(false);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!results.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(prev => (prev + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === "Enter") {
            if (activeIndex >= 0) {
                e.preventDefault();
                if (mode === "watchTogether") {
                    onAddToUpcoming?.(results[activeIndex]);
                } else {
                    setValue(results[activeIndex].title);
                }
                setIsFocused(false);
            } else {
                handleSearch(e as any);
            }
        } else if (e.key === "Escape") {
            setIsFocused(false);
        }
    };

    return (
        <div className="relative w-full max-w-[600px]">
            <form className="flex w-full" onSubmit={handleSearch}>
                <div className="relative w-full">
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onKeyDown={handleKeyDown}
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

            {/* Dropdown */}
            {isFocused && results.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-72 overflow-y-auto">
                    {results.map((video, idx) => (
                        mode === "home" ? (
                            <div
                                key={video.id}
                                className={`p-2 hover:bg-gray-100 cursor-pointer ${idx === activeIndex ? "bg-gray-200" : ""}`}
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => setValue(video.title)}
                            >
                                {video.title}
                            </div>
                        ) : (
                            <div
                                key={video.id}
                                className={`flex items-center gap-2 p-2 hover:bg-gray-100 relative cursor-pointer ${idx === activeIndex ? "bg-gray-200" : ""}`}
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => onAddToUpcoming?.(video)}
                            >
                                <Image src={video.thumbnail} alt={video.title} width={100} height={56} className="rounded object-cover" loading="lazy" />
                                <div className="flex-1 flex flex-col overflow-hidden">
                                    <span className="font-medium truncate">{video.title}</span>
                                    <span className="text-sm text-gray-500 truncate">{video.channelName}</span>
                                    <span className="text-xs text-gray-400">{video.views} views</span>
                                </div>
                                {onAddToUpcoming && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onAddToUpcoming(video); }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
