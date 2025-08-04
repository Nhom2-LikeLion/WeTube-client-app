import React from 'react';
import WatchView from '@/modules/watch/ui/views/WatchView';
import HomeLayout from '@/modules/home/ui/layouts/home-layout';

interface WatchPageProps {
  params: Promise<{
    videoId: string;
  }>;
  searchParams: Promise<{
    list?: string; 
    index?: string; 
    t?: string; 
  }>;
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  return (
    <HomeLayout>
      <WatchView
        videoId={resolvedParams.videoId}
        playlistId={resolvedSearchParams.list}
        startTime={resolvedSearchParams.t}
      />
    </HomeLayout>
  );
}