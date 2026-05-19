import React, { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CloudSun, LayoutDashboard, Users, School2 } from 'lucide-react';
import FloatingBar from '../components/FloatingBar';
import { isRouteActive } from '../utils/navigation';
import { initAOS, queueAOSRefresh } from '../utils/aos';
import { getEmployeeById } from '../data/schoolData';

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
        const stopRefresh = queueAOSRefresh({ hard: true, delay: 150 });
        return () => {
            stopRefresh();
        };
    }, []);

    useEffect(() => {
        // Wave 1: after AnimatePresence exit finishes (transition duration ~240ms)
        // Wave 2: safety net for lazy-loaded chunks that resolve after transition
        const stopA = queueAOSRefresh({ hard: true, delay: 300 });
        const stopB = queueAOSRefresh({ hard: true, delay: 650 });
        return () => {
            stopA();
            stopB();
        };
    }, [location.pathname]);

    const isDetailPage = /^\/employees\/.+/.test(location.pathname);

    const currentEmployee = useMemo(() => {
        if (!isDetailPage) return null;
        const employeeId = location.pathname.split('/employees/')[1];
        return employeeId ? getEmployeeById(employeeId) : null;
    }, [isDetailPage, location.pathname]);

    const routeMeta = useMemo(() => {
        if (isDetailPage) {
            if (currentEmployee) {
                return {
                    eyebrow: `${currentEmployee.roleGroup} · ${currentEmployee.unit}`,
                    title: currentEmployee.fullName,
                    summary: currentEmployee.roleTitle,
                    accent: 'from-amber-400/30 via-rose-300/20 to-transparent'
                };
            }
            return {
                eyebrow: 'Employee Profile',
                title: 'Team Member',
                summary: '',
                accent: 'from-amber-400/30 via-rose-300/20 to-transparent'
            };
        }

        if (location.pathname.startsWith('/employees')) {
            return {
                eyebrow: 'Directory Atlas',
                title: 'Scan the roster faster with lighter cards and clearer grouping',
                summary: 'Move through the team by hierarchy, filter quickly, and browse without the old list fatigue.',
                accent: 'from-cyan-400/30 via-sky-300/18 to-transparent'
            };
        }

        return {
            eyebrow: 'Dashboard Pulse',
            title: 'School records in a brighter command center',
            summary: 'High-level staffing patterns, unit coverage, and hierarchy cues now sit inside a more colorful frame.',
            accent: 'from-violet-400/28 via-cyan-300/18 to-transparent'
        };
    }, [isDetailPage, currentEmployee, location.pathname]);

    return (
        <div className="app-background min-h-screen">
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="orb orb-c" />

            <div className="lava-field" aria-hidden="true">
                <div className="lava-blob lava-blob-a" />
                <div className="lava-blob lava-blob-b" />
                <div className="lava-blob lava-blob-c" />
            </div>

            <div className="app-noise-layer" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 py-5 lg:px-7 lg:py-8">
                <div className={`app-shell-grid ${isDetailPage ? 'is-detail' : ''}`}>
                    {!isDetailPage && (
                        <aside
                            className="glass-surface ios-sidebar-shell app-sidebar-panel w-full rounded-[34px] p-5 lg:sticky lg:top-7 lg:w-[292px] lg:max-w-[292px] lg:self-start"
                            data-aos="fade-right"
                            data-aos-duration="420"
                            data-aos-once="true"
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

                            {/* <div className="ios-sidebar-focus mt-8 rounded-[28px] p-4">
                                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Workspace Note</p>
                                <p className="mt-2 font-display text-lg text-slate-900">Fresh, brighter, lighter</p>
                                <p className="mt-2 text-sm text-slate-600">
                                    The new shell keeps the colorful atmosphere while cutting back on visual weight where it hurts scroll and hover.
                                </p>
                            </div> */}

                            {/* <div className="sidebar-pulse-grid mt-4">
                                <div className="sidebar-pulse-card sidebar-pulse-card-cyan">
                                    <p className="sidebar-pulse-kicker">Directory</p>
                                    <p className="sidebar-pulse-value">24-card pages</p>
                                    <p className="sidebar-pulse-copy">Lighter browsing rhythm</p>
                                </div>
                                <div className="sidebar-pulse-card sidebar-pulse-card-rose">
                                    <p className="sidebar-pulse-kicker">Motion</p>
                                    <p className="sidebar-pulse-value">Reduced AOS loops</p>
                                    <p className="sidebar-pulse-copy">Calmer transitions on key views</p>
                                </div>
                            </div> */}
                        </aside>
                    )}

                    <div className="app-main-column flex flex-1 flex-col gap-6">
                        <header
                            className="glass-surface app-topbar rounded-[34px] px-5 py-5 lg:px-7 lg:py-6"
                            data-aos="fade-down"
                            data-aos-duration="400"
                            data-aos-once="true"
                            data-aos-anchor-placement="top-bottom"
                        >
                            <div className={`app-topbar-accent bg-gradient-to-r ${routeMeta.accent}`} />
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                                <div className="max-w-3xl">
                                    <p className="section-kicker">{routeMeta.eyebrow}</p>
                                    <h2 className="font-display text-2xl font-semibold text-slate-900 lg:text-[2.15rem] lg:leading-tight">
                                        {routeMeta.title}
                                    </h2>
                                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                                        {routeMeta.summary}
                                    </p>
                                </div>

                                <div className="grid gap-2 sm:grid-cols-2 xl:w-[440px]">
                                    <p className="app-topbar-pill app-topbar-pill-cyan">
                                        <CloudSun className="h-4 w-4 text-cyan-600" />
                                        {weather.loading ? 'Weather: loading...' : `Jakarta · ${weather.temp ?? '--'}°C · ${weather.label}`}
                                    </p>
                                    <p className="app-topbar-pill app-topbar-pill-violet">
                                        {now}
                                    </p>
                                    <p className="app-topbar-pill app-topbar-pill-amber sm:col-span-2">
                                        {isDetailPage ? 'Profile route' : location.pathname.startsWith('/employees') ? 'Directory route' : 'Overview route'}
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
            </div>

            {/* Floating Button Bar */}
            <FloatingBar />
        </div>
    );
};

export default AppShell;
