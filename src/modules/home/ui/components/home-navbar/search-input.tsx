"use client";

import { useSearchVideosFullQuery } from "@/app/api/searchApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toastEmitter } from "@/lib/toastEmitter";
import { useRoomStore } from "@/store/zustand/useRoomStore";
import { useStompStore } from "@/store/zustand/useStompStore";
import { SearchVideoItem } from "@/types/video";
import { SearchIcon, SquarePlus, XIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

export const SearchInput = () => {
  return (
    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
      <SearchInputSuspense />
    </Suspense>
  );
};

const SearchInputSuspense = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const mode: "home" | "rooms" = pathname.includes("rooms") ? "rooms" : "home";

  const query = searchParams.get("query") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const [value, setValue] = useState(query);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { client, connected, connect, publish, subscribe } = useStompStore();
  const { room, myUsername } = useRoomStore();

  const { data, isFetching } = useSearchVideosFullQuery(
    { query: value },
    { skip: !value.trim() }
  );

  const results: SearchVideoItem[] = data?.content ?? [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuery = value.trim();
    if (!newQuery) return;
    const url = new URL("/search", window.location.origin);
    url.searchParams.set("query", newQuery);
    if (categoryId) url.searchParams.set("categoryId", categoryId);
    setValue(newQuery);
    router.push(url.toString());
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[600px]">
      {/* input */}
      <form className="flex w-full" onSubmit={handleSearch}>
        <div className="relative w-full">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
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

      {/* dropdown */}
      {isOpen && isFetching && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow p-2 text-sm text-gray-500">
          Searching
        </div>
      )}

      {isOpen && !isFetching && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-72 overflow-y-auto">
          {results.slice(0, 5).map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => {
                console.log("Modeeeeeeeeeeeeeee:", mode);
                if (mode === "rooms") {
                  publish(`/app/room/addSong/${room?.roomId}`, {
                    videoId: video.id,
                  });
                  toastEmitter.success("Video Added!");
                } else {
                  const url = `/search?query=${encodeURIComponent(
                    video.title
                  )}`;
                  router.push(url);
                }
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 p-2 hover:bg-gray-100 relative text-left cursor-default`}
            >
              {mode === "rooms" && (
                <div className="relative flex items-center space-x-4 group">
                  {/* Phần tử thumbnail (ảnh) */}
                  <div className="relative flex-1 transition-opacity duration-300 group-hover:opacity-30">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      width={100}
                      height={56}
                      className="rounded object-cover"
                    />
                  </div>

                  {/* Phần tử title và views */}
                  <div className="flex flex-col overflow-hidden transition-opacity duration-300 group-hover:opacity-30">
                    <span className="font-medium truncate">{video.title}</span>
                    {mode === "rooms" && (
                      <span className="text-xs text-gray-400">
                        {video.user.name}
                      </span>
                    )}
                  </div>

                  {/* Icon sẽ xuất hiện khi hover và đè lên ảnh */}
                  <div className=" pl-4 absolute inset-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <SquarePlus className="w-15 h-15 text-black" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
