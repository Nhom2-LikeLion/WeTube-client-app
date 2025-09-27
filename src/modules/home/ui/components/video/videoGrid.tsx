"use client";

import {
  useGetRecommendVideosQuery,
  useGetScoutVideosQuery,
} from "@/app/api/recommentApi";
import { useAuth } from "@/contexts/auth-context";
import { useCallback, useEffect, useMemo, useState } from "react";
import VideoCard, { VideoCardSkeleton } from "./videoCard";
import { useInView } from "react-intersection-observer";
import { RecommendedVideoItem } from "@/types/video";

const LOAD_COUNT = 12;

export default function VideoGrid() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState<RecommendedVideoItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [topRanked, setTopRanked] = useState<RecommendedVideoItem[]>([]);

  const userId = user?.sub;

  console.log("User object in VideoGrid:", user);

  useEffect(() => {
    setAllVideos([]);
    setTopRanked([]);
    setPage(1);
    setHasMore(true);
  }, [userId]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  console.log("Query Params:", { userId: user?.sub, page, limit: LOAD_COUNT });
  console.log("Is Skipped:", !user?.sub || !hasMore);

  const { data, isLoading, isFetching, error } = useGetRecommendVideosQuery(
    { userId: user?.sub, page, limit: LOAD_COUNT },
    {
      skip: !user?.sub || !hasMore,
    }
  );

  const { data: topRankedData } = useGetScoutVideosQuery(
    { userId: userId! },
    { skip: !userId || page > 1 }
  );

  useEffect(() => {
    if (data?.content && data.content.length > 0) {
      const newVideos = data.content;
      setAllVideos((prevVideos) => {
        const combined = [...prevVideos, ...newVideos];
        const uniqueVideos = Array.from(
          new Map(combined.map((v) => [v.id, v])).values()
        );
        return uniqueVideos;
      });
    }

    if (!data?.content || data.content.length < LOAD_COUNT) {
      setHasMore(false);
    }
  }, [data]);

  useEffect(() => {
    if (topRankedData) {
      setTopRanked(topRankedData);
    }
  }, [topRankedData]);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isFetching]);

  const displayedVideos = useMemo(() => {
    const videoMap = new Map(allVideos.map((v) => [v.id, v]));
    topRanked.forEach((gem) => videoMap.set(gem.id, gem));
    return Array.from(videoMap.values());
  }, [allVideos, topRanked]);

  if ((isLoading || isAuthLoading) && page === 1) return <VideoGridSkeleton />;

  if (!isAuthLoading && !user)
    return <p className="p-4">Please Sign In To Enjoy Our Video Community ❤</p>;

  if (error) return <p className="p-4 text-red-500">Error Downloading Video</p>;

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {displayedVideos.map((video) => (
          <div
            key={video.id}
            className="w-full sm:w-[calc(33.333%-1rem)]"
          >
            <VideoCard {...video} />
          </div>
        ))}
      </div>

      {isFetching && (
        <div className="flex flex-wrap gap-4 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`fetching-skeleton-${i}`}
              className="w-full sm:w-[calc(33.333%-1rem)]"
            >
              <VideoCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {hasMore && !isFetching && (
        <div
          ref={ref}
          className="h-10"
        />
      )}
      {allVideos.length === 0 && !isFetching && (
        <p className="text-center mt-6 text-gray-500">
          No recommendations found for you yet. Start watching some videos!
        </p>
      )}

      {!hasMore && allVideos.length > 0 && (
        <p className="text-center mt-6 text-gray-500">
          You have reached the end of recommendations.
        </p>
      )}
    </div>
  );
}

const VideoGridSkeleton = () => (
  <div className="p-4">
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-full sm:w-[calc(33.333%-1rem)]"
        >
          <VideoCardSkeleton />
        </div>
      ))}
    </div>
  </div>
);
