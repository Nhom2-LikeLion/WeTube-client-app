"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { snakeCaseToTitle } from "@/lib/utils";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import { Globe2Icon, LockIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { format } from "date-fns";

interface DummyVideo {
  id: string;
  thumbnailUrl: string;
  previewUrl?: string; // Optional if not always present
  title: string;
  description?: string; // Optional
  duration: number | null; // Can be null if video processing is pending/failed
  visibility: "public" | "private" | "unlisted"; // Based on your code
  muxStatus: "ready" | "preparing" | "errored" | string; // Adjusted to be flexible
  createdAt: Date;
  viewCount: number;
  commentCount: number;
  likeCount: number;
}

interface DummyVideo {
  id: string;
  thumbnailUrl: string;
  previewUrl?: string; // Optional, set to undefined to prevent direct video download
  title: string;
  description?: string; // Optional
  duration: number | null; // Can be null if video processing is pending/failed
  visibility: "public" | "private" | "unlisted"; // Based on your code
  muxStatus: "ready" | "preparing" | "errored" | string; // Adjusted to be flexible
  createdAt: Date;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  categoryId?: string;
}

export const DUMMY_VIDEOS: DummyVideo[] = [
  {
    id: "dummy-video-1",
    thumbnailUrl: "/image/placeholder.svg",
    previewUrl: "https://www.w3schools.com/css/mov_bbb.mp4",
    title: "Untitled Video 1",
    description: "This is the first dummy video.",
    duration: 3470000, 
    visibility: "public",
    muxStatus: "ready",
    createdAt: new Date("2024-07-20T14:30:00Z"),
    viewCount: 1250,
    commentCount: 45,
    likeCount: 230,
    categoryId: "cat-1", // Added categoryId
  },
  {
    id: "dummy-video-2",
    thumbnailUrl: "https://placehold.co/153x84/FF0000/FFFFFF.png?text=Private",
    previewUrl: "https://www.w3schools.com/css/mov_bbb.mp4",
    title: "Untitled Video 2",
    description: "This is the second dummy video, private.",
    duration: 1200300,
    visibility: "private",
    muxStatus: "ready",
    createdAt: new Date("2024-07-18T09:00:00Z"),
    viewCount: 57,
    commentCount: 3,
    likeCount: 0,
    categoryId: "cat-2", // Added categoryId
  },
  {
    id: "dummy-video-3",
    thumbnailUrl:
      "https://placehold.co/153x84/00FF00/000000.png?text=Processing",
    previewUrl: "https://www.w3schools.com/css/mov_bbb.mp4",
    title: "Untitled Video 3", // Changed title for uniqueness
    description: "This video is currently processing.",
    duration: 900,
    visibility: "unlisted",
    muxStatus: "preparing", // Simulating a video still being processed
    createdAt: new Date("2024-07-15T11:45:00Z"),
    viewCount: 340,
    commentCount: 18,
    likeCount: 75,
    categoryId: "cat-1", // Added categoryId
  },
  {
    id: "dummy-video-4",
    thumbnailUrl: "https://placehold.co/153x84/0000FF/FFFFFF.png?text=Error",
    previewUrl: "https://www.w3schools.com/css/mov_bbb.mp4",
    title: "Untitled Video 4", // Changed title for uniqueness
    description: "This video encountered an error.",
    duration: null, // Null duration for errored videos
    visibility: "private",
    muxStatus: "errored", // Simulating an errored video
    createdAt: new Date("2024-07-10T08:20:00Z"),
    viewCount: 0,
    commentCount: 0,
    likeCount: 0,
    categoryId: "cat-3", // Added categoryId
  },
  {
    id: "dummy-video-5",
    thumbnailUrl: "https://placehold.co/153x84/FFFF00/000000.png?text=Public",
    previewUrl: "https://www.w3schools.com/css/mov_bbb.mp4",
    title: "Untitled Video 5", // Changed title for uniqueness
    description: "This is the fifth dummy video, public.",
    duration: 480,
    visibility: "public",
    muxStatus: "ready",
    createdAt: new Date("2024-07-22T16:00:00Z"),
    viewCount: 5678,
    commentCount: 112,
    likeCount: 450,
    categoryId: "cat-2", // Added categoryId
  },
];

export default function VideosSection() {
  return (
    <Suspense fallback={<VideosSectionSkeleton />}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
}

const VideosSectionSkeleton = () => {
  return (
    <div className="border-y">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6 w-[510px]">Video</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Comments</TableHead>
            <TableHead className="text-right pr-6">Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="pl-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-20 w-36" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-12" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const VideosSectionSuspense = () => {
  // Replace tRPC hook with dummy data
  const videos = DUMMY_VIDEOS;

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Views</TableHead>
              <TableHead className="text-center">Comments</TableHead>
              <TableHead className="text-center pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map(
              (
                video // Use the DUMMY_VIDEOS directly
              ) => (
                <TableRow
                  className="cursor-pointer"
                  key={video.id}
                >
                  {/* Link moved inside TableCell */}
                  <TableCell className="pl-6">
                    <Link
                      prefetch
                      href={`/studio/videos/${video.id}`}
                      className="flex items-center gap-4" // Apply flex styles directly to Link
                    >
                      <div className="relative aspect-video w-36 shrink-0">
                        <VideoThumbnail
                          imageUrl={video.thumbnailUrl}
                          previewUrl={video.previewUrl}
                          title={video.title}
                          duration={video.duration || 0} // Handle null duration
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden gap-y-1">
                        <span className="text-md line-clamp-1">
                          {video.title}
                        </span>
                        <span className="text-sm text-muted-foreground line-clamp-1">
                          {video.description || "No description"}
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {video.visibility === "private" ? (
                        <LockIcon className="size-4 mr-2" />
                      ) : (
                        <Globe2Icon className="size-4 mr-2" />
                      )}
                      {snakeCaseToTitle(video.visibility)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {snakeCaseToTitle(video.muxStatus || "error")}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm truncate">
                    {format(video.createdAt, "d MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    {video.viewCount}
                  </TableCell>
                  <TableCell className="text-center">
                    {video.commentCount}
                  </TableCell>
                  <TableCell className="text-center pr-6">
                    {video.likeCount}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      {/* Removed InfiniteScroll as it's not applicable with static dummy data */}
    </div>
  );
};
