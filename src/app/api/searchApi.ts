// src/app/api/searchApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PREFIX } from "@/constants/appConstant";
import { RecommendedVideoItem } from "@/types/video";

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PREFIX}/videos/db`,
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
    searchVideosSuggest: builder.query<
      string[],
      { prefix: string; size?: number }
    >({
      query: ({ prefix, size = 10 }) => ({
        url: "/search/suggest",
        params: { prefix, size },
      }),
    }),
    searchVideosFuzzy: builder.query<
      PageResponse<RecommendedVideoItem>,
      { query: string; page?: number; size?: number }
    >({
      query: ({ query, page = 0, size = 10 }) => ({
        url: "/search/fuzzy",
        params: { q: query, page, size },
      }),
    }),
    searchVideos: builder.query<RecommendedVideoItem[], { query: string }>({
      // query: ({ title }) => `/name?title=${encodeURIComponent(title)}`,
      query: ({ query }) => ({
        url: "/search", 
        method: "GET",
        params: { q: query }, 
      }),
    }),
  }),
});

export const {
  useSearchVideosSuggestQuery,
  useSearchVideosFuzzyQuery,
  useSearchVideosQuery,
} = searchApi;