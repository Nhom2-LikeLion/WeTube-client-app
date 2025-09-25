"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { playlistService } from "../list/playlist-API";
import VideoItem from "./VideoItem";
import { useAuth } from "@/contexts/auth-context";


export default function HistoryList({ userId }: { userId: string }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await playlistService.getByUserAndType(userId, "HISTORY");
        setVideos(res?.videos || []);
      } catch (err) {
        console.error(" Lỗi load history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (loading) return <p>Đang tải lịch sử...</p>;

  if (!videos.length) return <p>Chưa có video nào trong lịch sử</p>;

  return (
    <div className="max-w-4xl pl-12 pt-6 text-black">
      <h1 className="text-4xl font-bold mb-3">Watch History</h1>

      {/* Filter Tabs */}
      <Tabs defaultValue="all" className="mb-0">
        <TabsList className="border-none p-0 h-auto gap-2 flex-rap">
          {["all", "video", "shorts", "podcast", "music"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="bg-gray-200 text-black hover:bg-gray-400 data-[state=active]:bg-black data-[state=active]:text-white rounded-sm px-3 py-1.5"
            >
              {tab === "all"
                ? "All"
                : tab === "video"
                ? "Video"
                : tab === "shorts"
                ? "Shorts"
                : tab === "podcast"
                ? "Podcast"
                : "Music"}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab All */}
        <TabsContent value="all" className="mt-8">
          <h2 className="text-xl font-bold mb-6">Hôm nay</h2>
          <div className="space-y-3">
            {videos.map((v) => (
              <VideoItem
                key={v.videoId}
                id={v.videoId}
                title={v.videoTitle}
                channel={v.channelName || "Unknown"}
                views={`${v.totalViews || 0} lượt xem`}
                duration={v.duration}
                thumbnail={v.thumbnailUrl}
                progress={v.historyDuration}
                 onAddedToHistory={v.fetchHistory}
              />
            ))}
          </div>
        </TabsContent>

        {/* Tab Video */}
        <TabsContent value="video" className="mt-8">
          <h2 className="text-xl font-bold mb-6">Video</h2>
          <div className="space-y-3">
            {videos
              .filter((v) => v.type === "VIDEO")
              .map((v) => (
                <VideoItem
                  key={v.videoId}
                  id={v.videoId}
                  title={v.videoTitle}
                  channel={v.channelName || "Unknown"}
                  views={`${v.totalViews || 0} lượt xem`}
                  duration={v.duration}
                  thumbnail={v.thumbnailUrl}
                  progress={v.historyDuration}
                  onAddedToHistory={v.fetchHistory}
                />
              ))}
          </div>
        </TabsContent>

        {/* Tab Podcast */}
        <TabsContent value="podcast" className="mt-8">
          <h2 className="text-xl font-bold mb-6">Podcast</h2>
          <div className="space-y-3">
            {videos
              .filter((v) => v.type === "PODCAST")
              .map((v) => (
                <VideoItem
                  key={v.videoId}
                  id={v.videoId}
                  title={v.videoTitle}
                  channel={v.channelName || "Unknown"}
                  views={`${v.totalViews || 0} lượt xem`}
                  duration={v.duration}
                  thumbnail={v.thumbnailUrl}
                  progress={v.historyDuration}
                  onAddedToHistory={v.fetchHistory}
                />
              ))}
          </div>
        </TabsContent>

        {/* Tab Music */}
        <TabsContent value="music" className="mt-8">
          <h2 className="text-xl font-bold mb-6">Âm nhạc</h2>
          <div className="space-y-3">
            {videos
              .filter((v) => v.type === "MUSIC")
              .map((v) => (
                <VideoItem
                  key={v.videoId}
                  id={v.videoId}
                  title={v.videoTitle}
                  channel={v.channelName || "Unknown"}
                  views={`${v.totalViews || 0} lượt xem`}
                  duration={v.duration}
                  thumbnail={v.thumbnailUrl}
                  progress={v.historyDuration}
                  onAddedToHistory={v.fetchHistory}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
