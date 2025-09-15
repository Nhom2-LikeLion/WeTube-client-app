"use client";
import { formatViews, timeAgo } from "@/lib/utils";
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
  uploadedAgo
}: RecommendedVideoItem) => {
  const router = useRouter();
  const displayTime = timeAgo(createAt);

  const handleClick = () => {
    router.push(`/watch?id=${id}`);
  };

  return (
    <div
      className="w-full flex flex-col cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="aspect-video bg-blue-200 rounded-xl overflow-hidden relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
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
            {name}
          </h3>
          <p className="text-sm text-gray-300">{title}</p>
          <p className="text-sm text-gray-400">
            {formatViews(totalView)} • {displayTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
