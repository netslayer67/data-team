/**
 * Performance monitoring and optimization utilities
 */

// Check if performance API is available
const isPerformanceAvailable = () => {
    return typeof performance !== 'undefined' && performance.mark !== undefined;
};

// Measure performance of a function
export const measurePerformance = (name, fn) => {
    if (!isPerformanceAvailable()) {
        return fn();
    }

    const startMark = `${name}-start`;
    const endMark = `${name}-end`;
    const measureName = `${name}-measure`;

    performance.mark(startMark);
    const result = fn();
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);

    const measure = performance.getEntriesByName(measureName)[0];
    console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);

    // Clean up
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);

    return result;
};

// Debounce function for performance
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for performance
export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Check if device is low-end
export const isLowEndDevice = () => {
    // Check hardware concurrency
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        return true;
    }

    // Check device memory (Chrome only)
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        return true;
    }

    // Check connection type
    if (navigator.connection) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            return true;
        }
        if (connection.saveData) {
            return true;
        }
    }

    return false;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get optimal animation settings based on device
export const getOptimalAnimationSettings = () => {
    const lowEnd = isLowEndDevice();
    const reducedMotion = prefersReducedMotion();

    return {
        duration: reducedMotion ? 0 : (lowEnd ? 300 : 600),
        easing: 'ease-out',
        stagger: reducedMotion ? 0 : (lowEnd ? 50 : 100),
        enable3D: !reducedMotion && !lowEnd,
        enableParticles: !reducedMotion && !lowEnd,
        enableParallax: !reducedMotion && !lowEnd
    };
};

// Lazy load component
export const lazyLoad = (importFn, fallback = null) => {
    return React.lazy(() =>
        importFn().catch(error => {
            console.warn('Lazy load failed:', error);
            return { default: fallback || (() => null) };
        })
    );
};

// Preload critical resources
export const preloadResource = (url, as = 'script') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    document.head.appendChild(link);
};

// Preconnect to external domains
export const preconnect = (domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
};

// Request idle callback with fallback
export const requestIdleCallback = (callback, timeout = 2000) => {
    if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(callback, { timeout });
    } else {
        return setTimeout(() => {
            const start = Date.now();
            callback({
                didTimeout: false,
                timeRemaining: () => Math.max(0, timeout - (Date.now() - start))
            });
        }, 1);
    }
};

// Cancel idle callback with fallback
export const cancelIdleCallback = (id) => {
    if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(id);
    } else {
        clearTimeout(id);
    }
};

// Memory usage monitoring (Chrome only)
export const getMemoryUsage = () => {
    if (performance.memory) {
        return {
            used: Math.round(performance.memory.usedJSHeapSize / 1048576),
            total: Math.round(performance.memory.totalJSHeapSize / 1048576),
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
        };
    }
    return null;
};

// Log memory usage periodically
export const startMemoryMonitoring = (interval = 30000) => {
    return setInterval(() => {
        const memory = getMemoryUsage();
        if (memory) {
            console.log(`[Memory] Used: ${memory.used}MB / Total: ${memory.total}MB / Limit: ${memory.limit}MB`);
        }
    }, interval);
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
    const defaultOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Optimize images
export const optimizeImage = (src, width, height, quality = 80) => {
    // This is a placeholder - in production, you'd use an image optimization service
    // like Cloudinary, Imgix, or your own image optimization endpoint
    return src;
};

// WebP support detection
export const supportsWebP = () => {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
};

// Get optimal image format
export const getOptimalImageFormat = async () => {
    const webP = await supportsWebP();
    return webP ? 'webp' : 'jpeg';
};

// Performance marks for critical rendering path
export const markCriticalRendering = () => {
    if (!isPerformanceAvailable()) return;

    // Mark when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        performance.mark('dom-ready');
    });

    // Mark when page is fully loaded
    window.addEventListener('load', () => {
        performance.mark('page-loaded');
        performance.measure('page-load', 'dom-ready', 'page-loaded');

        const measure = performance.getEntriesByName('page-load')[0];
        console.log(`[Performance] Page load time: ${measure.duration.toFixed(2)}ms`);
    });
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
    markCriticalRendering();

    // Log performance metrics
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`[Performance] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
            }
        });

        observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
    }
};

export default {
    measurePerformance,
    debounce,
    throttle,
    isLowEndDevice,
    prefersReducedMotion,
    getOptimalAnimationSettings,
    lazyLoad,
    preloadResource,
    preconnect,
    requestIdleCallback,
    cancelIdleCallback,
    getMemoryUsage,
    startMemoryMonitoring,
    createIntersectionObserver,
    optimizeImage,
    supportsWebP,
    getOptimalImageFormat,
    markCriticalRendering,
    initPerformanceMonitoring
};
