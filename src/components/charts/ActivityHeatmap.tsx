"use client"

import React, { useMemo } from 'react';

interface ActivityDay {
    date: string; // YYYY-MM-DD
    actions: string[];
    xpEarned: number;
}

interface ActivityHeatmapProps {
    activityLog: ActivityDay[];
    weeks?: number; // default 52
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getIntensity(actions: string[]): 0 | 1 | 2 | 3 | 4 {
    const count = actions.length;
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count === 3) return 3;
    return 4;
}

const INTENSITY_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
    0: 'bg-white/5 border border-white/5',
    1: 'bg-orange-500/20 border border-orange-500/10',
    2: 'bg-orange-500/40 border border-orange-500/20',
    3: 'bg-orange-500/60 border border-orange-500/30',
    4: 'bg-orange-500 border border-orange-500/50',
};

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ activityLog, weeks = 52 }) => {
    const { grid, monthLabels, totalDays } = useMemo(() => {
        // Build a date → activity map
        const activityMap = new Map<string, ActivityDay>();
        for (const entry of activityLog) {
            activityMap.set(entry.date, entry);
        }

        // Build grid: columns = weeks, rows = days of week (0=Sun..6=Sat)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Start from the Sunday >= weeks ago
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - (weeks * 7) + 1);
        // Align to previous Sunday
        startDate.setDate(startDate.getDate() - startDate.getDay());

        const columns: { date: string; activity: ActivityDay | null }[][] = [];
        const seenMonths = new Map<number, number>(); // colIndex → month
        let activeDays = 0;

        const cur = new Date(startDate);
        while (cur <= today) {
            const col: { date: string; activity: ActivityDay | null }[] = [];
            for (let d = 0; d < 7; d++) {
                const dateStr = cur.toISOString().slice(0, 10);
                const activity = activityMap.get(dateStr) ?? null;
                if (activity) activeDays++;
                col.push({ date: dateStr, activity });

                if (d === 0) {
                    const colIdx = columns.length;
                    const month = cur.getMonth();
                    if (!seenMonths.has(month)) {
                        seenMonths.set(month, colIdx);
                    }
                }

                cur.setDate(cur.getDate() + 1);
            }
            columns.push(col);
        }

        // Build month label list
        const monthLabels: { label: string; colIdx: number }[] = [];
        seenMonths.forEach((colIdx, month) => {
            monthLabels.push({ label: MONTHS[month], colIdx });
        });
        monthLabels.sort((a, b) => a.colIdx - b.colIdx);

        return { grid: columns, monthLabels, totalDays: activeDays };
    }, [activityLog, weeks]);

    return (
        <div className="space-y-2">
            {/* Month labels */}
            <div className="flex pl-8" style={{ gap: '2px' }}>
                {grid.map((_, colIdx) => {
                    const label = monthLabels.find(m => m.colIdx === colIdx);
                    return (
                        <div key={colIdx} className="flex-none" style={{ width: 12 }}>
                            {label && (
                                <span className="text-[9px] text-gray-500 whitespace-nowrap">
                                    {label.label}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Grid */}
            <div className="flex gap-1">
                {/* Day labels */}
                <div className="flex flex-col justify-between pr-1" style={{ gap: '2px' }}>
                    {DAYS.map((day, i) => (
                        <div key={i} className="flex-none" style={{ height: 12 }}>
                            {i % 2 === 1 && (
                                <span className="text-[9px] text-gray-500">{day.slice(0, 1)}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Columns */}
                <div className="flex" style={{ gap: '2px' }}>
                    {grid.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col" style={{ gap: '2px' }}>
                            {col.map(({ date, activity }) => {
                                const isFuture = date > new Date().toISOString().slice(0, 10);
                                const intensity = isFuture ? 0 : getIntensity(activity?.actions ?? []);
                                const tooltipLines = activity
                                    ? `${date}: ${activity.actions.join(', ')} (+${activity.xpEarned} XP)`
                                    : date;
                                return (
                                    <div
                                        key={date}
                                        title={tooltipLines}
                                        className={`rounded-[2px] cursor-default transition-transform hover:scale-125 ${
                                            isFuture ? 'opacity-0 pointer-events-none' : INTENSITY_CLASSES[intensity]
                                        }`}
                                        style={{ width: 12, height: 12, flexShrink: 0 }}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 pl-8 pt-1">
                <span className="text-[10px] text-gray-500">{totalDays} active days</span>
                <div className="flex-1" />
                <span className="text-[10px] text-gray-500">Less</span>
                {([0, 1, 2, 3, 4] as const).map(level => (
                    <div
                        key={level}
                        className={`rounded-[2px] ${INTENSITY_CLASSES[level]}`}
                        style={{ width: 11, height: 11 }}
                    />
                ))}
                <span className="text-[10px] text-gray-500">More</span>
            </div>
        </div>
    );
};

export default ActivityHeatmap;
