import NormalPostCard from "./normPost";
import PollPostCard from "./pollPost";
import { Post } from "@/types/post";

interface PostCardProps {
    post: Post;
    userId: string;
}

export default function PostCard({ post, userId }: PostCardProps) {
    const author = post.author ?? {
        id: "mock-user",
        name: "Người dùng test",
        avatarUrl: "https://via.placeholder.com/40",
    };


    if (post.poll) {
        return (
            <PollPostCard
                id={post.id}
                userId={userId}
                avatar={author.avatarUrl} //{post.author.avatarUrl}
                channelName={author.name} //{post.author.name}
                timestamp={post.createdAt}
                content={post.content}
                poll={{
                    id: post.poll.id,
                    options: post.poll.options,
                    totalVotes: post.poll.totalVotes ?? 0,
                }}
                comments={post.commentCount}
            />
        );
    }

    return (
        <NormalPostCard
            id={post.id}
            userId={userId}
            avatar={author.avatarUrl} //
            channelName={author.name} //
            timestamp={post.createdAt}
            content={post.content}
            imageUrl={post.imageUrl}
            videoLink={post.videoLink}
            likes={post.likeCount}
            comments={post.commentCount}
        />
    );
}
