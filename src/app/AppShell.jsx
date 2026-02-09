import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LayoutDashboard, Users, School2 } from 'lucide-react';
import FloatingBar from '../components/FloatingBar';
import { isRouteActive } from '../utils/navigation';

const EnhancedThreeBackdrop = lazy(() => import('./EnhancedThreeBackdrop'));

const navigation = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard
    },
    {
        label: 'Employees',
        path: '/employees',
        icon: Users
    }
];

const AppShell = () => {
    const location = useLocation();
    const shouldReduceMotion = useReducedMotion();
    const shellRef = useRef(null);
    const now = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date());

    useEffect(() => {
        const el = shellRef.current;
        if (!el) return;

        let raf = null;
        const onMove = (event) => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                el.style.setProperty('--lava-x', `${Math.max(0, Math.min(100, x)).toFixed(2)}%`);
                el.style.setProperty('--lava-y', `${Math.max(0, Math.min(100, y)).toFixed(2)}%`);
                raf = null;
            });
        };

        el.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            el.removeEventListener('pointermove', onMove);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div ref={shellRef} className="app-background min-h-screen">
            <Suspense fallback={null}>
                <EnhancedThreeBackdrop />
            </Suspense>
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="orb orb-c" />

            <div className="lava-field" aria-hidden="true">
                <div className="lava-blob lava-blob-a" />
                <div className="lava-blob lava-blob-b" />
                <div className="lava-blob lava-blob-c" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-5 px-4 py-5 lg:flex-row lg:px-8 lg:py-7">
                <aside className="glass-surface ios-sidebar-shell w-full rounded-3xl p-5 lg:sticky lg:top-7 lg:h-[calc(100vh-3.5rem)] lg:max-w-[300px]">
                    <div className="ios-sidebar-head flex items-center gap-3">
                        <div className="ios-sidebar-logo-chip flex h-11 w-11 items-center justify-center rounded-2xl text-white">
                            <School2 className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">School Data</p>
                            <h1 className="font-display text-lg font-semibold text-slate-900">Insight Board</h1>
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = isRouteActive(location.pathname, item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`ios-sidebar-nav-link ${active ? 'active' : ''}`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="ios-sidebar-focus mt-8 rounded-2xl p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Focus</p>
                        <p className="mt-2 font-display text-lg text-slate-900">Visual staffing map</p>
                        <p className="mt-2 text-sm text-slate-600">
                            Track directors, head units, staff, teachers, and supporting teams.
                        </p>
                    </div>
                </aside>

                <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col gap-5">
                    <header className="glass-surface rounded-3xl px-5 py-4 lg:px-7 lg:py-5">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">School Dashboard</p>
                                <h2 className="font-display text-2xl font-semibold text-slate-900 lg:text-3xl">
                                    School records that are easy to read
                                </h2>
                            </div>
                            <p className="rounded-2xl border border-white/60 bg-white/50 px-4 py-2 text-sm text-slate-600">
                                {now}
                            </p>
                        </div>
                    </header>

                    <main className="pb-24 lg:pb-6">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={location.pathname}
                                className="route-transition-layer"
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
                                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, filter: 'blur(3px)' }}
                                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            {/* Floating Button Bar */}
            <FloatingBar />
        </div>
    );
};

export default AppShell;
