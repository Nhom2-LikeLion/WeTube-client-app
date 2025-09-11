import Allplaylistlayout from "@/modules/playlists/layouts/Allplaylist-layout";

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