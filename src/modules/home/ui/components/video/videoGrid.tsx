"use client";

import { useState, useEffect } from "react";
import VideoCard from "./videoCard";
import { videos as mockVideos } from "./mockVideo";

const VideoGrid = () => {
  const videos = mockVideos;
  const LOAD_COUNT = 12; // mỗi lần load 12 video
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, videos.length));
      setIsLoadingMore(false);
    }, 500); // giả lập loading
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const threshold = 100; // load thêm khi còn cách cuối trang 100px

      if (scrollPosition + threshold >= pageHeight && visibleCount < videos.length && !isLoadingMore) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, videos.length, isLoadingMore]);

  return (
    <div className="p-4">
      {/* Grid video */}
      <div className="flex flex-wrap gap-4">
        {videos.slice(0, visibleCount).map((video) => (
          <div key={video.id} className="w-full sm:w-[calc(33.333%-1rem)]">
            <VideoCard {...video} />
          </div>
        ))}
      </div>

      {/* Spinner Tailwind */}
      {isLoadingMore && (
        <div className="flex justify-center mt-6">
          <div className="w-10 h-10 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Hết video */}
      {visibleCount >= videos.length && !isLoadingMore && (
        <p className="text-center mt-6 text-gray-500">Đã hết video</p>
      )}
    </div>
  );
};

export default VideoGrid;
