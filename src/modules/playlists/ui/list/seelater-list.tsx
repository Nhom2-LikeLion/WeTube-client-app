import { MoreVertical, PlayCircle, Shuffle } from 'lucide-react';
import { Play } from 'next/font/google';
import React, { useState } from 'react'


  
  const watchVideos = [
    {
      id: 1,
      title: "(Dredge #2) Chuyện gia sãn bắt Dồ Mixi tung hoành biển khơi, nâng cấp siêu...",
      channel: "MixiGaming",
      views: "225 N lượt xem",
      time: "6 ngày trước",
      duration: "5:04:32",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      id: 2,
      title: "Nightcore - Last Chance (Official Music Video)",
      channel: "IMZA 464",
      views: "4.9 N lượt xem",
      time: "10 tháng trước", 
      duration: "2:27",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      id: 3,
      title: "Full Trọn Bộ | Kể Sao Chép Tất Cả Kỹ Năng Khi Số Hữu Co...",
      channel: "Pikapi Channel",
      views: "",
      time: "8 tháng trước",
      duration: "13:36:18",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      id: 4,
      title: "HỆ THỐNG MÔ PHỎNG TƯƠNG LAI, TA LÀ GOBLIN THẦN VÔ ĐỊCH PHẦN 1 + 2 |...",
      channel: "Bé Một Review",
      views: "1.3 N lượt xem",
      time: "8 tháng trước",
      duration: "4:19:52",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      id: 5,
      title: "BUỒN HAY VUI - VSOUL x MCK x Obito x Ronboogz x Boyzed (Official Audio)",
      channel: "VSOUL",
      views: "72 Tr lượt xem",
      time: "1 năm trước",
      duration: "3:45",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      id: 6,
      title: "HỆ THỐNG MÔ PHỎNG TƯƠNG LAI, TA LÀ GOBLIN THẦN VÔ ĐỊCH PHẦN 1 + 2 |...",
      channel: "Bé Một Review",
      views: "1.3 N lượt xem",
      time: "8 tháng trước",
      duration: "4:19:52",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      id: 7,
      title: "BUỒN HAY VUI - VSOUL x MCK x Obito x Ronboogz x Boyzed (Official Audio)",
      channel: "VSOUL",
      views: "72 Tr lượt xem",
      time: "1 năm trước",
      duration: "3:45",
      thumbnail: "/api/placeholder/320/180"
    }
  ];


export default function Seelaterlist() {
  return (
    <div className="flex h-160 bg-white overflow-hidden">

      <div className="flex max-w-7xl mx-auto ">

          <div className="lg:col-span-1 h-full sticky top-0 w-110 p-6 ">
            <div className="bg-gradient-to-b h-full from-purple-600 to-purple-800 rounded-lg p-6 text-white">
              <img
                src="/api/placeholder/300/200"
                alt="Playlist"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">Xem sau</h1>
              <p className="text-sm text-purple-200 mb-4">
                5 video • 0 lượt xem • Cập nhật hôm qua
              </p>

              <div className="flex gap-2 mb-4">
                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-100">
                  <PlayCircle size={16} />
                  Phát tất cả
                </button>
                <button className="flex items-center gap-2 border border-white/30 px-4 py-2 rounded-full hover:bg-white/10">
                  <Shuffle size={16} />
                  Trộn bài
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-screen overflow-y-auto space-y-4">
            {watchVideos.map((video, index) => (
              <div key={video.id} className="flex gap-4 hover:bg-gray-50 p-2 rounded-lg">
                <div className="text-sm text-gray-500 w-8 flex-shrink-0 pt-2">
                  {index + 1}
                </div>
                <div className="relative flex-shrink-0">
                  <img 
                    src="/api/placeholder/168/94" 
                    alt={video.title}
                    className="w-42 h-24 object-cover rounded-lg"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{video.channel}</p>
                    {video.views && <p>{video.views} • {video.time}</p>}
                    {!video.views && <p>{video.time}</p>}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="p-2 hover:bg-gray-200 rounded-full">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

