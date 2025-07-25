// File: E:\wetube-client-app\src\app\(home)\feed\subscribed\page.tsx
import React from "react";
// Import VideoBubblePack instead of ShortsFeed
import VideoBubblePack from "../components/video-bubble-pack"; // Adjust this path if necessary

// This interface defines the standard props that Next.js provides to page components.
// interface SubscribedFeedPageProps {
//   params?: { [key: string]: string | string[] | undefined };
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

// Your page component should accept only these standard props (params and searchParams).
export default function SubscribedFeedPage() {
  return (
    <main>
      <VideoBubblePack />
    </main>
  );
}

// Optional: If you have metadata for this page
// export const metadata = {
//   title: 'Subscribed Feed',
//   description: 'Your subscribed video feed.',
// };
