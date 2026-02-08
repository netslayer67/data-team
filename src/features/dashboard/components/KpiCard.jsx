import React from 'react';
import { InteractiveKpiCard } from '../../../components/InteractiveCard';

const KpiCard = ({
    label,
    value,
    hint,
    accent = 'from-cyan-500/80 to-sky-500/80',
    delay = 0,
    trend = null,
    onClick
}) => {
    return (
        <InteractiveKpiCard
            label={label}
            value={value}
            hint={hint}
            accent={accent}
            delay={delay}
            trend={trend}
            onClick={onClick}
        />
    );
};

export default React.memo(KpiCard);
