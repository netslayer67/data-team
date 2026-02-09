import React from 'react';
import { Building2, CalendarDays, Mail, Phone, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { InteractiveCard } from '../../../components/InteractiveCard';

const formatJoinDate = (value) => {
    if (!value) return 'Join date not available';
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(new Date(value));
};

const roleGradient = {
    Director: 'from-cyan-500/80 via-sky-500/70 to-indigo-500/70',
    'Head Unit': 'from-blue-500/80 via-cyan-500/70 to-sky-500/70',
    Staff: 'from-amber-500/80 via-orange-500/70 to-rose-500/65',
    Teacher: 'from-emerald-500/80 via-teal-500/70 to-cyan-500/70',
    Others: 'from-slate-500/80 via-slate-400/70 to-cyan-500/60'
};

const getAvatarUrl = (employee) => {
    if (employee.photoUrl) return employee.photoUrl;
    const name = encodeURIComponent(employee.fullName || 'Employee');
    return `https://ui-avatars.com/api/?name=${name}&background=0ea5e9&color=fff&rounded=true&bold=true&size=160`;
};

const EmployeeCard = ({ employee, delay = 0, onClick, compact = false }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [imgError, setImgError] = React.useState(false);
    const accent = roleGradient[employee.roleGroup] || roleGradient.Others;
    const initials = employee.fullName
        .split(' ')
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join('');

    if (compact) {
        return (
            <InteractiveCard
                className="cursor-pointer overflow-hidden h-full"
                accent={accent}
                delay={delay}
                onHoverChange={setIsHovered}
                onClick={() => onClick?.(employee)}
                forceVisible
            >
                <div className="relative p-3.5 h-full flex flex-col">
                    <div className={`absolute inset-x-0 top-0 h-14 bg-gradient-to-r ${accent} opacity-30`} />

                    <div className="relative z-10 flex items-start gap-2.5 min-w-0">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/60 bg-white/70">
                            {!imgError ? (
                                <img
                                    src={getAvatarUrl(employee)}
                                    alt={employee.fullName}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-700 bg-white/80">
                                    {initials}
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <motion.p
                                className="font-display text-[15px] font-semibold leading-tight text-slate-900 truncate"
                                animate={{ color: isHovered ? '#0369a1' : '#0f172a' }}
                                transition={{ duration: 0.2 }}
                            >
                                {employee.fullName}
                            </motion.p>
                            <p
                                className="text-[11px] text-slate-700 leading-tight mt-0.5"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                {employee.roleTitle}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-cyan-800 mt-1">{employee.employeeId}</p>
                        </div>
                    </div>

                    <div className="relative z-10 mt-3 flex items-center justify-between gap-2">
                        <span className="rounded-full border border-white/70 bg-white/70 px-2 py-0.5 text-[10px] font-medium text-slate-700 truncate max-w-[55%]">
                            {employee.employmentType}
                        </span>
                        <span className="rounded-full border border-white/70 bg-white/70 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                            {employee.status}
                        </span>
                    </div>

                    <div className="relative z-10 mt-2.5 space-y-1.5 text-[11px] text-slate-700">
                        <p className="flex items-center gap-1.5 truncate">
                            <Building2 className="h-3.5 w-3.5 text-slate-500" />
                            <span className="truncate">{employee.unit}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                            <span>{formatJoinDate(employee.joinDate)}</span>
                        </p>
                    </div>
                </div>
            </InteractiveCard>
        );
    }

    return (
        <InteractiveCard
            className="cursor-pointer overflow-hidden"
            accent={accent}
            delay={delay}
            onHoverChange={setIsHovered}
            onClick={() => onClick?.(employee)}
            forceVisible
        >
            <div className="relative p-4">
                <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-r ${accent} opacity-35`} />

                <motion.div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                        <motion.div
                            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-md"
                            whileHover={{ scale: 1.05, y: -1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {!imgError ? (
                                <img
                                    src={getAvatarUrl(employee)}
                                    alt={employee.fullName}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-700 bg-white/80">
                                    {initials}
                                </div>
                            )}
                        </motion.div>

                        <div className="min-w-0 pt-0.5">
                            <motion.p
                                className="font-display text-lg font-semibold leading-tight text-slate-900"
                                animate={{ color: isHovered ? '#0369a1' : '#0f172a' }}
                                transition={{ duration: 0.2 }}
                            >
                                {employee.fullName}
                            </motion.p>
                            <p className="text-sm text-slate-700">{employee.roleTitle}</p>
                            <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-800">{employee.employeeId}</p>
                        </div>
                    </div>

                    <div className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                        {employee.status}
                    </div>
                </motion.div>

                <div className="relative z-10 mt-4 grid grid-cols-1 gap-2 text-sm text-slate-700">
                    <div className="inline-flex w-fit items-center rounded-full border border-white/60 bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {employee.employmentType}
                    </div>

                    <p className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-slate-500" />
                        <span>{employee.unit}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-500" />
                        <span>{formatJoinDate(employee.joinDate)}</span>
                    </p>
                    {employee.email && (
                        <p className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-500" />
                            <span className="truncate">{employee.email}</span>
                        </p>
                    )}
                    {employee.phone && (
                        <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-slate-500" />
                            <span>{employee.phone}</span>
                        </p>
                    )}
                </div>

                {employee.highlights?.length > 0 && (
                    <div className="relative z-10 mt-3 flex flex-wrap gap-2">
                        {employee.highlights.slice(0, 3).map((highlight) => (
                            <span
                                key={`${employee._id}-${highlight}`}
                                className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/70 px-2 py-1 text-xs text-slate-700"
                            >
                                <Sparkles className="h-3 w-3 text-cyan-600" />
                                {highlight}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </InteractiveCard>
    );
};

export default React.memo(EmployeeCard);
