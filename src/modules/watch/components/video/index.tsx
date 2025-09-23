"use client";

import { Pause, Play } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import ControlButtons from "./control-buttons";
import PlayerLoader from "./player-loader";
import PreviewGrid from "./preview-grid";
import SliderControls from "./slider-controls";
import { useControls } from "@/hooks/use-controls";
import { useVideoStore } from "@/store/zustand/videoStore";

export default function ActiveVideo() {
  const {
    percentage,
    loaded,
    isPlaying,
    playVideo,
    pauseVideo,
    showControls,
    pipMode,
    displayControls,
    hideControls,
    setPercentage,
    setTotalSeek,
    animatePlay,
    volume,
    setLoaded,
    isFullscreen,
    playbackSpeed,
    toggleFullscreen,
    setSeekSync,
  } = useControls();

  const reactPlayerRef = useRef<ReactPlayer | null>(null);
  const [isClient, setIsClient] = useState(false);
  const videoDetail = useVideoStore((state) => state.videoDetail);
  const videoUrl = videoDetail?.detail.videoUrl;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDisplayControls = () => {
    if (isPlaying) displayControls();
  };

  const handleHideControls = () => {
    if (isPlaying) hideControls();
  };

  const handleVideoClick = () => {
    isPlaying ? pauseVideo() : playVideo();
  };

  const handleSeek = (value: string) => {
    setPercentage(Number(value));
    reactPlayerRef.current?.seekTo(Number(value) / 100, "fraction");
  };

  const renderPlayer = () => {
    if (!videoUrl) return null;
    return (
        <ReactPlayer
            ref={reactPlayerRef}
            fallback={
              <div className="absolute top-0 left-0 h-full w-full bg-black flex justify-center items-center"></div>
            }
            playing={isPlaying}
            volume={pipMode ? 0 : volume / 100}
            controls={false}
            progressInterval={250}
            url={videoUrl}
            height="100%"
            width="100%"
            playbackRate={playbackSpeed}
            style={{
              aspectRatio: "16/9",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: pipMode ? 0 : 1,
            }}
            onProgress={(state: OnProgressProps) => {
              setPercentage(Math.min(100, state.played * 100));
              setLoaded(Math.min(100, state.loaded * 100));
            }}
            onSeek={(seconds: number) => setSeekSync(seconds)}
            onReady={(player) => setTotalSeek(player.getDuration())}
            onEnded={() => pauseVideo()}
        />
    );
  };

  const renderVideoPlayer = () => {
    if (percentage < 100) {
      return isClient ? renderPlayer() : <PlayerLoader />;
    }
    return <PreviewGrid />;
  };

  const renderVideoControls = () => {
    if (loaded > 0) {
      return (
          <section
              className={`absolute ${
                  isFullscreen ? "" : "bottom-0"
              } left-0 z-20 h-max w-full flex flex-col justify-end items-center transition-opacity duration-150 ${
                  showControls ? "opacity-100" : "opacity-0"
              }`}
          >
            <SliderControls handleSeek={handleSeek} />
            <ControlButtons />
          </section>
      );
    }
  };

  const renderVideoClickHandles = () => {
    if (percentage < 100) {
      return (
          <section className="absolute h-full w-full flex justify-center items-center z-10 top-0 left-0">
            <div
                className="h-[85%] -mt-16 w-full flex justify-center items-center"
                onClick={handleVideoClick}
                onDoubleClick={toggleFullscreen}
            >
              {(animatePlay === "play" || animatePlay === "pause") && (
                  <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{
                        duration: 0.6,
                        scale: { type: "spring", visualDuration: 0.6, bounce: 0 },
                      }}
                      className="text-white bg-gray-500/50 p-4 rounded-full"
                  >
                    {animatePlay === "play" ? (
                        <Play className="cursor-pointer" weight="fill" size={24} />
                    ) : (
                        <Pause className="cursor-pointer" weight="fill" size={24} />
                    )}
                  </motion.div>
              )}
            </div>
          </section>
      );
    }
  };

  return (
      <section
          className={`${
              isFullscreen
                  ? "w-screen h-screen fixed top-0 left-0 z-50"
                  : "relative w-full h-max aspect-video rounded-2xl overflow-hidden"
          }`}
          onMouseOver={handleDisplayControls}
          onMouseLeave={handleHideControls}
      >
        <div
            className={`${
                isFullscreen
                    ? "fixed bg-black h-screen w-screen flex flex-col justify-end items-center py-4"
                    : ""
            }`}
        >
          {renderVideoPlayer()}
          {renderVideoControls()}
          {renderVideoClickHandles()}
        </div>
      </section>
  );
}
