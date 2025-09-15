import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Video } from "@/types/video";

export const recommendApi = createApi({
  reducerPath: "recommendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/recommend",
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
  tagTypes: ["RecommendVideo"],
  endpoints: (builder) => ({
  getRecommendVideos: builder.query<Video[], string>({
  query: (userId) => `/${userId}`,
  transformResponse: (response: any) => {
    if (Array.isArray(response)) {
      return response; 
    }
    if (response?.videos && Array.isArray(response.videos)) {
      return response.videos; 
    }
    console.warn("Unexpected recommend API response:", response);
    return []; 
  },
  providesTags: (result) =>
    result
      ? [
          ...result.map((video) => ({
            type: "RecommendVideo" as const,
            id: video.id,
          })),
          { type: "RecommendVideo", id: "LIST" },
        ]
      : [{ type: "RecommendVideo", id: "LIST" }],
}),
  }),
});

export const { useGetRecommendVideosQuery } = recommendApi;
