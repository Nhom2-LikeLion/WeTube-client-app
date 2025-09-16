// app/store/services/videoApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Video {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  avatar: string;
  views: number;
  uploadedAt: string;
}

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getVideos: builder.query<
      Video[],
      { categoryId?: string; page?: number; limit?: number }
    >({
      query: ({ categoryId = "", page = 1, limit = 6 }) =>
        `/videos?categoryId=${categoryId}&page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetVideosQuery } = videoApi;
