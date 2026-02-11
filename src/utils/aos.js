import AOS from 'aos';

let initialized = false;

const shouldDisableAOS = () => {
    if (typeof window === 'undefined') return true;
    return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
        || document.documentElement.classList.contains('reduced-effects')
    );
};

export const initAOS = (overrides = {}) => {
    if (typeof window === 'undefined') return;

    const options = {
        duration: 480,
        delay: 0,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 26,
        anchorPlacement: 'top-bottom',
        throttleDelay: 90,
        debounceDelay: 70,
        disableMutationObserver: true,
        disable: shouldDisableAOS,
        ...overrides
    };

    if (!initialized) {
        AOS.init(options);
        initialized = true;
    } else {
        AOS.refreshHard();
    }

    window.requestAnimationFrame(() => {
        AOS.refresh();
    });
};

export const queueAOSRefresh = ({ hard = false, delay = 0 } = {}) => {
    if (typeof window === 'undefined') return () => {};

    let raf = 0;
    const timer = window.setTimeout(() => {
        raf = window.requestAnimationFrame(() => {
            if (!initialized) {
                initAOS();
                return;
            }

            if (hard) {
                AOS.refreshHard();
            }

            AOS.refresh();
        });
    }, Math.max(0, delay));

    return () => {
        window.clearTimeout(timer);
        if (raf) window.cancelAnimationFrame(raf);
    };
};
