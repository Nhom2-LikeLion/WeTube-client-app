import { API_PREFIX } from '@/constants/appConstant';
import { PlaylistDetail, PlaylistSummary } from '@/types/playlistSummary';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_PREFIX}` }),
  endpoints: (builder) => ({
    getPlaylistsByUserId: builder.query<PlaylistSummary[], string>({
      query: (userId) => `playlists/all/${userId}`,
    }),
    getPlaylistDetails: builder.query<PlaylistDetail, string>({
      query: (playlistId) => `playlists/detail/${playlistId}`,
    }),
  }),
});

export const { useGetPlaylistsByUserIdQuery, useGetPlaylistDetailsQuery } =
  playlistApi;
