import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShortItem from "../sections/ShortItem";
import Sidebar from "../sections/SideBar";
import VideoItem from "../sections/VideoItem";

interface VideoData {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  progress?: number;
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
      duration: "11:43:27",
      thumbnail:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop",
      progress: 0.85, // 85% đã xem
    },
    {
      id: "2",
      title:
        "Build a YouTube Clone with Next.js 15: React, Tailwind, Drizzle, tRPC (Part 2/2)",
      channel: "Code With Antonio",
      views: "31 N lượt xem",
      duration: "11:59:06",
      thumbnail:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop",
      progress: 0.25, // chỉ mới xem 25%
    },
    {
      id: "3",
      title: "Master Next.JS in easy way",
      channel: "Nova Designs",
      views: "112 N lượt xem",
      duration: "8:45",
      thumbnail:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop",
      progress: 0.0, // chưa xem
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
    <div className="max-w-4xl pl-12 pt-6 text-black">
      <h1 className="text-4xl font-bold mb-3">Nhật ký xem</h1>

      {/* Side Show On Mobile and Tablet Only */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      <Tabs defaultValue="all" className="mb-0">
        <TabsList className=" border-none p-0 h-auto gap-2 flex-wrap">
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

        <TabsContent value="all" className="mt-4">
          <h2 className="text-xl font-bold mb-6">Hôm nay</h2>
          <div className="space-y-0">
            {videoData.map((video) => (
              <VideoItem key={video.id} {...video} />
            ))}
          </div>

          <div className="mt-12">
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
  );
};

export default History;
