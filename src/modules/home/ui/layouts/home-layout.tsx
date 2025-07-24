// modules/home/ui/layouts/home-layout.tsx
import React from "react";
import HomeSidebar from "@/modules/home/ui/components/home-sidebar";
import HomeNavbar from "@/modules/home/ui/components/home-navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col">
        <HomeSidebar />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 bg-gray-100 dark:bg-black">
        <header className="h-16 bg-white dark:bg-gray-900 shadow-sm px-4 flex items-center">
          <HomeNavbar />
        </header>

        <main className="flex-1 overflow-y-auto bg-black p-2">{children}</main>
      </div>
    </div>
  );
}
