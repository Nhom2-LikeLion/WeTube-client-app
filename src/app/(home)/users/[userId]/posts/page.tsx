import CommunityPosts from "@/modules/channel/ui/posts/communityPosts";

export default function ChannelPostsPage({ params }: { params: { userId: string } }) {
    const { userId } = params;

    return <CommunityPosts userId={userId}/>;
}
