"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { AxiosError } from "axios";
import { ThumbnailSelector } from "./ThumbnailSelector";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;
const MAX_THUMBNAIL_SIZE_MB = 5;
const MAX_THUMBNAIL_SIZE_BYTES = MAX_THUMBNAIL_SIZE_MB * 1024 * 1024;

const videoUploadSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required." })
    .max(250, { message: "Title must be 250 characters or fewer." }),
  description: z
    .string()
    .max(5000, { message: "Description must be 5000 characters or fewer." })
    .optional(),
  tags: z
    .string()
    .max(200, { message: "Tags must be 200 characters or fewer." })
    .refine(
      (value) =>
        value === "" || /^(#[a-zA-Z0-9_]+(\s+#[a-zA-Z0-9_]+)*)$/.test(value),
      {
        message: 'Tags must be in the format "#tag1 #tag2"',
      }
    )
    .optional(),
  videoFile: z
    .instanceof(File, { message: "Video file is required." })
    .refine(
      (file) => file.size <= MAX_VIDEO_SIZE_BYTES,
      `Video file must be ${MAX_VIDEO_SIZE_MB}MB or less.`
    ),
  thumbnailFile: z
    .instanceof(File, { message: "Please select or generate a thumbnail." })
    .refine(
      (file) => file.size <= MAX_THUMBNAIL_SIZE_BYTES,
      `Thumbnail file must be ${MAX_THUMBNAIL_SIZE_MB}MB or less.`
    ),
});

type VideoFormData = z.infer<typeof videoUploadSchema>;

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

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export const VideoDetailsModal: React.FC<VideoDetailsModalProps> = ({
  file,
  onClose,
  onUploadComplete,
}) => {
  const { user } = useAuth();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [videoSrc, setVideoSrc] = useState("");
  const [duration, setDuration] = useState(0);
  const [resolution, setResolution] = useState("");

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    resolver: zodResolver(videoUploadSchema),
    mode: "onBlur",
    defaultValues: {
      title: file.name.replace(/\.[^/.]+$/, ""),
      description: "",
      tags: "",
      videoFile: file,
      thumbnailFile: undefined,
    },
  });

  const generateThumbnail = useCallback(
    (video: HTMLVideoElement): Promise<File> => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Set canvas size to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to blob then to File
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "thumbnail.jpg", {
                type: "image/jpeg",
              });
              resolve(file);
            } else {
              reject(new Error("Could not generate thumbnail"));
            }
          },
          "image/jpeg",
          0.8
        );
      });
    },
    []
  );

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setIsGeneratingThumbnail(true);

    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.crossOrigin = "anonymous";
    videoElement.muted = true;

    const handleMetadataLoaded = () => {
      setDuration(videoElement.duration);
      setResolution(`${videoElement.videoWidth} x ${videoElement.videoHeight}`);

      const thumbnailTime = Math.max(
        1,
        Math.min(videoElement.duration / 2, videoElement.duration - 1)
      );
      videoElement.currentTime = thumbnailTime;
    };

    const handleSeeked = async () => {
      try {
        if (!thumbnailFile) {
          const autoThumbnailFile = await generateThumbnail(videoElement);
          setThumbnailFile(autoThumbnailFile);
          const previewUrl = URL.createObjectURL(autoThumbnailFile);
          setThumbnailPreview(previewUrl);
          setValue("thumbnailFile", autoThumbnailFile, {
            shouldValidate: true,
          });
        }
      } catch (error) {
        console.error("Error generating thumbnail:", error);
        toast.error("Could not generate thumbnail automatically");
      } finally {
        setIsGeneratingThumbnail(false);
      }
    };

    const handleError = () => {
      console.error("Video loading error");
      setIsGeneratingThumbnail(false);
    };

    videoElement.addEventListener("loadedmetadata", handleMetadataLoaded);
    videoElement.addEventListener("seeked", handleSeeked);
    videoElement.addEventListener("error", handleError);

    // Cleanup function
    return () => {
      URL.revokeObjectURL(url);
      videoElement.removeEventListener("loadedmetadata", handleMetadataLoaded);
      videoElement.removeEventListener("seeked", handleSeeked);
      videoElement.removeEventListener("error", handleError);
    };
  }, [file, generateThumbnail, setValue, thumbnailFile]);

  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  const handleThumbnailChange = useCallback(
    (selectedFile: File) => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
      setThumbnailFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setThumbnailPreview(previewUrl);

      setValue("thumbnailFile", selectedFile, { shouldValidate: true });
    },
    [thumbnailPreview, setValue]
  );

  const onSubmit = async (data: VideoFormData) => {
    if (!user) {
      toast.error("You need to login to access.");
      return;
    }

    const formData = new FormData();
    formData.append("videoFile", data.videoFile);
    formData.append("thumbnailFile", data.thumbnailFile);
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("tags", data.tags || "");
    formData.append("usersId", user.sub);
    formData.append("duration", duration.toString());

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await apiClient.post("/videos/uploadFile", formData, {
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

      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("Backend Error Data:", error.response.data);
          console.error("Backend Error Status:", error.response.status);

          const errorData = error.response.data as ApiErrorResponse;
          const serverMessage =
            errorData?.message || "Error not defined from the server.";
          toast.error(`Upload failed: ${serverMessage}`);
        } else if (error.request) {
          console.error("No response received:", error.request);
          toast.error(
            "No response from the server. Please check the network connection."
          );
        } else {
          console.error("Error setting up request:", error.message);
          toast.error("Error of Request Setting.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const renderButtonContent = () => {
    if (isUploading) {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Uploading...
        </>
      );
    }
    if (isGeneratingThumbnail) {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating thumbnail...
        </>
      );
    }
    return "Upload";
  };

  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      <DialogHeader className="p-4 border-b flex-shrink-0">
        <DialogTitle className="text-2xl font-medium">
          Video Details
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

      <div className="flex-1 p-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="lg:col-span-2 overflow-y-auto pr-2 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="font-semibold mb-2 block"
              >
                Title
              </label>
              <Textarea
                id="title"
                placeholder="Input video title"
                disabled={isUploading}
                className={errors?.title ? "border-red-500" : ""}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="font-semibold mb-2 block"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe your video..."
                rows={6}
                disabled={isUploading}
                className={errors?.description ? "border-red-500" : ""}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThumbnailSelector
                thumbnailPreview={thumbnailPreview}
                onThumbnailChange={handleThumbnailChange}
                isGenerating={isGeneratingThumbnail}
              />
              <div className="flex-1 pt-1">
                {errors.thumbnailFile && (
                  <p className="text-sm text-red-500">
                    {errors.thumbnailFile.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="font-semibold mb-2 block"
              >
                Tags
              </label>
              <Input
                id="tags"
                placeholder="Enter the tags, starting with #"
                disabled={isUploading}
                className={errors?.tags ? "border-red-500" : ""}
                {...register("tags")}
              />
              {errors.tags && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.tags.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Tags help others easily find your video.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col space-y-4">
            {videoSrc && (
              <video
                src={videoSrc}
                controls
                className="w-full rounded-lg bg-black aspect-video flex-shrink-0"
              />
            )}

            <div className="p-3 bg-gray-100 rounded text-sm space-y-2 flex-shrink-0">
              <div>
                <p className="font-semibold">File name</p>
                <p className="text-gray-600 whitespace-normal break-words">
                  {file.name}
                </p>
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
            {errors?.videoFile && (
              <p className="text-sm text-red-500 -mt-2 px-1">
                {errors.videoFile.message}
              </p>
            )}

            {isUploading && (
              <div className="pt-2 flex-shrink-0">
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
      </div>

      <DialogFooter className="p-4 border-t flex-shrink-0">
        <Button
          variant="ghost"
          onClick={onClose}
          disabled={isUploading}
        >
          Return
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isUploading || isGeneratingThumbnail}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {renderButtonContent()}
        </Button>
      </DialogFooter>
    </div>
  );
};
