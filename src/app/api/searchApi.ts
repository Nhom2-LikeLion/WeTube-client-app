// src/app/api/searchApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PREFIX } from "@/constants/appConstant";
import { RecommendedVideoItem } from "@/types/video";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PREFIX}/videos/db/search`, 
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
    searchVideos: builder.query<
      RecommendedVideoItem[],             
      { title: string }                   
    >({
      query: ({ title }) => `/name?title=${encodeURIComponent(title)}`,
    }),
  }),
});

export const { useSearchVideosQuery } = searchApi;
