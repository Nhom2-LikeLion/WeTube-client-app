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
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuth } from '@/contexts/auth-context';
import { useGetPlaylistDetailsQuery, useGetPlaylistsByUserIdQuery } from '@/app/api/playlistApi';
import { VideoFromPlaylist } from '@/types/playlistSummary';

export default function VideosSection() {
  const { user } = useAuth();

  const {
    data: allPlaylists,
    isLoading: isLoadingPlaylists,
    error: playlistsError,
  } = useGetPlaylistsByUserIdQuery(user?.sub ?? "", {
    skip: !user?.sub,
  });

  const uploadedPlaylistId = allPlaylists?.find(
    (p) => p.playlistType === "USER_UPLOADED"
  )?.playlistId;

  const {
    data: playlistDetail,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useGetPlaylistDetailsQuery(uploadedPlaylistId!, {
    skip: !uploadedPlaylistId,
  });

  const isLoading = isLoadingPlaylists || isLoadingDetails;
  const error = playlistsError || detailsError;
  const videos: VideoFromPlaylist[] = playlistDetail?.videos || [];

  useEffect(() => {
    if (allPlaylists) {
      console.log("✅ Playlists Fetched:", allPlaylists);
    }
    if (playlistDetail) {
      console.log("✅ Playlist Detail Fetched:", playlistDetail);
    }
    if (error) {
      console.error("❌ API Error:", error);
    }
  }, [allPlaylists, playlistDetail, error]);


  if (isLoading) {
    return <VideosSectionSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load videos. Please try again later.
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        You have no uploaded videos.
      </div>
    );
  }

  return (
    // <Suspense fallback={<VideosSectionSkeleton />}>
    //   <ErrorBoundary fallback={<div>Error</div>}>
    //     <VideosSectionSuspense />
    //   </ErrorBoundary>
    // </Suspense>
    <div className="border-y">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6 w-[510px]">Video</TableHead>
            <TableHead className="text-center">Created at</TableHead>
            <TableHead className="text-center">Views</TableHead>
            <TableHead className="text-center">Comments</TableHead>
            <TableHead className="text-center pr-6">Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow
              className="cursor-pointer"
              key={video.videoId}
            >
              <TableCell className="pl-6">
                <Link
                  prefetch
                  href={`/studio/videos/${video.videoId}`}
                  className="flex items-center gap-4"
                >
                  <div className="relative aspect-video w-36 shrink-0">
                    <VideoThumbnail
                      imageUrl={video.thumbnailUrl}
                      previewUrl={video.videoUrl}
                      title={video.videoTitle}
                      duration={0}
                    />
                  </div>
                  <div className="flex flex-col overflow-hidden gap-y-1">
                    <span className="text-md line-clamp-1">
                      {video.videoTitle}
                    </span>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      No description
                    </span>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center pr-6">0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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