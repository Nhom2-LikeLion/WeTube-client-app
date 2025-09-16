"use client";

import { useGetRecommendVideosQuery } from "@/app/api/recommentApi";
import { useAuth } from "@/contexts/auth-context";
import { useCallback, useEffect, useState } from "react";
import VideoCard from "./videoCard";

const LOAD_COUNT = 12;

export default function VideoGrid() {
  const { user } = useAuth();
  const userId = user?.sub;
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);

  const {
    data: videos = [],
    isLoading,
    isFetching,
    error,
  } = useGetRecommendVideosQuery("b3ab5345-929c-11f0-a713-00a55433269b", {
    skip: !userId,
  });

  // const loadMore = () =>
  //   setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, videos.length));

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, videos.length));
  }, [videos.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 100 >=
          document.documentElement.scrollHeight &&
        visibleCount < videos.length &&
        !isFetching
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, videos.length, isFetching, loadMore]);

  if (!userId)
    return <p className="p-4">Bạn cần đăng nhập để xem video gợi ý.</p>;
  if (isLoading) return <p className="p-4">Đang tải video...</p>;
  if (error) return <p className="p-4 text-red-500">Lỗi tải video!</p>;

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {videos.slice(0, visibleCount).map((video) => (
          <div key={video.id} className="w-full sm:w-[calc(33.333%-1rem)]">
            <VideoCard {...video} />
          </div>
        ))}
      </div>

      {isFetching && (
        <div className="flex justify-center mt-6">
          <div className="w-10 h-10 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      {visibleCount >= videos.length && !isFetching && (
        <p className="text-center mt-6 text-gray-500">Đã hết video</p>
      )}
    </div>
  );
}
