"use client";

import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/app/api/postApi";
import EditPostModal from "@/modules/channel/ui/posts/editPostModal";
import { Post } from "@/types/post";
import { useState } from "react";
import NormalPostCard from "./normPost";
import PollPostCard from "./pollPost";

interface PostCardProps {
  post: Post;
  userId: string;
}

export default function PostCard({ post, userId }: PostCardProps) {
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      await deletePost(id);
    }
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleSave = async (newContent: string) => {
    await updatePost({
      postId: post.id,
      body: { content: newContent },
    });
  };

  const author = post.author ?? {
    id: "mock-user",
    name: "Người dùng test",
    avatarUrl:
      "https://yt3.googleusercontent.com/B7cKgmonzWyahNmf1g3jDhQyb-5DadDQk02SlFvC00Y8JpBSNnQ0QZ_UuUJKUebSrbdsMrOzI-c=w544-c-h544-k-c0x00ffffff-no-l90-rj",
  };

  return (
    <>
      {post.poll ? (
        <PollPostCard
          id={post.id}
          userId={userId}
          avatar={author.avatarUrl} //{post.author.avatarUrl}
          channelName={author.name} //{post.author.name}
          timestamp={post.createdAt}
          content={post.content}
          poll={{
            id: post.poll.id,
            options: post.poll.options,
            totalVotes: post.poll.totalVotes ?? 0,
          }}
          likes={post.likeCount}
          comments={post.commentCount}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <NormalPostCard
          id={post.id}
          userId={userId}
          avatar={author.avatarUrl}
          channelName={author.name}
          timestamp={post.createdAt}
          content={post.content}
          imageUrl={post.imageUrl}
          videoLink={post.videoLink}
          likes={post.likeCount}
          comments={post.commentCount}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <EditPostModal
        isOpen={isEditOpen}
        initialContent={post.content}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
