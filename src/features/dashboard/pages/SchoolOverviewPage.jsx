import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { List, Sparkles, StretchHorizontal } from 'lucide-react';
import { getEmployeesHierarchy, getSchoolOverview } from '../../../data/schoolData';
import { InteractiveKpiCard } from '../../../components/InteractiveCard';
import { queueAOSRefresh } from '../../../utils/aos';

const RoleDistributionChart = lazy(() => import('../components/RoleDistributionChart'));
const EmploymentTypeChart = lazy(() => import('../components/EmploymentTypeChart'));

const formatter = new Intl.NumberFormat('en-US');

const formatNumber = (value) => formatter.format(value || 0);
const DASHBOARD_DENSITY_KEY = 'dashboard-density';

const roleAccent = {
    Director: 'from-cyan-600/85 to-sky-600/85',
    'Head Unit': 'from-sky-500/85 to-cyan-500/85',
    Staff: 'from-amber-500/85 to-orange-500/85',
    Teacher: 'from-blue-500/85 to-cyan-500/85',
    'SE Teacher': 'from-teal-500/85 to-emerald-500/85',
    'Support Staff': 'from-slate-500/85 to-blue-500/75',
    Others: 'from-slate-500/85 to-slate-600/85'
};

const SchoolOverviewPage = () => {
    const [density, setDensity] = useState(() => {
        if (typeof window === 'undefined') return 'comfortable';
        const stored = window.localStorage.getItem(DASHBOARD_DENSITY_KEY);
        return stored === 'compact' ? 'compact' : 'comfortable';
    });

    const overview = useMemo(() => getSchoolOverview(), []);
    const hierarchy = useMemo(() => getEmployeesHierarchy(), []);
    const isCompact = density === 'compact';

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(DASHBOARD_DENSITY_KEY, density);
    }, [density]);

    useEffect(() => {
        const stopSoft = queueAOSRefresh({ hard: false, delay: 42 });
        const stopFollowup = queueAOSRefresh({ hard: false, delay: 220 });
        return () => {
            stopSoft();
            stopFollowup();
        };
    }, [density]);

    const setDensityMode = useCallback((mode) => {
        setDensity(mode === 'compact' ? 'compact' : 'comfortable');
    }, []);

    const metrics = useMemo(() => {
        const source = overview?.metrics || {};
        return [
            {
                label: 'Total Employees',
                value: formatNumber(source.totalEmployees),
                hint: `${formatNumber(source.unitsCount)} units`,
                accent: 'from-cyan-500/80 to-sky-500/80'
            },
            {
                label: 'Active Staff',
                value: formatNumber(source.activeEmployees),
                hint: 'Currently active',
                accent: 'from-blue-500/80 to-cyan-500/80'
            },
            {
                label: 'Teachers',
                value: formatNumber(source.teacherCount),
                hint: 'Teaching staff across units',
                accent: 'from-emerald-500/80 to-teal-500/80'
            },
            {
                label: 'Leadership',
                value: formatNumber(source.leadershipCount),
                hint: 'Director + Head Unit',
                accent: 'from-amber-500/80 to-orange-500/80'
            }
        ];
    }, [overview]);

    return (
        <div className={isCompact ? 'space-y-4' : 'space-y-6'}>
            <section
                className={`glass-surface relative overflow-hidden rounded-[28px] ${isCompact ? 'p-4 md:p-5' : 'p-5 md:p-7'}`}
                data-aos="fade-up"
                data-aos-duration="430"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 left-20 h-36 w-36 rounded-full bg-violet-300/10 blur-3xl" />
                <div className={`flex flex-col md:flex-row md:items-center md:justify-between ${isCompact ? 'gap-3' : 'gap-4'}`}>
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Snapshot</p>
                        <h3 className={`font-display font-semibold text-slate-900 ${isCompact ? 'text-xl md:text-2xl' : 'text-2xl md:text-[30px]'}`}>
                            A visual map of school workforce data
                        </h3>
                        <p className={`mt-2 max-w-2xl leading-relaxed text-slate-600 ${isCompact ? 'text-[13px]' : 'text-sm'}`}>
                            This summary highlights staff composition, unit distribution, and the organizational hierarchy to speed up leadership insight.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="inline-flex w-full items-center gap-1 rounded-xl border border-white/60 bg-white/55 p-1 md:w-auto">
                            <button
                                type="button"
                                onClick={() => setDensityMode('comfortable')}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition ${
                                    density === 'comfortable'
                                        ? 'bg-white text-slate-800 shadow-sm'
                                        : 'text-slate-600 hover:bg-white/70'
                                }`}
                            >
                                <StretchHorizontal className="h-3.5 w-3.5" />
                                Comfortable
                            </button>
                            <button
                                type="button"
                                onClick={() => setDensityMode('compact')}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition ${
                                    density === 'compact'
                                        ? 'bg-white text-slate-800 shadow-sm'
                                        : 'text-slate-600 hover:bg-white/70'
                                }`}
                            >
                                <List className="h-3.5 w-3.5" />
                                Compact
                            </button>
                        </div>
                        <div className={`rounded-2xl border border-white/60 bg-white/60 text-sm text-slate-700 shadow-[0_12px_34px_rgba(15,23,42,0.08)] ${isCompact ? 'px-3 py-2' : 'px-4 py-3'}`}>
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Demo Mode</p>
                            <p className="mt-1 font-medium">{formatNumber(overview?.metrics?.totalEmployees)} employees recorded</p>
                            <p className="text-xs text-slate-500">Updated as of February 2026</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 ${isCompact ? 'gap-3' : 'gap-4'}`}>
                {metrics.map((item, index) => (
                    <div
                        key={item.label}
                        data-aos="fade-up"
                        data-aos-delay={Math.min(50 + (index * 36), 220)}
                        data-aos-duration="410"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-bottom"
                    >
                        <InteractiveKpiCard
                            label={item.label}
                            value={item.value}
                            hint={item.hint}
                            accent={item.accent}
                            delay={index * 0.05}
                        />
                    </div>
                ))}
            </section>

            <section className={`grid grid-cols-1 2xl:grid-cols-12 ${isCompact ? 'gap-4' : 'gap-6'}`}>
                <div
                    className="2xl:col-span-7"
                    data-aos="fade-up"
                    data-aos-delay="40"
                    data-aos-duration="430"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom"
                >
                    <Suspense fallback={<section className="glass-surface rounded-3xl p-5 h-[280px]" />}>
                        <RoleDistributionChart data={overview?.byRole || []} density={density} />
                    </Suspense>
                </div>
                <div
                    className="2xl:col-span-5"
                    data-aos="fade-up"
                    data-aos-delay="90"
                    data-aos-duration="430"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom"
                >
                    <Suspense fallback={<section className="glass-surface rounded-3xl p-5 h-[280px]" />}>
                        <EmploymentTypeChart data={overview?.peopleMoments} density={density} />
                    </Suspense>
                </div>
            </section>

            <section className={`grid grid-cols-1 2xl:grid-cols-12 ${isCompact ? 'gap-4' : 'gap-6'}`}>
                <article
                    className={`glass-surface rounded-[28px] 2xl:col-span-5 ${isCompact ? 'p-4' : 'p-5'}`}
                    data-aos="fade-up"
                    data-aos-delay="35"
                    data-aos-duration="410"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom"
                >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Unit Coverage</p>
                    <h3 className="font-display text-xl font-semibold text-slate-900">Unit distribution</h3>
                    <div className={isCompact ? 'mt-3 space-y-1.5' : 'mt-4 space-y-2'}>
                        {(overview?.byUnit || []).map((unit) => (
                            <div
                                key={unit._id}
                                className={`flex items-center justify-between rounded-xl border border-white/50 bg-white/50 ${isCompact ? 'px-2.5 py-1.5' : 'px-3 py-2'}`}
                            >
                                <span className="text-sm text-slate-700">{unit._id}</span>
                                <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-800">
                                    {unit.count} people
                                </span>
                            </div>
                        ))}
                    </div>
                </article>

                <article
                    className={`glass-surface rounded-[28px] 2xl:col-span-7 ${isCompact ? 'p-4' : 'p-5'}`}
                    data-aos="fade-up"
                    data-aos-delay="80"
                    data-aos-duration="410"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom"
                >
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-cyan-700" />
                        <h3 className="font-display text-xl font-semibold text-slate-900">Hierarchy summary</h3>
                    </div>
                    <div className={`mt-4 grid grid-cols-1 sm:grid-cols-2 ${isCompact ? 'gap-2.5' : 'gap-3'}`}>
                        {hierarchy.map((group, index) => (
                            <div
                                key={group.roleGroup}
                                className={`rounded-2xl border border-white/50 bg-white/50 ${isCompact ? 'px-3 py-2.5' : 'px-4 py-3'}`}
                                data-aos="fade-up"
                                data-aos-delay={Math.min(30 + (index * 24), 230)}
                                data-aos-duration="360"
                                data-aos-once="false"
                                data-aos-anchor-placement="top-bottom"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="font-medium text-slate-900">{group.roleGroup}</p>
                                    <span className="text-sm text-slate-600">{group.total} people</span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {group.members.slice(0, 3).map((member) => (
                                        <span
                                            key={member._id}
                                            className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-xs text-slate-700"
                                        >
                                            {member.fullName}
                                        </span>
                                    ))}
                                </div>
                                <div className={`mt-3 h-1.5 rounded-full bg-gradient-to-r ${roleAccent[group.roleGroup] || roleAccent.Others}`} />
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
};

export default SchoolOverviewPage;
