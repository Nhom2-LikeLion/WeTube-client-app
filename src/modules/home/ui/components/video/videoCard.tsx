import Image from "next/image";
import type { VideoItem } from "./mockVideo"; // hoặc truyền từ props

const formatViews = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K views";
  return num + " views";
};

const VideoCard = ({
  title,
  channelName,
  thumbnail,
  avatar,
  views,
  uploadedAt,
}: VideoItem) => (
  <div className="w-full flex flex-col">
    <div className="aspect-video bg-blue-200 rounded-xl overflow-hidden relative">
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="flex gap-3 pt-3 pr-3 pb-3 pl-0 items-start">
      <Image
        src={avatar}
        alt={channelName}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg text-black font-bold leading-tight break-words">
          {channelName}
        </h3>
        <p className="text-sm text-gray-300">{title}</p>
        <p className="text-sm text-gray-400">
          {formatViews(views)} • {uploadedAt}
        </p>
      </div>
    </div>
  </div>
);

export default VideoCard;
