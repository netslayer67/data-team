import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Enhanced Framer Motion configurations
 * Provides smooth, performant animations with accessibility support
 */

// Common animation variants
export const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
};

export const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

export const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    }
};

export const slideInLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
};

export const slideInRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
};

// Stagger container variants
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

// Stagger item variants
export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    }
};

// 3D card hover effect
export const cardHoverVariants = {
    rest: {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 18px 40px -28px rgba(15, 23, 42, 0.35)'
    },
    hover: {
        scale: 1.02,
        rotateX: 2,
        rotateY: -2,
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.45)',
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

// Parallax scroll effect hook
export const useParallax = (value, distance) => {
    const shouldReduceMotion = useReducedMotion();
    return useTransform(value, [0, 1], shouldReduceMotion ? [0, 0] : [0, distance]);
};

// Smooth scroll progress hook
export const useSmoothScroll = () => {
    const { scrollYProgress } = useScroll();
    const shouldReduceMotion = useReducedMotion();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: shouldReduceMotion ? 0 : 100,
        damping: shouldReduceMotion ? 0 : 30,
        restDelta: 0.001
    });

    return smoothProgress;
};

// Scroll-based animation hook
export const useScrollAnimation = (inputRange, outputRange) => {
    const { scrollY } = useScroll();
    const shouldReduceMotion = useReducedMotion();

    return useTransform(
        scrollY,
        inputRange,
        shouldReduceMotion ? outputRange.map(() => 0) : outputRange
    );
};

// Magnetic button effect
export const useMagneticButton = (strength = 20) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return { x: 0, y: 0 };
    }

    return {
        x: useSpring(0, { stiffness: 150, damping: 15 }),
        y: useSpring(0, { stiffness: 150, damping: 15 })
    };
};

// Text reveal animation
export const textRevealVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
        }
    })
};

// Page transition variants
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    }
};

// Floating animation
export const floatingVariants = {
    initial: { y: 0 },
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
};

// Pulse animation
export const pulseVariants = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
};

// Shimmer effect for loading states
export const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
        x: '100%',
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
        }
    }
};

// Get motion props with accessibility support
export const getMotionProps = (variants = fadeUpVariants, initial = 'hidden', animate = 'visible') => {
    const shouldReduceMotion = useReducedMotion();

    return {
        variants,
        initial: shouldReduceMotion ? 'visible' : initial,
        animate,
        viewport: { once: true, amount: 0.2 }
    };
};

// Optimized motion component for better performance
export const OptimizedMotion = ({ children, variants, ...props }) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <>{children}</>;
    }

    return (
        <motion.div variants={variants} {...props}>
            {children}
        </motion.div>
    );
};

// Lazy load motion component
export const LazyMotion = React.lazy(() => import('framer-motion'));

export default {
    fadeUpVariants,
    fadeInVariants,
    scaleInVariants,
    slideInLeftVariants,
    slideInRightVariants,
    staggerContainer,
    staggerItem,
    cardHoverVariants,
    useParallax,
    useSmoothScroll,
    useScrollAnimation,
    useMagneticButton,
    textRevealVariants,
    pageTransition,
    floatingVariants,
    pulseVariants,
    shimmerVariants,
    getMotionProps,
    OptimizedMotion
};
