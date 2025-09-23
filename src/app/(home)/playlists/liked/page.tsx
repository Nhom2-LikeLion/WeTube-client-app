"use client";

import Likedview from '@/modules/playlists/ui/view/liked-view';
import { Suspense } from 'react';

export default function LikedPage() {
  return (
    <Suspense fallback={<p>Loading Watch Later playlist...</p>}>
      <Likedview />
    </Suspense>
  );
}
