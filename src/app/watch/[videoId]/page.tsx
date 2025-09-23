"use client";
import { CommentsProvider } from "@/contexts/comment-context";
import { ControlsProvider } from "@/contexts/controls-context";
import { RelatedVideosProvider } from "@/contexts/related-videos-context";
import { ShortsProvider } from "@/contexts/shorts-context";
import { VideoProvider } from "@/contexts/video-context";
import App from "@/modules/watch/app";
import { useParams } from "next/navigation";

export default function Home() {
    const params = useParams<{ videoId: string }>();
    const videoId = params.videoId;

    return (
          <ShortsProvider>
                <ControlsProvider>
                    <App videoId={videoId} />
                </ControlsProvider>
          </ShortsProvider>
  );
}
