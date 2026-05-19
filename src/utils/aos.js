import AOS from 'aos';

let initialized = false;

const shouldDisableAOS = () => {
    if (typeof window === 'undefined') return true;
    const saveData = navigator.connection?.saveData === true;
    return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
        || saveData
    );
};

export const initAOS = (overrides = {}) => {
    if (typeof window === 'undefined') return;

    const options = {
        duration: 480,
        delay: 0,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 24,
        anchorPlacement: 'top-bottom',
        throttleDelay: 110,
        debounceDelay: 90,
        // MutationObserver must stay ON so AOS auto-detects elements added
        // after React renders lazy-loaded routes or Suspense resolves.
        // Disabling it causes components to stay invisible until page refresh.
        disable: shouldDisableAOS,
        ...overrides
    };

    if (!initialized) {
        AOS.init(options);
        initialized = true;
    } else {
        AOS.refreshHard();
    }

    const runRefresh = (hard = false) => {
        window.requestAnimationFrame(() => {
            if (hard) {
                AOS.refreshHard();
                return;
            }
            AOS.refresh();
        });
    };

    runRefresh(false);
    window.setTimeout(() => runRefresh(true), 180);
};

export const queueAOSRefresh = ({ hard = false, delay = 0 } = {}) => {
    if (typeof window === 'undefined') return () => {};

    let rafA = 0;
    let rafB = 0;
    const timer = window.setTimeout(() => {
        rafA = window.requestAnimationFrame(() => {
            if (!initialized) {
                initAOS();
                return;
            }

            rafB = window.requestAnimationFrame(() => {
                if (hard) {
                    AOS.refreshHard();
                } else {
                    AOS.refresh();
                }
            });
        });
    }, Math.max(0, delay));

    return () => {
        window.clearTimeout(timer);
        if (rafA) window.cancelAnimationFrame(rafA);
        if (rafB) window.cancelAnimationFrame(rafB);
    };
};
