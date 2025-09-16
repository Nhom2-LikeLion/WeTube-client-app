import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PREFIX } from "@/constants/appConstant";

export interface Channel {
    id: string;
    name: string;
    picture: string;
    backgroundImgUrl: string;
    description: string;
    countryCode: string;
    status: string;
    totalSubscribers: number;
    totalVideos: number;
    totalViews: number;
    createdAt: string;
}

export const channelApi = createApi({
    reducerPath: "channelApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_PREFIX}/channels` }),
    endpoints: (builder) => ({
        getChannelById: builder.query<Channel, string>({
            query: (channelId) => `/${channelId}`,
        }),
    }),
});

export const { useGetChannelByIdQuery } = channelApi;
