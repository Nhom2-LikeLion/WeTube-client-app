"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  CopyCheckIcon,
  CopyIcon,
  Globe2Icon,
  ImagePlusIcon,
  LockIcon,
  MoreVerticalIcon,
  RotateCwIcon,
  SparklesIcon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { DUMMY_VIDEOS } from "@/modules/studio/ui/sections/video-section"; // Adjust path as necessary

const DUMMY_CATEGORIES = [
  { id: "cat-1", name: "Category A" },
  { id: "cat-2", name: "Category B" },
  { id: "cat-3", name: "Category C" },
];

const snakeCaseToTitle = (str: string) => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

interface FormSectionProps {
  videoId: string;
}

const FormSection = ({ videoId }: FormSectionProps) => {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error loading video details.</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const FormSectionSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="space-y-8 lg:col-span-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-[220px] w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-[84px] w-[153px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-y-8 lg:col-span-2">
          <div className="flex flex-col gap-4 bg-[#F9F9F9] rounded-xl overflow-hidden">
            <Skeleton className="aspect-video" />
            <div className="space-y-2 p-4">
              {" "}
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2 p-4">
              {" "}
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2 p-4">
              {" "}
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </div>
        <div className="space-y-2 lg:col-span-3">
          {" "}
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
};

const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
  const video = DUMMY_VIDEOS.find((v) => v.id === videoId);

  const form = useForm({
    defaultValues: {
      title: video?.title ?? "",
      description: video?.description ?? "",
      thumbnailUrl: video?.thumbnailUrl ?? "",
      categoryId: DUMMY_CATEGORIES[0]?.id, 
      visibility: video?.visibility ?? "public",
    },
    mode: "onChange",
  });

  if (!video) {
    return (
      <div className="flex justify-center items-center h-60 text-lg text-red-500">
        Video with ID &quot;{videoId}&quot; not found.
      </div>
    );
  }

  const fullUrl = `http://localhost:3000/studio/videos/${video.id}`;
  const isCopied = false; 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        {" "}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Video details</h1>
            <p className="text-sm text-muted-foreground">
              Manage your video details
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              disabled={true}
            >
              {" "}
              Save
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <MoreVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side="left"
              >
                <DropdownMenuItem>
                  <RotateCwIcon className="size-4 mr-2" />
                  Revalidate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrashIcon className="size-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="space-y-8 lg:col-span-3">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-x-2">
                      Title
                      <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        className="rounded-full size-6 [&_svg]:size-3"
                        disabled={true}
                      >
                        {" "}
                        <SparklesIcon />
                      </Button>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Add a title to your video"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-x-2">
                      Description
                      <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        className="rounded-full size-6 [&_svg]:size-3"
                        disabled={true}
                      >
                        {" "}
                        <SparklesIcon />
                      </Button>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={10}
                      className="resize-none pr-10"
                      placeholder="Add a description to your video"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="thumbnailUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <div className="p-0.5 border border-dashed border-neutral-400 relative h-[84px] w-[153px] group">
                      <Image
                        src={field.value ?? THUMBNAIL_FALLBACK}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            size="icon"
                            className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 duration-100 size-7"
                          >
                            <MoreVerticalIcon className="size-4 text-white" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          side="right"
                        >
                          <DropdownMenuItem>
                            <ImagePlusIcon className="size-4 mr-1" />
                            Change
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <SparklesIcon className="size-4 mr-1" />
                            AI-Generated
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RotateCwIcon className="size-4 mr-1" />
                            Restore
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DUMMY_CATEGORIES.map((category, index) => (
                        <SelectItem
                          key={index}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-8 lg:col-span-2">
            <div className="flex flex-col gap-4 bg-[#F9F9F9] rounded-xl overflow-hidden h-fit">
              <div className="aspect-video overflow-hidden relative">
                <VideoPlayer
                  playbackId={undefined}
                  thumbnailUrl={video.thumbnailUrl ?? undefined}
                />
              </div>
              <div className="p-4 flex flex-col gap-y-6">
                <div className="flex justify-between items-center gap-x-2">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-muted-foreground text-xs">Video link</p>
                    <div className="flex items-center gap-x-2">
                      <Link
                        prefetch={false}
                        href={fullUrl}
                      >
                        {" "}
                        <p className="line-clamp-1 text-sm text-blue-500">
                          {fullUrl}
                        </p>
                      </Link>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        disabled={true}
                      >
                        {" "}
                        {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-muted-foreground text-xs">
                      Video status
                    </p>
                    <p className="text-sm">
                      {snakeCaseToTitle(video.muxStatus || "preparing")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-muted-foreground text-xs">
                      Subtitles status
                    </p>
                    <p className="text-sm">
                      {snakeCaseToTitle("no_subtitles")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center">
                          <Globe2Icon className="size-4 mr-2" />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center">
                          <LockIcon className="size-4 mr-2" />
                          Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FormSection;
