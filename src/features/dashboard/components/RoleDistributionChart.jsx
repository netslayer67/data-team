import React, { useMemo, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const BAR_COLORS = ['#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa'];

const RoleDistributionChart = ({ data = [], density = 'comfortable' }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const isCompact = density === 'compact';

    const total = useMemo(() => data.reduce((acc, item) => acc + (item.count || 0), 0), [data]);

    return (
        <section className={`glass-surface rounded-[28px] ${isCompact ? 'p-4 md:p-5' : 'p-5 md:p-6'}`}>
            <div className={`flex items-start justify-between gap-3 ${isCompact ? 'mb-3' : 'mb-4'}`}>
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Composition</p>
                    <h3 className="font-display text-xl font-semibold text-slate-900">Role group distribution</h3>
                </div>
                <div className="rounded-xl border border-white/50 bg-white/45 px-3 py-1.5 text-xs text-slate-600">
                    Total: <span className="font-semibold text-slate-800">{total}</span>
                </div>
            </div>

            <div className={`w-full ${isCompact ? 'h-[272px]' : 'h-[320px]'}`}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 12, right: 10, left: -8, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 5" stroke="#cbd5e1" strokeOpacity={0.35} vertical={false} />
                        <XAxis
                            dataKey="_id"
                            tick={{ fill: '#334155', fontSize: isCompact ? 11 : 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#334155', fontSize: isCompact ? 11 : 12 }}
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(56, 189, 248, 0.10)' }}
                            contentStyle={{
                                borderRadius: '14px',
                                border: '1px solid rgba(255,255,255,0.65)',
                                boxShadow: '0 16px 30px rgba(15, 23, 42, 0.2)',
                                background: 'rgba(255,255,255,0.9)',
                                color: '#0f172a'
                            }}
                            formatter={(value, _name, info) => {
                                const pct = total ? ((Number(value) / total) * 100).toFixed(1) : '0.0';
                                return [`${value} people (${pct}%)`, info?.payload?._id || 'Total'];
                            }}
                        />
                        <Bar
                            dataKey="count"
                            radius={[12, 12, 5, 5]}
                            animationDuration={900}
                            animationEasing="ease-out"
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(-1)}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${entry._id}-${index}`}
                                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                                    fillOpacity={activeIndex === -1 || activeIndex === index ? 0.95 : 0.45}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default React.memo(RoleDistributionChart);
