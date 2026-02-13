import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlaskConical, Moon, RefreshCw, Sparkles, Star, Sun } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ZODIAC_SIGNS, ELEMENT_COLORS, getZodiacForToday, getFallbackHoroscope } from '../../../data/zodiacData';
import { generateHoroscope } from '../../../services/geminiApi';

const STORAGE_KEY = 'zodiac-selected-sign';

const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
            />
        ))}
    </div>
);

const ZodiacForecast = ({ density = 'comfortable' }) => {
    const shouldReduceMotion = useReducedMotion();
    const isCompact = density === 'compact';
    const todaySign = useMemo(() => getZodiacForToday(), []);

    const [selectedSign, setSelectedSign] = useState(() => {
        if (typeof window === 'undefined') return todaySign.name;
        return localStorage.getItem(STORAGE_KEY) || todaySign.name;
    });
    const [tab, setTab] = useState('daily');
    const [horoscope, setHoroscope] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAllSigns, setShowAllSigns] = useState(false);
    const abortRef = useRef(null);

    const signData = useMemo(() => ZODIAC_SIGNS.find((s) => s.name === selectedSign) || todaySign, [selectedSign, todaySign]);
    const elementColor = ELEMENT_COLORS[signData.element] || ELEMENT_COLORS.Fire;

    const fetchHoroscope = useCallback(async (sign, type, force = false) => {
        setLoading(true);
        setHoroscope(null);

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const aiResult = await generateHoroscope(sign, type);
            if (controller.signal.aborted) return;

            if (aiResult) {
                setHoroscope(aiResult);
            } else {
                setHoroscope(getFallbackHoroscope(sign, type));
            }
        } catch {
            if (!controller.signal.aborted) {
                setHoroscope(getFallbackHoroscope(sign, type));
            }
        } finally {
            if (!controller.signal.aborted) setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHoroscope(selectedSign, tab);
        return () => { if (abortRef.current) abortRef.current.abort(); };
    }, [selectedSign, tab, fetchHoroscope]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, selectedSign);
        }
    }, [selectedSign]);

    const handleRefresh = () => fetchHoroscope(selectedSign, tab, true);

    const handleSignSelect = (name) => {
        setSelectedSign(name);
        setShowAllSigns(false);
    };

    const visibleSigns = showAllSigns ? ZODIAC_SIGNS : ZODIAC_SIGNS.slice(0, 6);

    return (
        <section className={`glass-surface relative overflow-hidden rounded-[28px] ${isCompact ? 'p-4 md:p-5' : 'p-5 md:p-6'}`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_55%)]" />
            <div className="pointer-events-none absolute -left-14 -bottom-14 h-44 w-44 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-300/15 blur-2xl" />

            <div className="relative z-10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="text-xs uppercase tracking-[0.18em] text-violet-600">Zodiac Forecast</p>
                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/70 bg-gradient-to-r from-amber-100/90 to-orange-100/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 shadow-sm">
                                <FlaskConical className="h-3 w-3" />
                                Beta Testing
                            </span>
                        </div>
                        <h3 className={`font-display font-semibold text-slate-900 ${isCompact ? 'text-lg' : 'text-xl'}`}>
                            Star Sign Readings
                        </h3>
                        <p className={`mt-1 text-slate-600 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                            Check your daily & monthly horoscope to boost your day!
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="inline-flex items-center gap-1 rounded-xl border border-white/60 bg-white/55 p-1">
                            <button
                                type="button"
                                onClick={() => setTab('daily')}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition ${tab === 'daily' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-white/70'}`}
                            >
                                <Sun className="h-3.5 w-3.5" />
                                Today
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab('monthly')}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition ${tab === 'monthly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-white/70'}`}
                            >
                                <Moon className="h-3.5 w-3.5" />
                                This Month
                            </button>
                        </div>
                        <motion.button
                            type="button"
                            onClick={handleRefresh}
                            disabled={loading}
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/70 text-violet-500 transition hover:bg-white disabled:opacity-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </motion.button>
                    </div>
                </div>

                {/* Zodiac sign picker */}
                <div className={`${isCompact ? 'mt-3' : 'mt-4'}`}>
                    <div className="flex flex-wrap gap-1.5">
                        {visibleSigns.map((sign) => (
                            <motion.button
                                key={sign.name}
                                type="button"
                                onClick={() => handleSignSelect(sign.name)}
                                whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -1 }}
                                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-all ${
                                    selectedSign === sign.name
                                        ? `${ELEMENT_COLORS[sign.element].light} shadow-sm`
                                        : 'border-white/60 bg-white/50 text-slate-600 hover:bg-white/80'
                                }`}
                            >
                                <span className="text-base leading-none">{sign.symbol}</span>
                                {sign.name}
                            </motion.button>
                        ))}
                        {!showAllSigns && (
                            <button
                                type="button"
                                onClick={() => setShowAllSigns(true)}
                                className="rounded-xl border border-dashed border-slate-300/60 bg-white/30 px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-white/60"
                            >
                                +{ZODIAC_SIGNS.length - 6} more
                            </button>
                        )}
                        {showAllSigns && (
                            <button
                                type="button"
                                onClick={() => setShowAllSigns(false)}
                                className="rounded-xl border border-dashed border-slate-300/60 bg-white/30 px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-white/60"
                            >
                                Show less
                            </button>
                        )}
                    </div>
                </div>

                {/* Selected sign hero + prediction */}
                <div className={`grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr] ${isCompact ? 'mt-4' : 'mt-5'}`}>
                    {/* Sign card */}
                    <motion.div
                        key={selectedSign}
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br ${elementColor.bg} ${isCompact ? 'p-4' : 'p-5'} text-white lg:w-52`}
                    >
                        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <motion.span
                                className={`leading-none ${isCompact ? 'text-5xl' : 'text-6xl'}`}
                                animate={shouldReduceMotion ? undefined : { rotateY: [0, 360] }}
                                transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5 }}
                            >
                                {signData.symbol}
                            </motion.span>
                            <h4 className={`mt-2 font-display font-bold ${isCompact ? 'text-xl' : 'text-2xl'}`}>{signData.name}</h4>
                            <p className="mt-0.5 text-xs text-white/80">{signData.dateRange}</p>
                            <span className="mt-2 rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-[11px] font-medium">
                                {signData.element}
                            </span>
                        </div>
                    </motion.div>

                    {/* Prediction content */}
                    <div className="flex flex-col gap-3">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-1 items-center justify-center rounded-2xl border border-white/60 bg-white/50 p-6"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <motion.div
                                            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                                            transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Sparkles className="h-6 w-6 text-violet-500" />
                                        </motion.div>
                                        <p className="text-sm text-slate-500">Reading the stars...</p>
                                    </div>
                                </motion.div>
                            ) : horoscope ? (
                                <motion.div
                                    key={`${selectedSign}-${tab}`}
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-1 flex-col gap-3"
                                >
                                    <div className={`rounded-2xl border border-white/60 bg-white/50 ${isCompact ? 'p-3' : 'p-4'}`}>
                                        <p className={`leading-relaxed text-slate-700 ${isCompact ? 'text-sm' : 'text-[15px]'}`}>
                                            &ldquo;{horoscope.prediction}&rdquo;
                                        </p>
                                        {horoscope.source === 'ai' && (
                                            <p className="mt-2 flex items-center gap-1.5 text-[10px] text-violet-500">
                                                <Sparkles className="h-3 w-3" />
                                                Generated by Gemini AI
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                        <div className={`rounded-xl border border-white/60 bg-white/50 text-center ${isCompact ? 'px-2 py-2' : 'px-3 py-2.5'}`}>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-500">Mood</p>
                                            <p className="mt-0.5 text-sm font-semibold text-slate-800">{horoscope.mood}</p>
                                        </div>
                                        <div className={`rounded-xl border border-white/60 bg-white/50 text-center ${isCompact ? 'px-2 py-2' : 'px-3 py-2.5'}`}>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-500">Lucky Number</p>
                                            <p className="mt-0.5 text-sm font-semibold text-slate-800">{horoscope.luckyNumber}</p>
                                        </div>
                                        <div className={`rounded-xl border border-white/60 bg-white/50 text-center ${isCompact ? 'px-2 py-2' : 'px-3 py-2.5'}`}>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-500">Lucky Color</p>
                                            <p className="mt-0.5 text-sm font-semibold text-slate-800">{horoscope.luckyColor}</p>
                                        </div>
                                        <div className={`rounded-xl border border-white/60 bg-white/50 text-center ${isCompact ? 'px-2 py-2' : 'px-3 py-2.5'}`}>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-500">Rating</p>
                                            <div className="mt-1 flex justify-center">
                                                <StarRating rating={horoscope.rating} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Decorative floating stars */}
            <motion.div
                className="pointer-events-none absolute right-6 top-6 text-amber-400/50"
                animate={shouldReduceMotion ? undefined : { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Star className="h-4 w-4 fill-current" />
            </motion.div>
            <motion.div
                className="pointer-events-none absolute left-[45%] top-4 text-violet-400/40"
                animate={shouldReduceMotion ? undefined : { y: [0, -4, 0], opacity: [0.4, 0.7, 0.4] }}
                transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
                <Star className="h-3 w-3 fill-current" />
            </motion.div>
        </section>
    );
};

export default React.memo(ZodiacForecast);
