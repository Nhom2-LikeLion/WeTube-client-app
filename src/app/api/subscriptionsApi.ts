import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PREFIX } from "@/constants/appConstant";

export interface Channel {
    channelId: string;
    avatarUrl: string;
    name: string;
    subscribers: number;
    description: string;
    videoUrl: string;
}

export const subscriptionsApi = createApi({
    reducerPath: "subscriptionsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_PREFIX}/subscriptions` }),
    endpoints: (builder) => ({
        getSubscribedChannels: builder.query<Channel[], string>({
            query: (userId) => `/${userId}`,
        }),
    }),
});

export const { useGetSubscribedChannelsQuery } = subscriptionsApi;
