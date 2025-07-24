import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ExploreSection } from "./explore-section";
import { InfoSection } from "./info-section";
import { MainSection } from "./main-section";
import { OtherServices } from "./otherservices-section";
import { PersonalSection } from "./personal-section";
import { SubscriptionsSection } from "./subscriptions-section";

const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <SignedIn>
          <PersonalSection />
        </SignedIn>
        <SignedOut>
          <div className="p-4 text-muted-foreground text-sm">
            Please sign in to access personal features.
          </div>
        </SignedOut>
        <SignedIn>
          <>
            <Separator />
            <SubscriptionsSection />
          </>
        </SignedIn>
        <Separator />
        <ExploreSection />
        <Separator />
        <OtherServices />
        <Separator />
        <InfoSection />
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSidebar;
