import { API_PREFIX } from "@/constants/appConstant";
import { RecommendedVideoItem } from "@/types/video";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recommendApi = createApi({
  reducerPath: "recommendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PREFIX}/recommend`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getRecommendVideos: builder.query<RecommendedVideoItem[], string>({
      query: (userId) => `/${userId}`, // input: userId
    }),
  }),
});

export const { useGetRecommendVideosQuery } = recommendApi;
