"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import apiClient from "@/lib/apiClient"; 
import { formatDuration } from '@/lib/utils';

interface VideoDto {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  totalView: number;
  createdAt: string;
  user: {
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
  const [results, setResults] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      setLoading(true);
      const fetchResults = async () => {
        try {
          const response = await apiClient.get<VideoDto[]>(
            "/videos/db/search",
            {
              params: { q: query },
            }
          );

          const mappedResults: VideoResult[] = response.data.map((dto) => ({
            id: dto.id,
            title: dto.title,
            thumbnail: dto.thumbnailUrl,
            description: dto.description,
            duration: formatDuration(dto.duration),
            views: `${
              dto.totalView ? Number(dto.totalView).toLocaleString() : 0
            } views`,
            uploadTime: new Date(dto.createdAt).toLocaleDateString("vi-VN"),
            channel: {
              name: dto.user.name,
              avatar: dto.user.picture,
            },
          }));
          setResults(mappedResults);
        } catch (error) {
          console.error("Failed to fetch search results:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  // --- Loading State (Skeleton) ---
  if (loading) {
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

  // --- Render Results ---
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <p className="text-gray-600">
          About {results.length} results for {query}
        </p>
      </div>
      <div className="space-y-4">
        {results.map((video) => (
          <Link
            href={`/watch?v=${video.id}`}
            key={video.id}
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors cursor-pointer">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <div className="relative w-80 h-48 bg-gray-300 rounded-lg overflow-hidden">
                  <Image
                    src={video.thumbnail}
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
                  <span>{video.views}</span>
                  <span className="mx-1">•</span>
                  <span>{video.uploadTime}</span>
                </div>
                {/* Channel Info */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={video.channel.avatar}
                      alt={video.channel.name}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-gray-600 text-sm hover:text-black cursor-pointer">
                    {video.channel.name}
                  </span>
                </div>
                {video.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

// Component cha để bọc Suspense, vì useSearchParams phải dùng trong Suspense
export default function SearchResults() {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}
