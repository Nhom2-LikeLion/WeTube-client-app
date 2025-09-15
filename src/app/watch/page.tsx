"use client";
import App from "@/modules/watch/app";
import { CommentsProvider } from "@/modules/watch/context/comment-context";
import { ControlsProvider } from "@/modules/watch/context/controls-context";
import { RelatedVideosProvider } from "@/modules/watch/context/related-videos-context";
import { ShortsProvider } from "@/modules/watch/context/shorts-context";
import { ThemeProvider } from "@/modules/watch/context/theme-context";
import { VideoProvider } from "@/modules/watch/context/video-context";


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
