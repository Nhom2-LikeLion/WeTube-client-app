// "use client";

// import {
//   useGetRecommendVideosQuery,
//   useGetScoutVideosQuery,
// } from "@/app/api/recommentApi";
// import { useAuth } from "@/contexts/auth-context";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import VideoCard, { VideoCardSkeleton } from "./videoCard";
// import { useInView } from "react-intersection-observer";
// import { RecommendedVideoItem } from "@/types/video";

// const LOAD_COUNT = 12;

// export default function VideoGrid() {
//   const { user, isLoading: isAuthLoading } = useAuth();
//   const [page, setPage] = useState(1);
//   const [allVideos, setAllVideos] = useState<RecommendedVideoItem[]>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [topRanked, setTopRanked] = useState<RecommendedVideoItem[]>([]);

//   const userId = user?.sub;

//   console.log("User object in VideoGrid:", user);

//   useEffect(() => {
//     if (!user?.sub) {
//       setAllVideos([]);
//       setTopRanked([]);
//       setPage(1);
//       setHasMore(true);
//       return;
//     }

//     setAllVideos([]);
//     setTopRanked([]);
//     setPage(1);
//     setHasMore(true);
//   }, [user?.sub]);

//   const { ref, inView } = useInView({
//     threshold: 0,
//   });

//   console.log("Query Params:", { userId: user?.sub, page, limit: LOAD_COUNT });
//   console.log("Is Skipped:", !user?.sub || !hasMore);

//   const { data, isLoading, isFetching, error } = useGetRecommendVideosQuery(
//     { userId: user?.sub, page, limit: LOAD_COUNT },
//     {
//       skip: !user?.sub || !hasMore,
//       // refetchOnMountOrArgChange: true,
//     }
//   );

//   const { data: topRankedData } = useGetScoutVideosQuery(
//     { userId: userId! },
//     {
//       skip: !userId || page > 1,
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   useEffect(() => {
//     if (data?.content && data.content.length > 0) {
//       const newVideos = data.content;
//       setAllVideos((prevVideos) => {
//         const combined = [...prevVideos, ...newVideos];
//         const uniqueVideos = Array.from(
//           new Map(combined.map((v) => [v.id, v])).values()
//         );
//         return uniqueVideos;
//       });
//     }

//     if (!data?.content || data.content.length < LOAD_COUNT) {
//       setHasMore(false);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (topRankedData) {
//       setTopRanked(topRankedData);
//     }
//   }, [topRankedData]);

//   useEffect(() => {
//     if (inView && hasMore && !isFetching) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   }, [inView, hasMore, isFetching]);

//   const displayedVideos = useMemo(() => {
//     const topRankedIds = new Set(topRanked.map((v) => v.id));
//     const otherVideos = allVideos.filter((v) => !topRankedIds.has(v.id));
//     return [...topRanked, ...otherVideos];
//   }, [allVideos, topRanked]);

//     const isEmpty =
//     !isLoading &&
//     !isFetching &&
//     allVideos.length === 0 &&
//     topRanked.length === 0 &&
//     user?.sub;

//   if ((isLoading || isAuthLoading) && page === 1) return <VideoGridSkeleton />;

//   if (!isAuthLoading && !user)
//     return <p className="p-4">Please Sign In To Enjoy Our Video Community ❤</p>;

//   if (error) return <p className="p-4 text-red-500">Error Downloading Video</p>;

//   return (
//     <div className="p-4">
//       <div className="flex flex-wrap gap-4">
//         {displayedVideos.map((video) => (
//           <div
//             key={video.id}
//             className="w-full sm:w-[calc(33.333%-1rem)]"
//           >
//             <VideoCard {...video} />
//           </div>
//         ))}
//       </div>

//       {isFetching && (
//         <div className="flex flex-wrap gap-4 mt-4">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <div
//               key={`fetching-skeleton-${i}`}
//               className="w-full sm:w-[calc(33.333%-1rem)]"
//             >
//               <VideoCardSkeleton />
//             </div>
//           ))}
//         </div>
//       )}

//       {hasMore && !isFetching && displayedVideos.length > 0 && (
//         <div
//           ref={ref}
//           className="h-10"
//         />
//       )}
//       {isEmpty && (
//         <p className="text-center mt-6 text-gray-500">
//           No recommendations found for you yet. Start watching some videos!
//         </p>
//       )}

//       {!hasMore && allVideos.length > 0 && (
//         <p className="text-center mt-6 text-gray-500">
//           You have reached the end of recommendations.
//         </p>
//       )}
//     </div>
//   );
// }

// const VideoGridSkeleton = () => (
//   <div className="p-4">
//     <div className="flex flex-wrap gap-4">
//       {Array.from({ length: 12 }).map((_, i) => (
//         <div
//           key={i}
//           className="w-full sm:w-[calc(33.333%-1rem)]"
//         >
//           <VideoCardSkeleton />
//         </div>
//       ))}
//     </div>
//   </div>
// );


"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useGetRecommendVideosQuery,
  useGetScoutVideosQuery,
} from "@/app/api/recommentApi";
import { useAuth } from "@/contexts/auth-context";
import VideoCard, { VideoCardSkeleton } from "./videoCard";
import { useInView } from "react-intersection-observer";
import { RecommendedVideoItem } from "@/types/video";
import { unstable_batchedUpdates } from "react-dom";

const LOAD_COUNT = 12;

export default function VideoGrid() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState<RecommendedVideoItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [topRanked, setTopRanked] = useState<RecommendedVideoItem[]>([]);

  // Render counter for debugging
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("VideoGrid renders:", renderCount.current);

  const userId = user?.sub;

  // Reset state when user changes with batched updates
  useEffect(() => {
    if (!user?.sub) {
      unstable_batchedUpdates(() => {
        setAllVideos([]);
        setTopRanked([]);
        setPage(1);
        setHasMore(true);
      });
      return;
    }

    unstable_batchedUpdates(() => {
      setAllVideos([]);
      setTopRanked([]);
      setPage(1);
      setHasMore(true);
    });
  }, [user?.sub]);

  // Intersection observer with preload margin
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "200px", // Load before user scrolls to the end
  });

  // Main recommendations query with optimization
  const { data, isLoading, isFetching, error } = useGetRecommendVideosQuery(
    { userId: user?.sub, page, limit: LOAD_COUNT },
    {
      skip: !user?.sub,
      // keepPreviousData: true,
      refetchOnFocus: false,
      refetchOnReconnect: false,
      // Only refetch when user changes, not on every mount
      refetchOnMountOrArgChange: false,
    }
  );

  // Scout videos query
  const { data: topRankedData } = useGetScoutVideosQuery(
    { userId: userId as string },
    {
      skip: !userId || page > 1,
      // keepPreviousData: true,
      refetchOnMountOrArgChange: true,
    }
  );

  // Optimized data handling with batched state updates
  const handleNewData = useCallback(
    (newData: typeof data) => {
      if (!newData?.content) return;

      unstable_batchedUpdates(() => {
        const newVideos = newData.content;

        if (page === 1) {
          // Fresh load - replace all
          setAllVideos(newVideos);
        } else {
          // Pagination - append unique items only
          setAllVideos((prevVideos) => {
            const existingIds = new Set(prevVideos.map((v) => v.id));
            const uniqueNewVideos = newVideos.filter(
              (v) => !existingIds.has(v.id)
            );
            return [...prevVideos, ...uniqueNewVideos];
          });
        }

        // Update hasMore based on response
        const shouldHaveMore =
          newData.content.length === LOAD_COUNT && !newData.last;
        setHasMore(shouldHaveMore);
      });
    },
    [page]
  );

  useEffect(() => {
    if (data) {
      handleNewData(data);
    }
  }, [data, handleNewData]);

  // Handle top ranked data
  useEffect(() => {
    if (topRankedData && topRankedData.length > 0) {
      setTopRanked(topRankedData);
    }
  }, [topRankedData]);

  // Handle infinite scroll with debouncing
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (inView && hasMore && !isFetching && !isLoading) {
      // Debounce scroll events to prevent rapid page increments
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      }, 100);
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [inView, hasMore, isFetching, isLoading]);

  // Memoized displayed videos to prevent unnecessary recalculations
  const displayedVideos = useMemo(() => {
    if (topRanked.length === 0) return allVideos;

    const topRankedIds = new Set(topRanked.map((v) => v.id));
    const otherVideos = allVideos.filter((v) => !topRankedIds.has(v.id));
    return [...topRanked, ...otherVideos];
  }, [allVideos, topRanked]);

  // Optimized empty state check
  const isEmpty = useMemo(() => {
    return (
      !isLoading &&
      !isFetching &&
      displayedVideos.length === 0 &&
      user?.sub &&
      page >= 1
    );
  }, [isLoading, isFetching, displayedVideos.length, user?.sub, page]);

  // Early returns with consistent loading states
  if (isAuthLoading) {
    return <VideoGridSkeleton />;
  }

  if (!user) {
    return <p className="p-4">Please Sign In To Enjoy Our Video Community ❤</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Error loading recommendations</p>;
  }

  if (isLoading && page === 1 && displayedVideos.length === 0) {
    return <VideoGridSkeleton />;
  }

  return (
    <div className="p-4">
      {/* Video Grid with fixed aspect ratios to prevent layout shift */}
      <div className="flex flex-wrap gap-4">
        {displayedVideos.map((video, index) => (
          <div
            key={video.id}
            className="w-full sm:w-[calc(33.333%-1rem)]"
            style={{
              minHeight: "240px", // Prevent layout shift
              aspectRatio: "16/10", // Consistent card proportions
            }}
          >
            <VideoCard
              {...video}
              loading={index < 6 ? "eager" : "lazy"} // Prioritize above-fold
            />
          </div>
        ))}
      </div>

      {/* Smooth loading indicator instead of skeleton cards */}
      {isFetching && hasMore && (
        <div className="flex justify-center items-center mt-8 h-16">
          <div className="flex items-center space-x-3 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-sm font-medium">Loading more videos...</span>
          </div>
        </div>
      )}

      {/* Intersection observer trigger */}
      {hasMore && !isFetching && displayedVideos.length > 0 && (
        <div
          ref={ref}
          className="h-4"
        />
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="text-center mt-12">
          <div className="max-w-sm mx-auto">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No recommendations yet
            </h3>
            <p className="text-gray-500">
              Start watching some videos to get personalized recommendations!
            </p>
          </div>
        </div>
      )}

      {/* End of content indicator */}
      {!hasMore && displayedVideos.length > 0 && (
        <div className="text-center mt-8 py-4">
          <p className="text-gray-500 text-sm">
            You have reached the end of recommendations
          </p>
        </div>
      )}
    </div>
  );
}

// Optimized skeleton with consistent dimensions
const VideoGridSkeleton = () => (
  <div className="p-4">
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-full sm:w-[calc(33.333%-1rem)]"
          style={{
            minHeight: "240px",
            aspectRatio: "16/10",
          }}
        >
          <VideoCardSkeleton />
        </div>
      ))}
    </div>
  </div>
);