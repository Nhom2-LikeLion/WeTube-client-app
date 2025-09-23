"use client";
import VideoOverlay from "@/components/videos/VideoOverlayProps";
import {formatDuration, formatViews, timeAgo } from "@/lib/utils";
import { RecommendedVideoItem } from "@/types/video";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VideoCard = ({
  id,
  title,
  thumbnailUrl,
  totalView,
  createAt,
  name,
  duration,
  picture,
  historyDuration
}: RecommendedVideoItem) => {
  const router = useRouter();
  const displayTime = timeAgo(createAt);
  const videoTime = formatDuration(duration);
  const handleClick = () => {
    router.push(`/watch/${id}`);
  };

  return (
    <div
      className="w-full flex flex-col cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="aspect-video bg-blue-200 rounded-xl overflow-hidden relative">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          // className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <VideoOverlay
            duration={duration}
            progress={historyDuration ? historyDuration / duration : 0}
        />
      </div>

      <div className="flex gap-3 pt-3 pr-3 pb-3 pl-0 items-start">
        <Image
          src={picture}
          alt={name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg text-black font-bold leading-tight break-words">
            {title}
          </h3>
          <p className="text-sm text-gray-300">{name}</p>
          <p className="text-sm text-gray-400">
            {formatViews(totalView)} • {displayTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
