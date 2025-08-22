"use client";

import PostCard from "@/modules/channel/ui/posts/postCard";
import { useGetPostsByUserQuery } from "@/api/postApi";

type Props = {
    userId: string;
};

export default function CommunityPosts({ userId }: Props) {
    const { data: posts, isLoading, isError, refetch } = useGetPostsByUserQuery(userId, {
        skip: !userId,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    if (isLoading) return <div>LOADING...</div>;
    if (isError) return <div>ERROR</div>;

    const postsWithMockAuthor = posts?.map((post) => ({
        ...post,
        author: {
            id: "mock-user",
            name: "Người dùng test",
            avatarUrl: "https://via.placeholder.com/40",
        },
    }));

    return (
        <div className="flex flex-col gap-4 px-4 py-4">
            {postsWithMockAuthor?.map((post) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    userId={userId}
                    avatar={post.author.avatarUrl}
                    channelName={post.author.name}
                    timestamp={new Date(post.createdAt).toLocaleDateString("vi-VN")}
                    content={post.content}
                    imageUrl={post.imageUrl}
                    likes={post.likeCount}
                    comments={post.commentCount}
                    onLikeToggle={refetch}
                />
            ))}
        </div>
    );
}
