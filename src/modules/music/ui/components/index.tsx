import { Separator } from "@/components/ui/separator";
import HitMusic from "../components/hits";
import NewTraing from "../components/new-trending";
import MusicBanner from "../components/banner";




const Music = () => {
    return (
        <div>
            <MusicBanner />
            <HitMusic />
            <Separator />
            <NewTraing/>
        </div>
    );
};

export default Music;
