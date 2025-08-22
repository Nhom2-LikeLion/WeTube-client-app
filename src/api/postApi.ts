import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "@/types/post";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/users" }),
    endpoints: (builder) => ({
        getPostsByUser: builder.query<Post[], string>({
            query: (userId) => `${userId}/posts`,
        }),
    }),
});

export const { useGetPostsByUserQuery } = postsApi;
