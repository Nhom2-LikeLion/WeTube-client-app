'use client';
import VideoGrid from "@/modules/home/ui/components/video/videoGrid";
import HomeView from "@/modules/home/ui/views/home-view";

export default async function Home() {
  return (
    <>
      <HomeView categoryId=""  />
      <VideoGrid />
    </>
  );
}
