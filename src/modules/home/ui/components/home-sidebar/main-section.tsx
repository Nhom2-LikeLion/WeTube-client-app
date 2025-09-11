"use client";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { pageUrls } from "@/lib/enums/page-urls";
import { useAuth, useClerk } from "@clerk/nextjs";
import {FileVideo, HomeIcon, PlaySquareIcon, Popcorn, Radio} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import RoomModal from "@/modules/rooms/ui/components/room/roomModal";

const items = [
    {
        title: "Home",
        url: pageUrls.HOME,
        icon: HomeIcon,
    },
    {
        title: "Subscriptions",
        url: pageUrls.SUBSCRIPTIONS,
        icon: PlaySquareIcon,
        auth: true,
    },
    {
        title: "Shorts",
        url: pageUrls.SHORTS,
        icon: FileVideo,
    },
    {
        title: "WatchTogether",
        url: pageUrls.ROOMS,
        icon: Popcorn,
    },
    {
        title: "Live",
        url: pageUrls.LIVESTREAM,
        icon: Radio,
    },
];

export const MainSection = () => {
    const { isSignedIn } = useAuth();
    const clerk = useClerk();
    const pathname = usePathname();
    const [openRoomModal, setOpenRoomModal] = useState(false);

    return (
        <>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item, index) => (
                            <SidebarMenuItem key={index}>
                                {item.url === pageUrls.ROOMS ? (
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={pathname === item.url}
                                        asChild
                                    >
                                        <button
                                            className="flex items-center gap-4 w-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!isSignedIn && item.auth) {
                                                    return clerk.openSignIn();
                                                }
                                                setOpenRoomModal(true);
                                            }}
                                        >
                                            <item.icon />
                                            <span className="text-sm">{item.title}</span>
                                        </button>
                                    </SidebarMenuButton>
                                ) : (
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        asChild
                                        isActive={pathname === item.url}
                                        onClick={(e) => {
                                            if (!isSignedIn && item.auth) {
                                                e.preventDefault();
                                                return clerk.openSignIn();
                                            }
                                        }}
                                    >
                                        <Link
                                            prefetch
                                            href={item.url}
                                            className="flex items-center gap-4"
                                        >
                                            <item.icon />
                                            <span className="text-sm">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            {/* RoomModal */}
            <RoomModal open={openRoomModal} onOpenChange={setOpenRoomModal} />
        </>
    );
};
