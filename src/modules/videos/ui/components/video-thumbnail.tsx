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
  const handleMouseEnter = async () => {
    if (videoRef.current && isVideo) {
      try {
        await videoRef.current.play();
      } catch {
        // ignore AbortError / NotSupportedError
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && isVideo) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full overflow-hidden transition-all rounded-xl aspect-video">
        {/* <Image
          src={imageUrl ?? THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="h-full w-full object-cover group-hover:opacity-0 transition-opacity duration-200"
        /> */}

        {/* Conditionally render video or preview image on hover */}
        {isVideo && previewUrl ? (
          <video
            ref={videoRef}
            src={previewUrl}
            poster={imageUrl ?? THUMBNAIL_FALLBACK}
            preload="metadata"
            loop
            muted
            playsInline
            className="h-full w-full object-cover rounded-xl"
          />
        ) : (
          <Image
            src={imageUrl ?? THUMBNAIL_FALLBACK}
            alt={title}
            fill
            className="h-full w-full object-cover rounded-xl"
          />
        )}

        <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
          {formatDuration(duration)}
        </div>
      </div>
    </div>
  );
};
