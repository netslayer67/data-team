import React, { useMemo, useState } from 'react';
import { Filter, Search, Users2 } from 'lucide-react';
import RoleGroupSection from '../components/RoleGroupSection';
import { getEmployees, getEmployeesHierarchy, getSchoolFilters } from '../../../data/schoolData';
import { ScrollDepth3D } from '../../../components/ParallaxSection';

const EmployeeDirectoryPage = () => {
    const [filters, setFilters] = useState({
        search: '',
        unit: '',
        status: '',
        employmentType: ''
    });

    const availableFilters = useMemo(() => getSchoolFilters(), []);
    const dummyHierarchy = useMemo(() => getEmployeesHierarchy(), []);
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
            status: '',
            employmentType: ''
        });
    };

    const noResults = hierarchy.every((group) => !group.total);
    const displayHierarchy = noResults ? dummyHierarchy : hierarchy;

    return (
        <div className="space-y-5">
            <ScrollDepth3D intensity={6} depth={8} className="render-optimized">
                <section className="glass-surface rounded-3xl p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Employee Directory</p>
                            <h3 className="font-display text-2xl font-semibold text-slate-900">
                                Employee cards by organizational hierarchy
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Starting from Director, Head Unit, Staff, Teachers, and Others.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-700">
                            <p className="font-medium">{totalVisibleEmployees} employees shown</p>
                            <p className="text-xs text-slate-500">Total records stored: {totalEmployees}</p>
                        </div>
                    </div>
                </section>
            </ScrollDepth3D>

            <ScrollDepth3D intensity={5} depth={7} className="render-optimized">
                <section className="glass-surface rounded-3xl p-5">
                    <div className="mb-4 flex items-center gap-2 text-slate-700">
                        <Filter className="h-4 w-4" />
                        <p className="text-sm font-medium">Employee filters</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
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

                        <label className="space-y-1.5">
                            <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Employment</span>
                            <select
                                value={filters.employmentType}
                                onChange={(event) => handleFilterChange('employmentType', event.target.value)}
                                className="glass-input"
                            >
                                <option value="">All Types</option>
                                {availableFilters.employmentTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <button type="button" onClick={clearFilters} className="glass-button mt-4">
                        Reset Filters
                    </button>
                </section>
            </ScrollDepth3D>

            {noResults && (
                <ScrollDepth3D intensity={4} depth={5} className="render-optimized">
                    <section className="glass-surface rounded-3xl p-8 text-center">
                        <Users2 className="mx-auto h-8 w-8 text-slate-500" />
                        <p className="mt-3 text-slate-700">No data matches the selected filters.</p>
                        <p className="mt-1 text-xs text-slate-500">Showing dummy employee cards from all segments.</p>
                    </section>
                </ScrollDepth3D>
            )}

            <div className="space-y-5">
                {displayHierarchy.map((group, index) => (
                    <ScrollDepth3D key={group.roleGroup} intensity={7 + (index * 0.4)} depth={10} className="render-optimized">
                        <RoleGroupSection group={group} />
                    </ScrollDepth3D>
                ))}
            </div>
        </div>
    );
};

export default EmployeeDirectoryPage;
