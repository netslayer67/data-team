export const isRouteActive = (pathname, target) => {
    if (!target) return false;
    if (target === '/dashboard') {
        return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(target);
};

export default {
    isRouteActive
};
