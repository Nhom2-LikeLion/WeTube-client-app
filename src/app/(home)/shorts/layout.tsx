import HomeLayout from "@/modules/home/ui/layouts/home-layout";
import { div } from "framer-motion/client";

// app/shorts/layout.tsx
export default function ShortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>
}
