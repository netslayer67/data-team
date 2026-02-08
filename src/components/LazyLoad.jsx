import React, { useState, useRef, useEffect } from 'react';
import { createIntersectionObserver } from '../utils/performance';

/**
 * LazyLoad - Component for lazy loading content with intersection observer
 * Optimized for performance with accessibility support
 */
export const LazyLoad = ({
    children,
    fallback = null,
    threshold = 0.1,
    rootMargin = '50px',
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create intersection observer
        observerRef.current = createIntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Small delay to ensure smooth transition
                        setTimeout(() => setIsLoaded(true), 50);

                        // Disconnect observer after first intersection
                        if (observerRef.current) {
                            observerRef.current.disconnect();
                        }
                    }
                });
            },
            { threshold, rootMargin }
        );

        observerRef.current.observe(container);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [threshold, rootMargin]);

    return (
        <div
            ref={containerRef}
            className={`lazy-load-container ${className}`}
            style={{ minHeight: isVisible ? 'auto' : '200px' }}
        >
            {!isVisible && fallback}
            {isVisible && (
                <div
                    className={`lazy-load-content ${isLoaded ? 'loaded' : 'loading'}`}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

/**
 * LazyImage - Optimized lazy loading for images
 */
const LazyImage = ({
    src,
    alt,
    className = '',
    placeholder = null,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        observerRef.current = createIntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        if (observerRef.current) {
                            observerRef.current.disconnect();
                        }
                    }
                });
            },
            { threshold: 0.01, rootMargin: '100px' }
        );

        observerRef.current.observe(img);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div ref={imgRef} className={`lazy-image-container ${className}`}>
            {placeholder && !isLoaded && (
                <div className="lazy-image-placeholder">
                    {placeholder}
                </div>
            )}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
                    onLoad={() => setIsLoaded(true)}
                    loading="lazy"
                    {...props}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-out',
                        ...props.style
                    }}
                />
            )}
        </div>
    );
};

/**
 * LazyComponent - Lazy load React components
 */
const LazyComponent = ({
    component: Component,
    fallback = null,
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        observerRef.current = createIntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (observerRef.current) {
                            observerRef.current.disconnect();
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        observerRef.current.observe(container);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div ref={containerRef} style={{ minHeight: isVisible ? 'auto' : '100px' }}>
            {isVisible ? <Component {...props} /> : fallback}
        </div>
    );
};

export default LazyLoad;
export { LazyImage, LazyComponent };
