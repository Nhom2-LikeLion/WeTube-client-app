"use client";

import Watchlaterview from '@/modules/playlists/ui/view/watchlater-view';
import { useParams } from 'next/navigation';
import React from 'react'

export default function watchlaterpage() {
  const params = useParams();
  
  return (
    <Watchlaterview Params={{playlistId:"60d31431-e456-4c04-bf3e-fc07af0390be"}} />
  );
}
