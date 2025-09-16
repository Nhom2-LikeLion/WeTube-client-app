import CommunityPosts from "@/modules/channel/ui/posts/communityPosts";

interface ChannelPostsPageProps {
  readonly params: { readonly userId: string };
}

export default function ChannelPostsPage({ params }: ChannelPostsPageProps) {
  const { userId } = params;

  return <CommunityPosts userId={userId} />;
}
