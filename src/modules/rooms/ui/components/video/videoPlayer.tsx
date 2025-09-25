"use client";

import { VideoRoom } from "@/types/room";
import { VideoOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videos: VideoRoom[];
  onChangeVideo?: (id: string) => void;
}

export default function VideoPlayer({
  videos,
  onChangeVideo,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVideo = videos[currentIndex];

  useEffect(() => {
    if (videoRef.current && currentVideo) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        console.log("Autoplay bị chặn, user cần click vào video.");
      });
      onChangeVideo?.(currentVideo.id); // gọi callback nếu cần
    }
  }, [currentVideo]);

  const handleEnded = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // lặp lại từ đầu
    }
  };

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
        <VideoOff className="w-12 h-12 mb-4" /> {/* Icon Lucide */}
        <p className="text-lg text-center">
          Search and add a video to start the party 🎉
        </p>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      key={currentVideo.id}
      src={currentVideo.videoUrl}
      controls
      autoPlay
      className="w-full h-full rounded-lg"
      onEnded={handleEnded}
    />
  );
}
