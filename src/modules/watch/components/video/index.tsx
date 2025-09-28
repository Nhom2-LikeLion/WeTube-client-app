"use client";

import { Pause, Play } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import type { OnProgressProps } from "react-player/base";
import ControlButtons from "./control-buttons";
import PlayerLoader from "./player-loader";
import PreviewGrid from "./preview-grid";
import SliderControls from "./slider-controls";
import { useControls } from "@/hooks/use-controls";
import { useVideoStore } from "@/store/zustand/videoStore";
import { useSubtitles } from "@/hooks/use-subtitles";

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

  // lấy dữ liệu video từ store
  const videoDetailResponse = useVideoStore((state) => state.videoDetail);
  const videoDetail = videoDetailResponse?.detail;
  const videoUrl = videoDetail?.videoUrl;
  const subtitleUrl = videoDetail?.subtitles?.[0]?.subtitleUrl;

  // hook xử lý phụ đề
  const cues = useSubtitles(subtitleUrl);
  const [currentSub, setCurrentSub] = useState("");

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
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const handleSeek = (value: string) => {
    setPercentage(Number(value));
    reactPlayerRef.current?.seekTo(Number(value) / 100, "fraction");
  };

  const renderPlayer = () => {
    if (!videoUrl) return null;
    return (
      <div className="relative w-full h-full">
<div className="relative w-full aspect-video bg-black">
  <ReactPlayer
    ref={reactPlayerRef}
    playing={isPlaying}
    volume={pipMode ? 0 : volume / 100}
    controls={false}
    progressInterval={250}
    url={videoUrl}
    width="100%"
    height="100%"
    playbackRate={playbackSpeed}
    onProgress={(state: OnProgressProps) => {
      setPercentage(Math.min(100, state.played * 100));
      setLoaded(Math.min(100, state.loaded * 100));

      // cập nhật phụ đề
      const cue = cues.find(
        (c) =>
          state.playedSeconds >= c.start &&
          state.playedSeconds <= c.end
      );
      setCurrentSub(cue?.text ?? "");
    }}
    onSeek={(seconds: number) => setSeekSync(seconds)}
    onReady={(player) => setTotalSeek(player.getDuration())}
    onEnded={() => pauseVideo()}
/>
</div>


        {/* Overlay subtitle */}
        {currentSub && (
          <div className="absolute bottom-12 w-full text-center px-4 z-30">
            <p className="inline-block bg-black/70 text-white text-lg md:text-xl rounded px-3 py-1 leading-relaxed drop-shadow-lg">
              {currentSub}
            </p>
          </div>
        )}
      </div>
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
