"use client";

import { ResponsiveModal } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function StudioUploadModal() {
  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        // open
        onOpenChange={() => {}}
      >
        <p>This will be an uploader</p>
      </ResponsiveModal>
      <Button variant="secondary">
        <PlusIcon />
        Create
      </Button>
    </>
  );
}
