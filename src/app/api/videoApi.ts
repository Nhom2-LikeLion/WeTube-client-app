// app/store/services/videoApi.ts
import { API_PREFIX } from "@/constants/appConstant";
import {Video, VideoDetailResponseDto } from "@/types/video";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_PREFIX}/videos` }),
  endpoints: (builder) => ({
    getVideos: builder.query<
      Video[],
      { categoryId?: string; page?: number; limit?: number }
    >({
      query: ({ categoryId = "", page = 1, limit = 6 }) =>
        `?categoryId=${categoryId}&page=${page}&limit=${limit}`,
    }),

    getVideoDetail: builder.query<VideoDetailResponseDto, string>({
      query: (videoId) => `/${videoId}/detail`,
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoDetailQuery  } = videoApi;
