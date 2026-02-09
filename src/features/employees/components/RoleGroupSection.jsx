import React from 'react';
import { Briefcase } from 'lucide-react';
import EmployeeCard from './EmployeeCard';

const accentByRole = {
    Director: 'from-cyan-500 to-sky-500',
    'Head Unit': 'from-blue-500 to-cyan-500',
    Staff: 'from-amber-500 to-orange-500',
    Teacher: 'from-emerald-500 to-teal-500',
    Others: 'from-slate-500 to-slate-600'
};

const RoleGroupSection = ({ group, onCardClick }) => {
    if (!group?.members?.length) {
        return null;
    }

    const accentClass = accentByRole[group.roleGroup] || accentByRole.Others;

    return (
        <section className="space-y-3 render-optimized">
            <div className="glass-surface rounded-3xl p-4 overflow-hidden">
                <div className={`absolute inset-x-0 top-0 h-14 bg-gradient-to-r ${accentClass} opacity-25`} />
                <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-white/60 text-slate-700">
                            <Briefcase className="h-4 w-4" />
                        </span>
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Role Group</p>
                            <h3 className="font-display text-xl font-semibold text-slate-900">{group.roleGroup}</h3>
                        </div>
                    </div>
                    <span className="rounded-full border border-white/60 bg-white/60 px-3 py-1 text-sm font-semibold text-slate-700">
                        {group.total} people
                    </span>
                </div>
                <div className={`relative z-10 mt-3 h-1.5 rounded-full bg-gradient-to-r ${accentClass}`} />
            </div>

            <div className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 xl:grid-cols-3">
                {group.members.map((employee, index) => (
                    <EmployeeCard
                        key={employee._id}
                        employee={employee}
                        compact
                        delay={index * 0.03}
                        onClick={onCardClick}
                    />
                ))}
            </div>
        </section>
    );
};

export default React.memo(RoleGroupSection);
