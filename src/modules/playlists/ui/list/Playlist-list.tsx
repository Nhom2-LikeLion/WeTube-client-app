"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import PlaylistCard, { Playlists } from "./playlist-card";
import { playlistService } from "./playlist-API";

export default function Playlistlist({ userId }: { userId: string }) {
  const [playlists, setPlaylists] = useState<Playlists[]>([]);
  const [recentPlaylists, setRecentPlaylists] = useState<Playlists[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        if (!userId) {
          console.error("Missing userId!");
          return;
        }

        const data = await playlistService.getByUser(userId);
        setPlaylists(data);
      } catch (err) {
        console.error("Failed to fetch playlists:", err);
      }
    };

    fetchPlaylists();
  }, [userId]);

  const tabs = [
    { label: "Playlists", value: "playlists", playlistType: null },
    { label: "Watch Later", value: "watchlater", playlistType: "WATCH_LATER" },
    { label: "Music", value: "music", playlistType: "MUSIC" },
    { label: "Saved", value: "saved", playlistType: "SAVED" },
    { label: "Your", value: "your", playlistType: "USER_SAVED" },
    { label: "Liked", value: "liked", playlistType: "LIKED" },
  ];

  return (
    <div className="flex-1 px-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách phát</h1>

      <Tabs defaultValue="playlists">
        <TabsList className="flex justify-start border-none p-0 h-auto gap-2 px-6 w-full">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-gray-200 text-black hover:bg-gray-400 
                         data-[state=active]:bg-black data-[state=active]:text-white 
                         rounded-md px-3 py-1.5 text-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tab.value === "recently-added"
                ? recentPlaylists.map((playlist) => (
                    <PlaylistCard
                      key={playlist.playlistId}
                      playlist={playlist}
                      category={tab.value}
                    />
                  ))
                : tab.playlistType
                ? playlists
                    .filter((p) => p.playlistType === tab.playlistType)
                    .map((playlist) => (
                      <PlaylistCard
                        key={playlist.playlistId}
                        playlist={playlist}
                        category={tab.value}
                      />
                    ))
                : playlists.map((playlist) => (
                    <PlaylistCard
                      key={playlist.playlistId}
                      playlist={playlist}
                      category={tab.value}
                    />
                  ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
