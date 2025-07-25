import Music from "../components";


interface MusicLayoutProps {
    children: React.ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
    return (
        <Music/>
    );
}
