import SportsLayout from "@/modules/sports/ui/layouts/sports-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SportsLayout>
            {children}
        </SportsLayout>
    )
}

export default Layout;