import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './app/AppShell';

const SchoolOverviewPage = lazy(() => import('./features/dashboard/pages/SchoolOverviewPage'));
const EmployeeDirectoryPage = lazy(() => import('./features/employees/pages/EmployeeDirectoryPage'));
const EmployeeDetailPage = lazy(() => import('./features/employees/pages/EmployeeDetailPage'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen" />}>
                <Routes>
                    <Route element={<AppShell />}>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<SchoolOverviewPage />} />
                        <Route path="/employees" element={<EmployeeDirectoryPage />} />
                        <Route path="/employees/:employeeId" element={<EmployeeDetailPage />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
