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
  // 👇 ép backend response về đúng kiểu array
  transformResponse: (response: any) => {
    if (Array.isArray(response)) {
      return response; // backend trả array đúng
    }
    if (response?.videos && Array.isArray(response.videos)) {
      return response.videos; // backend gói trong { videos: [...] }
    }
    console.warn("Unexpected recommend API response:", response);
    return []; // fallback an toàn
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
