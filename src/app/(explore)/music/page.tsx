import MusicLayout from "@/modules/music/ui/layouts/music-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MusicLayout>
            {children}
        </MusicLayout>
    )
}

export default Layout;