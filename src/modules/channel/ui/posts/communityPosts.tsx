"use client";

import PostCard from "@/modules/channel/ui/posts/postCard";
import {useCreatePostMutation, useGetPostsByUserQuery} from "@/api/postApi";
import CreatePostForm from "@/modules/channel/ui/posts/createPost";

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

    const [createPost] = useCreatePostMutation();

    const handleCreatePost = async (data: {
        content: string;
        imageUrl?: string | null;
        poll?: { options: { optionText: string }[] } | null;
    }) => {
        try {
            await createPost({
                userId,
                content: data.content,
                poll: data.poll || undefined,
                imageUrl: ""
            }).unwrap();

            refetch();
        } catch (err) {
            console.error("Create post failed:", err);
        }
    };


    if (isLoading) return <div>LOADING...</div>;
    if (isError) return <div>ERROR</div>;

    const postsWithMockAuthor = posts?.map((post) => ({
        ...post,
        author: {
            id: "mock-user",
            name: "Người dùng test",
            avatarUrl: "https://yt3.googleusercontent.com/B7cKgmonzWyahNmf1g3jDhQyb-5DadDQk02SlFvC00Y8JpBSNnQ0QZ_UuUJKUebSrbdsMrOzI-c=w544-c-h544-k-c0x00ffffff-no-l90-rj",
        },
    }))
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

    return (
        <div className="flex flex-col gap-4 px-4 py-4">
            <CreatePostForm userId={userId} onSubmit={handleCreatePost} />

            {postsWithMockAuthor?.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    userId={userId}
                />
            ))}
        </div>
    );
}
