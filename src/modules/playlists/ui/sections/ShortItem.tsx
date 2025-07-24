import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface ShortItemProps {
  id: string;
  title: string;
  views: string;
  thumbnail: string;
}

const ShortItem: React.FC<ShortItemProps> = ({ title, views, thumbnail }) => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex flex-col w-40 group">
          {/* Thumbnail */}
          <div className="relative">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-40 h-72 object-cover rounded-lg bg-gray-200"
            />
            {/* More Menu Overlay */}
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:text-white hover:bg-black hover:bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
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
          
          {/* Short Details */}
          <div className="mt-2">
            <h3 className="text-sm font-normal text-black line-clamp-2 mb-1">
              {title}
            </h3>
            <div className="text-xs text-gray-600">
              {views}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortItem;