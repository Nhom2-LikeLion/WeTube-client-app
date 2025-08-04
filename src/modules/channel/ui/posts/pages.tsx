import PostCard from "./postCard";


export default function PostsPage() {
  return (
    <div className="space-y-6 ">
      <PostCard
        avatar="https://yt3.googleusercontent.com/lC-8A8m4rZ-C9hUGBSCInLDr7oSFZcZ1F_ZbFSJccopcrvNgiPkQZSuKe8qXc0iC0rpOwxgOjg=s76-c-k-c0x00ffffff-no-rj-mo"
        channelName="GEARVN"
        timestamp="7 tháng trước"
        content={`Một chủ đề rất mới trên kênh GearVN! Hy vọng sẽ được các bạn ủng hộ và góp ý xây dựng🥰\nLink video:`}
        imageUrl="https://yt3.ggpht.com/agQ2D2IMMYa2o3SqfuevOGi3ImWU81EnbrdIHNEHS4UmU_tPyQocycp2agw7St9ss7fFfU8KUiM0=s1600-c-fcrop64=1,00000000ffffffff-rw-nd-v1"
        videoLink="https://www.youtube.com/watch?v=LFMoF..."
        likes={41}
        dislikes={0}
        comments={2}
      />

      <PostCard
        avatar="https://yt3.googleusercontent.com/lC-8A8m4rZ-C9hUGBSCInLDr7oSFZcZ1F_ZbFSJccopcrvNgiPkQZSuKe8qXc0iC0rpOwxgOjg=s76-c-k-c0x00ffffff-no-rj-mo"
        channelName="GEARVN"
        timestamp="7 tháng trước"
        content={`Có anh em nào chưa tải bộ hình nền mà mình chia sẻ hôm qua không!\nLink video:`}
        imageUrl="https://yt3.ggpht.com/7_9KDDz4GzaWYc6OB8mrf4cjwElKloWYdKRrGL7yAOcRKVOfEKIulQGJj6dGVPaY-8rzu1wWMMIruA=s1600-c-fcrop64=1,00000000ffffffff-rw-nd-v1"
        videoLink="https://youtube.com/shorts/9gqf1x0tKk"
        likes={33}
        dislikes={0}
        comments={3}
      />
    </div>
  );
}
