import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PREFIX } from "@/constants/appConstant";

export interface MemberTierRequest {
    title: string;
    description: string;
    price: number;
}

export interface MemberTierResponse {
    id: string;
    title: string;
    description: string;
    price: number;
    isDefault: boolean;
}

export const memberTierApi = createApi({
    reducerPath: "memberTierApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_PREFIX}/tiers` }),
    tagTypes: ["Tiers"],

    endpoints: (builder) => ({
        createTier: builder.mutation<void, { channelId: string; body: MemberTierRequest }>({
            query: ({ channelId, body }) => ({
                url: `/${channelId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Tiers"],
        }),

        updateTier: builder.mutation<void, { tierId: string; body: MemberTierRequest }>({
            query: ({ tierId, body }) => ({
                url: `/${tierId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Tiers"],
        }),

        deleteTier: builder.mutation<void, string>({
            query: (tierId) => ({
                url: `/${tierId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tiers"],
        }),
    }),
});

export const {
    useCreateTierMutation,
    useUpdateTierMutation,
    useDeleteTierMutation,
} = memberTierApi;
