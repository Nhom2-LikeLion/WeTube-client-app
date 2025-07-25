export interface VideoItem {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  avatar: string;
  videoUrl: string;
}

export const getMockVideos = (): VideoItem[] => [
  {
    id: "1",
    title: "Nature 4K",
    channelName: "Nature World",
    thumbnail: "/thumbnails/nature.jpg",
    avatar: "/avatars/nature.jpg",
    videoUrl: "/videos/nature.mp4",
  },
  // ... thêm video
];