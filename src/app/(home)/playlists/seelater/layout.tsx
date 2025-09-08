import Allplaylistlayout from '@/modules/playlists/layouts/Allplaylist-layout';
import React from 'react'


interface LayoutProps {
    children: React.ReactNode;
}
export default function layout({children}: LayoutProps) {
  return (
      <Allplaylistlayout>
        {children}
      </Allplaylistlayout>
  )
}


