"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import apiClient from "@/lib/apiClient";
import toast from "react-hot-toast";
import { Clock, Film, Loader2, X } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const formatDuration = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  if (h === "00") return `${m}:${s}`;
  return `${h}:${m}:${s}`;
};

interface VideoDetailsModalProps {
  file: File;
  onClose: () => void;
  onUploadComplete: () => void;
}

export const VideoDetailsModal: React.FC<VideoDetailsModalProps> = ({
  file,
  onClose,
  onUploadComplete,
}) => {
  const { user } = useAuth();

  const [title, setTitle] = useState(file.name.replace(/\.[^/.]+$/, ""));
  const [description, setDescription] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [videoSrc, setVideoSrc] = useState("");
  const [duration, setDuration] = useState(0);
  const [resolution, setResolution] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setVideoSrc(url);

    const videoElement = document.createElement("video");
    videoElement.src = url;

    const handleMetadataLoaded = () => {
      console.log("Metadata loaded:", {
        duration: videoElement.duration,
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
      });
      setDuration(videoElement.duration);
      setResolution(`${videoElement.videoWidth} x ${videoElement.videoHeight}`);
    };

    videoElement.addEventListener("loadedmetadata", handleMetadataLoaded);

    // Cleanup function
    return () => {
      URL.revokeObjectURL(url);
      videoElement.removeEventListener("loadedmetadata", handleMetadataLoaded);
    };
  }, [file]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You need to login to access.");
      return;
    }

    if (!title.trim()) {
      toast.error("Please add title to video.");
      return;
    }

    const formData = new FormData();
    formData.append("videoFile", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("usersId", user.sub);
    formData.append("duration", duration.toString());

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await apiClient.post("/api/videos/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
          );
          setUploadProgress(percentCompleted);
        },
      });

      console.log("✅ Video uploaded, server response:", response.data);

      toast.success("Video upload successfully!");
      onUploadComplete();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload error, please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <DialogHeader className="p-4 border-b">
        <DialogTitle className="text-2xl font-medium">
          {title || "Video Details"}
        </DialogTitle>
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70"
          >
            <X className="h-7 w-7" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
      </DialogHeader>

      <div className="flex-grow p-6 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-y-auto">
        <div className="md:col-span-2 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="font-semibold mb-2 block"
            >
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Input video"
              disabled={isUploading}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="font-semibold mb-2 block"
            >
              describe
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="describe your video..."
              rows={8}
              disabled={isUploading}
            />
          </div>
        </div>

        <div className="md:col-span-1 space-y-4">
          {videoSrc && (
            <video
              src={videoSrc}
              controls
              className="w-full rounded-lg bg-black aspect-video"
            ></video>
          )}

          <div className="p-3 bg-gray-100 rounded text-sm space-y-2">
            <div>
              <p className="font-semibold">file name</p>
              <p className="text-gray-600 break-all">{file.name}</p>
            </div>
            {duration > 0 && (
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{formatDuration(duration)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-gray-500" />
                  <span>{resolution}</span>
                </div>
              </div>
            )}
          </div>
          {isUploading && (
            <div className="pt-2">
              <p className="text-sm text-center text-gray-600 mb-2">
                Uploading... {uploadProgress}%
              </p>
              <Progress
                value={uploadProgress}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      <DialogFooter className="p-4 border-t mt-auto">
        <Button
          variant="ghost"
          onClick={onClose}
          disabled={isUploading}
        >
          Return
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isUploading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Handling...
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </DialogFooter>
    </div>
  );
};
