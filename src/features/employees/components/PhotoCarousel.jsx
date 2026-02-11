import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

const optimizeCloudinaryUrl = (url, { width = 600, crop = true } = {}) => {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    if (crop) {
        const h = Math.round(width * (4 / 3));
        return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},h_${h},c_fill,g_auto/`);
    }
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};

const swipeThreshold = 50;

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
    }),
};

const transition = {
    x: { type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    opacity: { duration: 0.25 },
};

const PhotoCarousel = ({ photos = [], employeeName = 'Employee' }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const autoPlayRef = useRef(null);
    const dragStartX = useRef(0);

    const imageIndex = ((page % photos.length) + photos.length) % photos.length;

    const paginate = useCallback((newDirection) => {
        setPage(([prev]) => [prev + newDirection, newDirection]);
    }, []);

    const goToSlide = useCallback((targetIndex) => {
        setPage(([prevPage]) => {
            const currentIdx = ((prevPage % photos.length) + photos.length) % photos.length;
            return [targetIndex, targetIndex > currentIdx ? 1 : -1];
        });
    }, [photos.length]);

    // Auto-play
    useEffect(() => {
        if (photos.length <= 1 || isFullscreen) return;
        autoPlayRef.current = setInterval(() => paginate(1), 5000);
        return () => clearInterval(autoPlayRef.current);
    }, [photos.length, isFullscreen, paginate]);

    const pauseAutoPlay = useCallback(() => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }, []);

    const resumeAutoPlay = useCallback(() => {
        if (photos.length <= 1 || isFullscreen) return;
        autoPlayRef.current = setInterval(() => paginate(1), 5000);
    }, [photos.length, isFullscreen, paginate]);

    // Keyboard for fullscreen
    useEffect(() => {
        if (!isFullscreen) return;
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') paginate(1);
            else if (e.key === 'ArrowLeft') paginate(-1);
            else if (e.key === 'Escape') setIsFullscreen(false);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isFullscreen, paginate]);

    // Touch/pointer swipe handlers (no drag conflict with AnimatePresence)
    const handlePointerDown = useCallback((e) => {
        dragStartX.current = e.clientX;
    }, []);

    const handlePointerUp = useCallback((e) => {
        const diff = e.clientX - dragStartX.current;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff < 0) paginate(1);
            else paginate(-1);
        }
    }, [paginate]);

    if (!photos.length) return null;

    if (photos.length === 1) {
        return (
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/60">
                <img
                    src={optimizeCloudinaryUrl(photos[0], { width: 600 })}
                    alt={employeeName}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <>
            <div
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60"
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={resumeAutoPlay}
            >
                <div
                    className="relative aspect-[3/4] w-full overflow-hidden cursor-grab active:cursor-grabbing"
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                >
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.img
                            key={page}
                            src={optimizeCloudinaryUrl(photos[imageIndex], { width: 600 })}
                            alt={`${employeeName} - Photo ${imageIndex + 1}`}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                            draggable={false}
                        />
                    </AnimatePresence>
                </div>

                {/* Arrow buttons */}
                <button
                    type="button"
                    onClick={() => paginate(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/80 p-1.5 text-slate-700 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white"
                    aria-label="Previous photo"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => paginate(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/80 p-1.5 text-slate-700 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white"
                    aria-label="Next photo"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>

                {/* Fullscreen button */}
                <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="absolute right-2 top-2 rounded-full border border-white/70 bg-white/80 p-1.5 text-slate-700 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white"
                    aria-label="View fullscreen"
                >
                    <ZoomIn className="h-4 w-4" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {photos.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => goToSlide(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === imageIndex
                                    ? 'w-5 bg-white shadow-md'
                                    : 'w-2 bg-white/60 hover:bg-white/80'
                            }`}
                            aria-label={`Go to photo ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Counter badge */}
                <span className="absolute left-2 top-2 rounded-full border border-white/70 bg-white/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 backdrop-blur-sm">
                    {imageIndex + 1} / {photos.length}
                </span>
            </div>

            {/* Photo Modal — portaled to body to escape transform stacking context */}
            {createPortal(
                <AnimatePresence>
                    {isFullscreen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-8"
                            onClick={() => setIsFullscreen(false)}
                        >
                            {/* Modal card */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: 'tween', duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/15">
                                    <span className="text-sm font-medium text-white/90">
                                        {employeeName}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-white/60">
                                            {imageIndex + 1} / {photos.length}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setIsFullscreen(false)}
                                            className="rounded-full bg-white/15 p-1.5 text-white/80 hover:bg-white/25 transition-colors"
                                            aria-label="Close"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Image area */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/20">
                                    <AnimatePresence initial={false} custom={direction} mode="wait">
                                        <motion.img
                                            key={page}
                                            src={optimizeCloudinaryUrl(photos[imageIndex], { width: 1200, crop: false })}
                                            alt={`${employeeName} - Photo ${imageIndex + 1}`}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={transition}
                                            className="absolute inset-0 h-full w-full object-contain"
                                            draggable={false}
                                        />
                                    </AnimatePresence>

                                    {/* Nav arrows inside image */}
                                    {photos.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => paginate(-1)}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white/90 hover:bg-black/50 backdrop-blur-sm transition-colors"
                                                aria-label="Previous photo"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => paginate(1)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white/90 hover:bg-black/50 backdrop-blur-sm transition-colors"
                                                aria-label="Next photo"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Footer with dots */}
                                {photos.length > 1 && (
                                    <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-t border-white/15">
                                        {photos.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => goToSlide(i)}
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    i === imageIndex
                                                        ? 'w-5 bg-white shadow-md'
                                                        : 'w-2 bg-white/40 hover:bg-white/60'
                                                }`}
                                                aria-label={`Go to photo ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default React.memo(PhotoCarousel);
