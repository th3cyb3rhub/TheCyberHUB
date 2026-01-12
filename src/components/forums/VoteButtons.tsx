'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteButtonsProps {
    upvotes: number;
    downvotes: number;
    userVote?: number; // -1, 0, or 1
    onVote: (value: 1 | -1) => Promise<void>;
    disabled?: boolean;
    vertical?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export default function VoteButtons({
    upvotes,
    downvotes,
    userVote = 0,
    onVote,
    disabled = false,
    vertical = true,
    size = 'md',
}: VoteButtonsProps) {
    const [isVoting, setIsVoting] = useState(false);
    const [currentVote, setCurrentVote] = useState(userVote);
    const [votes, setVotes] = useState({ upvotes, downvotes });

    const netVotes = votes.upvotes - votes.downvotes;

    const handleVote = async (value: 1 | -1) => {
        if (disabled || isVoting) return;

        setIsVoting(true);
        const previousVote = currentVote;
        const previousVotes = { ...votes };

        // Optimistic update
        if (currentVote === value) {
            // Toggle off
            setCurrentVote(0);
            setVotes({
                upvotes: value === 1 ? votes.upvotes - 1 : votes.upvotes,
                downvotes: value === -1 ? votes.downvotes - 1 : votes.downvotes,
            });
        } else {
            // New vote or change vote
            setCurrentVote(value);
            if (previousVote === 0) {
                // New vote
                setVotes({
                    upvotes: value === 1 ? votes.upvotes + 1 : votes.upvotes,
                    downvotes: value === -1 ? votes.downvotes + 1 : votes.downvotes,
                });
            } else {
                // Change vote
                setVotes({
                    upvotes: value === 1 ? votes.upvotes + 1 : votes.upvotes - 1,
                    downvotes: value === -1 ? votes.downvotes + 1 : votes.downvotes - 1,
                });
            }
        }

        try {
            await onVote(value);
        } catch {
            // Revert on error
            setCurrentVote(previousVote);
            setVotes(previousVotes);
        } finally {
            setIsVoting(false);
        }
    };

    const sizeClasses = {
        sm: { button: 'p-1', icon: 'w-4 h-4', text: 'text-sm' },
        md: { button: 'p-1.5', icon: 'w-5 h-5', text: 'text-base' },
        lg: { button: 'p-2', icon: 'w-6 h-6', text: 'text-lg' },
    };

    const s = sizeClasses[size];

    return (
        <div className={cn('flex items-center gap-1', vertical ? 'flex-col' : 'flex-row')}>
            <button
                onClick={() => handleVote(1)}
                disabled={disabled || isVoting}
                className={cn(
                    s.button,
                    'rounded-lg transition-all duration-200',
                    currentVote === 1
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-gray-500 hover:bg-white/5 hover:text-green-400',
                    (disabled || isVoting) && 'opacity-50 cursor-not-allowed'
                )}
                title="Upvote"
            >
                <ChevronUp className={s.icon} />
            </button>

            <span
                className={cn(
                    s.text,
                    'font-semibold min-w-[2ch] text-center',
                    netVotes > 0 && 'text-green-400',
                    netVotes < 0 && 'text-red-400',
                    netVotes === 0 && 'text-gray-500'
                )}
            >
                {netVotes}
            </span>

            <button
                onClick={() => handleVote(-1)}
                disabled={disabled || isVoting}
                className={cn(
                    s.button,
                    'rounded-lg transition-all duration-200',
                    currentVote === -1
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-gray-500 hover:bg-white/5 hover:text-red-400',
                    (disabled || isVoting) && 'opacity-50 cursor-not-allowed'
                )}
                title="Downvote"
            >
                <ChevronDown className={s.icon} />
            </button>
        </div>
    );
}
