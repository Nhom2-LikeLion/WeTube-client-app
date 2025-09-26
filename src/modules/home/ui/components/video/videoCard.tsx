"use client";

import { useSaveInteractionMutation } from "@/app/api/interactionApi";
import VideoOverlay from "@/components/videos/VideoOverlayProps";
import { useAuth } from "@/contexts/auth-context";
import { formatViews, timeAgo } from "@/lib/utils";
import { VideoThumbnail } from '@/modules/videos/ui/components/video-thumbnail';
import { RecommendedVideoItem } from "@/types/video";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VideoCard = ({
  id,
  title,
  thumbnailUrl,
  videoUrl,
  totalView,
  createAt,
  name,
  duration,
  picture,
  historyDuration,
}: RecommendedVideoItem) => {
  const router = useRouter();
  const displayTime = timeAgo(createAt);
  const { user } = useAuth();

  const [saveInteraction] = useSaveInteractionMutation();

  const handleClick = async () => {
    try {
      if (user?.sub && id) {
        await saveInteraction({
          userId: user.sub, 
          videoId: id,
          type: "VIEW",
        }).unwrap();
      }
    } catch (err) {
      console.error("❌ Failed to record VIEW interaction:", err);
    } finally {
      router.push(`/watch/${id}`);
    }
  };

  return (
    <div
      className="w-full flex flex-col cursor-pointer group"
      onClick={handleClick}
    >
      <div className="rounded-xl overflow-hidden transform transition duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:rounded-none">
        <VideoThumbnail
          imageUrl={thumbnailUrl}
          previewUrl={videoUrl}
          title={title}
          duration={duration}
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
          <h3 className="text-md font-semibold leading-tight break-words text-black group-hover:text-blue-600 transition-colors">
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
