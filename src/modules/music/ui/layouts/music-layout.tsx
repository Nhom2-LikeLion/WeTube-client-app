import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "../components/music-sidebar";
import MusicSidebar from "../components/music-sidebar";
import HomeNavbar from "@/modules/home/ui/components/home-navbar";
import MusicNavbar from "../components/music-navbar";


interface MusicLayoutProps {
    children: React.ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
    return (
        <SidebarProvider>
            <div className="w-full">
                <MusicNavbar/>
                <div className="flex min-h-screen">
                    <MusicSidebar />
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>

        </SidebarProvider>

    )
}