// 'use client';

// import React, { useState, useRef, useCallback } from 'react';
// import { useViewModeState, useViewModeActions, useVideoPlayerState } from '@/stores';
// import { X, Maximize2 } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const MiniplPlayer: React.FC = () => {
//   const { miniplayer } = useViewModeState();
//   const { disableMiniplayer, updateMiniplayerPosition, setMiniplayerDragging } = useViewModeActions();
//   const { playerState } = useVideoPlayerState();
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const containerRef = useRef<HTMLDivElement>(null);

//   const handleMouseDown = useCallback((e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//     setMiniplayerDragging(true);
    
//     const rect = containerRef.current?.getBoundingClientRect();
//     if (rect) {
//       setDragOffset({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       });
//     }
//   }, [setMiniplayerDragging]);

//   const handleMouseMove = useCallback((e: MouseEvent) => {
//     if (!isDragging) return;
    
//     const newPosition = {
//       x: e.clientX - dragOffset.x,
//       y: e.clientY - dragOffset.y
//     };
    
//     // Keep within viewport bounds
//     const maxX = window.innerWidth - miniplayer.size.width;
//     const maxY = window.innerHeight - miniplayer.size.height;
    
//     newPosition.x = Math.max(0, Math.min(maxX, newPosition.x));
//     newPosition.y = Math.max(0, Math.min(maxY, newPosition.y));
    
//     updateMiniplayerPosition(newPosition);
//   }, [isDragging, dragOffset, miniplayer.size, updateMiniplayerPosition]);

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//     setMiniplayerDragging(false);
//   }, [setMiniplayerDragging]);

//   // Global mouse events for dragging
//   React.useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
      
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isDragging, handleMouseMove, handleMouseUp]);

//   const handleClose = useCallback(() => {
//     disableMiniplayer();
//   }, [disableMiniplayer]);

//   const handleExpand = useCallback(() => {
//     disableMiniplayer();
//   }, [disableMiniplayer]);

//   if (!miniplayer.isVisible) return null;

//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         'fixed bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-300',
//         'transition-all duration-200 ease-out',
//         'hover:shadow-3xl',
//         {
//           'cursor-move': !isDragging,
//           'cursor-grabbing': isDragging,
//           'z-[1000]': true
//         }
//       )}
//       style={{
//         left: miniplayer.position.x,
//         top: miniplayer.position.y,
//         width: miniplayer.size.width,
//         height: miniplayer.size.height,
//         zIndex: 1000
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       {/* Video Content */}
//       <div className="relative w-full h-full">
//         <video
//           className="w-full h-full object-contain bg-black"
//           src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//           autoPlay={playerState.isPlaying}
//           muted={playerState.isMuted}
//         />
        
//         {/* Overlay for dragging */}
//         <div className="absolute inset-0 bg-transparent" />
        
//         {/* Controls */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
//           {/* Top bar with title and controls */}
//           <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/90 to-transparent p-2">
//             <div className="flex items-center justify-between">
//               <h3 className="text-gray-900 text-xs font-medium truncate flex-1 mr-2">
//                 Amazing Nature Documentary
//               </h3>
//               <div className="flex items-center space-x-1">
//                 <button
//                   onClick={handleExpand}
//                   className="text-gray-700 hover:bg-gray-200 p-1 rounded"
//                   title="Expand"
//                 >
//                   <Maximize2 className="w-3 h-3" />
//                 </button>
//                 <button
//                   onClick={handleClose}
//                   className="text-gray-700 hover:bg-gray-200 p-1 rounded"
//                   title="Close"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Bottom controls */}
//           <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-white/90 to-transparent">
//             <div className="flex items-center justify-between">
//               <button
//                 className="text-gray-900 hover:bg-gray-200 px-2 py-1 rounded text-xs"
//                 onClick={() => {
//                   // Toggle play/pause
//                 }}
//               >
//                 {playerState.isPlaying ? 'Pause' : 'Play'}
//               </button>
//               <div className="text-gray-900 text-xs">
//                 {Math.floor(playerState.currentTime)}s
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MiniplPlayer;