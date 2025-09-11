"use client";

import { ResponsiveModal } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from 'react';

export default function StudioUploadModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
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
