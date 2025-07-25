import MusicLayout from "@/modules/music/ui/Layouts/music-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MusicLayout>
            {children}
        </MusicLayout>
    )
}

export default Layout;