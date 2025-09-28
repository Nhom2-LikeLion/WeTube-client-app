import { API_PREFIX } from "@/constants/appConstant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from './axiosBaseQuery';

export type InteractionType = "VIEW" | "LIKE" | "COMMENT" | "SHARE";

export interface SaveInteractionRequest {
  userId: string;
  videoId: string;
  type: InteractionType;
}

export interface SaveInteractionResponse {
  message: string;
}

export const interactionApi = createApi({
  reducerPath: "interactionApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${API_PREFIX}/interactions`,
  //   credentials: "include",
  // }),
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    saveInteraction: builder.mutation<
      SaveInteractionResponse,
      SaveInteractionRequest
    >({
      query: (body) => ({
        url: "/interactions",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        // responseHandler: async (response) => response.text(),
      }),
    }),
  }),
});

export const { useSaveInteractionMutation } = interactionApi;
