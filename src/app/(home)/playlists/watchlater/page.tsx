"use client";

import Watchlaterview from "@/modules/playlists/ui/view/watchlater-view";
import { Suspense } from 'react';

export default function WatchLaterPage() {
  return (
    <Suspense fallback={<p>Loading Watch Later playlist...</p>}>
      <Watchlaterview />
    </Suspense>
  );
}
