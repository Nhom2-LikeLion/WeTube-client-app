// 'use client';

// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import { useVideoPlayerState, useVideoPlayerActions, useViewModeState } from '@/stores';
// import VideoControls from '../VideoControls';
// import { cn } from '@/lib/utils';
// import { VideoMetadata, VideoPlayerEvents, VideoQuality } from '../../../types/video.types';

// interface VideoPlayerProps {
//   src: string;
//   poster?: string;
//   autoplay?: boolean;
//   muted?: boolean;
//   metadata: VideoMetadata;
//   onStateChange?: (state: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
//   events?: VideoPlayerEvents;
//   initialQuality?: string;
//   enableKeyboardShortcuts?: boolean;
//   showControls?: boolean;
//   controlsTimeout?: number;
//   className?: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({
//   src,
//   poster,
//   autoplay = false,
//   muted = false,
//   metadata,
//   onStateChange,
//   events,
//   initialQuality = 'auto',
//   enableKeyboardShortcuts = true,
//   showControls = true,
//   controlsTimeout = 3000,
//   className,
//   ...props
// }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const { currentMode, config } = useViewModeState();
//   const { playerState } = useVideoPlayerState();
//   const {
//     setPlaying,
//     setPaused,
//     setCurrentTime,
//     setDuration,
//     setVolume,
//     setMuted,
//     setPlaybackRate,
//     setQuality,
//     setBuffering,
//     setLoading,
//     setError,
//     updatePlayerState,
//     initializePlayer,
//   } = useVideoPlayerActions();
  
//   const [controlsVisible, setControlsVisible] = useState(true);
//   const [isHovering, setIsHovering] = useState(false);

//   // Initialize player
//   useEffect(() => {
//     if (metadata.id) {
//       initializePlayer(metadata.id);
//     }
//   }, [metadata.id, initializePlayer]);

//   // Video event handlers
//   const handlePlay = useCallback(() => {
//     setPlaying(true);
//     events?.onPlay?.();
//   }, [setPlaying, events]);

//   const handlePause = useCallback(() => {
//     setPaused(true);
//     events?.onPause?.();
//   }, [setPaused, events]);

//   const handleTimeUpdate = useCallback(() => {
//     if (videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       setCurrentTime(currentTime);
//       events?.onTimeUpdate?.(currentTime);
//     }
//   }, [setCurrentTime, events]);

//   const handleDurationChange = useCallback(() => {
//     if (videoRef.current) {
//       const duration = videoRef.current.duration;
//       setDuration(duration);
//       events?.onDurationChange?.(duration);
//     }
//   }, [setDuration, events]);

//   const handleVolumeChange = useCallback(() => {
//     if (videoRef.current) {
//       const volume = videoRef.current.volume;
//       const isMuted = videoRef.current.muted;
//       setVolume(volume);
//       setMuted(isMuted);
//       events?.onVolumeChange?.(volume);
//     }
//   }, [setVolume, setMuted, events]);

//   const handleLoadStart = useCallback(() => {
//     setLoading(true);
//     events?.onLoadStart?.();
//   }, [setLoading, events]);

//   const handleLoadedData = useCallback(() => {
//     setLoading(false);
//     events?.onLoadEnd?.();
//   }, [setLoading, events]);

//   const handleWaiting = useCallback(() => {
//     setBuffering(true);
//     events?.onBufferStart?.();
//   }, [setBuffering, events]);

//   const handleCanPlay = useCallback(() => {
//     setBuffering(false);
//     events?.onBufferEnd?.();
//   }, [setBuffering, events]);

//   const handleError = useCallback(() => {
//     if (videoRef.current?.error) {
//       const error = `Video error: ${videoRef.current.error.message}`;
//       setError(error);
//       events?.onError?.(error);
//     }
//   }, [setError, events]);

//   // Control functions
//   const play = useCallback(() => {
//     videoRef.current?.play();
//   }, []);

//   const pause = useCallback(() => {
//     videoRef.current?.pause();
//   }, []);

//   const seek = useCallback((time: number) => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = time;
//     }
//   }, []);

//   const changeVolume = useCallback((volume: number) => {
//     if (videoRef.current) {
//       const clampedVolume = Math.max(0, Math.min(1, volume));
//       videoRef.current.volume = clampedVolume;
//     }
//   }, []);

//   const toggleMute = useCallback(() => {
//     if (videoRef.current) {
//       videoRef.current.muted = !videoRef.current.muted;
//     }
//   }, []);

//   // Controls visibility management
//   const showControlsTemporarily = useCallback(() => {
//     setControlsVisible(true);
    
//     if (controlsTimeoutRef.current) {
//       clearTimeout(controlsTimeoutRef.current);
//     }
    
//     if (playerState.isPlaying && !isHovering) {
//       controlsTimeoutRef.current = setTimeout(() => {
//         setControlsVisible(false);
//       }, controlsTimeout);
//     }
//   }, [playerState.isPlaying, isHovering, controlsTimeout]);

//   const handleMouseMove = useCallback(() => {
//     showControlsTemporarily();
//   }, [showControlsTemporarily]);

//   const handleMouseEnter = useCallback(() => {
//     setIsHovering(true);
//     setControlsVisible(true);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     setIsHovering(false);
//     if (playerState.isPlaying) {
//       showControlsTemporarily();
//     }
//   }, [playerState.isPlaying, showControlsTemporarily]);

//   const handleClick = useCallback(() => {
//     if (playerState.isPlaying) {
//       pause();
//     } else {
//       play();
//     }
//   }, [playerState.isPlaying, play, pause]);

//   // Keyboard shortcuts
//   useEffect(() => {
//     if (!enableKeyboardShortcuts) return;

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
//         return;
//       }

//       switch (event.key.toLowerCase()) {
//         case ' ':
//         case 'k':
//           event.preventDefault();
//           playerState.isPlaying ? pause() : play();
//           break;
//         case 'm':
//           event.preventDefault();
//           toggleMute();
//           break;
//         case 'arrowleft':
//           event.preventDefault();
//           seek(Math.max(0, playerState.currentTime - 10));
//           break;
//         case 'arrowright':
//           event.preventDefault();
//           seek(Math.min(playerState.duration, playerState.currentTime + 10));
//           break;
//         case 'arrowup':
//           event.preventDefault();
//           changeVolume(Math.min(1, playerState.volume + 0.05));
//           break;
//         case 'arrowdown':
//           event.preventDefault();
//           changeVolume(Math.max(0, playerState.volume - 0.05));
//           break;
//         default:
//           // Number keys for seeking to percentage
//           if (event.key >= '0' && event.key <= '9') {
//             event.preventDefault();
//             const percent = parseInt(event.key) / 10;
//             seek(playerState.duration * percent);
//           }
//           break;
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [enableKeyboardShortcuts, playerState, play, pause, seek, changeVolume, toggleMute]);

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       if (controlsTimeoutRef.current) {
//         clearTimeout(controlsTimeoutRef.current);
//       }
//     };
//   }, []);

//   const containerClasses = cn(
//     'relative bg-black rounded-lg overflow-hidden',
//     'transition-all duration-300 ease-in-out',
//     config.containerClass,
//     {
//       'cursor-none': !controlsVisible && playerState.isPlaying,
//       'aspect-video': currentMode !== 'fullscreen',
//       'w-full h-full': currentMode === 'fullscreen'
//     },
//     className
//   );

//   return (
//     <div 
//       className={containerClasses}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onClick={handleClick}
//       style={{ aspectRatio: config.videoAspectRatio }}
//     >
//       <video
//         ref={videoRef}
//         src={src}
//         poster={poster}
//         autoPlay={autoplay}
//         muted={muted}
//         className="w-full h-full object-contain"
//         onPlay={handlePlay}
//         onPause={handlePause}
//         onTimeUpdate={handleTimeUpdate}
//         onDurationChange={handleDurationChange}
//         onVolumeChange={handleVolumeChange}
//         onLoadStart={handleLoadStart}
//         onLoadedData={handleLoadedData}
//         onWaiting={handleWaiting}
//         onCanPlay={handleCanPlay}
//         onError={handleError}
//         {...props}
//       />
      
//       {showControls && controlsVisible && (
//         <VideoControls
//           onPlay={play}
//           onPause={pause}
//           onSeek={seek}
//           onVolumeChange={changeVolume}
//           onMute={toggleMute}
//           onPlaybackRateChange={(rate: number) => {
//             if (videoRef.current) {
//               videoRef.current.playbackRate = rate;
//               setPlaybackRate(rate);
//             }
//           }}
//           onQualityChange={(quality: string) => {
//             setQuality(quality as VideoQuality)
//           }}
//           className={cn(
//             'absolute inset-0 transition-opacity duration-200',
//             controlsVisible ? 'opacity-100' : 'opacity-0'
//           )}
//         />
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;