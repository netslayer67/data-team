import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Building2, CalendarDays, Mail, Phone, Sparkles, Users2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard';
import { InteractiveKpiCard } from '../../../components/InteractiveCard';
import { ScrollDepth3D } from '../../../components/ParallaxSection';
import { employees, getEmployeeById, getRelatedEmployees } from '../../../data/schoolData';

const getAvatarUrl = (employee) => {
    if (employee?.photoUrl) return employee.photoUrl;
    const name = encodeURIComponent(employee?.fullName || 'Employee');
    return `https://ui-avatars.com/api/?name=${name}&background=0ea5e9&color=fff&rounded=true&bold=true&size=280`;
};

const formatJoinDate = (value) => {
    if (!value) return '-';
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(value));
};

const getYearsOfService = (joinDate) => {
    if (!joinDate) return 0;
    const start = new Date(joinDate);
    const now = new Date();
    const diffYears = (now - start) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.max(0, Math.floor(diffYears));
};

const DetailSkeleton = () => (
    <div className="space-y-5 animate-pulse">
        <section className="glass-surface rounded-3xl p-5">
            <div className="h-8 w-28 rounded-lg bg-white/50" />
            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
                <div className="h-[260px] rounded-3xl bg-white/40" />
                <div className="space-y-3">
                    <div className="h-6 w-48 rounded-lg bg-white/40" />
                    <div className="h-4 w-32 rounded-lg bg-white/35" />
                    <div className="h-4 w-28 rounded-lg bg-white/35" />
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="h-12 rounded-xl bg-white/35" />
                        <div className="h-12 rounded-xl bg-white/35" />
                        <div className="h-12 rounded-xl bg-white/35 sm:col-span-2" />
                    </div>
                </div>
            </div>
        </section>

        <section className="glass-surface rounded-3xl p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="h-28 rounded-2xl bg-white/35" />
                <div className="h-28 rounded-2xl bg-white/35" />
                <div className="h-28 rounded-2xl bg-white/35" />
            </div>
        </section>
    </div>
);

const EmployeeDetailPage = () => {
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const employee = useMemo(() => getEmployeeById(employeeId), [employeeId]);
    const relatedEmployees = useMemo(() => getRelatedEmployees(employeeId, 6), [employeeId]);

    const stats = useMemo(() => {
        if (!employee) return null;

        const sameRoleTotal = employees.filter((item) => item.roleGroup === employee.roleGroup).length;
        const sameUnitTotal = employees.filter((item) => item.unit === employee.unit).length;
        return {
            sameRoleTotal,
            sameUnitTotal
        };
    }, [employee]);

    useEffect(() => {
        setIsLoading(true);
        const timer = window.setTimeout(() => setIsLoading(false), 420);
        return () => window.clearTimeout(timer);
    }, [employeeId]);

    if (!employee && !isLoading) {
        return (
            <section className="glass-surface rounded-3xl p-6">
                <p className="text-slate-700">Employee not found.</p>
                <button type="button" className="glass-button mt-4" onClick={() => navigate('/employees')}>
                    Back to directory
                </button>
            </section>
        );
    }

    if (isLoading || !employee || !stats) {
        return <DetailSkeleton />;
    }

    return (
        <div className="space-y-5">
            <ScrollDepth3D intensity={6} depth={8} drift={8} className="render-optimized">
                <section className="glass-surface rounded-3xl p-5">
                    <button
                        type="button"
                        onClick={() => navigate('/employees')}
                        className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/60 px-3 py-1.5 text-sm text-slate-700 hover:bg-white/80"
                    >
                        <ArrowLeft className="h-4 w-4" />
Back
                    </button>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
                        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/60">
                            <img src={getAvatarUrl(employee)} alt={employee.fullName} className="h-full w-full object-cover" />
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.16em] text-cyan-700">Employee Detail</p>
                            <h3 className="font-display text-3xl font-semibold text-slate-900">{employee.fullName}</h3>
                            <p className="mt-1 text-slate-700">{employee.roleTitle}</p>
                            <p className="text-xs uppercase tracking-[0.14em] text-cyan-700">{employee.employeeId}</p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-xs text-slate-700">{employee.status}</span>
                                <span className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-xs text-slate-700">{employee.employmentType}</span>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-slate-700">
                                <div className="rounded-xl border border-white/60 bg-white/55 p-3 flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-slate-500" /> {employee.unit}
                                </div>
                                <div className="rounded-xl border border-white/60 bg-white/55 p-3 flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-slate-500" /> {formatJoinDate(employee.joinDate)}
                                </div>
                                {employee.email && (
                                    <div className="rounded-xl border border-white/60 bg-white/55 p-3 flex items-center gap-2 sm:col-span-2">
                                        <Mail className="h-4 w-4 text-slate-500" /> {employee.email}
                                    </div>
                                )}
                                {employee.phone && (
                                    <div className="rounded-xl border border-white/60 bg-white/55 p-3 flex items-center gap-2 sm:col-span-2">
                                        <Phone className="h-4 w-4 text-slate-500" /> {employee.phone}
                                    </div>
                                )}
                            </div>

                            {employee.highlights?.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {employee.highlights.map((item) => (
                                        <span key={`${employee._id}-${item}`} className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-xs text-slate-700">
                                            <Sparkles className="h-3 w-3 text-cyan-600" />
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </ScrollDepth3D>

            <ScrollDepth3D intensity={6} depth={9} drift={-8} className="render-optimized">
                <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InteractiveKpiCard
                        label="Same Role"
                        value={`${stats.sameRoleTotal}`}
                        hint={employee.roleGroup}
                        accent="from-violet-500/80 to-indigo-500/80"
                        forceVisible
                    />
                    <InteractiveKpiCard
                        label="Same Unit"
                        value={`${stats.sameUnitTotal}`}
                        hint={employee.unit}
                        accent="from-emerald-500/80 to-cyan-500/80"
                        forceVisible
                    />
                </section>
            </ScrollDepth3D>

            <ScrollDepth3D intensity={7} depth={10} drift={10} className="render-optimized">
                <section className="glass-surface rounded-3xl p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h4 className="font-display text-xl font-semibold text-slate-900 inline-flex items-center gap-2">
                            <Users2 className="h-5 w-5 text-cyan-700" /> See more
                        </h4>
                        <span className="text-xs text-slate-500">Related employees</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {relatedEmployees.map((item, index) => (
                            <EmployeeCard
                                key={item._id}
                                employee={item}
                                delay={index * 0.03}
                                compact
                                onClick={(selected) => navigate(`/employees/${selected._id}`)}
                            />
                        ))}
                    </div>
                </section>
            </ScrollDepth3D>
        </div>
    );
};

export default EmployeeDetailPage;
