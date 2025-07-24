// app/shorts/layout.tsx
export default function ShortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-full bg-black text-white">{children}</div>;
}
