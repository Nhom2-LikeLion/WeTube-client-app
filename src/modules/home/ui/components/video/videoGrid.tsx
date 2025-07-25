import VideoCard from "./videoCard";
import { getMockVideos } from "./mockVideo";

const VideoGrid = () => {
  const videos = getMockVideos();

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-between">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          channelName={video.channelName}
          thumbnail={video.thumbnail}
          avatar={video.avatar}
          views={video.views}
          uploadedAt={video.uploadedAt}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
