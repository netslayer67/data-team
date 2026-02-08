import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const RoleDistributionChart = ({ data = [] }) => {
    return (
        <section className="glass-surface rounded-3xl p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Composition</p>
                    <h3 className="font-display text-xl font-semibold text-slate-900">Role group distribution</h3>
                </div>
            </div>

            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 12, right: 16, left: -10, bottom: 8 }}
                    >
                        <CartesianGrid strokeDasharray="4 5" stroke="#cbd5e1" strokeOpacity={0.4} />
                        <XAxis
                            dataKey="_id"
                            tick={{ fill: '#334155', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#334155', fontSize: 12 }}
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(148, 163, 184, 0.18)' }}
                            contentStyle={{
                                borderRadius: '14px',
                                border: '1px solid rgba(255,255,255,0.6)',
                                boxShadow: '0 14px 28px rgba(15, 23, 42, 0.16)',
                                background: 'rgba(255,255,255,0.88)',
                                color: '#0f172a'
                            }}
                            formatter={(value) => [`${value} people`, 'Total']}
                        />
                        <Bar
                            dataKey="count"
                            radius={[10, 10, 4, 4]}
                            fill="url(#barGradient)"
                        />
                        <defs>
                            <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#0891b2" />
                                <stop offset="100%" stopColor="#0369a1" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default React.memo(RoleDistributionChart);
