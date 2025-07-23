import { SidebarProvider } from "@/components/ui/sidebar";
import  HomeNavbar  from "@/modules/home/ui/components/home-navbar";
import HomeLayout from "@/modules/home/ui/layouts/home-layout";
interface LayoutProps {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <SidebarProvider>
            <div className="w-full">
                <HomeNavbar/>
                <HomeLayout>
                    {children}
                </HomeLayout>
            </div>

        </SidebarProvider>

    )
}

export default Layout