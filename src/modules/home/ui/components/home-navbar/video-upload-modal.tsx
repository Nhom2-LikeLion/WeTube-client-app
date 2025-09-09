"use client";

import React, {useState, useCallback, useEffect} from "react";
import {useDropzone} from "react-dropzone";
import {Upload, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";

interface UploadModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const VideoUploadModal: React.FC<UploadModalProps> = ({isOpen, onOpenChange}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setIsDragOver(false);
            setVideoFile(null);
        }
    }, [isOpen]);

    const onFileSelect = (files: FileList | File[]) => {
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("video/")) {
                console.log("Selected file:", file);
                setVideoFile(file);
            } else {
                alert("Please select a valid video file.");
            }
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        onFileSelect(acceptedFiles);
    }, []);

    const {getRootProps, getInputProps, open: openFileDialog} = useDropzone({
        onDrop,
        onDragEnter: () => setIsDragOver(true),
        onDragLeave: () => setIsDragOver(false),
        accept: {"video/*": []},
        maxFiles: 1,
        noClick: true,
    });

    const handleChooseFiles = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        openFileDialog();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFileSelect(e.target.files);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="bg-white border-gray-200 text-black sm:max-w-4xl p-0"
                onOpenAutoFocus={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader className="p-4 border-b border-gray-200">
                    <DialogTitle className="text-black text-2xl font-medium">
                        Upload video
                    </DialogTitle>
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        >
                            <X className="h-7 w-7" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="p-8">
                    <div
                        {...getRootProps()}
                        className={`rounded-lg p-16 text-center transition-colors ${
                            isDragOver ? "bg-gray-50" : "bg-slate-50"
                        }`}
                    >
                        <input {...getInputProps()} id="hidden-file-input" className="hidden"
                               onChange={handleFileInputChange}/>
                        <div
                            onClick={openFileDialog}
                            className="w-30 h-30 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center"
                        >
                            <Upload size={90} className="text-black"/>
                        </div>
                        <h3 className="text-gray-900 text-xl mb-2 font-medium">
                            {isDragOver ? "Drop the video file here" : "Drag and drop video files to upload"}
                        </h3>
                        <p className="text-gray-600 mb-8 text-sm">
                            Your videos will be private until you publish them.
                        </p>
                        <Button onClick={handleChooseFiles}
                                className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-sm" type="button">
                            Select Files
                        </Button>
                    </div>
                    <div className="mt-8 text-center text-md text-zinc-400 leading-relaxed">
                        <p>
                            By submitting your videos to WeTube, you acknowledge that you agree to WeTube{" "}
                            <a href="/terms" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and{" "}
                            <a href="/community-guidelines" className="text-blue-400 hover:text-blue-300">Community
                                Guidelines</a>.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};