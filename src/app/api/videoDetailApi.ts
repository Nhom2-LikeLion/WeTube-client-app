import { API_PREFIX } from "@/constants/appConstant";
import { VideoDetailResponse } from "@/types/video";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const VideoDetailApi = createApi({
  reducerPath: "VideoDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PREFIX}/videos`,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVideoDetail: builder.query<VideoDetailResponse, string>({
      query: (videoId) => `/${videoId}/detail`, 
    }),
  }),
});

export const { useGetVideoDetailQuery } = VideoDetailApi;
