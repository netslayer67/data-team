import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion';
import { Home, Users, Settings, Bell, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isRouteActive } from '../utils/navigation';

/**
 * iOS-style Floating Button Bar
 * Authentic iOS design with liquid glass effect and smooth animations
 */
const FloatingBar = () => {
    const shouldReduceMotion = useReducedMotion();
    const [isVisible, setIsVisible] = useState(true);
    const [activeAction, setActiveAction] = useState(null);
    const [pressedItem, setPressedItem] = useState(null);
    const [touchRipple, setTouchRipple] = useState(null);
    const [isCoarsePointer, setIsCoarsePointer] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const lastScrollYRef = useRef(0);
    const tickingRef = useRef(false);
    const actionTimerRef = useRef(null);
    const touchRippleTimerRef = useRef(null);
    const barRef = useRef(null);
    const barMoveRafRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const mediaQuery = window.matchMedia('(pointer: coarse)');
        const updatePointerType = () => setIsCoarsePointer(mediaQuery.matches);
        updatePointerType();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', updatePointerType);
            return () => mediaQuery.removeEventListener('change', updatePointerType);
        }

        mediaQuery.addListener(updatePointerType);
        return () => mediaQuery.removeListener(updatePointerType);
    }, []);

    useEffect(() => () => {
        if (actionTimerRef.current) {
            window.clearTimeout(actionTimerRef.current);
        }
        if (touchRippleTimerRef.current) {
            window.clearTimeout(touchRippleTimerRef.current);
        }
        if (barMoveRafRef.current) {
            cancelAnimationFrame(barMoveRafRef.current);
        }
    }, []);

    useEffect(() => {
        const updateVisibility = () => {
            const currentScrollY = window.scrollY;
            const delta = Math.abs(currentScrollY - lastScrollYRef.current);
            const scrollingDown = currentScrollY > lastScrollYRef.current;

            if (currentScrollY <= 56) {
                setIsVisible(true);
            } else if (delta > 6) {
                setIsVisible(!scrollingDown);
            }

            lastScrollYRef.current = currentScrollY;
            tickingRef.current = false;
        };

        const handleScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true;
                window.requestAnimationFrame(updateVisibility);
            }
        };

        updateVisibility();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const triggerAction = useCallback((id) => {
        if (actionTimerRef.current) {
            window.clearTimeout(actionTimerRef.current);
        }
        setActiveAction(id);
        actionTimerRef.current = window.setTimeout(() => {
            setActiveAction(null);
        }, 1000);
    }, []);

    const navItems = useMemo(() => [
        { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
        { id: 'employees', icon: Users, label: 'Employees', path: '/employees' },
        {
            id: 'search',
            icon: Search,
            label: 'Search',
            action: () => {
                triggerAction('search');
                const searchableElement = document.querySelector('input[type="text"], input[type="search"]');
                if (searchableElement) {
                    searchableElement.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'center' });
                    searchableElement.focus({ preventScroll: true });
                }
            }
        },
        {
            id: 'notifications',
            icon: Bell,
            label: 'Notifications',
            action: () => {
                triggerAction('notifications');
                window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
            }
        },
        {
            id: 'settings',
            icon: Settings,
            label: 'Settings',
            action: () => {
                triggerAction('settings');
                window.scrollTo({ top: document.body.scrollHeight, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
            }
        }
    ], [shouldReduceMotion, triggerAction]);

    const handleNavClick = useCallback((item) => {
        if (item.path) {
            navigate(item.path);
        } else if (item.action) {
            item.action();
        }
    }, [navigate]);

    const handlePointerDown = useCallback((event, itemId) => {
        if (!isCoarsePointer || shouldReduceMotion) return;
        setPressedItem(itemId);

        const bounds = event.currentTarget.getBoundingClientRect();
        const rippleId = Date.now();
        setTouchRipple({
            id: rippleId,
            itemId,
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top
        });

        if (touchRippleTimerRef.current) {
            window.clearTimeout(touchRippleTimerRef.current);
        }

        touchRippleTimerRef.current = window.setTimeout(() => {
            setTouchRipple((prev) => (prev?.id === rippleId ? null : prev));
        }, 460);
    }, [isCoarsePointer, shouldReduceMotion]);

    const handlePointerUp = useCallback(() => {
        if (isCoarsePointer) {
            setPressedItem(null);
        }
    }, [isCoarsePointer]);

    const handleBarPointerMove = useCallback((event) => {
        if (isCoarsePointer || shouldReduceMotion || !barRef.current) return;
        if (barMoveRafRef.current) return;

        barMoveRafRef.current = requestAnimationFrame(() => {
            const rect = barRef.current.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            barRef.current.style.setProperty('--bar-x', `${Math.max(0, Math.min(100, x)).toFixed(2)}%`);
            barRef.current.style.setProperty('--bar-y', `${Math.max(0, Math.min(100, y)).toFixed(2)}%`);
            barMoveRafRef.current = null;
        });
    }, [isCoarsePointer, shouldReduceMotion]);

    const barVariants = {
        hidden: {
            y: 100,
            opacity: 0,
            scale: 0.9
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: shouldReduceMotion ? 0 : undefined,
                type: 'spring',
                stiffness: 260,
                damping: 24,
                mass: 0.85
            }
        }
    };

    const itemVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: shouldReduceMotion ? 0 : i * 0.04,
                duration: shouldReduceMotion ? 0 : undefined,
                type: 'spring',
                stiffness: 360,
                damping: 22
            }
        })
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    className="fixed inset-x-0 z-[1000] flex justify-center px-3"
                    variants={barVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{ bottom: 'max(16px, env(safe-area-inset-bottom))', pointerEvents: 'none' }}
                >
                    <div
                        ref={barRef}
                        className={`ios-floating-bar ${activeAction ? 'ios-floating-bar-morph' : ''}`}
                        onPointerMove={handleBarPointerMove}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <LayoutGroup id="floating-bar-active">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = isRouteActive(location.pathname, item.path) || activeAction === item.id;

                                return (
                                    <motion.button
                                        key={item.id}
                                        className={`ios-icon-button group ${pressedItem === item.id ? 'ios-icon-button-touch-active' : ''}`}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        custom={index}
                                        aria-label={item.label}
                                        onClick={() => handleNavClick(item)}
                                        onPointerDown={(event) => handlePointerDown(event, item.id)}
                                        onPointerUp={handlePointerUp}
                                        onPointerCancel={handlePointerUp}
                                        whileHover={shouldReduceMotion || isCoarsePointer ? undefined : { scale: 1.08 }}
                                        whileTap={shouldReduceMotion ? undefined : { scale: isCoarsePointer ? 0.93 : 0.95 }}
                                        style={{
                                            position: 'relative',
                                            WebkitTapHighlightColor: 'transparent',
                                            touchAction: 'manipulation',
                                            '--dock-i': index
                                        }}
                                    >
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-xl"
                                                layoutId="floating-active-indicator"
                                                transition={{
                                                    duration: shouldReduceMotion ? 0 : undefined,
                                                    type: 'spring',
                                                    stiffness: 420,
                                                    damping: 28
                                                }}
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.28), rgba(14, 165, 233, 0.22))',
                                                    border: '1px solid rgba(125, 211, 252, 0.45)',
                                                    boxShadow: '0 8px 22px rgba(14, 165, 233, 0.24), inset 0 1px 0 rgba(255,255,255,0.55)'
                                                }}
                                            />
                                        )}

                                        {touchRipple?.itemId === item.id && (
                                            <motion.div
                                                key={touchRipple.id}
                                                className="pointer-events-none absolute z-10 rounded-full"
                                                initial={{ scale: 0, opacity: 0.45 }}
                                                animate={{ scale: 5.2, opacity: 0 }}
                                                transition={{ duration: 0.45, ease: 'easeOut' }}
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    left: touchRipple.x - 5,
                                                    top: touchRipple.y - 5,
                                                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.75), rgba(125, 211, 252, 0.22), rgba(255, 255, 255, 0))'
                                                }}
                                            />
                                        )}

                                        <Icon
                                            className="relative z-10"
                                            size={20}
                                            style={{
                                                color: pressedItem === item.id
                                                    ? '#075985'
                                                    : isActive
                                                        ? '#0369a1'
                                                        : '#334155',
                                                filter: isActive ? 'drop-shadow(0 2px 8px rgba(14,165,233,0.35))' : 'none',
                                                transition: 'color 0.2s ease, filter 0.25s ease'
                                            }}
                                        />

                                        <div className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-lg bg-slate-800 px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100 md:block">
                                            {item.label}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </LayoutGroup>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default FloatingBar;
