import { API_PREFIX } from "@/constants/appConstant";
import { RecommendedVideoItem } from "@/types/video";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recommendApi = createApi({
  reducerPath: "recommendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PREFIX}/recommend`,
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
    getRecommendVideos: builder.query<RecommendedVideoItem[], string>({
      query: (userId) => `/${userId}`, // input: userId
    }),
  }),
});

export const { useGetRecommendVideosQuery } = recommendApi;
