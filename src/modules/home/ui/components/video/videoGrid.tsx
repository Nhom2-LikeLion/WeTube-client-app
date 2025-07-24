import VideoCard from "./videoCard"

const VideoGrid = () => (
  <div className="p-4 flex flex-wrap gap-4 justify-between">
    {Array.from({ length: 9 }).map((_, i) => (
      <VideoCard key={i} />
    ))}
  </div>
);
export default VideoGrid;
