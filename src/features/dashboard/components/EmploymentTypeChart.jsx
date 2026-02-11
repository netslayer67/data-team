import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BadgeCheck, Cake, CalendarDays, PartyPopper, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const CONFETTI_COLORS = ['#22d3ee', '#38bdf8', '#818cf8', '#f59e0b', '#34d399', '#f472b6'];

const normalizeMoments = (data) => ({
    birthdayTodayCount: Number(data?.birthdayTodayCount || 0),
    upcomingBirthdaysCount: Number(data?.upcomingBirthdaysCount || 0),
    workAnniversaryTodayCount: Number(data?.workAnniversaryTodayCount || 0),
    birthdaysToday: Array.isArray(data?.birthdaysToday) ? data.birthdaysToday : [],
    upcomingBirthdays: Array.isArray(data?.upcomingBirthdays) ? data.upcomingBirthdays : [],
    workAnniversaryToday: Array.isArray(data?.workAnniversaryToday) ? data.workAnniversaryToday : []
});

const ConfettiBurst = ({ burst }) => (
    <>
        {burst.particles.map((particle) => (
            <motion.span
                key={particle.id}
                className="pointer-events-none absolute rounded-full"
                style={{
                    left: `${burst.x}%`,
                    top: `${burst.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.color
                }}
                initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.8 }}
                animate={{
                    opacity: [0, 1, 0],
                    x: particle.dx,
                    y: particle.dy,
                    rotate: particle.rotate,
                    scale: [0.8, 1, 0.75]
                }}
                transition={{
                    duration: particle.duration,
                    ease: 'easeOut',
                    delay: particle.delay
                }}
            />
        ))}
    </>
);

const EmptyState = ({ label }) => (
    <p className="rounded-xl border border-white/60 bg-white/40 px-3 py-2 text-sm text-slate-500">{label}</p>
);

const EmploymentTypeChart = ({ data, density = 'comfortable' }) => {
    const shouldReduceMotion = useReducedMotion();
    const [bursts, setBursts] = useState([]);
    const timerRef = useRef([]);
    const moments = useMemo(() => normalizeMoments(data), [data]);
    const totalMoments = moments.birthdayTodayCount + moments.upcomingBirthdaysCount + moments.workAnniversaryTodayCount;
    const nextBirthday = moments.upcomingBirthdays[0] || null;
    const isCompact = density === 'compact';

    const spawnConfetti = useCallback((x = 78, y = 18) => {
        if (shouldReduceMotion) return;

        const burstId = `burst-${Date.now()}-${Math.round(Math.random() * 10000)}`;
        const particles = Array.from({ length: 14 }, (_, index) => ({
            id: `${burstId}-${index}`,
            dx: Math.round((Math.random() * 90 - 45) * 1.1),
            dy: Math.round(-20 - (Math.random() * 70)),
            rotate: Math.round(Math.random() * 360),
            size: Math.round(4 + (Math.random() * 5)),
            delay: Math.random() * 0.12,
            duration: 0.65 + (Math.random() * 0.45),
            color: CONFETTI_COLORS[index % CONFETTI_COLORS.length]
        }));

        setBursts((prev) => [...prev.slice(-2), { id: burstId, x, y, particles }]);
        const timer = window.setTimeout(() => {
            setBursts((prev) => prev.filter((item) => item.id !== burstId));
        }, 1500);
        timerRef.current.push(timer);
    }, [shouldReduceMotion]);

    useEffect(() => {
        if (moments.birthdayTodayCount > 0) {
            spawnConfetti(82, 18);
        }
    }, [moments.birthdayTodayCount, spawnConfetti]);

    useEffect(() => () => {
        timerRef.current.forEach((timer) => window.clearTimeout(timer));
        timerRef.current = [];
    }, []);

    return (
        <section className={`glass-surface relative overflow-hidden rounded-[28px] ${isCompact ? 'p-4 md:p-5' : 'p-5 md:p-6'}`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_52%)]" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-300/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-14 left-4 h-36 w-36 rounded-full bg-fuchsia-300/15 blur-2xl" />

            <div className="relative z-10">
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">People Moments</p>
                        <h3 className={`font-display font-semibold text-slate-900 ${isCompact ? 'text-lg' : 'text-xl'}`}>Celebrations at a glance</h3>
                        {nextBirthday && (
                            <p className="mt-1 text-xs text-slate-600 break-words">
                                Next up: <span className="font-medium text-slate-800">{nextBirthday.fullName}</span> in {nextBirthday.daysUntil}{' '}
                                {nextBirthday.daysUntil === 1 ? 'day' : 'days'}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="rounded-xl border border-white/60 bg-white/55 px-3 py-1.5 text-xs text-slate-600">
                            Total events: <span className="font-semibold text-slate-900">{totalMoments}</span>
                        </div>
                        <motion.button
                            type="button"
                            onClick={() => spawnConfetti(84, 16)}
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/70 text-amber-500 transition hover:bg-white"
                        >
                            <PartyPopper className="h-4 w-4" />
                        </motion.button>
                    </div>
                </div>

                <div className={`grid grid-cols-1 gap-3 md:grid-cols-3 ${isCompact ? 'mt-4' : 'mt-5'}`}>
                    <motion.button
                        type="button"
                        className={`rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50/85 to-rose-50/80 text-left shadow-[0_10px_24px_rgba(245,158,11,0.08)] ${isCompact ? 'p-2.5' : 'p-3'}`}
                        onMouseEnter={() => spawnConfetti(76, 26)}
                        whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.12em] text-amber-700 break-words">Birthday Today</p>
                        <p className={`mt-1 font-semibold leading-none text-slate-900 ${isCompact ? 'text-[26px]' : 'text-[30px]'}`}>{moments.birthdayTodayCount}</p>
                    </motion.button>

                    <motion.button
                        type="button"
                        className={`rounded-2xl border border-cyan-200/70 bg-gradient-to-r from-cyan-50/85 to-sky-50/80 text-left shadow-[0_10px_24px_rgba(14,165,233,0.08)] ${isCompact ? 'p-2.5' : 'p-3'}`}
                        onMouseEnter={() => spawnConfetti(50, 26)}
                        whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.12em] text-cyan-700 break-words">Upcoming (7 Days)</p>
                        <p className={`mt-1 font-semibold leading-none text-slate-900 ${isCompact ? 'text-[26px]' : 'text-[30px]'}`}>{moments.upcomingBirthdaysCount}</p>
                    </motion.button>

                    <motion.button
                        type="button"
                        className={`rounded-2xl border border-emerald-200/70 bg-gradient-to-r from-emerald-50/85 to-teal-50/80 text-left shadow-[0_10px_24px_rgba(16,185,129,0.08)] ${isCompact ? 'p-2.5' : 'p-3'}`}
                        onMouseEnter={() => spawnConfetti(22, 26)}
                        whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-700 break-words">Anniversary Today</p>
                        <p className={`mt-1 font-semibold leading-none text-slate-900 ${isCompact ? 'text-[26px]' : 'text-[30px]'}`}>{moments.workAnniversaryTodayCount}</p>
                    </motion.button>
                </div>

                <div className={`grid grid-cols-1 gap-4 2xl:grid-cols-[1.4fr_1fr] ${isCompact ? 'mt-4' : 'mt-5'}`}>
                    <article className={`rounded-2xl border border-white/60 bg-white/50 ${isCompact ? 'p-3' : 'p-3.5'}`}>
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <h4 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <Cake className="h-4 w-4 text-amber-600" />
                                Birthdays
                            </h4>
                            <span className="rounded-full border border-white/70 bg-white/75 px-2 py-0.5 text-[11px] text-slate-500">
                                today {moments.birthdaysToday.length} · next {moments.upcomingBirthdays.length}
                            </span>
                        </div>
                        <div className="space-y-2.5">
                            {moments.birthdaysToday.length > 0 ? moments.birthdaysToday.map((item) => (
                                <div key={item._id} className="rounded-xl border border-white/60 bg-white/60 px-3 py-2">
                                    <p className="text-sm font-medium text-slate-800">{item.fullName}</p>
                                    <p className="text-xs text-slate-500">{item.roleTitle} · {item.unit}</p>
                                </div>
                            )) : <EmptyState label="No birthdays today." />}
                        </div>
                        <div className="my-3 h-px bg-white/70" />
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <CalendarDays className="h-4 w-4 text-cyan-600" />
                            Upcoming in 7 Days
                        </div>
                        <div className={`space-y-2 overflow-auto pr-1 ${isCompact ? 'max-h-[158px]' : 'max-h-[176px]'}`}>
                            {moments.upcomingBirthdays.length > 0 ? moments.upcomingBirthdays.map((item) => (
                                <div key={item._id} className={`flex items-center justify-between gap-2 rounded-xl border border-white/60 bg-white/60 ${isCompact ? 'px-2.5 py-1.5' : 'px-3 py-2'}`}>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium leading-snug text-slate-800 break-words">{item.fullName}</p>
                                        <p className="text-xs text-slate-500">{item.dateLabel}</p>
                                    </div>
                                    <span className="shrink-0 rounded-full border border-cyan-200/70 bg-cyan-50/70 px-2 py-1 text-[11px] font-medium text-cyan-700">
                                        {item.daysUntil} {item.daysUntil === 1 ? 'day' : 'days'}
                                    </span>
                                </div>
                            )) : <EmptyState label="No upcoming birthdays in the next 7 days." />}
                        </div>
                    </article>

                    <article className={`self-start rounded-2xl border border-white/60 bg-white/50 ${isCompact ? 'p-3' : 'p-3.5'}`}>
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <h4 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <BadgeCheck className="h-4 w-4 text-emerald-600" />
                                Work Anniversary
                            </h4>
                            <span className="rounded-full border border-white/70 bg-white/75 px-2 py-0.5 text-[11px] text-slate-500">
                                {moments.workAnniversaryToday.length} today
                            </span>
                        </div>
                        <div className="space-y-2.5">
                            {moments.workAnniversaryToday.length > 0 ? moments.workAnniversaryToday.map((item) => (
                                <div key={item._id} className={`rounded-xl border border-white/60 bg-white/60 ${isCompact ? 'px-2.5 py-1.5' : 'px-3 py-2'}`}>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="min-w-0 text-sm font-medium leading-snug text-slate-800 break-words">{item.fullName}</p>
                                        <span className="shrink-0 rounded-full border border-emerald-200/70 bg-emerald-50/75 px-2 py-1 text-[11px] font-medium text-emerald-700">
                                            {item.years} {item.years === 1 ? 'yr' : 'yrs'}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-xs text-slate-500">{item.roleTitle} · {item.unit}</p>
                                </div>
                            )) : <EmptyState label="No work anniversaries today." />}
                        </div>
                    </article>
                </div>
            </div>

            {bursts.map((burst) => (
                <ConfettiBurst key={burst.id} burst={burst} />
            ))}

            <motion.div
                className="pointer-events-none absolute right-5 top-5 rounded-full border border-white/70 bg-white/70 p-2 text-amber-500"
                animate={shouldReduceMotion ? undefined : { rotate: [0, -8, 8, 0], y: [0, -2, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Sparkles className="h-4 w-4" />
            </motion.div>
        </section>
    );
};

export default React.memo(EmploymentTypeChart);
