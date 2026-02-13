import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CloudSun, LayoutDashboard, Users, School2 } from 'lucide-react';
import FloatingBar from '../components/FloatingBar';
import { isRouteActive } from '../utils/navigation';
import { initAOS, queueAOSRefresh } from '../utils/aos';

const EnhancedThreeBackdrop = lazy(() => import('./EnhancedThreeBackdrop'));

const WEATHER_CODE_LABEL = {
    0: 'Clear',
    1: 'Mostly clear',
    2: 'Partly cloudy',
    3: 'Cloudy',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    56: 'Freezing drizzle',
    57: 'Freezing drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    66: 'Freezing rain',
    67: 'Freezing rain',
    71: 'Light snow',
    73: 'Snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Heavy showers',
    85: 'Snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm',
    99: 'Thunderstorm'
};

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
    const [weather, setWeather] = useState({ loading: true, temp: null, label: 'Checking weather' });
    const now = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date());

    useEffect(() => {
        let active = true;

        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current=temperature_2m,weather_code&timezone=Asia%2FJakarta'
                );
                if (!response.ok) throw new Error('Failed to fetch weather');

                const payload = await response.json();
                const current = payload?.current || {};
                const temp = Number.isFinite(current.temperature_2m) ? Math.round(current.temperature_2m) : null;
                const label = WEATHER_CODE_LABEL[current.weather_code] || 'Weather';

                if (active) {
                    setWeather({ loading: false, temp, label });
                }
            } catch (_error) {
                if (active) {
                    setWeather({ loading: false, temp: null, label: 'Weather unavailable' });
                }
            }
        };

        fetchWeather();
        const timer = window.setInterval(fetchWeather, 30 * 60 * 1000);

        return () => {
            active = false;
            window.clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        initAOS();
        const stop = queueAOSRefresh({ hard: true, delay: 28 });
        return stop;
    }, []);

    useEffect(() => {
        const stopHard = queueAOSRefresh({ hard: true, delay: 56 });
        const stopSoft = queueAOSRefresh({ hard: false, delay: 200 });
        const stopLazy = queueAOSRefresh({ hard: true, delay: 500 });
        return () => {
            stopHard();
            stopSoft();
            stopLazy();
        };
    }, [location.pathname]);

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

    const isDetailPage = /^\/employees\/.+/.test(location.pathname);

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

            <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-4 py-5 lg:flex-row lg:px-8 lg:py-7">
                {!isDetailPage && (
                    <aside
                        className="glass-surface ios-sidebar-shell w-full rounded-3xl p-5 lg:sticky lg:top-7 lg:w-[272px] lg:max-w-[272px] lg:self-start"
                        data-aos="fade-right"
                        data-aos-duration="420"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-bottom"
                    >
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
                )}

                <div className="flex flex-1 flex-col gap-6">
                    <header
                        className="glass-surface rounded-3xl px-5 py-4 lg:px-7 lg:py-5"
                        data-aos="fade-down"
                        data-aos-duration="400"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-bottom"
                    >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">School Dashboard</p>
                                <h2 className="font-display text-2xl font-semibold text-slate-900 lg:text-3xl">
                                    School records that are easy to read
                                </h2>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/50 px-4 py-2 text-sm text-slate-600">
                                    <CloudSun className="h-4 w-4 text-cyan-600" />
                                    {weather.loading ? 'Weather: loading...' : `Jakarta · ${weather.temp ?? '--'}°C · ${weather.label}`}
                                </p>
                                <p className="rounded-2xl border border-white/60 bg-white/50 px-4 py-2 text-sm text-slate-600">
                                    {now}
                                </p>
                            </div>
                        </div>
                    </header>

                    <main className="pb-24 lg:pb-6">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={location.pathname}
                                className="route-transition-layer"
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
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
