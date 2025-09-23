"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VideoOverlay from "@/components/videos/VideoOverlayProps";
import { Check, Clock, ListPlus, MoreVertical } from "lucide-react";
import Image from 'next/image';
import React, { useState } from "react";

interface VideoItemProps {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: number;
  thumbnail: string;
  progress?: number;
}

const VideoItem: React.FC<VideoItemProps> = ({
  title,
  channel,
  views,
  duration,
  thumbnail,
  progress,
}) => {
  const [watchLaterClicked, setWatchLaterClicked] = useState(false);
  const [addedPlaylistClicked, setAddedPlaylistClicked] = useState(false);

  // Reset toàn bộ khi rời khỏi group
  const resetState = () => {
    setWatchLaterClicked(false);
    setAddedPlaylistClicked(false);
  };

  return (
    <Card
      onMouseLeave={resetState}
      className="bg-transparent border-none shadow-none hover:cursor-pointer py-2"
    >
      <CardContent className="p-0">
        <div className="flex gap-3 group">
          {/* Thumbnail */}
          <div className="relative w-1/3 h-28 overflow-hidden rounded-sm flex-shrink-0">
            {/* <img
              src={thumbnail}
              alt={title}
              className=" w-full h-full rounded-sm"
            /> */}
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
              className="object-cover"
            />
            <div className="absolute top-0 right-1 flex flex-col gap-1 transition-all duration-300 translate-y-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-2">
              {/* Watch Later */}
              <button
                className="p-2 bg-black/70 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  setWatchLaterClicked(true);
                }}
                aria-label="Watch later"
              >
                {watchLaterClicked ? (
                  <Check className="w-4 h-4 text-green-400 transition-colors" />
                ) : (
                  <Clock className="w-4 h-4 text-white hover:text-blue-400 transition-colors duration-300" />
                )}
              </button>

              {/* Add to Playlist */}
              <button
                className="p-2 bg-black/70 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  setAddedPlaylistClicked(true);
                }}
                aria-label="Add to playlist"
              >
                {addedPlaylistClicked ? (
                  <Check className="w-4 h-4 text-green-400 transition-colors" />
                ) : (
                  <ListPlus className="w-4 h-4 text-white hover:text-blue-400 transition-colors duration-300" />
                )}
              </button>
            </div>

            <VideoOverlay duration={duration} progress={progress} />

          </div>

          {/* Video Details */}
          <div className="w-5/8">
            <h3 className=" text-[18px] leading-5 font-semibold w-100 text-black line-clamp-2 mb-1.5 group-hover:text-black">
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
