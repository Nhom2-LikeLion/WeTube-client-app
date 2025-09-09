"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Video, RadioTower, SquarePen } from "lucide-react";
import { VideoUploadModal } from "@/modules/home/ui/components/home-navbar/video-upload-modal";

export const CreateButton: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsDropdownOpen(false);
        setIsModalOpen(true);
    };

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-10 w-30 px-8 flex items-center gap-3
             text-black text-base md:text-md rounded-full shadow-md transition-all duration-200"
                    >
                        <Plus className="w-7 h-7"/>
                        <span className="hidden md:block">Create</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" sideOffset={8} className="w-56">
                    <DropdownMenuItem
                        onSelect={handleOpenModal}
                        className="cursor-pointer text-base p-3"
                    >
                        <Video className="mr-2 h-5 w-5"/>
                        <span>Upload video</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer text-base p-3">
                        <RadioTower className="mr-2 h-5 w-5"/>
                        <span>Live stream</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer text-base p-3">
                        <SquarePen className="mr-2 h-5 w-5"/>
                        <span>Create post</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <VideoUploadModal isOpen={isModalOpen} onOpenChange={setIsModalOpen}/>
        </>
    );
};