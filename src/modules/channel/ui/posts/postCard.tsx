"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useToggleLikeMutation } from "@/api/likeApi";
import { useState } from "react";

interface PostCardProps {
id: string;
userId: string;
avatar: string;
channelName: string;
timestamp: string;
content: string;
imageUrl: string;
videoLink?: string;
comments: number;
likes: number;
onLikeToggle: () => void;
isLiked?: boolean;
}

export default function PostCard({
    id,
    userId,
    avatar,
    channelName,
    timestamp,
    content,
    imageUrl,
    videoLink,
    likes,
    comments,
    onLikeToggle,
    isLiked = false,
}: PostCardProps) {
const [toggleLike] = useToggleLikeMutation();
const [liked, setLiked] = useState(isLiked);
const [likeCount, setLikeCount] = useState(likes);

const handleLike = async () => {
    try {
        const newLiked = !liked;
        setLiked(newLiked);
        setLikeCount((prev) => prev + (newLiked ? 1 : -1));

        await toggleLike({
            targetId: id,
            targetType: "POST",
            userId,
        }).unwrap();

        onLikeToggle();
    } catch (err) {
        console.error("Toggle like failed", err);
        setLiked(liked);
        setLikeCount(likes);
    }
};

return (
    <div className="bg-white shadow-xl rounded-xl p-4 space-y-3 max-w-[600px] mx-auto">
      <div className="flex items-start space-x-3">
        <img
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
        <img
          src={imageUrl}
          alt="post"
          width={600}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* Action bar */}
      <div className="flex items-center space-x-6 text-neutral-400 text-sm">
        <div className={`flex items-center space-x-1 hover:text-black cursor-pointer transition-transform duration-200 ${
            liked ? "text-pink-500 scale-110" : "text-gray-500 hover:text-black"
        }`}
             onClick={handleLike}>
            <Heart
                size={20}
                fill={liked ? "rgb(236,72,153)" : "transparent"}
                className="transition-colors duration-300"
            />
            <span>{likes}</span>
        </div>
        <div className="flex items-center space-x-1 hover:text-black cursor-pointer">
          <Share2 size={20} />
        </div>
        <div className="flex items-center space-x-1 hover:text-black cursor-pointer">
          <MessageCircle size={20} />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
}
