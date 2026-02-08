import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        if (import.meta.env.PROD) {
            navigator.serviceWorker.register('/service-worker.js').catch((error) => {
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
