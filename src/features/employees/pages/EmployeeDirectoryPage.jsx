import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Search, Users2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoleGroupSection from '../components/RoleGroupSection';
import { getEmployeeDirectoryPage, getEmployees, getSchoolFilters } from '../../../data/schoolData';

const PAGE_SIZE = 24;

const EmployeeDirectoryPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [filters, setFilters] = useState(() => ({
        search: '',
        unit: searchParams.get('unit') || '',
        status: ''
    }));
    const [currentPage, setCurrentPage] = useState(1);
    const deferredFilters = useDeferredValue(filters);

    const availableFilters = useMemo(() => getSchoolFilters(), []);
    const totalEmployees = useMemo(() => getEmployees().pagination.totalRecords, []);
    const directoryPage = useMemo(
        () => getEmployeeDirectoryPage(deferredFilters, { page: currentPage, limit: PAGE_SIZE }),
        [deferredFilters, currentPage]
    );
    const hierarchy = directoryPage.groups;
    const pagination = directoryPage.pagination;

    useEffect(() => {
        const unitFromQuery = searchParams.get('unit') || '';
        setFilters((prev) => {
            if (prev.unit === unitFromQuery) return prev;
            return {
                ...prev,
                unit: unitFromQuery
            };
        });
        setCurrentPage(1);
    }, [searchParams]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters.search, filters.unit, filters.status]);

    useEffect(() => {
        if (currentPage !== pagination.currentPage) {
            setCurrentPage(pagination.currentPage);
        }
    }, [currentPage, pagination.currentPage]);

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            unit: '',
            status: ''
        });
    };

    const pageNumbers = useMemo(
        () => Array.from({ length: pagination.totalPages }, (_, index) => index + 1),
        [pagination.totalPages]
    );
    const noResults = pagination.totalRecords === 0;

    const changePage = (page) => {
        setCurrentPage(() => Math.min(Math.max(1, page), pagination.totalPages));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-5">
            <section
                className="glass-surface rounded-[32px] p-5 md:p-6"
                data-aos="fade-up"
                data-aos-duration="420"
                data-aos-offset="24"
                data-aos-once="true"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Employee Directory</p>
                        <h3 className="font-display text-2xl font-semibold text-slate-900 md:text-[2rem]">
                            Employee cards by organizational hierarchy
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Leadership comes first, then teaching and support teams. The lighter card system keeps this roster faster to scan.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full border border-cyan-200/80 bg-cyan-50/80 px-3 py-1 text-xs font-medium text-cyan-800">
                                Colorful overview
                            </span>
                            <span className="rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1 text-xs font-medium text-violet-800">
                                24 cards per page
                            </span>
                            <span className="rounded-full border border-amber-200/80 bg-amber-50/80 px-3 py-1 text-xs font-medium text-amber-800">
                                Faster scroll behavior
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                        <div className="rounded-3xl border border-white/65 bg-white/72 px-4 py-4 text-sm text-slate-700 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.55)]">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">On this page</p>
                            <p className="mt-2 font-display text-3xl font-semibold text-slate-900">{pagination.pageRecords}</p>
                            <p className="mt-1 text-xs text-slate-500">Employee cards rendered now</p>
                        </div>

                        <div className="rounded-3xl border border-white/65 bg-gradient-to-br from-cyan-50/80 via-white/72 to-violet-50/70 px-4 py-4 text-sm text-slate-700 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.55)]">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Data coverage</p>
                            <p className="mt-2 font-medium text-slate-800">Total records stored: {totalEmployees}</p>
                            {!noResults && (
                                <p className="mt-1 text-xs text-slate-500">
                                    Showing {pagination.startRecord}-{pagination.endRecord} of {pagination.totalRecords} matched employees
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="glass-surface rounded-[32px] p-5"
                data-aos="fade-up"
                data-aos-duration="420"
                data-aos-offset="16"
                data-aos-once="true"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-center gap-2 text-slate-700">
                        <Filter className="h-4 w-4" />
                        <div>
                            <p className="text-sm font-medium">Employee filters</p>
                            <p className="text-xs text-slate-500">Refine by keyword, unit, or status without rerendering the whole roster.</p>
                        </div>
                    </div>

                    <button type="button" onClick={clearFilters} className="glass-button">
                        Reset Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <label className="space-y-1.5">
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Search</span>
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(event) => handleFilterChange('search', event.target.value)}
                                className="glass-input pl-9"
                                placeholder="Name, role, or ID"
                            />
                        </div>
                    </label>

                    <label className="space-y-1.5">
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Unit</span>
                        <select
                            value={filters.unit}
                            onChange={(event) => handleFilterChange('unit', event.target.value)}
                            className="glass-input"
                        >
                            <option value="">All Units</option>
                            {availableFilters.units.map((unit) => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    </label>

                    <label className="space-y-1.5">
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Status</span>
                        <select
                            value={filters.status}
                            onChange={(event) => handleFilterChange('status', event.target.value)}
                            className="glass-input"
                        >
                            <option value="">All Statuses</option>
                            {availableFilters.statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </section>

            {noResults && (
                <section
                    className="glass-surface rounded-3xl p-8 text-center"
                    data-aos="fade-up"
                    data-aos-duration="360"
                    data-aos-once="true"
                    data-aos-anchor-placement="top-bottom"
                >
                    <Users2 className="mx-auto h-8 w-8 text-slate-500" />
                    <p className="mt-3 text-slate-700">No data matches the selected filters.</p>
                    <p className="mt-1 text-xs text-slate-500">Try changing search keyword or reset filters.</p>
                </section>
            )}

            <div className="space-y-5">
                {hierarchy.map((group) => (
                    <RoleGroupSection
                        key={group.roleGroup}
                        group={group}
                        onCardClick={(employee) => navigate(`/employees/${employee._id}`)}
                    />
                ))}
            </div>

            {!noResults && pagination.totalPages > 1 && (
                <section className="glass-surface rounded-[30px] p-4 md:p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-800">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </p>
                            <p className="text-xs text-slate-500">
                                {pagination.pageRecords} cards rendered per page to keep scrolling lighter
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={() => changePage(pagination.currentPage - 1)}
                                disabled={!pagination.hasPreviousPage}
                                className={`inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm transition ${
                                    pagination.hasPreviousPage
                                        ? 'border-white/70 bg-white/70 text-slate-700 hover:bg-white'
                                        : 'cursor-not-allowed border-white/50 bg-white/45 text-slate-400'
                                }`}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <div className="flex flex-wrap items-center gap-1">
                                {pageNumbers.map((pageNumber) => {
                                    const active = pageNumber === pagination.currentPage;
                                    return (
                                        <button
                                            key={pageNumber}
                                            type="button"
                                            onClick={() => changePage(pageNumber)}
                                            className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-medium transition ${
                                                active
                                                    ? 'border-cyan-200/80 bg-cyan-50/80 text-cyan-800'
                                                    : 'border-white/70 bg-white/70 text-slate-700 hover:bg-white'
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={() => changePage(pagination.currentPage + 1)}
                                disabled={!pagination.hasNextPage}
                                className={`inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm transition ${
                                    pagination.hasNextPage
                                        ? 'border-white/70 bg-white/70 text-slate-700 hover:bg-white'
                                        : 'cursor-not-allowed border-white/50 bg-white/45 text-slate-400'
                                }`}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default EmployeeDirectoryPage;
