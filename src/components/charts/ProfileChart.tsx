'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    ResponsiveContainer
} from 'recharts';

interface ProfileChartProps {
    data: Array<{ name: string; points: number }>;
}

export default function ProfileChart({ data }: ProfileChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="#52525b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#52525b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <RechartsTooltip
                    contentStyle={{
                        backgroundColor: 'rgba(9, 9, 11, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    }}
                    itemStyle={{ color: '#f97316', fontWeight: 600 }}
                    labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                />
                <Area
                    type="monotone"
                    dataKey="points"
                    stroke="#f97316"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPoints)"
                    animationDuration={1500}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
