import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

/**
 * ParallaxSection - Creates smooth parallax scroll effects
 * Optimized for performance with accessibility support
 */
export const ParallaxSection = ({
    children,
    className = '',
    speed = 0.5,
    direction = 'vertical',
    offset = [0, 1]
}) => {
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: shouldReduceMotion ? 80 : 100,
        damping: shouldReduceMotion ? 24 : 30,
        restDelta: 0.001
    });

    const verticalValue = useTransform(smoothProgress, offset, [0, speed * 100]);
    const horizontalValue = useTransform(smoothProgress, offset, [0, speed * 100]);
    const scaleValue = useTransform(smoothProgress, offset, [1, 1 + speed * 0.2]);
    const rotateValue = useTransform(smoothProgress, offset, [0, speed * 10]);

    const style = shouldReduceMotion
        ? {}
        : direction === 'horizontal'
            ? { x: horizontalValue }
            : direction === 'scale'
                ? { scale: scaleValue }
                : direction === 'rotate'
                    ? { rotate: rotateValue }
                    : { y: verticalValue };

    return (
        <motion.div
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
};

/**
 * ParallaxCard - 3D parallax card with mouse interaction
 */
export const ParallaxCard = ({ children, className = '', intensity = 10 }) => {
    const shouldReduceMotion = useReducedMotion();
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef(null);

    const handleMouseMove = (e) => {
        if (shouldReduceMotion || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    const rotateX = shouldReduceMotion ? 0 : -mousePosition.y * intensity;
    const rotateY = shouldReduceMotion ? 0 : mousePosition.x * intensity;

    return (
        <motion.div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY
            }}
            transition={{
                type: 'spring',
                stiffness: shouldReduceMotion ? 0 : 300,
                damping: shouldReduceMotion ? 0 : 20
            }}
        >
            {children}
        </motion.div>
    );
};

/**
 * ScrollReveal - Reveals content as it scrolls into view
 */
export const ScrollReveal = ({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    distance = 30,
    trigger = 'mount'
}) => {
    const shouldReduceMotion = useReducedMotion();
    const shouldUseInView = trigger === 'in-view';

    const variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : delay,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            whileInView={shouldUseInView ? 'visible' : undefined}
            viewport={shouldUseInView ? { once: true, amount: 0.2 } : undefined}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

/**
 * ScrollDepth3D - Subtle 3D tilt/parallax based on scroll progress.
 * Designed to stay lightweight and safe for performance.
 */
export const ScrollDepth3D = ({
    children,
    className = '',
    intensity = 8,
    depth = 14,
    drift = 10,
    offset = ['start end', 'end start']
}) => {
    const shouldReduceMotion = useReducedMotion();
    const targetRef = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: shouldReduceMotion ? 220 : 140,
        damping: shouldReduceMotion ? 40 : 30,
        mass: 0.9
    });

    const centeredProgress = useTransform(smoothProgress, [0, 0.5, 1], [-1, 0, 1]);
    const rotateX = useTransform(centeredProgress, [-1, 1], [intensity, -intensity]);
    const rotateY = useTransform(centeredProgress, [-1, 1], [-(intensity * 0.35), intensity * 0.35]);
    const translateY = useTransform(centeredProgress, [-1, 1], [depth, -depth]);
    const translateX = useTransform(centeredProgress, [-1, 1], [-drift, drift]);
    const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.985, 1, 0.985]);

    return (
        <motion.div
            ref={targetRef}
            className={className}
            style={
                shouldReduceMotion
                    ? undefined
                    : {
                        transformPerspective: 1200,
                        transformStyle: 'preserve-3d',
                        rotateX,
                        rotateY,
                        y: translateY,
                        x: translateX,
                        scale
                    }
            }
        >
            {children}
        </motion.div>
    );
};

/**
 * StaggeredGrid - Grid with staggered animation for children
 */
export const StaggeredGrid = ({
    children,
    className = '',
    staggerDelay = 0.1,
    columns = 1
}) => {
    const shouldReduceMotion = useReducedMotion();
    const safeColumns = Number.isFinite(columns) && columns > 0 ? Math.floor(columns) : 1;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : staggerDelay
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0 : 0.4,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <motion.div
            className={`grid ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ gridTemplateColumns: `repeat(${safeColumns}, minmax(0, 1fr))` }}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div key={index} variants={itemVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ParallaxSection;
