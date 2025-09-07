import React from "react";

const playlists = [
  {
    id: 1,
    title: "Xem sau",
    videoCount: 5,
    privacy: "Riêng tư",
    lastUpdated: "Cập nhật hôm qua",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: 2,
    title: "Video đã thích",
    videoCount: 10,
    privacy: "Riêng tư",
    lastUpdated: "Xem toàn bộ danh sách",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: 3,
    title: "[Siêu phẩm] Văn có chí tôn truyền chủ",
    videoCount: 665,
    privacy: "Của thiên vũ để review",
    lastUpdated: "Xem toàn bộ danh sách",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: 4,
    title: "NestJS đại pháp",
    videoCount: 13,
    privacy: "Ohayo Dev",
    lastUpdated: "Xem toàn bộ danh sách",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: 5,
    title: "nightcore sôi động",
    videoCount: 1,
    privacy: "Riêng tư",
    lastUpdated: "Xem toàn bộ danh sách",
    thumbnail: "/api/placeholder/320/180"
  }
];

export default function Playlistlist() {
  return (
    <div className="pl-12 pt-6 w-full"> 
      <h1 className="text-2xl font-bold mb-6">Danh sách phát</h1>

      <div className="flex gap-6 mb-8 border-b">
        <button className="pb-2 border-b-2 border-black font-medium">
          Mới thêm gần đây
        </button>
        <button className="pb-2 text-gray-600 hover:text-gray-900">
          Danh sách phát
        </button>
        <button className="pb-2 text-gray-600 hover:text-gray-900">
          Âm nhạc
        </button>
        <button className="pb-2 text-gray-600 hover:text-gray-900">
          Của bạn
        </button>
        <button className="pb-2 text-gray-600 hover:text-gray-900">
          Đã lưu
        </button>
      </div> 

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                {playlist.videoCount} video
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                {playlist.title}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{playlist.privacy} • Danh sách phát</p>
                <p>{playlist.lastUpdated}</p>
              </div>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
}
