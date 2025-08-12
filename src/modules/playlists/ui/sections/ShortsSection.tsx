"use client";

import ShortItem from "./ShortItem";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
    {
      id: "4",
      title: "Chỉ cần không biết tiếng Việt sẽ tưởng là nhạc Hàn",
      views: "724 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=160&h=288&fit=crop",
    },
    {
      id: "5",
      title: "Chỉ cần không biết tiếng Việt sẽ tưởng là nhạc Hàn",
      views: "724 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=160&h=288&fit=crop",
    },
    {
      id: "6",
      title: "CSS Button Hover Effects | HTML | CSS | JavaScript",
      views: "452 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    },
    {
      id: "7",
      title: "#html #css#html5#coding #webdevelopment",
      views: "2,1 Tr lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    },
    {
      id: "8",
      title: "Chỉ cần không biết tiếng Việt sẽ tưởng là nhạc Hàn",
      views: "738 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    },
    {
      id: "9",
      title: "Chỉ cần không biết tiếng Việt sẽ tưởng là nhạc Hàn",
      views: "724 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=160&h=288&fit=crop",
    },
    {
      id: "10",
      title: "Chỉ cần không biết tiếng Việt sẽ tưởng là nhạc Hàn",
      views: "724 N lượt xem",
      thumbnail:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=160&h=288&fit=crop",
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!api) return;
    const checkScroll = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    checkScroll();

    api.on("scroll", checkScroll);
    api.on("reInit", checkScroll);

    return () => {
      api.off("scroll", checkScroll);
      api.off("reInit", checkScroll);
    };
  }, [api]);

  return (
    <div className="mb-12">
      {/* Shorts Header */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <h2 className="text-xl font-normal text-black">Shorts</h2>
        </div>
      </div>

      {/* Shorts Carousel Container with Gradients */}
      <div className="relative w-full -ml-8">
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none",
            // current === 1 && "hidden"
            !canScrollPrev && "opacity-0"
          )}
        ></div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          className="w-full px-12"
        >
          <CarouselContent className="gap-x-4 mr-6 -ml-4">
            {" "}
            {shortData.map((short) => (
              <CarouselItem
                key={short.id}
                className="md:basis-[150px]"
              >
                <ShortItem {...short} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-xl hover:bg-gray-200",
              !canScrollPrev && "hidden"
            )}
          />
          <CarouselNext
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-xl hover:bg-gray-200",
              !canScrollNext && "hidden"
            )}
          />
        </Carousel>

        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none transition-opacity",
            // current === count && "hidden"
            !canScrollNext && "opacity-0"
          )}
        ></div>
      </div>
    </div>
  );
};

export default ShortsSection;
