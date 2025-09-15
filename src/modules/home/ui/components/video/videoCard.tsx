"use client";

import { Video } from "@/types/video";

const formatViews = (num?: number) => {
  if (!num) return "0 views";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K views";
  return num + " views";
};

interface VideoCardProps extends Video {
  views?: number;
}

const VideoCard = ({
  title,
  description,
  thumbnailUrl,
  videoUrl,
  createdAt,
  views,
}: VideoCardProps) => (
  <div className="w-full flex flex-col">
    <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden relative">
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        videoUrl && (
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-cover"
          />
        )
      )}
    </div>

    <div className="pt-3">
      <h3 className="text-lg text-black font-bold leading-tight break-words">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      )}
      <p className="text-sm text-gray-400">
        {formatViews(views)} • {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default VideoCard;
