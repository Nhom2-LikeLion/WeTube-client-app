"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "./videoCard";
import { getMockVideos } from "./mockVideo"; // sửa lại đường dẫn nếu cần

const VideoGrid = () => {
  const videos = getMockVideos();
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <AnimatePresence initial={false}>
          {videos.slice(0, visibleCount).map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-[calc(33.3333%-1rem)]"
            >
              <VideoCard {...video} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < videos.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Hiển thị thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
