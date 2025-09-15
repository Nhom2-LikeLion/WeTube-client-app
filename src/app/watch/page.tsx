"use client";
import { CommentsProvider } from "@/contexts/comment-context";
import { ControlsProvider } from "@/contexts/controls-context";
import { RelatedVideosProvider } from "@/contexts/related-videos-context";
import { ShortsProvider } from "@/contexts/shorts-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { VideoProvider } from "@/contexts/video-context";
import App from "@/modules/watch/app";



export default function Home() {
  return (
    <ThemeProvider>
        <VideoProvider>
          <ShortsProvider>
            <RelatedVideosProvider>
              <CommentsProvider>
                <ControlsProvider>
                  <App />
                </ControlsProvider>
              </CommentsProvider>
            </RelatedVideosProvider>
          </ShortsProvider>
        </VideoProvider>
    </ThemeProvider>
  );
}
