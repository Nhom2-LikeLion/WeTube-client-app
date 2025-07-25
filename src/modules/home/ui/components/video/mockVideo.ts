// data/mockData.ts
export interface VideoItem {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  avatar: string;
  videoUrl: string;
  views: number;
  uploadedAt: string;
}

export const getMockVideos = (): VideoItem[] => [
  {
    id: "1",
    title: "Nature 4K",
    channelName: "Nature World",
    thumbnail:
      "https://i.ytimg.com/vi/MsMklJuyiwY/hq720.jpg?v=6881d3e4&sqp=CPiMiMQG-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA-VhS88_o3plp2xSJj0Bo2P_kEOg",
    avatar: "https://placehold.co/80x80/nature/fff.png?text=N",
    videoUrl: "/videos/nature.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
  {
    id: "2",
    title: "Space Travel",
    channelName: "Cosmos",
    thumbnail:
      "https://i.ytimg.com/vi/dPq8j6HALdM/hq720.jpg?v=68822d9e&sqp=CIi_icQG-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAGYbmsOQo8ZZC2GrjPP4cDhguXvA",
    avatar: "https://placehold.co/80x80/space/fff?text=C",
    videoUrl: "/videos/space.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
  {
    id: "3",
    title: "City Timelapse",
    channelName: "Urban Explorer",
    thumbnail:
      "//i.ytimg.com/vi/dPq8j6HALdM/hq720.jpg?v=68822d9e&sqp=CIi_icQG-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAGYbmsOQo8ZZC2GrjPP4cDhguXvA",
    avatar: "https://placehold.co/80x80/city/fff?text=U",
    videoUrl: "/videos/city.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
  {
    id: "4",
    title: "Nature 4K",
    channelName: "Nature World",
    thumbnail:
      "https://i.ytimg.com/vi/MsMklJuyiwY/hq720.jpg?v=6881d3e4&sqp=CPiMiMQG-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA-VhS88_o3plp2xSJj0Bo2P_kEOg",
    avatar: "https://placehold.co/80x80/nature/fff.png?text=N",
    videoUrl: "/videos/nature.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
  {
    id: "5",
    title: "Nature 4K",
    channelName: "Nature World",
    thumbnail:
      "https://i.ytimg.com/vi/MsMklJuyiwY/hq720.jpg?v=6881d3e4&sqp=CPiMiMQG-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA-VhS88_o3plp2xSJj0Bo2P_kEOg",
    avatar: "https://placehold.co/80x80/nature/fff.png?text=N",
    videoUrl: "/videos/nature.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
  {
    id: "6",
    title: "Nature 4K",
    channelName: "Nature World",
    thumbnail:
      "https://i.ytimg.com/vi/MsMklJuyiwY/hq720.jpg?v=6881d3e4&sqp=CPiMiMQG-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA-VhS88_o3plp2xSJj0Bo2P_kEOg",
    avatar: "https://placehold.co/80x80/nature/fff.png?text=N",
    videoUrl: "/videos/nature.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
  {
    id: "7",
    title: "Nature 4K",
    channelName: "Nature World",
    thumbnail:
      "https://i.ytimg.com/vi/MsMklJuyiwY/hq720.jpg?v=6881d3e4&sqp=CPiMiMQG-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA-VhS88_o3plp2xSJj0Bo2P_kEOg",
    avatar: "https://placehold.co/80x80/nature/fff.png?text=N",
    videoUrl: "/videos/nature.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
  {
    id: "8",
    title: "Nature 4K",
    channelName: "Nature World",
    thumbnail:
      "https://i.ytimg.com/vi/MsMklJuyiwY/hq720.jpg?v=6881d3e4&sqp=CPiMiMQG-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA-VhS88_o3plp2xSJj0Bo2P_kEOg",
    avatar: "https://placehold.co/80x80/nature/fff.png?text=N",
    videoUrl: "/videos/nature.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
  {
    id: "9",
    title: "Nature 4K",
    channelName: "Nature World",
    thumbnail:
      "https://i.ytimg.com/vi/MsMklJuyiwY/hq720.jpg?v=6881d3e4&sqp=CPiMiMQG-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA-VhS88_o3plp2xSJj0Bo2P_kEOg",
    avatar: "https://placehold.co/80x80/nature/fff.png?text=N",
    videoUrl: "/videos/nature.mp4",
    views: 100000,
    uploadedAt: "3 months ago",
  },
];
