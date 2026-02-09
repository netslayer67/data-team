import React, { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa'];

const EmploymentTypeChart = ({ data = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = useMemo(() => data.reduce((acc, item) => acc + (item.count || 0), 0), [data]);

    return (
        <section className="glass-surface rounded-3xl p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Workforce Model</p>
                    <h3 className="font-display text-xl font-semibold text-slate-900">Employment type composition</h3>
                </div>
                <div className="rounded-xl border border-white/50 bg-white/45 px-3 py-1.5 text-xs text-slate-600">
                    Total: <span className="font-semibold text-slate-800">{total}</span>
                </div>
            </div>

            <div className="mt-2 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="_id"
                            cx="50%"
                            cy="50%"
                            innerRadius={44}
                            outerRadius={84}
                            paddingAngle={3}
                            animationDuration={900}
                            animationEasing="ease-out"
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`${entry._id}-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    fillOpacity={activeIndex === index ? 1 : 0.68}
                                    stroke={activeIndex === index ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)'}
                                    strokeWidth={activeIndex === index ? 2 : 1}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, _name, info) => {
                                const pct = total ? ((Number(value) / total) * 100).toFixed(1) : '0.0';
                                return [`${value} people (${pct}%)`, info?.payload?._id || 'Total'];
                            }}
                            contentStyle={{
                                borderRadius: '14px',
                                border: '1px solid rgba(255,255,255,0.65)',
                                boxShadow: '0 16px 30px rgba(15, 23, 42, 0.2)',
                                background: 'rgba(255,255,255,0.9)',
                                color: '#0f172a'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid gap-2">
                {data.map((item, index) => {
                    const isActive = index === activeIndex;
                    const pct = total ? ((item.count / total) * 100).toFixed(1) : '0.0';

                    return (
                        <button
                            type="button"
                            key={item._id}
                            className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm text-left transition ${isActive
                                ? 'border-cyan-200 bg-white/70 shadow-[0_8px_18px_rgba(14,165,233,0.15)]'
                                : 'border-white/50 bg-white/45 hover:bg-white/60'
                                }`}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span className="text-slate-700">{item._id}</span>
                            </div>
                            <span className="font-medium text-slate-900">{item.count} · {pct}%</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default React.memo(EmploymentTypeChart);
