import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'aos/dist/aos.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

const applyPerformanceProfile = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const saveData = navigator.connection?.saveData === true;

    const shouldReduceEffects = prefersReduced || saveData || (lowCpu && isCoarse);
    document.documentElement.classList.toggle('reduced-effects', shouldReduceEffects);
};

applyPerformanceProfile();
window.addEventListener('resize', applyPerformanceProfile, { passive: true });

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        if (import.meta.env.PROD) {
            navigator.serviceWorker.register('/service-worker.js').then((registration) => {
                const promptUpdate = () => {
                    if (!registration.waiting) return;
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                };

                registration.addEventListener('updatefound', () => {
                    const installingWorker = registration.installing;
                    if (!installingWorker) return;

                    installingWorker.addEventListener('statechange', () => {
                        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            promptUpdate();
                        }
                    });
                });

                let refreshing = false;
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    if (refreshing) return;
                    refreshing = true;
                    window.location.reload();
                });
            }).catch((error) => {
                console.error('Service worker registration failed:', error);
            });
            return;
        }

        // Prevent stale cached assets from affecting local development UI.
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));

        if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((key) => caches.delete(key)));
        }
    });
}
