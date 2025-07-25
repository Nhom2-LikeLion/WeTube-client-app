import MusicLayout from "@/modules/music/ui/layouts/music-layout";

export default function Page({ children }: { children: React.ReactNode }) {
  return <MusicLayout>{children}</MusicLayout>;
}
