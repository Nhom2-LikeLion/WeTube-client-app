import { API_PREFIX } from "@/constants/appConstant";
import { VideoDetailResponse } from "@/types/video";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const VideoDetailApi = createApi({
  reducerPath: "VideoDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PREFIX}/videos`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getVideoDetail: builder.query<VideoDetailResponse, string>({
      query: (videoId) => `/${videoId}/detail`,
    }),
  }),
});

export const { useGetVideoDetailQuery } = VideoDetailApi;
