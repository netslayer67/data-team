import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Filter, Search, Users2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoleGroupSection from '../components/RoleGroupSection';
import { getEmployees, getEmployeesHierarchy, getSchoolFilters } from '../../../data/schoolData';
import { queueAOSRefresh } from '../../../utils/aos';

const EmployeeDirectoryPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pageRef = useRef(null);

    const [filters, setFilters] = useState(() => ({
        search: '',
        unit: searchParams.get('unit') || '',
        status: ''
    }));

    const availableFilters = useMemo(() => getSchoolFilters(), []);
    const hierarchy = useMemo(() => getEmployeesHierarchy(filters), [filters]);
    const totalEmployees = useMemo(() => getEmployees().pagination.totalRecords, []);

    const totalVisibleEmployees = useMemo(
        () => hierarchy.reduce((acc, current) => acc + (current.total || 0), 0),
        [hierarchy]
    );

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

    const noResults = hierarchy.every((group) => !group.total);
    const aosRefreshKey = `${filters.search}|${filters.unit}|${filters.status}|${totalVisibleEmployees}|${noResults ? 'empty' : 'filled'}`;

    useEffect(() => {
        const stopHard = queueAOSRefresh({ hard: true, delay: 28 });
        const stopSoft = queueAOSRefresh({ hard: false, delay: 180 });
        return () => {
            stopHard();
            stopSoft();
        };
    }, [aosRefreshKey]);

    return (
        <div ref={pageRef} className="space-y-5">
            <section
                className="glass-surface rounded-3xl p-5 md:p-6"
                data-aos="fade-up"
                data-aos-duration="420"
                data-aos-offset="24"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Employee Directory</p>
                        <h3 className="font-display text-2xl font-semibold text-slate-900">
                            Employee cards by organizational hierarchy
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Starting from Director, Head Unit, Staff, Teacher, SE Teacher, and Support Staff.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-700">
                        <p className="font-medium">{totalVisibleEmployees} employees shown</p>
                        <p className="text-xs text-slate-500">Total records stored: {totalEmployees}</p>
                    </div>
                </div>
            </section>

            <section
                className="glass-surface rounded-3xl p-5"
                data-aos="fade-up"
                data-aos-duration="420"
                data-aos-offset="16"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="mb-4 flex items-center gap-2 text-slate-700">
                    <Filter className="h-4 w-4" />
                    <p className="text-sm font-medium">Employee filters</p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <label className="space-y-1.5" data-aos="fade-right" data-aos-delay="40" data-aos-duration="360" data-aos-once="false">
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

                    <label className="space-y-1.5" data-aos="fade-right" data-aos-delay="80" data-aos-duration="360" data-aos-once="false">
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

                    <label className="space-y-1.5" data-aos="fade-right" data-aos-delay="120" data-aos-duration="360" data-aos-once="false">
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

                <button type="button" onClick={clearFilters} className="glass-button mt-4">
                    Reset Filters
                </button>
            </section>

            {noResults && (
                <section
                    className="glass-surface rounded-3xl p-8 text-center"
                    data-aos="fade-up"
                    data-aos-duration="360"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom"
                >
                    <Users2 className="mx-auto h-8 w-8 text-slate-500" />
                    <p className="mt-3 text-slate-700">No data matches the selected filters.</p>
                    <p className="mt-1 text-xs text-slate-500">Try changing search keyword or reset filters.</p>
                </section>
            )}

            <div className="space-y-5">
                {hierarchy.map((group, index) => (
                    <RoleGroupSection
                        key={group.roleGroup}
                        group={group}
                        groupIndex={index}
                        onCardClick={(employee) => navigate(`/employees/${employee._id}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmployeeDirectoryPage;
