import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LikeInfo {
    targetId: string;
    targetType: "POST" | "COMMENT" | "VIDEO";
    likeCount: number;
    likedUserIds: string[];
    liked: boolean | null;
}

export interface ToggleLikeRequest {
    targetId: string;
    targetType: "POST" | "COMMENT" | "VIDEO";
    userId: string;
}

export const likesApi = createApi({
    reducerPath: "likesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/likes" }),
    endpoints: (builder) => ({
        getLikeInfo: builder.query<
            LikeInfo,
            { targetId: string; targetType: "POST" | "COMMENT" | "VIDEO"; userId: string }
        >({
            query: ({ targetId, targetType, userId }) =>
                `?targetId=${targetId}&targetType=${targetType}&userId=${userId}`,
        }),

        toggleLike: builder.mutation<void, ToggleLikeRequest>({
            query: ({ targetId, targetType, userId }) => ({
                url: "/toggle",
                method: "POST",
                params: { targetId, targetType, userId },
            }),
        }),
    }),
});

export const { useGetLikeInfoQuery, useToggleLikeMutation } = likesApi;
