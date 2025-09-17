import React from 'react'
import PlaylistDetail from '../list/seelater-list'
import { Params } from 'next/dist/server/request/params';

export default function Likedview({
  Params,
}:{ 
  Params: {playlistId:string };
}) {
  return <PlaylistDetail playlistId={Params.playlistId} />;
}

