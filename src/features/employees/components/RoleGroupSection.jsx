import React from 'react';
import EmployeeCard from './EmployeeCard';

const accentByRole = {
    Director: 'from-cyan-500 to-sky-500',
    'Head Unit': 'from-blue-500 to-cyan-500',
    Staff: 'from-amber-500 to-orange-500',
    Teacher: 'from-emerald-500 to-teal-500',
    Others: 'from-slate-500 to-slate-600'
};

const RoleGroupSection = ({ group }) => {
    if (!group?.members?.length) {
        return null;
    }

    const accentClass = accentByRole[group.roleGroup] || accentByRole.Others;

    return (
        <section className="space-y-3 render-optimized">
            <div className="glass-surface rounded-3xl p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Role Group</p>
                        <h3 className="font-display text-xl font-semibold text-slate-900">{group.roleGroup}</h3>
                    </div>
                    <span className="rounded-full border border-white/60 bg-white/60 px-3 py-1 text-sm font-semibold text-slate-700">
                        {group.total} people
                    </span>
                </div>
                <div className={`mt-3 h-1.5 rounded-full bg-gradient-to-r ${accentClass}`} />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
                {group.members.map((employee, index) => (
                    <EmployeeCard key={employee._id} employee={employee} delay={index * 0.05} />
                ))}
            </div>
        </section>
    );
};

export default React.memo(RoleGroupSection);
