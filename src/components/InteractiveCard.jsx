import React, { useEffect, useRef, useState } from 'react';
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion
} from 'framer-motion';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Interactive Card with iOS-style Liquid Glass Effect
 * Features 3D tilt, magnetic effect, and liquid animations
 */
export const InteractiveCard = ({
    children,
    className = '',
    accent = 'from-cyan-500/80 to-sky-500/80',
    onClick,
    delay = 0,
    onHoverChange,
    forceVisible = false
}) => {
    const shouldReduceMotion = useReducedMotion();
    const cardRef = useRef(null);
    const frameRef = useRef(null);
    const pointerRef = useRef({ x: 0, y: 0 });
    const touchRippleTimerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isCoarsePointer, setIsCoarsePointer] = useState(false);
    const [touchRipple, setTouchRipple] = useState(null);

    const pointerX = useMotionValue(50);
    const pointerY = useMotionValue(50);
    const offsetX = useMotionValue(0);
    const offsetY = useMotionValue(0);
    const has3dInteraction = !shouldReduceMotion && !isCoarsePointer;

    const springConfig = { damping: 26, stiffness: 340, mass: 0.56 };
    const rotateX = useSpring(useTransform(offsetY, [-1, 1], [11, -11]), springConfig);
    const rotateY = useSpring(useTransform(offsetX, [-1, 1], [-11, 11]), springConfig);
    const magneticX = useSpring(useTransform(offsetX, [-1, 1], [-8, 8]), springConfig);
    const magneticY = useSpring(useTransform(offsetY, [-1, 1], [-8, 8]), springConfig);
    const contentX = useSpring(useTransform(offsetX, [-1, 1], [-4, 4]), springConfig);
    const contentY = useSpring(useTransform(offsetY, [-1, 1], [-4, 4]), springConfig);
    const sheenAngle = useTransform(offsetX, [-1, 1], [98, 142]);
    const shadowX = useTransform(offsetX, [-1, 1], [-16, 16]);
    const shadowY = useTransform(offsetY, [-1, 1], [-12, 20]);
    const shadowBlur = useTransform(offsetY, [-1, 1], [48, 78]);
    const liquidShine = useMotionTemplate`
        radial-gradient(
            circle at ${pointerX}% ${pointerY}%,
            rgba(255, 255, 255, 0.42) 0%,
            rgba(255, 255, 255, 0.2) 26%,
            rgba(186, 230, 253, 0.12) 42%,
            rgba(255, 255, 255, 0) 70%
        )
    `;
    const liquidCaustic = useMotionTemplate`
        conic-gradient(
            from ${sheenAngle}deg at ${pointerX}% ${pointerY}%,
            rgba(255, 255, 255, 0) 0deg,
            rgba(224, 242, 254, 0.36) 46deg,
            rgba(56, 189, 248, 0.18) 88deg,
            rgba(255, 255, 255, 0) 140deg
        )
    `;
    const dynamicShadow = useMotionTemplate`
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(8, 47, 73, 0.26),
        0 10px 26px rgba(14, 116, 144, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        inset 0 -1px 0 rgba(255, 255, 255, 0.24)
    `;

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
        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }
        if (touchRippleTimerRef.current) {
            clearTimeout(touchRippleTimerRef.current);
        }
    }, []);

    const getRelativeCoordinates = (clientX, clientY) => {
        if (!cardRef.current) return null;

        const rect = cardRef.current.getBoundingClientRect();
        const relativeX = clamp((clientX - rect.left) / rect.width, 0, 1);
        const relativeY = clamp((clientY - rect.top) / rect.height, 0, 1);

        return {
            relativeX,
            relativeY,
            localX: clientX - rect.left,
            localY: clientY - rect.top
        };
    };

    const updatePointer = (clientX, clientY) => {
        const coordinates = getRelativeCoordinates(clientX, clientY);
        if (!coordinates) return;

        pointerX.set(coordinates.relativeX * 100);
        pointerY.set(coordinates.relativeY * 100);
        offsetX.set((coordinates.relativeX - 0.5) * 2);
        offsetY.set((coordinates.relativeY - 0.5) * 2);
    };

    const flushPointerFrame = () => {
        frameRef.current = null;
        updatePointer(pointerRef.current.x, pointerRef.current.y);
    };

    const handlePointerMove = (event) => {
        if (!has3dInteraction) return;

        pointerRef.current = {
            x: event.clientX,
            y: event.clientY
        };

        if (!frameRef.current) {
            frameRef.current = requestAnimationFrame(flushPointerFrame);
        }
    };

    const handlePointerLeave = () => {
        onHoverChange?.(false);
        setIsHovered(false);
        setIsPressed(false);

        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }

        if (!has3dInteraction) return;

        pointerX.set(50);
        pointerY.set(50);
        offsetX.set(0);
        offsetY.set(0);
    };

    const handlePointerEnter = (event) => {
        onHoverChange?.(!isCoarsePointer);
        if (!isCoarsePointer) {
            setIsHovered(true);
        }

        if (!has3dInteraction) return;

        updatePointer(event.clientX, event.clientY);
    };

    const handlePointerDown = (event) => {
        if (!isCoarsePointer || shouldReduceMotion) return;
        setIsPressed(true);

        const coordinates = getRelativeCoordinates(event.clientX, event.clientY);
        if (!coordinates) return;

        pointerX.set(coordinates.relativeX * 100);
        pointerY.set(coordinates.relativeY * 100);

        const rippleId = Date.now();
        setTouchRipple({
            id: rippleId,
            x: coordinates.localX,
            y: coordinates.localY
        });

        if (touchRippleTimerRef.current) {
            clearTimeout(touchRippleTimerRef.current);
        }

        touchRippleTimerRef.current = setTimeout(() => {
            setTouchRipple((prev) => (prev?.id === rippleId ? null : prev));
        }, 520);
    };

    const handlePointerUp = () => {
        if (isCoarsePointer) {
            setIsPressed(false);
        }
    };

    const highlightVisible = has3dInteraction ? isHovered : isPressed;

    const handleKeyDown = (event) => {
        if (!onClick) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(event);
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 30,
            scale: shouldReduceMotion ? 1 : 0.94
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : delay,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className={`ios-card ${isPressed ? 'ios-card-touch-active' : ''} ${className}`}
            variants={forceVisible ? undefined : cardVariants}
            initial={forceVisible ? false : 'hidden'}
            animate={forceVisible ? undefined : 'visible'}
            whileHover={shouldReduceMotion ? undefined : { scale: has3dInteraction ? 1.03 : 1.015 }}
            whileTap={shouldReduceMotion ? undefined : { scale: has3dInteraction ? 0.975 : isCoarsePointer ? 0.992 : 0.985 }}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            style={{
                rotateX: has3dInteraction ? rotateX : 0,
                rotateY: has3dInteraction ? rotateY : 0,
                x: has3dInteraction ? magneticX : 0,
                y: has3dInteraction ? magneticY : 0,
                boxShadow: has3dInteraction && isHovered ? dynamicShadow : undefined,
                transformStyle: 'preserve-3d',
                transformPerspective: 1300,
                cursor: onClick ? 'pointer' : 'default',
                touchAction: onClick ? 'manipulation' : 'auto',
                WebkitTapHighlightColor: 'transparent'
            }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: highlightVisible ? 1 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.32 }}
                style={{
                    background: liquidShine
                }}
            />

            <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: has3dInteraction && isHovered ? 0.72 : isPressed ? 0.32 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                style={{
                    background: liquidCaustic,
                    mixBlendMode: 'screen'
                }}
            />

            {touchRipple && (
                <motion.div
                    key={touchRipple.id}
                    className="pointer-events-none absolute z-20 rounded-full"
                    initial={{ scale: 0, opacity: 0.45 }}
                    animate={{ scale: 8, opacity: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    style={{
                        width: 14,
                        height: 14,
                        left: touchRipple.x - 7,
                        top: touchRipple.y - 7,
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.7), rgba(186, 230, 253, 0.32), rgba(255, 255, 255, 0))'
                    }}
                />
            )}

            <motion.div
                className="relative z-20"
                style={{
                    x: has3dInteraction ? contentX : 0,
                    y: has3dInteraction ? contentY : 0,
                    transformStyle: 'preserve-3d'
                }}
            >
                {children}
            </motion.div>

            <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${accent}`}
                initial={forceVisible ? { scaleX: 1 } : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={
                    forceVisible
                        ? { duration: 0 }
                        : { duration: 0.8, delay: delay + 0.3, ease: 'easeOut' }
                }
                style={{ transformOrigin: 'left' }}
            />
        </motion.div>
    );
};

/**
 * Enhanced KPI Card with Interactive Effects
 */
export const InteractiveKpiCard = ({
    label,
    value,
    hint,
    accent = 'from-cyan-500/80 to-sky-500/80',
    delay = 0,
    trend = null,
    onClick
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasTrend = typeof trend === 'number';
    const trendStrength = hasTrend ? Math.min(Math.abs(trend), 100) : 0;
    const trendBarStyle = trend > 0
        ? 'bg-emerald-500'
        : trend < 0
            ? 'bg-rose-500'
            : 'bg-slate-500';
    const trendPillStyle = trend > 0
        ? 'bg-emerald-100 text-emerald-700'
        : trend < 0
            ? 'bg-rose-100 text-rose-700'
            : 'bg-slate-100 text-slate-700';

    return (
        <InteractiveCard
            className="p-5 cursor-pointer"
            accent={accent}
            delay={delay}
            onClick={onClick}
            onHoverChange={setIsHovered}
        >
            <motion.div
                className="flex items-start justify-between"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: delay + 0.1 }}
            >
                <div>
                    <motion.p
                        className="text-xs uppercase tracking-[0.18em] text-slate-500"
                        animate={{
                            color: isHovered ? '#0891b2' : '#64748b'
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {label}
                    </motion.p>
                    <motion.p
                        className="mt-3 font-display text-3xl font-semibold text-slate-900"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring', stiffness: 200 }}
                    >
                        {value}
                    </motion.p>
                    {hint && (
                        <motion.p
                            className="mt-2 text-sm text-slate-600"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: delay + 0.3 }}
                        >
                            {hint}
                        </motion.p>
                    )}
                </div>

                {hasTrend && (
                    <motion.div
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${trendPillStyle}`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: delay + 0.4, type: 'spring', stiffness: 200 }}
                    >
                        {trend > 0 ? '+' : ''}{trend}%
                    </motion.div>
                )}
            </motion.div>

            {hasTrend && (
                <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: delay + 0.45 }}
                >
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/70">
                        <motion.div
                            className={`h-full rounded-full ${trendBarStyle}`}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: trendStrength / 100 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: delay + 0.5, ease: 'easeOut' }}
                            style={{ transformOrigin: 'left' }}
                        />
                    </div>
                </motion.div>
            )}
        </InteractiveCard>
    );
};

export default InteractiveCard;
