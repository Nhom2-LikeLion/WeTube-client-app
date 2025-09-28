// src/app/api/searchApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PREFIX } from "@/constants/appConstant";
import { SearchVideoItem } from "@/types/video";
import { axiosBaseQuery } from './axiosBaseQuery';

export interface PageResponse<T> {
  content: T[]; totalElements: number; totalPages: number; page: number; size: number;
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${API_PREFIX}/videos/search`,
  //   credentials: "include",
  // }),
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    searchVideosFull: builder.query<
      PageResponse<SearchVideoItem>,
      { query: string; page?: number; size?: number }
    >({
      query: ({ query, page = 0, size = 10 }) => ({
        url: "/videos/search/full",
        method: "GET",
        params: { title: query, page, size },
      }),
    }),

    searchSuggest: builder.query<string[], { prefix: string; size?: number }>({
      query: ({ prefix, size = 8 }) => ({
        url: "/videos/search/suggest",
        method: "GET",
        params: { prefix, size },
      }),
      transformResponse: (res: any) =>
        Array.isArray(res) ? res : res?.data ?? [],
    }),
  }),
});

export const { useSearchVideosFullQuery, useSearchSuggestQuery } = searchApi;
