import { useGetVideoDetailQuery } from "@/app/api/videoApi";
import { Comments } from "./components/comments/comments";
import Shorts from "./components/shorts";
import ActiveVideo from "./components/video";
import VideoMetadata from "./components/video-metadata";
import VideoTags from "./components/video-tags";
import MiniPlayer from "./components/video/miniplayer";
import VideosList from "./components/videos-list";
import {useVideoStore } from "@/store/zustand/videoStore";
import { useEffect } from "react";
interface AppProps {
  videoId: string;
}

export default function App({ videoId }: AppProps) {
  const { data, isLoading, isError } = useGetVideoDetailQuery({videoId});
  const setVideoDetail = useVideoStore((state) => state.setVideoDetail);
  const clearVideoDetail = useVideoStore((state) => state.clearVideoDetail);

  useEffect(() => {
    if (data) setVideoDetail(data);
    return () => clearVideoDetail(); // clear khi unmount hoặc đổi videoId
  }, [data, setVideoDetail, clearVideoDetail]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <section className="h-full w-full relative">
      <div className="py-6 px-6 xxl:px-20 grid grid-cols-1 md:grid-cols-6 xxl:grid-cols-8 gap-6 h-full overflow-y-scroll">
        <section className="col-span-1 md:col-span-4 xxl:col-span-6">
          <ActiveVideo/>
          <VideoMetadata />
          <Comments />
        </section>
        <section className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <VideoTags />
          <Shorts />
          <VideosList />
        </section>
      </div>
      <MiniPlayer />
    </section>
  );
}
