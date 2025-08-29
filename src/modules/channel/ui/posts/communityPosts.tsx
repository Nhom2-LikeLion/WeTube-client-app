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
        image?: File | null;
        poll?: { options: { optionText: string }[] } | null
    }) => {
        try {
            const postDto = {
                userId,
                content: data.content,
                poll: data.poll || null,
            };

            const formData = new FormData();
            formData.append(
                "postDto",
                new Blob([JSON.stringify(postDto)], { type: "application/json" })
            );

            if (data.image) {
                formData.append("image", data.image);
            }

            await createPost(formData).unwrap();
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
            avatarUrl: "https://via.placeholder.com/40",
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
