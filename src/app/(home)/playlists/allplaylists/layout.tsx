import Allplaylistlayout from "@/modules/playlists/ui/list/Allplaylist-layout";

export const dynamic = "force-dynamic";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children }: LayoutProps ) {
    return (
        <Allplaylistlayout>
            {children}
        </Allplaylistlayout>
    )
}