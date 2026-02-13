import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Building2, CalendarDays, Cake, Mail, Phone, Sparkles, Users2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard';
import PhotoCarousel from '../components/PhotoCarousel';
import { employees, getEmployeeById, getRelatedEmployees } from '../../../data/schoolData';
import { queueAOSRefresh } from '../../../utils/aos';

const getAvatarUrl = (employee) => {
    if (employee?.photoUrl) return employee.photoUrl;
    const name = encodeURIComponent(employee?.fullName || 'Employee');
    return `https://ui-avatars.com/api/?name=${name}&background=0ea5e9&color=fff&rounded=true&bold=true&size=280`;
};

const getEmployeePhotos = (employee) => {
    if (employee?.photos?.length) return employee.photos;
    if (employee?.photoUrl) return [employee.photoUrl];
    return [];
};

const formatJoinDate = (value) => {
    if (!value) return '-';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;

    const day = String(parsed.getDate()).padStart(2, '0');
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const year = parsed.getFullYear();
    return `${day}-${month}-${year}`;
};

const formatBirthDate = (value) => {
    if (!value) return '-';
    const monthMap = {
        Jan: 'January',
        Feb: 'February',
        Mar: 'March',
        Apr: 'April',
        May: 'May',
        Jun: 'June',
        Jul: 'July',
        Aug: 'August',
        Sep: 'September',
        Oct: 'October',
        Nov: 'November',
        Dec: 'December'
    };

    const normalized = value.trim();
    const match = normalized.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
    if (match) {
        const [, d, mon] = match;
        const month = monthMap[`${mon.charAt(0).toUpperCase()}${mon.slice(1).toLowerCase()}`];
        if (month) return `${String(d).padStart(2, '0')} - ${month}`;
    }

    const parsed = new Date(normalized);
    if (Number.isNaN(parsed.getTime())) return normalized;

    const day = String(parsed.getDate()).padStart(2, '0');
    const month = parsed.toLocaleString('en-US', { month: 'long' });
    return `${day} - ${month}`;
};

const getTenureText = (joinDate) => {
    if (!joinDate) return '-';
    const start = new Date(joinDate);
    const now = new Date();
    if (Number.isNaN(start.getTime()) || Number.isNaN(now.getTime())) return '-';
    if (start > now) return '0 months';

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    const days = now.getDate() - start.getDate();

    if (days < 0) months -= 1;
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    years = Math.max(0, years);
    months = Math.max(0, months);

    const anchor = new Date(start);
    anchor.setFullYear(start.getFullYear() + years);
    anchor.setMonth(start.getMonth() + months);
    const hasPartialMonth = now.getTime() > anchor.getTime();
    const roundedMonths = months + (hasPartialMonth ? 1 : 0);

    if (years >= 1) {
        return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
    }

    return `${roundedMonths} ${roundedMonths === 1 ? 'month' : 'months'}`;
};

const unitCardStyle = {
    Elementary: 'border-blue-200/70 bg-gradient-to-r from-blue-50/80 to-sky-50/70 text-blue-700',
    'Junior High': 'border-indigo-200/70 bg-gradient-to-r from-indigo-50/80 to-violet-50/70 text-indigo-700',
    Kindergarten: 'border-pink-200/70 bg-gradient-to-r from-pink-50/80 to-rose-50/70 text-pink-700',
    RISE: 'border-teal-200/70 bg-gradient-to-r from-teal-50/80 to-emerald-50/70 text-teal-700',
    SHIELD: 'border-slate-200/70 bg-gradient-to-r from-slate-50/80 to-gray-50/70 text-slate-700',
    SAFE: 'border-amber-200/70 bg-gradient-to-r from-amber-50/80 to-yellow-50/70 text-amber-700',
    COMPASS: 'border-cyan-200/70 bg-gradient-to-r from-cyan-50/80 to-sky-50/70 text-cyan-700',
    BRIDGE: 'border-violet-200/70 bg-gradient-to-r from-violet-50/80 to-purple-50/70 text-violet-700',
    'MAD Lab': 'border-fuchsia-200/70 bg-gradient-to-r from-fuchsia-50/80 to-purple-50/70 text-fuchsia-700',
    CARE: 'border-rose-200/70 bg-gradient-to-r from-rose-50/80 to-pink-50/70 text-rose-700',
    Directorate: 'border-sky-200/70 bg-gradient-to-r from-sky-50/80 to-cyan-50/70 text-sky-700'
};

const isTeachingRole = (employee) => ['Teacher', 'SE Teacher'].includes(employee?.roleGroup);

const getSecondaryBadgeText = (employee) => {
    if (isTeachingRole(employee)) {
        return employee.className ? `Class: ${employee.className}` : 'Class: -';
    }

    if (employee.employmentType) {
        return employee.employmentType;
    }

    if (employee.building) {
        return `Building: ${employee.building}`;
    }

    return '-';
};

const getFormalUsername = (employee) => {
    const raw = employee?.username?.trim();
    if (!raw) return '-';

    const username = raw.replace(/^(mr|ms)\.?\s+/i, '').trim();
    const prefix = employee?.gender === 'M' ? 'Mr.' : employee?.gender === 'F' ? 'Ms.' : '';
    return prefix ? `${prefix} ${username}` : username;
};

const DetailSkeleton = () => (
    <div className="space-y-5 animate-pulse">
        <section className="glass-surface rounded-3xl p-5">
            <div className="h-8 w-28 rounded-lg bg-white/50" />
            <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-[260px_1fr]">
                <div className="h-[300px] rounded-3xl bg-white/40" />
                <div className="space-y-3">
                    <div className="h-6 w-48 rounded-lg bg-white/40" />
                    <div className="h-4 w-40 rounded-lg bg-white/35" />
                    <div className="h-4 w-64 rounded-lg bg-white/35" />
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="h-12 rounded-xl bg-white/35" />
                        <div className="h-12 rounded-xl bg-white/35" />
                        <div className="h-12 rounded-xl bg-white/35" />
                        <div className="h-12 rounded-xl bg-white/35" />
                    </div>
                </div>
            </div>
        </section>

        <section className="glass-surface rounded-3xl p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                <div className="h-36 rounded-2xl bg-white/35" />
                <div className="h-36 rounded-2xl bg-white/35" />
                <div className="h-36 rounded-2xl bg-white/35" />
            </div>
        </section>
    </div>
);

const EmployeeDetailPage = () => {
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const shouldReduceMotion = useReducedMotion();
    const [isLoading, setIsLoading] = useState(true);

    const employee = useMemo(() => getEmployeeById(employeeId), [employeeId]);
    const relatedEmployees = useMemo(() => getRelatedEmployees(employeeId, 6), [employeeId]);
    const tenureText = useMemo(() => getTenureText(employee?.joinDate), [employee]);

    const stats = useMemo(() => {
        if (!employee) return null;

        const sameRoleTotal = employees.filter((item) => item.roleGroup === employee.roleGroup).length;
        const sameUnitTotal = employees.filter((item) => item.unit === employee.unit || item.secondaryUnit === employee.unit).length;
        return {
            sameRoleTotal,
            sameUnitTotal
        };
    }, [employee]);

    useEffect(() => {
        setIsLoading(true);
        let stopHard = () => {};
        let stopSoft = () => {};
        const timer = window.setTimeout(() => {
            setIsLoading(false);
            stopHard = queueAOSRefresh({ hard: true, delay: 32 });
            stopSoft = queueAOSRefresh({ hard: false, delay: 180 });
        }, 260);
        return () => {
            window.clearTimeout(timer);
            stopHard();
            stopSoft();
        };
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
            <section
                className="glass-surface relative overflow-hidden rounded-3xl p-5 md:p-6"
                data-aos="fade-up"
                data-aos-duration="420"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-300/35 to-sky-400/20 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 left-20 h-44 w-44 rounded-full bg-gradient-to-br from-amber-300/25 to-rose-300/20 blur-2xl" />

                <button
                    type="button"
                    onClick={() => navigate('/employees')}
                    className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/60 px-3 py-1.5 text-sm text-slate-700 hover:bg-white/80"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                <div className="relative z-10 grid grid-cols-1 gap-5 xl:grid-cols-[260px_1fr]">
                    <div data-aos="zoom-in" data-aos-delay="60" data-aos-duration="420" data-aos-once="false">
                        <div className="overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-white/80 to-white/55 p-2 shadow-sm">
                            {getEmployeePhotos(employee).length > 0 ? (
                                <PhotoCarousel photos={getEmployeePhotos(employee)} employeeName={employee.fullName} />
                            ) : (
                                <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/60">
                                    <img src={getAvatarUrl(employee)} alt={employee.fullName} className="h-full w-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div data-aos="fade-left" data-aos-delay="100" data-aos-duration="420" data-aos-once="false">
                        <p className="text-xs uppercase tracking-[0.16em] text-cyan-700">Employee Detail</p>
                        <h3 className="font-display text-3xl font-semibold text-slate-900">{employee.fullName}</h3>
                        <p className="mt-0.5 text-sm font-medium text-slate-600">{getFormalUsername(employee)}</p>
                        <p className="mt-1 text-slate-700">{employee.roleTitle}</p>
                        <p className="text-xs uppercase tracking-[0.14em] text-cyan-700">{employee.employeeId}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-emerald-200/70 bg-emerald-50/80 px-2.5 py-1 text-xs text-emerald-700">
                                {employee.status}
                            </span>
                            <span className="rounded-full border border-cyan-200/70 bg-cyan-50/75 px-2.5 py-1 text-xs text-cyan-800">
                                {getSecondaryBadgeText(employee)}
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                            <div className="rounded-xl border border-violet-200/70 bg-gradient-to-r from-violet-50/80 to-fuchsia-50/70 p-3 backdrop-blur-[2px]">
                                <p className="text-[11px] uppercase tracking-[0.12em] text-violet-700">Dedicated</p>
                                <p className="text-xl font-semibold text-slate-800">{tenureText}</p>
                                <p className="mt-0.5 text-[11px] text-violet-800/80">Since {formatJoinDate(employee.joinDate)}</p>
                            </div>
                            <div className="rounded-xl border border-cyan-200/70 bg-gradient-to-r from-cyan-50/80 to-sky-50/70 p-3 backdrop-blur-[2px]">
                                <p className="text-[11px] uppercase tracking-[0.12em] text-cyan-700">Same Role</p>
                                <p className="text-xl font-semibold text-slate-800">{stats.sameRoleTotal}</p>
                            </div>
                            <div className="rounded-xl border border-amber-200/70 bg-gradient-to-r from-amber-50/80 to-orange-50/70 p-3 backdrop-blur-[2px]">
                                <p className="text-[11px] uppercase tracking-[0.12em] text-amber-700">Same Unit</p>
                                <p className="text-xl font-semibold text-slate-800">{stats.sameUnitTotal}</p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-slate-700">
                            <div
                                className={`rounded-xl border p-3 flex items-center gap-2.5 ${unitCardStyle[employee.unit] || 'border-cyan-200/70 bg-gradient-to-r from-cyan-50/80 to-sky-50/70 text-cyan-700'}`}
                                data-aos="fade-up"
                                data-aos-delay="120"
                                data-aos-duration="360"
                                data-aos-once="false"
                            >
                                <Building2 className="h-4 w-4" />
                                <span className="font-medium">{employee.unit}</span>
                                {employee.secondaryUnit && employee.secondaryUnit !== employee.unit && (
                                    <span className={`ml-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${unitCardStyle[employee.secondaryUnit] || ''}`}>
                                        {employee.secondaryUnit}
                                    </span>
                                )}
                            </div>
                            <div
                                className="rounded-xl border border-violet-200/70 bg-gradient-to-r from-violet-50/80 to-fuchsia-50/70 p-3 flex items-center gap-2.5"
                                data-aos="fade-up"
                                data-aos-delay="140"
                                data-aos-duration="360"
                                data-aos-once="false"
                            >
                                <CalendarDays className="h-4 w-4 text-violet-700" />
                                <span><span className="font-medium">Join Date:</span> {formatJoinDate(employee.joinDate)}</span>
                            </div>
                            {employee.email && (
                                <div
                                    className="rounded-xl border border-emerald-200/70 bg-gradient-to-r from-emerald-50/80 to-teal-50/70 p-3 flex items-center gap-2.5"
                                    data-aos="fade-up"
                                    data-aos-delay="160"
                                    data-aos-duration="360"
                                    data-aos-once="false"
                                >
                                    <Mail className="h-4 w-4 text-emerald-700" />
                                    <span className="truncate">{employee.email}</span>
                                </div>
                            )}
                            {employee.birthDate && (
                                <div
                                    className="rounded-xl border border-amber-200/70 bg-gradient-to-r from-amber-50/80 to-rose-50/70 p-3 flex items-center gap-2.5"
                                    data-aos="fade-up"
                                    data-aos-delay="180"
                                    data-aos-duration="360"
                                    data-aos-once="false"
                                >
                                    <motion.span
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/70 bg-white/80 text-amber-600 shadow-sm"
                                        animate={shouldReduceMotion ? undefined : { y: [0, -2, 0], rotate: [0, -8, 8, 0] }}
                                        transition={shouldReduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                                        whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 14 }}
                                    >
                                        <Cake className="h-4 w-4" />
                                    </motion.span>
                                    <span>
                                        <span className="font-medium text-slate-800">Birthday:</span>{' '}
                                        <span className="text-slate-700">{formatBirthDate(employee.birthDate)}</span>
                                    </span>
                                </div>
                            )}
                        </div>

                        {employee.phone && (
                            <div className="mt-3 rounded-xl border border-white/70 bg-white/60 p-3 flex items-center gap-2 text-sm text-slate-700">
                                <Phone className="h-4 w-4 text-slate-500" />
                                <span>{employee.phone}</span>
                            </div>
                        )}

                        {employee.highlights?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {employee.highlights.map((item, index) => (
                                    <span
                                        key={`${employee._id}-${item}`}
                                        className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-xs text-slate-700"
                                        data-aos="zoom-in"
                                        data-aos-delay={220 + (index * 40)}
                                        data-aos-duration="320"
                                        data-aos-once="false"
                                    >
                                        <Sparkles className="h-3 w-3 text-cyan-600" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section
                className="glass-surface rounded-3xl p-5"
                data-aos="fade-up"
                data-aos-duration="420"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h4 className="font-display text-xl font-semibold text-slate-900 inline-flex items-center gap-2">
                        <Users2 className="h-5 w-5 text-cyan-700" /> Related Team Members
                    </h4>
                    <span className="rounded-full border border-white/60 bg-white/60 px-2.5 py-1 text-xs text-slate-600">
                        {relatedEmployees.length} people
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {relatedEmployees.map((item, index) => (
                        <div
                            key={item._id}
                            data-aos="fade-up"
                            data-aos-delay={Math.min(index * 40, 200)}
                            data-aos-duration="360"
                            data-aos-once="false"
                        >
                            <EmployeeCard
                                employee={item}
                                delay={0}
                                compact
                                onClick={(selected) => navigate(`/employees/${selected._id}`)}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default EmployeeDetailPage;
