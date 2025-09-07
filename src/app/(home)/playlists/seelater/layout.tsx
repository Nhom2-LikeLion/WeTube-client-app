import Allplaylistlayout from '@/modules/playlists/ui/list/Allplaylist-layout';
import React from 'react'


interface LayoutProps {
    children: React.ReactNode;
}

export default function layout({children}: LayoutProps) {
  return (
    <div>
      <Allplaylistlayout>
        {children}
      </Allplaylistlayout>
      
    </div>
  )
}


