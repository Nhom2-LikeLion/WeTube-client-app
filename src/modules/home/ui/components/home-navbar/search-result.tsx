"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { formatDuration } from "@/lib/utils";
import { useSearchVideosFullQuery } from "@/app/api/searchApi";
import { RecommendedVideoItem } from "@/types/video";

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

interface VideoDto {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  totalView: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    picture: string;
  };
}

interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  channel: {
    name: string;
    avatar: string;
  };
  duration: string;
  views: string;
  uploadTime: string;
  description?: string;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const query = searchParams.get("query");

  const { data, isLoading, isError } = useSearchVideosFullQuery(
    { query: query!, page: 0, size: 20 },
    { skip: !query }
  );

  const results: RecommendedVideoItem[] = data?.content || [];
  const totalResults = data?.totalElements || 0;

  // --- Loading Skeleton ---
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex gap-4"
            >
              <div className="w-80 h-48 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load search results.
      </div>
    );
  }

  // --- Render Results ---
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <p className="text-gray-600">
          About {totalResults} results for <b>{query}</b>
        </p>
      </div>
      <div className="space-y-4">
        {results.map((video) => (
          <Link
            href={`/watch/${video.id}`}
            key={video.id}
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors cursor-pointer">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <div className="relative w-80 h-48 bg-gray-300 rounded-lg overflow-hidden">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-medium line-clamp-2 mb-1 transition-colors ${
                    hoveredId === video.id ? "text-red-600" : "text-black"
                  }`}
                >
                  {video.title}
                </h3>
                <div className="text-gray-600 text-sm mb-2">
                  <span>
                    {Number(video.totalView ?? 0).toLocaleString()} views
                  </span>
                  <span className="mx-1">•</span>
                  <span>
                    {new Date(video.createAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                {/* Channel Info */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={video.picture || "/default-avatar.png"}
                      alt={video.name || "Channel Avatar"}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-gray-600 text-sm hover:text-black cursor-pointer">
                    {video.name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default function SearchResults() {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}
