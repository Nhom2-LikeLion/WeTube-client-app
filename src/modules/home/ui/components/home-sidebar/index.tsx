// modules/home/ui/components/home-sidebar/home-sidebar.tsx
import Link from "next/link";

const links = [
  { href: "/feed", label: "Feed" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/playlists", label: "Playlists" },
  { href: "/shorts", label: "Shorts" },
  { href: "/Channels", label: "Channels" },
];

export default function HomeSidebar() {
  return (
    <nav className="flex flex-col p-4 space-y-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="hover:underline">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
