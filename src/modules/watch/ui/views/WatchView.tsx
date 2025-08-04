// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useViewModeState } from '@/stores';
// import VideoPlayer from '../components/VideoPlayer';
// import MiniplPlayer from '../components/MiniplPlayer';
// import { VideoMetadata } from '../../types/video.types';
// import { Channel } from '../../types/comment.types';
// import { cn } from '@/lib/utils';

// interface WatchViewProps {
//   videoId: string;
//   playlistId?: string;
//   startTime?: string;
// }

// const WatchView: React.FC<WatchViewProps> = ({ videoId, playlistId, startTime }) => {
//   const { currentMode, config } = useViewModeState();
//   const [video, setVideo] = useState<VideoMetadata | null>(null);
//   const [channel, setChannel] = useState<Channel | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch video data
//   useEffect(() => {
//     const fetchVideoData = async () => {
//       setIsLoading(true);
//       try {
//         const mockVideo: VideoMetadata = {
//           id: videoId,
//           title: "Amazing Nature Documentary - 4K Ultra HD",
//           description: "Experience the beauty of nature in stunning 4K resolution. This documentary takes you on a journey through the world's most spectacular landscapes and wildlife habitats.",
//           thumbnail: "https://i.ytimg.com/vi/MsMklJuyiwY/hq720.jpg",
//           duration: 3600, // 1 hour
//           uploadDate: new Date('2024-01-15'),
//           viewCount: 1250000,
//           likeCount: 45000,
//           dislikeCount: 1200,
//           tags: ['nature', 'documentary', '4k', 'wildlife'],
//           category: 'Education',
//           language: 'en',
//           isLive: false,
//           isPrivate: false,
//           ageRestricted: false,
//           videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
//         };

//         const mockChannel: Channel = {
//           id: 'channel-1',
//           username: 'naturechannel',
//           displayName: 'Nature World',
//           avatar: 'https://placehold.co/80x80/nature/fff.png?text=N',
//           isVerified: true,
//           subscriberCount: 2500000,
//           channelUrl: '/channel/naturechannel',
//           joinDate: new Date('2020-01-01'),
//           description: 'Bringing you the best nature documentaries',
//           bannerImage: 'https://placehold.co/1200x300/nature/fff.png',
//           videoCount: 150,
//           totalViews: 50000000,
//           isSubscribed: false,
//           notificationLevel: 'none'
//         };

//         setVideo(mockVideo);
//         setChannel(mockChannel);
        
//       } catch (error) {
//         console.error('Error fetching video data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchVideoData();
//   }, [videoId, playlistId]);

//   if (isLoading || !video || !channel) {
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-white">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
//           <p className="text-gray-900">Loading video...</p>
//         </div>
//       </div>
//     );
//   }

//   const renderVideoPlayer = () => (
//     <VideoPlayer
//       src={video.videoUrl}
//       poster={video.thumbnail}
//       metadata={video}
//       autoplay={true}
//       muted={false}
//       className={cn({
//         'w-full': currentMode === 'theater' || currentMode === 'fullscreen',
//         'max-w-4xl mx-auto': currentMode === 'default'
//       })}
//     />
//   );

//   const renderVideoInfo = () => (
//     <div className="mt-4">
//       <h1 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h1>
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-4">
//           <img
//             src={channel.avatar}
//             alt={channel.displayName}
//             className="w-10 h-10 rounded-full"
//           />
//           <div>
//             <h3 className="text-gray-900 font-medium">{channel.displayName}</h3>
//             <p className="text-gray-600 text-sm">{channel.subscriberCount?.toLocaleString()} subscribers</p>
//           </div>
//           <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
//             Subscribe
//           </button>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
//             👍 {video.likeCount.toLocaleString()}
//           </button>
//           <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
//             Share
//           </button>
//           <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
//             Save
//           </button>
//         </div>
//       </div>
//       <div className="text-gray-700 text-sm">
//         <p>{video.viewCount.toLocaleString()} views • {video.uploadDate.toLocaleDateString()}</p>
//         <p className="mt-2">{video.description}</p>
//       </div>
//     </div>
//   );

//   const renderComments = () => (
//     <div className="mt-6">
//       <h3 className="text-gray-900 text-lg font-medium mb-4">Comments</h3>
//       <div className="space-y-4">
//         {/* Mock comments */}
//         <div className="flex space-x-3">
//           <img
//             src="https://placehold.co/40x40/user/fff.png?text=U"
//             alt="User"
//             className="w-8 h-8 rounded-full"
//           />
//           <div>
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-900 text-sm font-medium">@user123</span>
//               <span className="text-gray-600 text-xs">2 hours ago</span>
//             </div>
//             <p className="text-gray-700 text-sm mt-1">Amazing documentary! The cinematography is breathtaking.</p>
//             <div className="flex items-center space-x-4 mt-2">
//               <button className="text-gray-600 hover:text-gray-900 text-xs">👍 12</button>
//               <button className="text-gray-600 hover:text-gray-900 text-xs">👎</button>
//               <button className="text-gray-600 hover:text-gray-900 text-xs">Reply</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderSidebar = () => (
//     <div className="space-y-4">
//       <h3 className="text-gray-900 text-lg font-medium">Related Videos</h3>
//       <div className="space-y-3">
//         {[1, 2, 3, 4, 5].map((i) => (
//           <div key={i} className="flex space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
//             <img
//               src={`https://i.ytimg.com/vi/sample${i}/hqdefault.jpg`}
//               alt={`Related video ${i}`}
//               className="w-24 h-14 object-cover rounded"
//             />
//             <div className="flex-1">
//               <h4 className="text-gray-900 text-sm font-medium line-clamp-2">
//                 Related Nature Video {i} - Wildlife Documentary
//               </h4>
//               <p className="text-gray-600 text-xs mt-1">Nature Channel</p>
//               <p className="text-gray-600 text-xs">1.2M views • 3 days ago</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   switch (currentMode) {
//     case 'theater':
//       return (
//         <>
//           <div className="min-h-[calc(100vh-4rem)] bg-white">
//             <div className="max-w-full px-6 py-6">
//               {renderVideoPlayer()}
//               {renderVideoInfo()}
              
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//                 <div className="lg:col-span-2">
//                   {renderComments()}
//                 </div>
//                 <div className="lg:col-span-1">
//                   {renderSidebar()}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <MiniplPlayer />
//         </>
//       );

//     case 'fullscreen':
//       return (
//         <>
//           <div className="fixed inset-0 bg-black z-[9999]">
//             {renderVideoPlayer()}
//           </div>
//           <MiniplPlayer />
//         </>
//       );

//     case 'miniplayer':
//       return (
//         <>
//           <div className="min-h-[calc(100vh-4rem)] bg-white p-8">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">Continue browsing...</h1>
//             <p className="text-gray-700">The video is now playing in the miniplayer.</p>
//           </div>
//           <MiniplPlayer />
//         </>
//       );

//     default: 
//       return (
//         <>
//           <div className="min-h-[calc(100vh-4rem)] bg-white">
//             <div className="max-w-7xl mx-auto px-6 py-6">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//                 {/* Main Content */}
//                 <div className="lg:col-span-8">
//                   {renderVideoPlayer()}
//                   {renderVideoInfo()}
//                   {renderComments()}
//                 </div>

//                 {/* Sidebar */}
//                 <div className="lg:col-span-4">
//                   {renderSidebar()}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <MiniplPlayer />
//         </>
//       );
//   }
// };

// export default WatchView;