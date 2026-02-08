import React from 'react';
import { Building2, CalendarDays, Mail, Phone } from 'lucide-react';
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

const EmployeeCard = ({ employee, delay = 0 }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const avatarColor = employee.avatarColor || '#0891b2';
    const initials = employee.fullName
        .split(' ')
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join('');

    return (
        <InteractiveCard
            className="p-4 cursor-pointer"
            accent="from-cyan-500/80 to-sky-500/80"
            delay={delay}
            onHoverChange={setIsHovered}
            forceVisible
        >
            <motion.div
                className="flex items-start gap-3"
            >
                <motion.div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white shadow-md"
                    style={{ backgroundColor: avatarColor }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    {initials}
                </motion.div>
                <div className="min-w-0">
                    <motion.p
                        className="font-display text-lg font-semibold leading-tight text-slate-900"
                        animate={{
                            color: isHovered ? '#0891b2' : '#0f172a'
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {employee.fullName}
                    </motion.p>
                    <motion.p className="text-sm text-slate-600">
                        {employee.roleTitle}
                    </motion.p>
                    <motion.p className="text-xs uppercase tracking-[0.16em] text-cyan-700">
                        {employee.employeeId}
                    </motion.p>
                </div>
            </motion.div>

            <motion.div className="mt-4 space-y-2 text-sm text-slate-700">
                <motion.div
                    className="inline-flex items-center rounded-full border border-white/60 bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    {employee.employmentType} · {employee.status}
                </motion.div>

                <motion.p
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <span>{employee.unit}</span>
                </motion.p>
                <motion.p
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    <span>{formatJoinDate(employee.joinDate)}</span>
                </motion.p>
                {employee.email && (
                    <motion.p
                        className="flex items-center gap-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span className="truncate">{employee.email}</span>
                    </motion.p>
                )}
                {employee.phone && (
                    <motion.p
                        className="flex items-center gap-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span>{employee.phone}</span>
                    </motion.p>
                )}
            </motion.div>

            {employee.highlights?.length > 0 && (
                <motion.div className="mt-3 flex flex-wrap gap-2">
                    {employee.highlights.map((highlight, index) => (
                        <motion.span
                            key={`${employee._id}-${highlight}`}
                            className="rounded-full border border-white/70 bg-white/70 px-2 py-1 text-xs text-slate-700"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {highlight}
                        </motion.span>
                    ))}
                </motion.div>
            )}
        </InteractiveCard>
    );
};

export default React.memo(EmployeeCard);
