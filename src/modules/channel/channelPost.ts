export interface ChannelPost {
  id: string;
  channelId: string;
  content: string;
  image?: string;
  createdAt: string;
}

const mockPosts: ChannelPost[] = [
  {
    id: "1",
    channelId: "abc",
    content: "Hôm nay Bitcoin tăng mạnh 💹",
    image: "/images/post1.jpg",
    createdAt: "2025-08-01T10:00:00Z",
  },
  {
    id: "2",
    channelId: "abc",
    content: "Anh em nghĩ sao về thị trường altcoin tuần này?",
    createdAt: "2025-08-02T15:00:00Z",
  },
];

export async function getPostsByChannel(
  channelId: string
): Promise<ChannelPost[]> {
  // Thực tế bạn sẽ fetch từ DB hoặc API
  return mockPosts.filter((p) => p.channelId === channelId);
}
