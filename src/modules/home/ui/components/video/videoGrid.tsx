"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "./videoCard";
import { useGetRecommendVideosQuery } from "@/api/recommentApi";
import { Video } from "@/types/video";
import { useAuth } from "@/contexts/auth-context";

const VideoGrid = () => {
  const { user } = useAuth();
  const userId = user?.sub; 

  // 👇 chỉ gọi API khi có userId
  const {
    data: videos = [],
    isLoading,
    error,
  } = useGetRecommendVideosQuery(userId!, {
    skip: !userId,
  });
  

  const [visibleCount, setVisibleCount] = useState(6);

  if (!userId) return <p className="p-4">Bạn cần đăng nhập để xem video gợi ý.</p>;
  if (isLoading) return <p className="p-4">Đang tải video gợi ý...</p>;
  if (error) return <p className="p-4 text-red-500">Lỗi tải video!</p>;

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <AnimatePresence initial={false}>
          {videos.slice(0, visibleCount).map((video: Video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-[calc(33.3333%-1rem)]"
            >
              <VideoCard
                id={video.id}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
                videoUrl={video.videoUrl}
                createdAt={video.createdAt}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < videos.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            More
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
