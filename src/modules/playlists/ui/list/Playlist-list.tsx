import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";

const playlists = [
  {
    id: 1,
    title: "Xem sau",
    videoCount: 5,
    privacy: "Riêng tư",
    lastUpdated: "Cập nhật hôm qua",
    thumbnail: "/api/placeholder/320/180",
    taglist: "Music",
  },
  {
    id: 2,
    title: "Video đã thích",
    videoCount: 10,
    privacy: "Riêng tư",
    lastUpdated: "Xem toàn bộ danh sách",
    thumbnail: "/api/placeholder/320/180",
    taglist: "Saved",
  },
  {
    id: 3,
    title: "[Siêu phẩm] Văn có chí tôn truyền chủ",
    videoCount: 665,
    privacy: "Của thiên vũ để review",
    lastUpdated: "Xem toàn bộ danh sách",
    thumbnail: "/api/placeholder/320/180",
    taglist: "Saved",
  },
  {
    id: 4,
    title: "NestJS đại pháp",
    videoCount: 13,
    privacy: "Ohayo Dev",
    lastUpdated: "Xem toàn bộ danh sách",
    thumbnail: "/api/placeholder/320/180",
    taglist: "Saved",
  },
  {
    id: 5,
    title: "nightcore sôi động",
    videoCount: 1,
    privacy: "Riêng tư",
    lastUpdated: "Xem toàn bộ danh sách",
    thumbnail: "/api/placeholder/320/180",
    taglist: "Your",
  },
];

export default function Playlistlist() {
  return (
    <div className="flex-1">
      <div className="flex-1 px-6">
        <h1 className="text-2xl font-bold mb-6">Danh sách phát</h1>

        <Tabs
          defaultValue="Playlist"
          className="mb-0"
        >
          <TabsList className="flex justify-start border-none p-0 h-auto gap-2 px-6 w-full">
            {["Recently Added", "Playlist", "Music", "Your", "Saved"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="bg-gray-200 text-black hover:bg-gray-400 
                          data-[state=active]:bg-black data-[state=active]:text-white 
                          rounded-md px-3 py-1.5 text-sm"
                >
                  {tab === "Recently Added"
                    ? "Recently Added"
                    : tab === "Playlist"
                    ? "Playlist"
                    : tab === "Music"
                    ? "Music"
                    : tab === "Your"
                    ? "Your"
                    : "Saved"}
                </TabsTrigger>
              )
            )}
          </TabsList>
          <TabsContent
            value="Recently Added"
            className="mt-8"
          ></TabsContent>
          <TabsContent
            value="Playlist"
            className="mt-8"
          ></TabsContent>
          <TabsContent
            value="Music"
            className="mt-8"
          ></TabsContent>
          <TabsContent
            value="Your"
            className="mt-8"
          ></TabsContent>
          <TabsContent
            value="Saved"
            className="mt-8"
          ></TabsContent>

          <TabsContent
            value="Playlist"
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video">
                    {/* <img src={playlist.thumbnail} alt={playlist.title} className="w-full h-full object-cover" /> */}
                    <Image
                      src={playlist.thumbnail}
                      alt={playlist.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                      {playlist.videoCount} video
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {playlist.title}
                    </h3>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>{playlist.privacy} • Danh sách phát</p>
                      <p className="text-xs text-black hover:underline">
                        <Link href="/playlists/seelater">
                          {playlist.lastUpdated}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="Music"
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists
                .filter((p) => p.taglist === "Music")
                .map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video">
                      {/* <img
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      /> */}
                      <Image
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {playlist.videoCount} video
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {playlist.title}
                      </h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>{playlist.privacy} • Danh sách phát</p>
                        <p className="text-xs text-black hover:underline">
                          <Link href="/playlists/seelater">
                            {playlist.lastUpdated}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent
            value="Your"
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists
                .filter((p) => p.taglist === "Your")
                .map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video">
                      {/* <img
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      /> */}
                      <Image
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {playlist.videoCount} video
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {playlist.title}
                      </h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>{playlist.privacy} • Danh sách phát</p>
                        <p className="text-xs text-black hover:underline">
                          <Link href="/playlists/seelater">
                            {playlist.lastUpdated}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent
            value="Saved"
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists
                .filter((p) => p.taglist === "Saved")
                .map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video">
                      {/* <img
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      /> */}
                      <Image
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {playlist.videoCount} video
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {playlist.title}
                      </h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>{playlist.privacy} • Danh sách phá</p>
                        <p className="text-xs text-black hover:underline">
                          <Link href="/playlists/seelater">
                            {playlist.lastUpdated}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
