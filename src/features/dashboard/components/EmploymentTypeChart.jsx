import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#06b6d4', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];

const EmploymentTypeChart = ({ data = [] }) => {
    return (
        <section className="glass-surface rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Workforce Model</p>
            <h3 className="font-display text-xl font-semibold text-slate-900">Employment type composition</h3>

            <div className="mt-2 h-[210px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="_id"
                            cx="50%"
                            cy="50%"
                            innerRadius={42}
                            outerRadius={80}
                            paddingAngle={4}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`${entry._id}-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`${value} people`, 'Total']}
                            contentStyle={{
                                borderRadius: '14px',
                                border: '1px solid rgba(255,255,255,0.6)',
                                boxShadow: '0 14px 28px rgba(15, 23, 42, 0.16)',
                                background: 'rgba(255,255,255,0.88)',
                                color: '#0f172a'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid gap-2">
                {data.map((item, index) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between rounded-xl border border-white/50 bg-white/45 px-3 py-2 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-slate-700">{item._id}</span>
                        </div>
                        <span className="font-medium text-slate-900">{item.count}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default React.memo(EmploymentTypeChart);
