import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Channel {
    id: number;
    icon: string;
    name: string;
    subscribers: string;
    description: string;
    videoUrl: string;
}

interface SubscriptionsState {
    channels: Channel[];
    loading: boolean;
    error: string | null;
}

const initialState: SubscriptionsState = {
    channels: [],
    loading: false,
    error: null,
};

// fetchSubscriptions có thêm tham số userId
export const fetchSubscriptions = createAsyncThunk<
    Channel[],
    string // userId kiểu string
>("subscriptions/fetch", async (userId: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/${userId}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch subscriptions");
    }

    return res.json();
});

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.channels = action.payload;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load subscriptions";
            });
    },
});

export default subscriptionsSlice.reducer;
