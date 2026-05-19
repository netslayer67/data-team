import React from 'react';

const roleGradient = {
    Director: 'from-cyan-500 via-sky-500 to-indigo-500',
    'Head Unit': 'from-blue-500 via-cyan-500 to-sky-500',
    Staff: 'from-amber-500 via-orange-500 to-rose-500',
    Teacher: 'from-emerald-500 via-teal-500 to-cyan-500',
    'SE Teacher': 'from-teal-500 via-emerald-500 to-cyan-500',
    'Support Staff': 'from-slate-500 via-slate-400 to-sky-500',
    Others: 'from-slate-500 via-slate-400 to-cyan-500'
};

const statusDot = {
    Active: 'bg-emerald-400',
    Probation: 'bg-amber-400',
    'On Leave': 'bg-slate-400',
};

const optimizePortraitUrl = (url) => {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_280,h_380,c_fill,g_face/');
};

const optimizeThumbUrl = (url) => {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_88,h_88,c_thumb,g_face,z_0.7/');
};

const getGeneratedAvatarUrl = (employee, size = 280) => {
    const name = encodeURIComponent(employee.fullName || 'Employee');
    const bg = (employee.avatarColor || '#0ea5e9').replace('#', '');
    return `https://ui-avatars.com/api/?name=${name}&background=${bg}&color=fff&bold=true&size=${size}`;
};

const getAvatarSources = (employee, compact = false) => {
    const size = compact ? 88 : 280;
    const optimize = compact ? optimizeThumbUrl : optimizePortraitUrl;
    const fallback = getGeneratedAvatarUrl(employee, size);
    const unique = [];

    [employee?.photoUrl, ...(Array.isArray(employee?.photos) ? employee.photos : [])]
        .filter(Boolean)
        .forEach((url) => {
            const optimized = optimize(url);
            if (!unique.includes(optimized)) unique.push(optimized);
        });

    unique.push(fallback);
    return unique;
};

const useAvatar = (employee, compact) => {
    const [imgError, setImgError] = React.useState(false);
    const [avatarIndex, setAvatarIndex] = React.useState(0);
    const sources = React.useMemo(() => getAvatarSources(employee, compact), [employee, compact]);
    const src = sources[Math.min(avatarIndex, sources.length - 1)];
    const initials = employee.fullName
        .split(' ')
        .slice(0, 2)
        .map((w) => w.charAt(0).toUpperCase())
        .join('');

    React.useEffect(() => {
        setImgError(false);
        setAvatarIndex(0);
    }, [employee?._id]);

    const onError = () => {
        if (avatarIndex < sources.length - 1) {
            setAvatarIndex((p) => p + 1);
        } else {
            setImgError(true);
        }
    };

    return { imgError, src, initials, onError };
};

/* ── Compact horizontal card (used in Related Team Members) ─────────── */
const CompactCard = ({ employee, accent, onClick }) => {
    const { imgError, src, initials, onError } = useAvatar(employee, true);

    return (
        <button
            type="button"
            className="related-member-card"
            onClick={() => onClick?.(employee)}
            aria-label={`View ${employee.fullName}`}
        >
            <div className={`related-member-card__stripe bg-gradient-to-b ${accent}`} />

            <div className="related-member-card__avatar">
                {!imgError ? (
                    <img
                        src={src}
                        alt={employee.fullName}
                        className="h-full w-full object-cover"
                        decoding="async"
                        loading="lazy"
                        onError={onError}
                    />
                ) : (
                    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${accent} text-white text-sm font-bold`}>
                        {initials}
                    </div>
                )}
            </div>

            <div className="related-member-card__info">
                <p className="related-member-card__name">{employee.fullName}</p>
                <p className="related-member-card__role">{employee.roleTitle}</p>
                <span className="related-member-card__unit">{employee.unit}</span>
            </div>

            <span className={`related-member-card__dot ${statusDot[employee.status] || 'bg-slate-400'}`} />
        </button>
    );
};

/* ── Portrait photo card (used in Employee Directory) ───────────────── */
const PortraitCard = ({ employee, accent, onClick }) => {
    const { imgError, src, initials, onError } = useAvatar(employee, false);

    return (
        <button
            type="button"
            className="photo-employee-card"
            onClick={() => onClick?.(employee)}
            aria-label={`View ${employee.fullName}`}
        >
            <div className={`photo-employee-card__topbar bg-gradient-to-r ${accent}`} />

            <div className="photo-employee-card__photo">
                {!imgError ? (
                    <img
                        src={src}
                        alt={employee.fullName}
                        className="photo-employee-card__img"
                        decoding="async"
                        loading="lazy"
                        onError={onError}
                    />
                ) : (
                    <div className={`photo-employee-card__fallback bg-gradient-to-br ${accent}`}>
                        <span className="photo-employee-card__initials">{initials}</span>
                    </div>
                )}
            </div>

            <div className="photo-employee-card__overlay" />
            <span className={`photo-employee-card__status-dot ${statusDot[employee.status] || 'bg-slate-400'}`} />

            <div className="photo-employee-card__info">
                <p className="photo-employee-card__name">{employee.fullName}</p>
                <p className="photo-employee-card__role">{employee.roleTitle}</p>
                <span className="photo-employee-card__unit">{employee.unit}</span>
            </div>
        </button>
    );
};

/* ── Public export ───────────────────────────────────────────────────── */
const EmployeeListCard = ({ employee, onClick, compact = false }) => {
    const accent = roleGradient[employee.roleGroup] || roleGradient.Others;
    if (compact) {
        return <CompactCard employee={employee} accent={accent} onClick={onClick} />;
    }
    return <PortraitCard employee={employee} accent={accent} onClick={onClick} />;
};

export default React.memo(EmployeeListCard);
