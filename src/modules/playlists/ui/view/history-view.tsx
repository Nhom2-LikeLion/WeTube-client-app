import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  MessageCircle,
  MessageSquare,
  Pause,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import ShortItem from "../sections/ShortItem";
import VideoItem from "../sections/VideoItem";

interface VideoData {
  id: string;
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  duration: string;
  thumbnail: string;
}

interface ShortData {
  id: string;
  title: string;
  views: string;
  thumbnail: string;
}

const History = () => {
  const videoData: VideoData[] = [
    {
      id: "1",
      title:
        "Build a YouTube Clone with Next.js 15: React, Tailwind, Drizzle, tRPC (2025)",
      channel: "Code With Antonio",
      views: "146 N lượt xem",
      timestamp: "2025",
      duration: "11:43:27",
      thumbnail:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop",
    },
    {
      id: "2",
      title:
        "Build a YouTube Clone with Next.js 15: React, Tailwind, Drizzle, tRPC (Part 2/2)",
      channel: "Code With Antonio",
      views: "31 N lượt xem",
      timestamp: "PART 2/2",
      duration: "11:59:06",
      thumbnail:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop",
    },
    {
      id: "3",
      title: "Master Next.JS in easy way",
      channel: "Nova Designs",
      views: "112 N lượt xem",
      timestamp: "",
      duration: "8:45",
      thumbnail:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop",
    },
  ];

  const shortData: ShortData[] = [
    {
      id: "1",
      title: "CSS Button Hover Effects | HTML | CSS | JavaScript",
      views: "451 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=160&h=288&fit=crop",
    },
    {
      id: "2",
      title: "#html #css#html5#coding #webdevelopment",
      views: "2,1 Tr lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=160&h=288&fit=crop",
    },
    {
      id: "3",
      title: "Chỉ cần không biết tiếng Việt sẽ tưởng là nhạc Hàn",
      views: "724 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=160&h=288&fit=crop",
    },
  ];

  return (
    <div className="flex">
      <div className="w-2/3 min-h-screen bg-white text-black flex">
        {/* Main Content - Scrollable */}
        <div className="flex-1 ">
          <div className="p-6">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-normal mb-6">Nhật ký xem</h1>

              {/* Filter Tabs */}
              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="bg-transparent border-none p-0 h-auto gap-1">
                  <TabsTrigger
                    value="all"
                    className="bg-black text-white hover:bg-gray-800 data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
                  >
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger
                    value="video"
                    className="bg-gray-100 text-black hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
                  >
                    Video
                  </TabsTrigger>
                  <TabsTrigger
                    value="shorts"
                    className="bg-gray-100 text-black hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
                  >
                    Shorts
                  </TabsTrigger>
                  <TabsTrigger
                    value="podcast"
                    className="bg-gray-100 text-black hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
                  >
                    Podcast
                  </TabsTrigger>
                  <TabsTrigger
                    value="music"
                    className="bg-gray-100 text-black hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
                  >
                    Âm nhạc
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-8">
                  {/* Today's Videos Section */}
                  <div className="mb-12">
                    <h2 className="text-xl font-normal mb-6">Hôm nay</h2>
                    <div className="space-y-4">
                      {videoData.map((video) => (
                        <VideoItem key={video.id} {...video} />
                      ))}
                    </div>
                  </div>

                  {/* Shorts Section */}
                  <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-sm"></div>
                      </div>
                      <h2 className="text-xl font-normal">Shorts</h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {shortData.map((short) => (
                        <div key={short.id} className="flex-shrink-0">
                          <ShortItem {...short} />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="mt-8">
                  <h2 className="text-xl font-normal mb-6">Video</h2>
                  <div className="space-y-4">
                    {videoData.map((video) => (
                      <VideoItem key={video.id} {...video} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="shorts" className="mt-8">
                  <h2 className="text-xl font-normal mb-6">Shorts</h2>
                  <div className="flex gap-4 flex-wrap">
                    {shortData.map((short) => (
                      <div key={short.id} className="flex-shrink-0">
                        <ShortItem {...short} />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="podcast" className="mt-8">
                  <h2 className="text-xl font-normal mb-6">Podcast</h2>
                  <div className="text-gray-500 text-center py-12">
                    Không có podcast nào trong lịch sử
                  </div>
                </TabsContent>

                <TabsContent value="music" className="mt-8">
                  <h2 className="text-xl font-normal mb-6">Âm nhạc</h2>
                  <div className="text-gray-500 text-center py-12">
                    Không có âm nhạc nào trong lịch sử
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar - Fixed */}
      <div className="w-1/3 p-6 border-l border-gray-200 sticky top-10 ">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm trong danh sách video của bạn"
            className="pl-10 bg-gray-50 border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
          />
        </div>
        {/* History Controls */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-3 text-black hover:bg-gray-100 text-left"
          >
            <Trash2 className="h-5 w-5 mr-3 flex-shrink-0" />
            <span>Xóa tất cả nhật ký xem</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-3 text-black hover:bg-gray-100 text-left"
          >
            <Pause className="h-5 w-5 mr-3 flex-shrink-0" />
            <span>Tạm dừng lưu nhật ký xem</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-3 text-black hover:bg-gray-100 text-left"
          >
            <Settings className="h-5 w-5 mr-3 flex-shrink-0" />
            <span>Quản lý toàn bộ nhật ký hoạt động</span>
          </Button>
        </div>
        {/* Additional Options */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3 text-gray-600 hover:bg-gray-100 hover:text-black text-left"
            >
              <MessageCircle className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Bình luận</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3 text-gray-600 hover:bg-gray-100 hover:text-black text-left"
            >
              <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Bài đăng</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3 text-gray-600 hover:bg-gray-100 hover:text-black text-left"
            >
              <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Trò chuyện trực tiếp</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
