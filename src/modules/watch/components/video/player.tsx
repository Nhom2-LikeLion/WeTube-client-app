"use client"

import {useControls} from "@/hooks/use-controls";
import {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import {Loader} from "../misc/loader";
import {OnProgressProps} from "react-player/base";
import { useVideoStore } from "@/store/zustand/videoStore";

export default function Player() {
    const [isClient, setIsClient] = useState(false);
    const videoUrl = useVideoStore((state) => state.videoDetail?.detail.videoUrl);
    const {
        isPlaying,
        pauseVideo,
        setPercentage,
        setTotalSeek,
        volume,
        setLoaded,
    } = useControls();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || !videoUrl) {
        return (
            <div className="absolute top-0 left-0 h-full w-full bg-black flex justify-center items-center">
                <Loader/>
            </div>
        );
    }

    return (
        <ReactPlayer
            fallback={
                <div className="h-full w-full bg-black flex justify-center items-center"></div>
            }
            playing={isPlaying}
            volume={volume / 100}
            controls={false}
            progressInterval={250}
            url={videoUrl}
            height="100%"
            width="100%"
            style={{aspectRatio: "16/9"}}
            onProgress={(state: OnProgressProps) => {
                setPercentage(Math.min(100, state.played * 100));
                setLoaded(Math.min(100, state.loaded * 100));
            }}
            onReady={(player) => {
                setTotalSeek(player.getDuration());
            }}
            onEnded={() => {
                pauseVideo();
            }}
        />
    );
}
