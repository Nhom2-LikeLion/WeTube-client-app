import MusicLayout from "@/modules/music/ui/layouts/music-layout";


export const dynamic = "force-dynamic";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children }: LayoutProps ) {
    return (
        <MusicLayout>
            {children}
        </MusicLayout>
    )
}