import AOS from 'aos';

/**
 * Custom AOS configuration with optimized animations
 * This provides smooth, performant scroll animations
 */
export const initAOS = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    AOS.init({
        // Global settings
        duration: prefersReducedMotion ? 0 : (isMobile ? 500 : 650),
        easing: 'ease-out-cubic',
        once: true,
        offset: isMobile ? 60 : 80,
        delay: 0,

        // Disable for users who prefer reduced motion
        disable: prefersReducedMotion,

        // Throttle settings for better performance
        throttleDelay: isMobile ? 99 : 66,
        debounceDelay: isMobile ? 50 : 50,

        // Mirror animation on scroll up
        mirror: false,

        // Start animation when element is in viewport
        startEvent: 'DOMContentLoaded',

        // Custom class names
        useClassNames: false,
        disableMutationObserver: true,

        // Anchor placement
        anchorPlacement: 'top-bottom'
    });
};

/**
 * Refresh AOS animations (useful after dynamic content changes)
 */
export const refreshAOS = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        AOS.refreshHard();
    }
};

/**
 * Custom animation variants for different use cases
 */
export const animationVariants = {
    // Fade animations
    fadeUp: 'fade-up',
    fadeDown: 'fade-down',
    fadeLeft: 'fade-left',
    fadeRight: 'fade-right',
    fadeUpRight: 'fade-up-right',
    fadeUpLeft: 'fade-up-left',
    fadeDownRight: 'fade-down-right',
    fadeDownLeft: 'fade-down-left',

    // Flip animations
    flipUp: 'flip-up',
    flipDown: 'flip-down',
    flipLeft: 'flip-left',
    flipRight: 'flip-right',

    // Zoom animations
    zoomIn: 'zoom-in',
    zoomInUp: 'zoom-in-up',
    zoomInDown: 'zoom-in-down',
    zoomInLeft: 'zoom-in-left',
    zoomInRight: 'zoom-in-right',
    zoomOut: 'zoom-out',

    // Slide animations
    slideUp: 'slide-up',
    slideDown: 'slide-down',
    slideLeft: 'slide-left',
    slideRight: 'slide-right'
};

/**
 * Get animation props for a specific variant
 */
export const getAnimationProps = (variant = 'fadeUp', delay = 0, duration = null) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
        'data-aos': animationVariants[variant] || 'fade-up',
        'data-aos-delay': prefersReducedMotion ? 0 : delay,
        'data-aos-duration': duration || (prefersReducedMotion ? 0 : 650),
        'data-aos-once': 'true',
        'data-aos-offset': '80'
    };
};

/**
 * Stagger animation delays for lists
 */
export const getStaggeredDelay = (index, baseDelay = 0, staggerAmount = 100) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReducedMotion ? 0 : baseDelay + (index * staggerAmount);
};

export default { initAOS, refreshAOS, animationVariants, getAnimationProps, getStaggeredDelay };
