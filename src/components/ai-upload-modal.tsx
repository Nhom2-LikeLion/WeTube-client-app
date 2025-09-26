// "use client";
//
// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
// import axios from "axios";
// import { API_PREFIX } from "@/constants/appConstant";
//
// interface AIEditorUploadModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }
//
// export const AIEditorUploadModal: React.FC<AIEditorUploadModalProps> = ({
//                                                                             isOpen,
//                                                                             onClose,
//                                                                         }) => {
//     const [videoFile, setVideoFile] = useState<File | null>(null);
//     const [style, setStyle] = useState<"funny" | "serious">("funny");
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [videoUrl, setVideoUrl] = useState<string | null>(null);
//
//     const [instructions, setInstructions] = useState<string>("");
//     const [hasInstruction, setHasInstruction] = useState(false);
//
//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         if (acceptedFiles.length > 0) {
//             setVideoFile(acceptedFiles[0]);
//             setVideoUrl(null);
//             setInstructions("");
//             setHasInstruction(false);
//         }
//     }, []);
//
//     const { getRootProps, getInputProps, open: openFileDialog } = useDropzone({
//         onDrop,
//         accept: { "video/*": [] },
//         maxFiles: 1,
//         noClick: true,
//     });
//
//     // Step 1: Call AI to generate instructions (without file)
//     const handleGenerateInstructions = async () => {
//         setIsProcessing(true);
//         try {
//             const res = await axios.post(
//                 `${API_PREFIX}/ai-editor/instructions`,
//                 { style }, // chỉ gửi style
//             );
//             setInstructions(res.data.instructions || "");
//             setHasInstruction(true);
//         } catch (err: any) {
//             console.error(err);
//             alert("AI Instructions generation failed: " + err?.message || err);
//         } finally {
//             setIsProcessing(false);
//         }
//     };
//
//     // Step 2: Run video processing with instructions (file + instructions)
//     const handleRunEditing = async () => {
//         if (!instructions || !videoFile) return;
//         setIsProcessing(true);
//         try {
//             const formData = new FormData();
//             formData.append("file", videoFile);
//             formData.append("instructions", instructions);
//
//             const res = await axios.post(`${API_PREFIX}/ai-editor/process`, formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//
//             setVideoUrl(res.data.videoUrl);
//         } catch (err: any) {
//             console.error(err);
//             alert("Video processing failed: " + err?.message || err);
//         } finally {
//             setIsProcessing(false);
//         }
//     };
//
//     const resetModal = () => {
//         setVideoFile(null);
//         setVideoUrl(null);
//         setStyle("funny");
//         setInstructions("");
//         setHasInstruction(false);
//         onClose();
//     };
//
//     if (!isOpen) return null;
//
//     return (
//         <div className="flex flex-col h-full p-4">
//             <DialogHeader className="border-b border-gray-200">
//                 <DialogTitle className="text-2xl font-medium">AI Video Editor</DialogTitle>
//                 <DialogClose asChild>
//                     <Button
//                         variant="ghost"
//                         className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
//                         onClick={resetModal}
//                     >
//                         <X className="h-7 w-7" />
//                         <span className="sr-only">Close</span>
//                     </Button>
//                 </DialogClose>
//             </DialogHeader>
//
//             <div className="flex flex-col flex-grow justify-center items-center p-8 gap-6">
//                 {/* Step 0: Drop / select video */}
//                 {!videoFile && (
//                     <div
//                         {...getRootProps()}
//                         className="w-full p-16 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
//                     >
//                         <input {...getInputProps()} />
//                         <p className="text-gray-600">Drag & drop a video here, or click to select file</p>
//                         <Button className="mt-4" onClick={openFileDialog}>
//                             Select Video
//                         </Button>
//                     </div>
//                 )}
//
//                 {/* Step 1: Choose style & generate instruction */}
//                 {videoFile && !hasInstruction && (
//                     <>
//                         <div>
//                             <p className="mb-2 font-medium">Selected file: {videoFile.name}</p>
//                             <div className="flex gap-4">
//                                 <Button
//                                     variant={style === "funny" ? "default" : "outline"}
//                                     onClick={() => setStyle("funny")}
//                                 >
//                                     Funny
//                                 </Button>
//                                 <Button
//                                     variant={style === "serious" ? "default" : "outline"}
//                                     onClick={() => setStyle("serious")}
//                                 >
//                                     Serious
//                                 </Button>
//                             </div>
//                         </div>
//
//                         <Button onClick={handleGenerateInstructions} className="mt-6" disabled={isProcessing}>
//                             {isProcessing ? "Generating Instructions..." : "Get AI Instructions"}
//                         </Button>
//                     </>
//                 )}
//
//                 {/* Step 2: Show editable instructions */}
//                 {hasInstruction && !videoUrl && (
//                     <div className="w-full flex flex-col gap-4">
//                         <p className="font-medium">AI Instructions (editable before running):</p>
//                         <textarea
//                             value={instructions}
//                             onChange={(e) => setInstructions(e.target.value)}
//                             className="w-full h-40 p-2 border rounded-md font-mono text-sm"
//                         />
//                         <Button onClick={handleRunEditing} disabled={isProcessing}>
//                             {isProcessing ? "Processing Video..." : "Run Editing"}
//                         </Button>
//                     </div>
//                 )}
//
//                 {/* Step 3: Show processed video */}
//                 {videoUrl && (
//                     <div className="flex flex-col items-center gap-4">
//                         <p className="font-medium text-lg">AI Edited Video</p>
//                         <video src={videoUrl} controls className="max-w-full max-h-[60vh] rounded-lg" />
//                         <Button onClick={resetModal}>Done</Button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
