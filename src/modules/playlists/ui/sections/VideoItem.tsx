import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import React from "react";

interface VideoItemProps {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  progress?: number; // Giá trị từ 0 đến 1
}

const VideoItem: React.FC<VideoItemProps> = ({
  title,
  channel,
  views,
  duration,
  thumbnail,
  progress,
}) => {
  return (
    <Card className="bg-transparent border-none shadow-none hover:cursor-pointer py-2">
      <CardContent className="p-0">
        <div className="flex gap-3 group">
          {/* Thumbnail */}
          <div className="relative w-3/8 ">
            <img
              src={thumbnail}
              alt={title}
              className=" w-full h-full rounded-sm"
            />

            {/* Duration badge */}
            {duration && (
              <span className="absolute bottom-1.25 right-1 bg-black/60 text-white font-semibold text-[13px] px-1 py-[1px] rounded">
                {duration}
              </span>
            )}
            {/* Progress bar - hidden on hover */}
            {typeof progress === "number" && progress > 0 && (
              <div className="absolute rounded-lg bottom-[0.1px] w-full h-1 bg-gray-300 rounded-b-4xl overflow-hidden group-hover:hidden">
                <div
                  className="h-full bg-red-600"
                  style={{ width: `${Math.min(progress * 100, 100)}%` }}
                />
              </div>
            )}
          </div>

          {/* Video Details */}
          <div className="w-5/8">
            <h3 className=" text-[18px] leading-5 font-semibold w-80 text-black line-clamp-2 mb-1.5 group-hover:text-black">
              {title}
            </h3>
            <div className="text-[13px] text-gray-600">{channel}</div>
            <div className="text-[13px] text-gray-600">{views}</div>
          </div>

          {/* More Menu */}
          <div className="w-1/8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-600 hover:text-black hover:bg-gray-100 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border-gray-200 text-black"
              >
                <DropdownMenuItem className="hover:bg-gray-100 text-black cursor-pointer">
                  Xóa khỏi nhật ký xem
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 text-black cursor-pointer">
                  Chia sẻ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoItem;
