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
  // const [allVideos, setAllVideos] = useState<RecommendedVideoItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [topRanked, setTopRanked] = useState<RecommendedVideoItem[]>([]);

  const userId = user?.sub;

  console.log("User object in VideoGrid:", user);

  useEffect(() => {
    if (!user?.sub) {
      // setAllVideos([]);
      setTopRanked([]);
      setPage(1);
      setHasMore(true);
      return;
    }

    // setAllVideos([]);
    setTopRanked([]);
    setPage(1);
    setHasMore(true);
  }, [user?.sub]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  console.log("Query Params:", { userId: user?.sub, page, limit: LOAD_COUNT });
  console.log("Is Skipped:", !user?.sub || !hasMore);

  const { data, isLoading, isFetching, error } = useGetRecommendVideosQuery(
    { userId: user?.sub, page, limit: LOAD_COUNT },
    {
      skip: !user?.sub || !hasMore,
      // refetchOnMountOrArgChange: true,
    }
  );

  const { data: topRankedData } = useGetScoutVideosQuery(
    { userId: userId! },
    {
      skip: !userId || page > 1,
      refetchOnMountOrArgChange: true,
    }
  );

  // useEffect(() => {
  //   if (data?.content && data.content.length > 0) {
  //     const newVideos = data.content;
  //     setAllVideos((prevVideos) => {
  //       const combined = [...prevVideos, ...newVideos];
  //       const uniqueVideos = Array.from(
  //         new Map(combined.map((v) => [v.id, v])).values()
  //       );
  //       return uniqueVideos;
  //     });
  //   }

  //   if (!data?.content || data.content.length < LOAD_COUNT) {
  //     setHasMore(false);
  //   }
  // }, [data]);

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
    const allVideos = data?.content ?? [];
    const topRankedIds = new Set(topRanked.map((v) => v.id));
    const otherVideos = allVideos.filter((v) => !topRankedIds.has(v.id));
    return [...topRanked, ...otherVideos];
    // }, [allVideos, topRanked]);
  }, [data?.content, topRanked]);


    const isEmpty =
      !isLoading &&
      !isFetching &&
      (data?.content?.length ?? 0) === 0 &&
      topRanked.length === 0 &&
      user?.sub;

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

      {hasMore && !isFetching && displayedVideos.length > 0 && (
        <div
          ref={ref}
          className="h-10"
        />
      )}
      {isEmpty && (
        <p className="text-center mt-6 text-gray-500">
          No recommendations found for you yet. Start watching some videos!
        </p>
      )}

      {!hasMore && (data?.content?.length ?? 0) > 0 && (
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