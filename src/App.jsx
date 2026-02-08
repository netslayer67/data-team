import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppShell from './app/AppShell';
import SchoolOverviewPage from './features/dashboard/pages/SchoolOverviewPage';
import EmployeeDirectoryPage from './features/employees/pages/EmployeeDirectoryPage';
import { initAOS, refreshAOS } from './utils/aosConfig';

const AosSync = () => {
    const location = useLocation();

    useEffect(() => {
        refreshAOS();
    }, [location.pathname]);

    return null;
};

function App() {
    useEffect(() => {
        initAOS();
    }, []);

    return (
        <BrowserRouter>
            <AosSync />
            <Routes>
                <Route element={<AppShell />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<SchoolOverviewPage />} />
                    <Route path="/employees" element={<EmployeeDirectoryPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
