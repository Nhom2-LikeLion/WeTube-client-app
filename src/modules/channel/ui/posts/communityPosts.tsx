// modules/channel/posts/community-posts.tsx
import { communityPostsMock } from "./mockPost";
import PostsPage from "./pages";


export default function CommunityPosts() {
  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {communityPostsMock.map((post) => (
        <PostsPage key={post.id}  />
      ))}
    </div>
  );
}
