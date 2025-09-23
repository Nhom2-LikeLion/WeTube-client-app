"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchVideosFullQuery } from "@/app/api/searchApi";
import { RecommendedVideoItem } from "@/types/video";
import { useDebounce } from "@/hooks/use-debounce"; // 1. Import hook useDebounce

interface SearchInputProps {
  onAddToUpcoming?: (v: RecommendedVideoItem) => void;
}

export const SearchInput = ({ onAddToUpcoming }: SearchInputProps) => {
  return (
    <Suspense fallback={<Skeleton className="h-10 w-full rounded-full" />}>
      <SearchInputSuspense onAddToUpcoming={onAddToUpcoming} />
    </Suspense>
  );
};

const SearchInputSuspense = ({ onAddToUpcoming }: SearchInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const mode: "home" | "rooms" = pathname.includes("rooms") ? "rooms" : "home";

  const query = searchParams.get("query") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const [value, setValue] = useState(query);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(value, 300);

  const { data, isFetching } = useSearchVideosFullQuery(
    { query: debouncedQuery },
    { skip: !debouncedQuery.trim() }
  );

  const results: RecommendedVideoItem[] = data?.content ?? [];

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

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[600px]"
    >
      <form
        className="flex w-full"
        onSubmit={handleSearch}
      >
        <div className="relative w-full">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (value.trim()) setIsOpen(true);
            }}
            type="text"
            placeholder="Search"
            autoComplete="off"
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
      {isOpen && value.trim() && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-72 overflow-y-auto">
          {isFetching && (
            <div className="p-2 text-sm text-gray-500">Searching...</div>
          )}
          {!isFetching &&
            results.length > 0 &&
            results.slice(0, 5).map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => {
                  const url = `/search?query=${encodeURIComponent(
                    video.title
                  )}`;
                  setValue(video.title);
                  router.push(url);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2 p-2 hover:bg-gray-100 relative text-left`}
              >
                {/* ========================================== */}
                {/* ✅ LOGIC CHO MODE ROOMS ĐƯỢC THÊM LẠI Ở ĐÂY */}
                {/* ========================================== */}
                {mode === "rooms" ? (
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width={100}
                    height={56}
                    className="rounded object-cover"
                  />
                ) : (
                  <SearchIcon className="size-4 text-gray-400 mr-2" />
                )}

                <div className="flex-1 flex flex-col overflow-hidden">
                  <span className="font-medium truncate">{video.title}</span>
                  {mode === "rooms" && (
                    <span className="text-xs text-gray-400">
                      {video.totalView} views
                    </span>
                  )}
                </div>
                {mode === "rooms" && onAddToUpcoming && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToUpcoming(video);
                      setIsOpen(false);
                    }}
                    className="ml-auto flex-shrink-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    +
                  </button>
                )}
              </button>
            ))}
          {!isFetching && results.length === 0 && (
            <div className="p-2 text-sm text-gray-500">
              No results found for {debouncedQuery}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
