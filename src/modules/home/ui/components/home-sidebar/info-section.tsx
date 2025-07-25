"use client";

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { pageUrls } from "@/lib/enums/page-urls";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Settings , MessageCircleQuestionMark  , Flag , MessageSquareWarning    } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    {
        title: "Setting",
        url: pageUrls.HISTORY,
        icon: Settings  ,
    },
    {
        title: "Report diary",
        url: pageUrls.LIKED_VIDEOS,
        icon: Flag  ,
    },
    {
        title: "Help",
        url: pageUrls.ALL_PLAYLISTS,
        icon: MessageCircleQuestionMark  
    },
    {
        title: "Send feedback",
        url: pageUrls.YOURVIDEO,
        icon: MessageSquareWarning   ,
    }
];

export const InfoSection = () => {
    const { isSignedIn } = useAuth();
    const clerk = useClerk();
    const pathname = usePathname();
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={pathname === item.url}
                                onClick={(e) => {
                                    if (!isSignedIn) {
                                        e.preventDefault();
                                        return clerk.openSignIn();
                                    }
                                }}
                            >
                                <Link prefetch href={item.url} className="flex items-center gap-4">
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}