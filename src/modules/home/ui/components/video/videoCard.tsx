"use client";

import Image from 'next/image';

const VideoCard = () => (
  <div className="w-full sm:w-[calc(33.3333%-1rem)] flex flex-col">
    <div className="aspect-video bg-blue-200 rounded-xl"></div>
    <div className="flex gap-3 pt-3 pr-3 pb-3 pl-0 items-start">
      <Image
        src="https://placehold.co/80x80.png"
        alt="logo"
        width={48} 
        height={48}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg text-black leading-tight break-words">dedede</h3>
        <p className="text-sm text-gray-500">the title.</p>
      </div>
    </div>
  </div>
);

export default VideoCard;