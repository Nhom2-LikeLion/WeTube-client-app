"use client";

interface VideoPlayerProps {
    videoUrl: string; // URL Cloudinary trả về
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
    if (!videoUrl) {
        return (
            <div className="w-full aspect-video bg-black flex items-center justify-center text-neutral-400">
                No video available
            </div>
        );
    }

    return (
        <div className="w-full aspect-video bg-black">
            <video
                key={videoUrl} // reset khi đổi URL
                src={videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full rounded-lg"
            />
        </div>
    );
}
