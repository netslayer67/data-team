import React, { useEffect, useMemo, useState } from 'react';

const BAR_COLORS = ['#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#f59e0b'];

const CHART_DIMENSIONS = {
    width: 560,
    height: 320,
    top: 20,
    right: 20,
    bottom: 64,
    left: 28
};

const createTicks = (max) => {
    const safeMax = Math.max(1, Number(max || 0));
    const roughStep = safeMax / 4;
    const magnitude = 10 ** Math.floor(Math.log10(Math.max(roughStep, 1)));
    const normalized = roughStep / magnitude;
    const niceMultiplier = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    const step = niceMultiplier * magnitude;
    const ceiling = Math.max(step, Math.ceil(safeMax / step) * step);

    return Array.from({ length: 5 }, (_, index) => index * (ceiling / 4));
};

const formatPercent = (count, total) => {
    if (!total) return '0.0';
    return ((count / total) * 100).toFixed(1);
};

const RoleDistributionChart = ({ data = [], density = 'comfortable' }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isCompact = density === 'compact';

    const total = useMemo(() => data.reduce((acc, item) => acc + (item.count || 0), 0), [data]);
    const maxCount = useMemo(() => Math.max(...data.map((item) => Number(item.count || 0)), 1), [data]);
    const ticks = useMemo(() => createTicks(maxCount), [maxCount]);

    useEffect(() => {
        setActiveIndex((prev) => {
            if (!data.length) return 0;
            return Math.min(prev, data.length - 1);
        });
    }, [data]);

    const activeItem = data[activeIndex] || null;
    const chartAreaWidth = CHART_DIMENSIONS.width - CHART_DIMENSIONS.left - CHART_DIMENSIONS.right;
    const chartAreaHeight = CHART_DIMENSIONS.height - CHART_DIMENSIONS.top - CHART_DIMENSIONS.bottom;
    const slotWidth = chartAreaWidth / Math.max(data.length, 1);
    const barWidth = Math.min(isCompact ? 48 : 56, Math.max(28, slotWidth * 0.58));
    const summaryGridClass = isCompact ? 'mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-3' : 'mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-5';

    const bars = data.map((item, index) => {
        const count = Number(item.count || 0);
        const height = (count / ticks[ticks.length - 1]) * chartAreaHeight;
        const x = CHART_DIMENSIONS.left + (slotWidth * index) + ((slotWidth - barWidth) / 2);
        const y = CHART_DIMENSIONS.top + (chartAreaHeight - height);
        return {
            ...item,
            color: BAR_COLORS[index % BAR_COLORS.length],
            count,
            height,
            x,
            y
        };
    });

    return (
        <section className={`glass-surface rounded-[28px] ${isCompact ? 'p-4 md:p-5' : 'p-5 md:p-6'}`}>
            <div className={`flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between ${isCompact ? 'mb-3' : 'mb-4'}`}>
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Composition</p>
                    <h3 className="font-display text-xl font-semibold text-slate-900">Role group distribution</h3>
                    <p className="mt-1 text-xs text-slate-500">
                        Native SVG chart to keep dashboard payload lighter.
                    </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/55 bg-white/50 px-3.5 py-2 text-xs text-slate-600">
                        Total: <span className="font-semibold text-slate-800">{total}</span>
                    </div>
                    {activeItem && (
                        <div className="rounded-2xl border border-white/55 bg-white/50 px-3.5 py-2 text-xs text-slate-600">
                            Active: <span className="font-semibold text-slate-800">{activeItem._id}</span> ({formatPercent(activeItem.count, total)}%)
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-[24px] border border-white/55 bg-white/44 p-3">
                <div className={`w-full ${isCompact ? 'h-[272px]' : 'h-[320px]'}`}>
                    <svg
                        viewBox={`0 0 ${CHART_DIMENSIONS.width} ${CHART_DIMENSIONS.height}`}
                        className="h-full w-full overflow-visible"
                        role="img"
                        aria-label="Role group distribution bar chart"
                    >
                        {ticks.map((tick) => {
                            const y = CHART_DIMENSIONS.top + chartAreaHeight - ((tick / ticks[ticks.length - 1]) * chartAreaHeight);
                            return (
                                <g key={`tick-${tick}`}>
                                    <line
                                        x1={CHART_DIMENSIONS.left}
                                        x2={CHART_DIMENSIONS.width - CHART_DIMENSIONS.right}
                                        y1={y}
                                        y2={y}
                                        stroke="rgba(148, 163, 184, 0.28)"
                                        strokeDasharray="4 5"
                                    />
                                    <text
                                        x={CHART_DIMENSIONS.left - 8}
                                        y={y + 4}
                                        textAnchor="end"
                                        fontSize={isCompact ? 10 : 11}
                                        fill="#64748b"
                                    >
                                        {Math.round(tick)}
                                    </text>
                                </g>
                            );
                        })}

                        {bars.map((bar, index) => {
                            const isActive = index === activeIndex;
                            const percent = formatPercent(bar.count, total);
                            return (
                                <g
                                    key={`${bar._id}-${index}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onFocus={() => setActiveIndex(index)}
                                >
                                    <rect
                                        x={bar.x}
                                        y={bar.y}
                                        width={barWidth}
                                        height={Math.max(bar.height, 6)}
                                        rx={14}
                                        fill={bar.color}
                                        fillOpacity={isActive ? 0.96 : 0.72}
                                    />
                                    <rect
                                        x={bar.x}
                                        y={bar.y}
                                        width={barWidth}
                                        height={Math.max(bar.height, 6)}
                                        rx={14}
                                        fill="url(#barShine)"
                                        opacity={isActive ? 0.42 : 0.22}
                                    />
                                    <text
                                        x={bar.x + (barWidth / 2)}
                                        y={bar.y - 8}
                                        textAnchor="middle"
                                        fontSize={isCompact ? 11 : 12}
                                        fontWeight="700"
                                        fill={isActive ? '#0f172a' : '#475569'}
                                    >
                                        {bar.count}
                                    </text>
                                    <text
                                        x={bar.x + (barWidth / 2)}
                                        y={CHART_DIMENSIONS.height - 28}
                                        textAnchor="middle"
                                        fontSize={isCompact ? 10 : 11}
                                        fontWeight={isActive ? '700' : '600'}
                                        fill={isActive ? '#0f172a' : '#475569'}
                                    >
                                        {bar._id}
                                    </text>
                                    <text
                                        x={bar.x + (barWidth / 2)}
                                        y={CHART_DIMENSIONS.height - 12}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="#64748b"
                                    >
                                        {percent}%
                                    </text>
                                </g>
                            );
                        })}

                        <defs>
                            <linearGradient id="barShine" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.52" />
                                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            <div className={summaryGridClass}>
                {bars.map((bar, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <button
                            key={`summary-${bar._id}`}
                            type="button"
                            onMouseEnter={() => setActiveIndex(index)}
                            onFocus={() => setActiveIndex(index)}
                            onClick={() => setActiveIndex(index)}
                            className={`rounded-2xl border px-3 py-2 text-left transition ${
                                isActive
                                    ? 'border-white/75 bg-white/78 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.5)]'
                                    : 'border-white/50 bg-white/40 hover:bg-white/55'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="inline-block h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: bar.color }}
                                />
                                <span className="truncate text-sm font-semibold text-slate-800">{bar._id}</span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">
                                {bar.count} people · {formatPercent(bar.count, total)}%
                            </p>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default React.memo(RoleDistributionChart);
