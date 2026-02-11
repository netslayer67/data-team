import React from 'react';
import { Briefcase } from 'lucide-react';
import EmployeeCard from './EmployeeCard';

const accentByRole = {
    Director: 'from-cyan-500 to-sky-500',
    'Head Unit': 'from-blue-500 to-cyan-500',
    Staff: 'from-amber-500 to-orange-500',
    Teacher: 'from-emerald-500 to-teal-500',
    'SE Teacher': 'from-teal-500 to-emerald-500',
    'Support Staff': 'from-slate-500 to-blue-500',
    Others: 'from-slate-500 to-slate-600'
};

const getCardAosConfig = (index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const animationCycle = ['fade-up', 'fade-up', 'zoom-in-up'];
    const animation = animationCycle[column] || 'fade-up';
    const delay = Math.min(50 + (row * 55) + (column * 28), 280);

    return {
        animation,
        delay
    };
};

const RoleGroupSection = ({ group, groupIndex = 0, onCardClick }) => {
    if (!group?.members?.length) {
        return null;
    }

    const accentClass = accentByRole[group.roleGroup] || accentByRole.Others;
    const groupDelay = Math.min(groupIndex * 40, 200);

    return (
        <section className="space-y-3">
            <div
                className="glass-surface rounded-3xl p-4 overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={groupDelay}
                data-aos-duration="460"
                data-aos-offset="26"
                data-aos-once="false"
                data-aos-easing="ease-out-cubic"
                data-aos-anchor-placement="top-bottom"
            >
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
                {group.members.map((employee, index) => {
                    const aosConfig = getCardAosConfig(index);
                    return (
                        <div
                            key={employee._id}
                            className="aos-card"
                            data-aos={aosConfig.animation}
                            data-aos-delay={aosConfig.delay}
                            data-aos-duration="420"
                            data-aos-offset="18"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-once="false"
                            data-aos-easing="ease-out-cubic"
                        >
                            <EmployeeCard
                                employee={employee}
                                compact
                                delay={0}
                                onClick={onCardClick}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default React.memo(RoleGroupSection);
