import { commentApi } from "@/app/api/commentApi";
import { likesApi } from "@/app/api/likeApi";
import { postsApi } from "@/app/api/postApi";
import { recommendApi } from "@/app/api/recommentApi";
import { videoApi } from "@/app/api/videoApi";
import { subscriptionsApi } from "@/app/api/subscriptionsApi";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [likesApi.reducerPath]: likesApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [recommendApi.reducerPath]: recommendApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
        [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postsApi.middleware,
            likesApi.middleware,
            commentApi.middleware,
            recommendApi.middleware,
            videoApi.middleware,
            subscriptionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;