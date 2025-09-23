import { API_PREFIX } from '@/constants/appConstant';
import { PlaylistDetail, PlaylistSummary } from '@/types/playlistSummary';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_PREFIX}` }),
  tagTypes: ["Playlist"],
  endpoints: (builder) => ({
    getPlaylistsByUserId: builder.query<PlaylistSummary[], string>({
      query: (userId) => `playlists/all/${userId}`,
      providesTags: (result, error, userId) => [
        { type: "Playlist", id: `USER_${userId}` },
        "Playlist", // General tag
      ],
    }),
    getPlaylistDetails: builder.query<PlaylistDetail, string>({
      query: (playlistId) => `playlists/detail/${playlistId}`,
      providesTags: (result, error, playlistId) => [
        { type: "Playlist", id: playlistId },
        "Playlist",
      ],
    }),
  }),
});

export const { useGetPlaylistsByUserIdQuery, useGetPlaylistDetailsQuery } =
  playlistApi;
