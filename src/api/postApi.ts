import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "@/types/post";

export interface PollOptionDto {
    optionId: string;
    optionText: string;
    voteCount: number;
    percentage: number;
}

export interface PollSummaryDto {
    options: PollOptionDto[];
    totalVotes: number;
    userVotedOptionId?: string;
}

export interface VoteRequestDto {
    postId: string;
    optionId: string;
    userId: string;
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/users" }),
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        getPostsByUser: builder.query<Post[], string>({
            query: (userId) => `/${userId}/posts`,
            providesTags: (result, error, userId) =>
                result
                    ? [
                        ...result.map((post) => ({ type: "Post" as const, id: post.id })),
                        { type: "Post", id: "LIST" },
                    ]
                    : [{ type: "Post", id: "LIST" }],
        }),

        createPost: builder.mutation<Post, {
            userId: string;
            content: string;
            imageUrl?: string;
            poll?: { options: { optionText: string }[] }
        }>({
            query: (body) => ({
                url: "/posts",
                method: "POST",
                body, // gửi thẳng JSON
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),


        updatePost: builder.mutation<Post, { postId: string; body: Partial<Post> }>({
            query: ({ postId, body }) => ({
                url: `/${postId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: "Post", id: postId }],
        }),

        deletePost: builder.mutation<void, string>({
            query: (postId) => ({
                url: `/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, postId) => [
                { type: "Post", id: postId },
                { type: "Post", id: "LIST" },
            ],
        }),

        votePoll: builder.mutation<PollSummaryDto, VoteRequestDto>({
            query: ({ postId, optionId, userId }) => ({
                url: `/${postId}/polls/vote`,
                method: "POST",
                body: { optionId, userId },
            }),
            invalidatesTags: (result, error, { postId }) => [
                { type: "Post", id: postId },
            ],
        }),
    }),
});

export const {
    useGetPostsByUserQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useVotePollMutation,
} = postsApi;
