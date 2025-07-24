import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { Separator } from "@/components/ui/separator";
import { PersonalSection } from "./personal-section";
import { SignedIn } from "@clerk/nextjs";
import { SubscriptionsSection } from "./subscriptions-section";
import { ExploreSection } from "./explore-section";
import { OtherServices } from "./otherservices-section";
import { InfoSection } from "./info-section";

const HomeSidebar = () => {
    return (
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
            <SidebarContent className="bg-background">
                <MainSection />
                <Separator />
                <PersonalSection />
                <SignedIn>
                    <>
                        <Separator />
                        <SubscriptionsSection/>
                    </>
                </SignedIn>
                <Separator />
                <ExploreSection />
                <Separator />
                <OtherServices />
                <Separator />
                <InfoSection/>
            </SidebarContent>
        </Sidebar>
    )
}

export default HomeSidebar;