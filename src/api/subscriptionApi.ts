// src/api/subscriptionsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Channel {
    id: number;
    name: string;
    icon: string;
    subscribers: number;
    description: string;
    videoUrl: string;
}

export const subscriptionsApi = createApi({
    reducerPath: "subscriptionsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/subscriptions" }),
    tagTypes: ["SubscriptionChannel"],
    endpoints: (builder) => ({
        getSubscribedChannels: builder.query<Channel[], string>({
            query: (userId) => `/${userId}`,
            providesTags: (result, error, userId) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "SubscriptionChannel" as const, id })),
                        { type: "SubscriptionChannel", id: `LIST-${userId}` },
                    ]
                    : [{ type: "SubscriptionChannel", id: `LIST-${userId}` }],
        }),
    }),
});

export const { useGetSubscribedChannelsQuery } = subscriptionsApi;
