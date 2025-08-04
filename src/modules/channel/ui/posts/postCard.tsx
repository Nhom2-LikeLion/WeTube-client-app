"use client";

import Image from "next/image";
import { MessageCircle, Share2, ThumbsDown, ThumbsUp } from "lucide-react";

interface PostCardProps {
  avatar: string;
  channelName: string;
  timestamp: string;
  content: string;
  imageUrl: string;
  videoLink?: string;
  likes: number;
  dislikes: number;
  comments: number;
}



export default function PostCard({
  avatar,
  channelName,
  timestamp,
  content,
  imageUrl,
  videoLink,
  likes,
  dislikes,
  comments,
}: PostCardProps) {
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 space-y-3 max-w-[600px] mx-auto">
      <div className="flex items-start space-x-3">
        <Image
          src={avatar}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col text-black text-sm">
          <div className="font-semibold">{channelName}</div>
          <div className="text-neutral-400">{timestamp}</div>
        </div>
      </div>

      {/* Content */}
      <div className="text-black text-sm whitespace-pre-line">
        {content}
        {videoLink && (
          <div className="text-blue-400 underline mt-1">{videoLink}</div>
        )}
      </div>

      {/* Image */}
      <div className="rounded-lg overflow-hidden border border-neutral-800">
        <Image
          src={imageUrl}
          alt="post"
          width={600}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* Action bar */}
      <div className="flex items-center space-x-6 text-neutral-400 text-sm">
        <div className="flex items-center space-x-1 hover:text-black cursor-pointer">
          <ThumbsUp size={16} />
          <span>{likes}</span>
        </div>
        <div className="flex items-center space-x-1 hover:text-black cursor-pointer">
          <ThumbsDown size={16} />
          <span>{dislikes}</span>
        </div>
        <div className="flex items-center space-x-1 hover:text-black cursor-pointer">
          <Share2 size={16} />
        </div>
        <div className="flex items-center space-x-1 hover:text-black cursor-pointer">
          <MessageCircle size={16} />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
}
