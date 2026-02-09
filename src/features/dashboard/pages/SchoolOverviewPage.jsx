import React, { Suspense, lazy, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const RoleDistributionChart = lazy(() => import('../components/RoleDistributionChart'));
const EmploymentTypeChart = lazy(() => import('../components/EmploymentTypeChart'));
import { getEmployeesHierarchy, getSchoolOverview } from '../../../data/schoolData';
import { ScrollDepth3D } from '../../../components/ParallaxSection';
import { InteractiveKpiCard } from '../../../components/InteractiveCard';

const formatter = new Intl.NumberFormat('en-US');

const formatNumber = (value) => formatter.format(value || 0);

const roleAccent = {
    Director: 'from-cyan-600/85 to-sky-600/85',
    'Head Unit': 'from-sky-500/85 to-cyan-500/85',
    Staff: 'from-amber-500/85 to-orange-500/85',
    Teacher: 'from-blue-500/85 to-cyan-500/85',
    Others: 'from-slate-500/85 to-slate-600/85'
};

const SchoolOverviewPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const headerY = useTransform(scrollY, [0, 240], [0, shouldReduceMotion ? 0 : -12]);

    const overview = useMemo(() => getSchoolOverview(), []);
    const hierarchy = useMemo(() => getEmployeesHierarchy(), []);

    const fadeUp = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }
        }
    };

    const stagger = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08
            }
        }
    };

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
                label: 'Active Employees',
                value: formatNumber(source.activeEmployees),
                hint: 'Currently active',
                accent: 'from-blue-500/80 to-cyan-500/80'
            },
            {
                label: 'Teachers',
                value: formatNumber(source.teacherCount),
                hint: 'Teachers across departments',
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
        <div className="space-y-5">
            <ScrollDepth3D intensity={6} depth={8} drift={8} className="render-optimized">
                <motion.section
                    className="glass-surface rounded-3xl p-5 md:p-6"
                    style={{ y: headerY }}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Snapshot</p>
                            <h3 className="font-display text-2xl font-semibold text-slate-900">
                                A visual map of school workforce data
                            </h3>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                This summary highlights staff composition, unit distribution, and the organizational hierarchy to speed up leadership insight.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-700">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Demo Mode</p>
                            <p className="mt-1 font-medium">{formatNumber(overview?.metrics?.totalEmployees)} employees recorded</p>
                            <p className="text-xs text-slate-500">Updated as of February 2026</p>
                        </div>
                    </div>
                </motion.section>
            </ScrollDepth3D>

            <ScrollDepth3D intensity={7} depth={10} drift={-10} className="render-optimized">
                <motion.section
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {metrics.map((item, index) => (
                        <motion.div key={item.label} variants={fadeUp}>
                            <InteractiveKpiCard
                                label={item.label}
                                value={item.value}
                                hint={item.hint}
                                accent={item.accent}
                                delay={index * 0.1}
                            />
                        </motion.div>
                    ))}
                </motion.section>
            </ScrollDepth3D>

            <ScrollDepth3D intensity={7} depth={10} drift={12} className="render-optimized">
                <motion.section
                    className="grid grid-cols-1 gap-5 xl:grid-cols-2"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.div variants={fadeUp}>
                        <Suspense fallback={<section className="glass-surface rounded-3xl p-5 h-[280px]" />}>
                            <RoleDistributionChart data={overview?.byRole || []} />
                        </Suspense>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                        <Suspense fallback={<section className="glass-surface rounded-3xl p-5 h-[280px]" />}>
                            <EmploymentTypeChart data={overview?.byEmploymentType || []} />
                        </Suspense>
                    </motion.div>
                </motion.section>
            </ScrollDepth3D>

            <ScrollDepth3D intensity={8} depth={12} drift={14} className="render-optimized">
                <motion.section
                    className="grid grid-cols-1 gap-5 xl:grid-cols-2"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.article className="glass-surface rounded-3xl p-5" variants={fadeUp}>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Unit Coverage</p>
                        <h3 className="font-display text-xl font-semibold text-slate-900">Unit distribution</h3>
                        <div className="mt-4 space-y-2">
                            {(overview?.byUnit || []).map((unit) => (
                                <div
                                    key={unit._id}
                                    className="flex items-center justify-between rounded-xl border border-white/50 bg-white/50 px-3 py-2"
                                >
                                    <span className="text-sm text-slate-700">{unit._id}</span>
                                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-800">
                                        {unit.count} people
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.article>

                    <motion.article className="glass-surface rounded-3xl p-5" variants={fadeUp}>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-cyan-700" />
                            <h3 className="font-display text-xl font-semibold text-slate-900">Hierarchy summary</h3>
                        </div>
                        <div className="mt-4 space-y-3">
                            {hierarchy.map((group) => (
                                <div
                                    key={group.roleGroup}
                                    className="rounded-2xl border border-white/50 bg-white/50 px-4 py-3"
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
                    </motion.article>
                </motion.section>
            </ScrollDepth3D>
        </div>
    );
};

export default SchoolOverviewPage;
