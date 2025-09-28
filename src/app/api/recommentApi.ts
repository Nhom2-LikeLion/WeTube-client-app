import { API_PREFIX } from "@/constants/appConstant";
import { RecommendedVideoItem } from "@/types/video";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from './axiosBaseQuery';

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

interface GetRecommendVideosParams {
  userId?: string;
  page: number;
  limit: number;
}

interface GetScoutVideosParams {
  userId: string;
  poolSize?: number;
  topN?: number;
}

export const recommendApi = createApi({
  reducerPath: "recommendApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${API_PREFIX}/recommend`,
  //   credentials: "include",
  // }),
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Recommendations"],
  endpoints: (builder) => ({
    getRecommendVideos: builder.query<
      PageResponse<RecommendedVideoItem>,
      GetRecommendVideosParams
    >({
      query: ({ userId, page, limit }) => ({
        url: `/recommend/${userId}`,
        params: {
          page: page - 1,
          size: limit,
        },
      }),
      providesTags: (result, error, { userId, page }) => [
        { type: "Recommendations", id: `${userId}-${page}` },
      ],
      keepUnusedDataFor: 300,
      merge: (currentCache, newItems, { arg: { page } }) => {
        // Merge logic cho pagination - không replace toàn bộ
        if (page === 1) {
          return newItems;
        }
        if (currentCache && newItems) {
          return {
            ...newItems,
            content: [...(currentCache.content || []), ...newItems.content],
          };
        }
        return newItems;
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const { userId, limit } = queryArgs;
        return { userId, limit }; 
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.userId !== previousArg?.userId;
      },
    }),
    getScoutVideos: builder.query<RecommendedVideoItem[], GetScoutVideosParams>(
      {
        query: ({ userId, poolSize, topN }) => ({
          url: `/recommend/scout/${userId}`,
          params: { poolSize, topN },
        }),
      }
    ),
  }),
});

export const { useGetRecommendVideosQuery, useGetScoutVideosQuery } =
  recommendApi;
