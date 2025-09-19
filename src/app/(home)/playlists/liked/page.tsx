"use client";

import PlaylistDetail from '@/modules/playlists/ui/list/seelater-list';
import Likedview from '@/modules/playlists/ui/view/liked-view';
import React from 'react'

export default function watchlater({
  params,
}: {
  params: { playlistId: string };
}) {
  return <PlaylistDetail playlistId={params.playlistId} />;
}
