import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface VideoItemProps {
  id: string;
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  duration: string;
  thumbnail: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ title, channel, views, timestamp, duration, thumbnail }) => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex gap-4 group">
          {/* Thumbnail */}
          <div className="relative flex-shrink-0">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-40 h-24 object-cover rounded-lg bg-gray-200"
            />
            {duration && (
              <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                {duration}
              </span>
            )}
            {timestamp && timestamp !== '' && !timestamp.includes('N') && (
              <div className="absolute top-1 left-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                {timestamp}
              </div>
            )}
          </div>
          
          {/* Video Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-normal text-black line-clamp-2 mb-1 group-hover:text-black">
              {title}
            </h3>
            <div className="text-sm text-gray-600 mb-1">
              {channel}
            </div>
            <div className="text-sm text-gray-600">
              {views}
            </div>
          </div>
          
          {/* More Menu */}
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-black hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-200 text-black">
                <DropdownMenuItem className="hover:bg-gray-100 text-black cursor-pointer">
                  Xóa khỏi nhật ký xem
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 text-black cursor-pointer">
                  Chia sẻ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoItem;