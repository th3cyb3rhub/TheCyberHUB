export const DIFFICULTY_COLORS: Record<string, string> = {
    easy: 'text-green-400 bg-green-500/10 border-green-500/30',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    hard: 'text-red-400 bg-red-500/10 border-red-500/30',
    insane: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
};

export const CATEGORY_COLORS: Record<string, string> = {
    web: 'text-blue-400', crypto: 'text-orange-400', pwn: 'text-red-400',
    reverse: 'text-purple-400', forensics: 'text-green-400', misc: 'text-gray-400', osint: 'text-yellow-400',
};

export const STATUS_COLORS: Record<string, string> = {
    active: 'text-green-400 bg-green-500/10', inactive: 'text-gray-400 bg-gray-500/10',
    pending: 'text-yellow-400 bg-yellow-500/10', archived: 'text-gray-500 bg-gray-500/10',
};

export const EMPLOYMENT_TYPE_COLORS: Record<string, string> = {
    'full-time': 'text-green-400 bg-green-500/10', 'part-time': 'text-blue-400 bg-blue-500/10',
    contract: 'text-yellow-400 bg-yellow-500/10', freelance: 'text-purple-400 bg-purple-500/10',
    internship: 'text-cyan-400 bg-cyan-500/10',
};
