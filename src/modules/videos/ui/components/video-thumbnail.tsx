"use client";

import { formatDuration } from "@/lib/utils";
import Image from "next/image";
import { THUMBNAIL_FALLBACK } from "../../constants";
import { useEffect, useRef, useState } from "react";

interface VideoThumbnailProps {
  title: string;
  imageUrl?: string | null;
  previewUrl?: string | null;
  duration: number;
}

export const VideoThumbnailSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden transition-all group-hover:rounded-none rounded-xl aspect-video">
      <div className="size-full bg-gray-200 animate-pulse" />
    </div>
  );
};

export const VideoThumbnail = ({
  imageUrl,
  title,
  previewUrl,
  duration,
}: VideoThumbnailProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    if (previewUrl) {
      const isVideoFile = /\.(mp4|webm|ogg)$/i.test(previewUrl);
      setIsVideo(isVideoFile);
    } else {
      setIsVideo(false);
    }
  }, [previewUrl]);

  // Handle video playback on hover
  const handleMouseEnter = () => {
    if (videoRef.current && isVideo) {
      timerRef.current = setTimeout(() => {
        videoRef.current
          ?.play()
          .catch((error) => console.error("Video play failed:", error));
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (videoRef.current && isVideo) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to start
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full overflow-hidden transition-all rounded-xl aspect-video">
        <Image
          src={imageUrl ?? THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="h-full w-full object-cover group-hover:opacity-0 transition-opacity duration-200"
        />

        {/* Conditionally render video or preview image on hover */}
        {isVideo && previewUrl ? (
          <video
            ref={videoRef}
            src={previewUrl}
            preload="metadata"
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-0 group-hover:opacity-100 absolute top-0 left-0 transition-opacity duration-200"
          />
        ) : (
          <Image
            unoptimized={!!previewUrl}
            src={previewUrl ?? THUMBNAIL_FALLBACK}
            alt={`${title} preview`}
            fill
            className="h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        )}

        <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
          {formatDuration(duration)}
        </div>
      </div>
    </div>
  );
};
