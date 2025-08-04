'use client';

import React, { useCallback } from 'react';
import { useVideoPlayerState, useViewModeActions } from '@/stores';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Theater,
  PictureInPicture,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onMute: () => void;
  onPlaybackRateChange?: (rate: number) => void;
  onQualityChange?: (quality: string) => void;
  className?: string;
  showQualitySelector?: boolean;
  showPlaybackRate?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
  onMute,
  onPlaybackRateChange,
  onQualityChange,
  className,
  showQualitySelector = true,
  showPlaybackRate = true,
}) => {
  const { playerState } = useVideoPlayerState();
  const { toggleTheater, toggleFullscreen, enableMiniplayer } = useViewModeActions();

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * playerState.duration;
    onSeek(time);
  }, [playerState.duration, onSeek]);

  const handleVolumeClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onVolumeChange(Math.max(0, Math.min(1, percent)));
  }, [onVolumeChange]);

  return (
    <div className={cn('flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent', className)}>
      {/* Progress Bar */}
      <div className="mb-2">
        <div
          className="w-full h-1 bg-white/30 rounded-full cursor-pointer hover:h-2 transition-all"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-red-600 rounded-full relative"
            style={{ width: `${(playerState.currentTime / playerState.duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between text-white">
        {/* Left Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={playerState.isPlaying ? onPause : onPlay}
            className="text-white hover:bg-white/20 p-2"
          >
            {playerState.isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
          
          <div className="flex items-center space-x-2 group">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMute}
              className="text-white hover:bg-white/20 p-2"
            >
              {playerState.isMuted || playerState.volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
            
            <div className="w-0 group-hover:w-20 transition-all duration-200 overflow-hidden">
              <div
                className="w-20 h-1 bg-white/30 rounded-full cursor-pointer"
                onClick={handleVolumeClick}
              >
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${playerState.isMuted ? 0 : playerState.volume * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="text-sm font-mono text-white">
            {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          {showPlaybackRate && onPlaybackRateChange && (
            <select
              value={playerState.playbackRate}
              onChange={(e) => onPlaybackRateChange(parseFloat(e.target.value))}
              className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20 hover:bg-black/70 transition-colors"
            >
              <option value={0.25}>0.25x</option>
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>Normal</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          )}

          {showQualitySelector && onQualityChange && (
            <select
              value={playerState.quality}
              onChange={(e) => onQualityChange(e.target.value)}
              className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20 hover:bg-black/70 transition-colors"
            >
              <option value="auto">Auto</option>
              <option value="2160p">2160p</option>
              <option value="1440p">1440p</option>
              <option value="1080p">1080p</option>
              <option value="720p">720p</option>
              <option value="480p">480p</option>
              <option value="360p">360p</option>
            </select>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={enableMiniplayer}
            className="text-white hover:bg-white/20 p-2"
            title="Miniplayer (i)"
          >
            <PictureInPicture className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheater}
            className="text-white hover:bg-white/20 p-2"
            title="Theater mode (t)"
          >
            <Theater className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20 p-2"
            title="Fullscreen (f)"
          >
            {playerState.isFullscreen ? (
              <Minimize className="w-5 h-5" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2"
            title="More options"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;