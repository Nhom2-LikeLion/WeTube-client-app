import PremiumLayout from "@/modules/premium/ui/layouts/premium-layout";

export const dynamic = "force-dynamic";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children }: LayoutProps ) {
    return (
        <PremiumLayout>
            {children}
        </PremiumLayout>
    )
}