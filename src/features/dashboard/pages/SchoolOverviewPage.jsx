import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Building2, List, Sparkles, StretchHorizontal, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getEmployeesHierarchy, getSchoolOverview } from '../../../data/schoolData';
import { InteractiveKpiCard } from '../../../components/InteractiveCard';
import { queueAOSRefresh } from '../../../utils/aos';

const RoleDistributionChart = lazy(() => import('../components/RoleDistributionChart'));
const EmploymentTypeChart = lazy(() => import('../components/EmploymentTypeChart'));
const ZodiacForecast = lazy(() => import('../components/ZodiacForecast'));

const formatter = new Intl.NumberFormat('en-US');

const formatNumber = (value) => formatter.format(value || 0);
const DASHBOARD_DENSITY_KEY = 'dashboard-density';

const unitAccent = {
    Elementary: 'border-blue-200/50 bg-blue-50/50 text-blue-800',
    'Junior High': 'border-indigo-200/50 bg-indigo-50/50 text-indigo-800',
    Kindergarten: 'border-pink-200/50 bg-pink-50/50 text-pink-800',
    RISE: 'border-teal-200/50 bg-teal-50/50 text-teal-800',
    SHIELD: 'border-slate-200/50 bg-slate-50/50 text-slate-800',
    SAFE: 'border-amber-200/50 bg-amber-50/50 text-amber-800',
    COMPASS: 'border-cyan-200/50 bg-cyan-50/50 text-cyan-800',
    BRIDGE: 'border-violet-200/50 bg-violet-50/50 text-violet-800',
    'MAD Lab': 'border-fuchsia-200/50 bg-fuchsia-50/50 text-fuchsia-800',
    CARE: 'border-rose-200/50 bg-rose-50/50 text-rose-800',
    Directorate: 'border-sky-200/50 bg-sky-50/50 text-sky-800'
};

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
    const navigate = useNavigate();
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
        const stopLate = queueAOSRefresh({ hard: false, delay: 520 });
        return () => {
            stopSoft();
            stopFollowup();
            stopLate();
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
                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition ${density === 'comfortable'
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
                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition ${density === 'compact'
                                    ? 'bg-white text-slate-800 shadow-sm'
                                    : 'text-slate-600 hover:bg-white/70'
                                    }`}
                            >
                                <List className="h-3.5 w-3.5" />
                                Compact
                            </button>
                        </div>
                        <div className={`rounded-2xl border border-white/60 bg-white/60 text-sm text-slate-700 shadow-[0_12px_34px_rgba(15,23,42,0.08)] ${isCompact ? 'px-3 py-2' : 'px-4 py-3'}`}>
                            {/* <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Demo Mode</p> */}
                            <p className="mt-1 font-medium">{formatNumber(overview?.metrics?.totalEmployees)} employees recorded</p>
                            <p className="text-xs text-slate-500">Updated as of February 2026</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 ${isCompact ? 'gap-2.5 sm:gap-3' : 'gap-2.5 sm:gap-4'}`}>
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
                            compact={isCompact}
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

            <div
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="430"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
            >
                {/* <Suspense fallback={<section className="glass-surface rounded-3xl p-5 h-[280px]" />}>
                    <ZodiacForecast density={density} />
                </Suspense> */}
            </div>

            <section
                className={`glass-surface relative overflow-hidden rounded-[28px] ${isCompact ? 'p-4 md:p-5' : 'p-5 md:p-7'}`}
                data-aos="fade-up"
                data-aos-delay="35"
                data-aos-duration="410"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-teal-300/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-violet-300/10 blur-3xl" />

                <div className="flex items-center gap-2.5">
                    <Building2 className="h-5 w-5 text-cyan-700" />
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Unit Coverage</p>
                        <h3 className={`font-display font-semibold text-slate-900 ${isCompact ? 'text-lg' : 'text-xl'}`}>Unit distribution</h3>
                    </div>
                </div>
                <p className={`mt-1.5 text-slate-600 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    Click on a unit to view all employees in that unit
                </p>

                <div className={`mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isCompact ? 'gap-2.5' : 'gap-3'}`}>
                    {(overview?.byUnit || []).map((unit, index) => {
                        const maxCount = Math.max(...(overview?.byUnit || []).map((u) => u.count), 1);
                        const pct = Math.round((unit.count / maxCount) * 100);
                        return (
                            <button
                                key={unit._id}
                                type="button"
                                onClick={() => navigate(`/employees?unit=${encodeURIComponent(unit._id)}`)}
                                className={`group relative overflow-hidden rounded-2xl border text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${unitAccent[unit._id] || 'border-white/50 bg-white/50 text-slate-800'} ${isCompact ? 'px-3.5 py-3' : 'px-4 py-3.5'}`}
                                data-aos="fade-up"
                                data-aos-delay={Math.min(30 + (index * 28), 260)}
                                data-aos-duration="380"
                                data-aos-once="false"
                                data-aos-anchor-placement="top-bottom"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className={`font-semibold ${isCompact ? 'text-sm' : 'text-[15px]'}`}>{unit._id}</span>
                                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-70 group-hover:translate-x-0.5" />
                                </div>
                                <p className={`mt-1 font-semibold text-slate-900 ${isCompact ? 'text-lg' : 'text-xl'}`}>
                                    {unit.count}
                                    <span className="ml-1 text-xs font-normal text-slate-500">people</span>
                                </p>
                                <div className={`mt-2 h-1.5 rounded-full bg-current/10 ${isCompact ? '' : ''}`}>
                                    <div className="h-full rounded-full bg-current/30 transition-all" style={{ width: `${pct}%` }} />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section
                className={`glass-surface relative overflow-hidden rounded-[28px] ${isCompact ? 'p-4 md:p-5' : 'p-5 md:p-7'}`}
                data-aos="fade-up"
                data-aos-delay="80"
                data-aos-duration="410"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-amber-300/10 blur-3xl" />

                <div className="flex items-center gap-2.5">
                    <Sparkles className="h-5 w-5 text-cyan-700" />
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Organization</p>
                        <h3 className={`font-display font-semibold text-slate-900 ${isCompact ? 'text-lg' : 'text-xl'}`}>Hierarchy summary</h3>
                    </div>
                </div>

                <div className={`mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ${isCompact ? 'gap-2.5' : 'gap-3'}`}>
                    {hierarchy.map((group, index) => (
                        <div
                            key={group.roleGroup}
                            className={`rounded-2xl border border-white/50 bg-white/50 ${isCompact ? 'px-3 py-2.5' : 'px-4 py-3.5'}`}
                            data-aos="fade-up"
                            data-aos-delay={Math.min(30 + (index * 24), 230)}
                            data-aos-duration="360"
                            data-aos-once="false"
                            data-aos-anchor-placement="top-bottom"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="font-semibold text-slate-900">{group.roleGroup}</p>
                                <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700">{group.total}</span>
                            </div>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                {group.members.slice(0, 4).map((member) => (
                                    <span
                                        key={member._id}
                                        className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-xs text-slate-700"
                                    >
                                        {member.fullName}
                                    </span>
                                ))}
                                {group.total > 4 && (
                                    <span className="rounded-full border border-white/50 bg-white/40 px-2.5 py-1 text-xs text-slate-500">
                                        +{group.total - 4} more
                                    </span>
                                )}
                            </div>
                            <div className={`mt-3 h-1.5 rounded-full bg-gradient-to-r ${roleAccent[group.roleGroup] || roleAccent.Others}`} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SchoolOverviewPage;
