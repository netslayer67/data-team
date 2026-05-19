import React from 'react';
import { ChevronRight } from 'lucide-react';
import EmployeeListCard from './EmployeeListCard';

const accentByRole = {
    Director: 'from-cyan-500 to-sky-500',
    'Head Unit': 'from-blue-500 to-cyan-500',
    Staff: 'from-amber-500 to-orange-500',
    Teacher: 'from-emerald-500 to-teal-500',
    'SE Teacher': 'from-teal-500 to-emerald-500',
    'Support Staff': 'from-slate-500 to-blue-500',
    Others: 'from-slate-500 to-slate-600'
};

const RoleGroupSection = ({ group, onCardClick }) => {
    if (!group?.members?.length) return null;

    const accentClass = accentByRole[group.roleGroup] || accentByRole.Others;
    const pageLabel = group.overallTotal > group.total
        ? `${group.total} of ${group.overallTotal}`
        : `${group.total}`;

    return (
        <section className="space-y-3">
            {/* Section header */}
            <div className="glass-surface rounded-[24px] p-4 md:p-5">
                <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${accentClass} rounded-t-[24px]`} />
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`h-8 w-1.5 shrink-0 rounded-full bg-gradient-to-b ${accentClass}`} />
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Role Group</p>
                            <h3 className="font-display text-lg font-semibold leading-tight text-slate-900">
                                {group.roleGroup}
                            </h3>
                        </div>
                    </div>
                    <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                        {pageLabel} people
                    </span>
                </div>
            </div>

            {/* Photo cards — horizontal scroll on mobile, grid on sm+ */}
            <div className="photo-cards-layout">
                {group.members.map((employee) => (
                    <EmployeeListCard
                        key={employee._id}
                        employee={employee}
                        onClick={onCardClick}
                    />
                ))}
            </div>

            {/* Scroll hint on mobile when there are more than 3 cards */}
            {group.members.length > 3 && (
                <div className="flex items-center justify-end gap-1 pr-1 sm:hidden">
                    <span className="text-[11px] text-white/40">scroll</span>
                    <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                </div>
            )}
        </section>
    );
};

export default React.memo(RoleGroupSection);
