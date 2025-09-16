"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
    useSubscribeMutation,
    useUnsubscribeMutation,
} from "@/app/api/subscriptionsApi";
import { useGetChannelByIdQuery } from "@/app/api/channelApi";
import { useAuth } from "@/contexts/auth-context";

interface ChannelHeaderProps {
    channelId: string;
}

export default function ChannelHeader({ channelId }: ChannelHeaderProps) {
    const { user } = useAuth();

    const { data: channel, isLoading } = useGetChannelByIdQuery(channelId);

    const [subscribe] = useSubscribeMutation();
    const [unsubscribe] = useUnsubscribeMutation();

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subCount, setSubCount] = useState(0);

    useEffect(() => {
        if (channel) {
            setSubCount(channel.totalSubscribers);
        }
    }, [channel]);

    const handleToggleSubscribe = async () => {
        if (!user) {
            alert("Login first!");
            return;
        }

        try {
            if (isSubscribed) {
                await unsubscribe({ subscriberId: user.sub, channelId }).unwrap();
                setIsSubscribed(false);
                setSubCount((c) => c - 1);
            } else {
                await subscribe({ subscriberId: user.sub, channelId }).unwrap();
                setIsSubscribed(true);
                setSubCount((c) => c + 1);
            }
        } catch (err) {
            console.error("❌ Lỗi khi toggle subscribe:", err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (!channel) return <p>Không tìm thấy channel</p>;

    return (
        <div className="relative p-4 pt-0">
            {/* Banner */}
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
                <Image
                    src={channel.backgroundImgUrl}
                    alt="Banner"
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            {/* Avatar + Info */}
            <div className="flex items-center gap-4 -mt-10 px-4">
                <Image
                    src={channel.picture}
                    alt={channel.name}
                    width={160}
                    height={160}
                    className="rounded-full shadow-xl z-10"
                />
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{channel.name}</h1>
                    <p className="text-sm text-gray-500">
                        {subCount.toLocaleString()} subscribers
                    </p>
                </div>

                {/* Subscribe / Unsubscribe Button */}
                <button
                    onClick={handleToggleSubscribe}
                    className={`ml-auto px-4 py-2 rounded-md transition ${
                        isSubscribed
                            ? "bg-gray-300 text-black hover:bg-gray-400"
                            : "bg-black text-white hover:bg-gray-800"
                    }`}
                >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
            </div>
        </div>
    );
}
