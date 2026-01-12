"use client"

import React from 'react';
import { Lock, Award, Star, Trophy, Flag, Shield, Zap, Target, Crown } from 'lucide-react';

// Badge types with their icons and colors
const BADGE_ICONS: Record<string, React.ElementType> = {
    'first_solve': Flag,
    'challenge_master': Trophy,
    'point_collector': Star,
    'security_expert': Shield,
    'speed_demon': Zap,
    'sharpshooter': Target,
    'leaderboard_king': Crown,
    'default': Award,
};

const BADGE_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
    'bronze': { bg: 'from-amber-700/20 to-amber-900/20', border: 'border-amber-600/30', icon: 'text-amber-500' },
    'silver': { bg: 'from-slate-400/20 to-slate-600/20', border: 'border-slate-400/30', icon: 'text-slate-400' },
    'gold': { bg: 'from-yellow-500/20 to-yellow-700/20', border: 'border-yellow-500/30', icon: 'text-yellow-400' },
    'platinum': { bg: 'from-cyan-400/20 to-cyan-600/20', border: 'border-cyan-400/30', icon: 'text-cyan-400' },
    'default': { bg: 'from-orange-500/20 to-orange-700/20', border: 'border-orange-500/30', icon: 'text-orange-400' },
};

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon?: string;
    tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
    earnedAt?: string;
    progress?: number; // 0-100 for locked badges
    requirement?: string;
}

interface AchievementBadgeProps {
    achievement: Achievement;
    size?: 'sm' | 'md' | 'lg';
    showDetails?: boolean;
    onClick?: () => void;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
    achievement,
    size = 'md',
    showDetails = true,
    onClick
}) => {
    const isEarned = !!achievement.earnedAt;
    const IconComponent = BADGE_ICONS[achievement.icon || 'default'] || Award;
    const colors = BADGE_COLORS[achievement.tier || 'default'];

    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
    };

    const iconSizes = {
        sm: 'w-5 h-5',
        md: 'w-7 h-7',
        lg: 'w-9 h-9',
    };

    return (
        <button
            onClick={onClick}
            disabled={!onClick}
            className={`group relative flex flex-col items-center p-4 rounded-xl border transition-all ${isEarned
                    ? `bg-gradient-to-br ${colors.bg} ${colors.border} hover:scale-105`
                    : 'bg-white/5 border-white/10 opacity-60 grayscale hover:opacity-80'
                } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
            {/* Badge Icon Container */}
            <div className={`relative ${sizeClasses[size]} rounded-full bg-black/30 flex items-center justify-center mb-2`}>
                {isEarned ? (
                    <IconComponent className={`${iconSizes[size]} ${colors.icon}`} />
                ) : (
                    <>
                        <IconComponent className={`${iconSizes[size]} text-gray-600`} />
                        <Lock className="w-4 h-4 text-gray-500 absolute -bottom-1 -right-1 bg-black rounded-full p-0.5" />
                    </>
                )}

                {/* Progress ring for locked badges */}
                {!isEarned && achievement.progress !== undefined && achievement.progress > 0 && (
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-white/10"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray={`${achievement.progress} 100`}
                            strokeLinecap="round"
                            className="text-orange-500/50"
                        />
                    </svg>
                )}
            </div>

            {/* Badge Info */}
            {showDetails && (
                <>
                    <p className={`text-sm font-medium text-center ${isEarned ? 'text-white' : 'text-gray-500'}`}>
                        {achievement.name}
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-0.5 line-clamp-2">
                        {isEarned ? achievement.description : achievement.requirement || 'Keep playing to unlock'}
                    </p>
                    {isEarned && achievement.earnedAt && (
                        <p className="text-xs text-gray-600 mt-1">
                            {new Date(achievement.earnedAt).toLocaleDateString()}
                        </p>
                    )}
                    {!isEarned && achievement.progress !== undefined && (
                        <p className="text-xs text-orange-400 mt-1">
                            {achievement.progress}% complete
                        </p>
                    )}
                </>
            )}
        </button>
    );
};

interface AchievementGridProps {
    achievements: Achievement[];
    emptyMessage?: string;
    onAchievementClick?: (achievement: Achievement) => void;
}

export const AchievementGrid: React.FC<AchievementGridProps> = ({
    achievements,
    emptyMessage = 'No achievements yet',
    onAchievementClick
}) => {
    if (achievements.length === 0) {
        return (
            <div className="text-center py-8">
                <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">{emptyMessage}</p>
            </div>
        );
    }

    // Separate earned and locked badges
    const earnedAchievements = achievements.filter(a => a.earnedAt);
    const lockedAchievements = achievements.filter(a => !a.earnedAt);

    return (
        <div className="space-y-6">
            {/* Earned Achievements */}
            {earnedAchievements.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Earned ({earnedAchievements.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {earnedAchievements.map(achievement => (
                            <AchievementBadge
                                key={achievement.id}
                                achievement={achievement}
                                size="sm"
                                onClick={() => onAchievementClick?.(achievement)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Locked Achievements */}
            {lockedAchievements.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Locked ({lockedAchievements.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {lockedAchievements.map(achievement => (
                            <AchievementBadge
                                key={achievement.id}
                                achievement={achievement}
                                size="sm"
                                onClick={() => onAchievementClick?.(achievement)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Achievement unlock notification toast component
interface AchievementUnlockToastProps {
    achievement: Achievement;
    onClose?: () => void;
}

export const AchievementUnlockToast: React.FC<AchievementUnlockToastProps> = ({ achievement, onClose }) => {
    const IconComponent = BADGE_ICONS[achievement.icon || 'default'] || Award;
    const colors = BADGE_COLORS[achievement.tier || 'default'];

    return (
        <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${colors.bg} border ${colors.border} animate-slideIn`}>
            <div className={`w-12 h-12 rounded-full bg-black/30 flex items-center justify-center`}>
                <IconComponent className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-400">Achievement Unlocked!</p>
                <p className="font-medium text-white">{achievement.name}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default AchievementBadge;
