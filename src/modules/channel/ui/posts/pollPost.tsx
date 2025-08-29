"use client";

import { useState } from "react";
import { useVotePollMutation } from "@/api/postApi";
import CommentPanel from "@/components/comments/commentPanel";

interface PollOption {
    optionId: string;
    optionText: string;
    voteCount: number;
    percentage?: number;
}

interface PollPostCardProps {
    id: string;
    userId: string;
    avatar: string;
    channelName: string;
    timestamp: string;
    content: string;
    poll: {
        id: string;
        options: PollOption[];
        totalVotes: number;
    };
    comments?: number;
}

export default function PollPostCard({
                                         id,
                                         userId,
                                         avatar,
                                         channelName,
                                         timestamp,
                                         content,
                                         poll,
                                         comments,
                                     }: PollPostCardProps) {
    const [votePoll] = useVotePollMutation();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showComment, setShowComment] = useState(false);

    const handleVote = async (optionId: string) => {
        try {
            setSelectedOption(optionId);
            const res = await votePoll({
                postId: id,
                optionId,
                userId,
            }).unwrap();

            if (res && res.options) {
                const updatedOptions = res.options.map((opt: any) => ({
                    ...opt,
                    percentage: poll.totalVotes > 0
                        ? Math.round((opt.voteCount / res.totalVotes) * 100)
                        : 0,
                }));

                poll.options = updatedOptions;
                poll.totalVotes = res.totalVotes;
            } else {
                const updatedOptions = poll.options.map((opt) =>
                    opt.optionId === optionId
                        ? {
                            ...opt,
                            voteCount: opt.voteCount + 1,
                            percentage: ((opt.voteCount + 1) / (poll.totalVotes + 1)) * 100,
                        }
                        : {
                            ...opt,
                            percentage: (opt.voteCount / (poll.totalVotes + 1)) * 100,
                        }
                );

                poll.options = updatedOptions;
                poll.totalVotes += 1;
            }
        } catch (e) {
            console.error("Vote failed", e);
            setSelectedOption(null);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-xl p-4 space-y-3 max-w-[600px] mx-auto">
            <div className="flex items-start space-x-3">
                <img src={avatar} alt="avatar" width={40} height={40} className="rounded-full"/>
                <div className="flex flex-col text-black text-sm">
                    <div className="font-semibold">{channelName}</div>
                    <div className="text-neutral-400">{timestamp}</div>
                </div>
            </div>

            <div className="text-black text-sm whitespace-pre-line">{content}</div>

            <div className="space-y-2">
                {poll.options.map((opt) => (
                    <button
                        key={opt.optionId}
                        onClick={() => handleVote(opt.optionId)}
                        className={`w-full border rounded-lg px-3 py-2 text-left relative overflow-hidden ${
                            selectedOption === opt.optionId
                                ? "border-blue-500"
                                : "border-gray-300"
                        }`}
                    >
                        <div
                            className={`absolute inset-0 ${
                                selectedOption === opt.optionId
                                    ? "bg-blue-500/30"
                                    : "bg-gray-200/40"
                            }`}
                            style={{ width: `${opt.percentage ?? 0}%` }}
                        />

                        {/* Nội dung option */}
                        <div className="relative flex justify-between items-center">
                            <span className="font-medium">{opt.optionText}</span>
                            <span className="text-sm text-gray-600">
                        {opt.percentage ?? 0}% ({opt.voteCount})
        </span>
                        </div>
                    </button>
                ))}
                <div className="text-xs text-gray-500">Total votes: {poll.totalVotes}</div>
            </div>

            <button
                className="text-blue-500 text-sm"
                onClick={() => setShowComment(true)}>
                View {comments} comments
            </button>

            <CommentPanel
                targetId={id}
                targetType="POST"
                userId={userId}
                isOpen={showComment}
                onClose={() => setShowComment(false)}
            />
        </div>
    );
}
