import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ShortItem from "./ShortItem";

interface ShortData {
  id: string;
  title: string;
  views: string;
  thumbnail: string;
}

const ShortsSection = () => {
  const shortData: ShortData[] = [
    {
      id: "1",
      title: "CSS Button Hover Effects | HTML | CSS | JavaScript",
      views: "452 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    },
    {
      id: "2",
      title: "#html #css#html5#coding #webdevelopment",
      views: "2,1 Tr lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    },
    {
      id: "3",
      title: "Chỉ cần không biết tiếng Việt sẽ tưởng là nhạc Hàn",
      views: "738 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    },
  ];

  return (
    <div className="mb-12">
      {/* Shorts Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <h2 className="text-xl font-normal text-black">Shorts</h2>
        </div>
      </div>

      {/* Shorts Grid */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {shortData.map((short, index) => (
            <div key={short.id} className="flex-shrink-0 group">
              <div key={short.id} className="flex-shrink-0">
                <ShortItem {...short} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrow */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 bg-white shadow-lg border border-gray-200 hover:bg-gray-50 rounded-full"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShortsSection;
