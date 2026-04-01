'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer
} from 'recharts';

interface UserGrowth {
    _id: string;
    count: number;
}

interface AnalyticsChartProps {
    data: UserGrowth[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
    return (
        <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.8} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis
                        dataKey="_id"
                        stroke="#52525b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(str) => {
                            const parts = str.split('-');
                            return parts.length === 3 ? `${parts[1]}/${parts[2]}` : str;
                        }}
                    />
                    <YAxis
                        stroke="#52525b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <RechartsTooltip
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{
                            backgroundColor: 'rgba(9, 9, 11, 0.9)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        }}
                        itemStyle={{ color: '#22c55e', fontWeight: 600 }}
                        labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                    />
                    <Bar
                        dataKey="count"
                        fill="url(#colorUsers)"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                        name="New Users"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
