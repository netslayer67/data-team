export const ZODIAC_SIGNS = [
    { name: 'Aries', symbol: '\u2648', element: 'Fire', dateRange: '21 Mar - 19 Apr', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: 'Taurus', symbol: '\u2649', element: 'Earth', dateRange: '20 Apr - 20 May', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: 'Gemini', symbol: '\u264A', element: 'Air', dateRange: '21 May - 20 Jun', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { name: 'Cancer', symbol: '\u264B', element: 'Water', dateRange: '21 Jun - 22 Jul', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { name: 'Leo', symbol: '\u264C', element: 'Fire', dateRange: '23 Jul - 22 Aug', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: 'Virgo', symbol: '\u264D', element: 'Earth', dateRange: '23 Aug - 22 Sep', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: 'Libra', symbol: '\u264E', element: 'Air', dateRange: '23 Sep - 22 Oct', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { name: 'Scorpio', symbol: '\u264F', element: 'Water', dateRange: '23 Oct - 21 Nov', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { name: 'Sagittarius', symbol: '\u2650', element: 'Fire', dateRange: '22 Nov - 21 Dec', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
    { name: 'Capricorn', symbol: '\u2651', element: 'Earth', dateRange: '22 Dec - 19 Jan', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { name: 'Aquarius', symbol: '\u2652', element: 'Air', dateRange: '20 Jan - 18 Feb', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: 'Pisces', symbol: '\u2653', element: 'Water', dateRange: '19 Feb - 20 Mar', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 }
];

export const ELEMENT_COLORS = {
    Fire: { bg: 'from-orange-500/80 to-rose-500/80', light: 'bg-orange-50/80 text-orange-800 border-orange-200/60', glow: 'bg-orange-300/20' },
    Earth: { bg: 'from-emerald-500/80 to-teal-500/80', light: 'bg-emerald-50/80 text-emerald-800 border-emerald-200/60', glow: 'bg-emerald-300/20' },
    Air: { bg: 'from-sky-500/80 to-cyan-500/80', light: 'bg-sky-50/80 text-sky-800 border-sky-200/60', glow: 'bg-sky-300/20' },
    Water: { bg: 'from-blue-500/80 to-indigo-500/80', light: 'bg-blue-50/80 text-blue-800 border-blue-200/60', glow: 'bg-blue-300/20' }
};

const MOODS = ['Energized', 'Joyful', 'Calm', 'Creative', 'Focused', 'Optimistic', 'Driven', 'Cheerful', 'Peaceful', 'Productive', 'Bold', 'Wise'];
const COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Gold', 'Silver', 'White', 'Cyan', 'Orange', 'Teal'];

const DAILY_PREDICTIONS = {
    Aries: [
        'Your energy is at its peak today! It\'s time to take bold steps and show your leadership. Don\'t hesitate to start something new.',
        'Your fiery spirit burns bright today. Channel this energy into completing those pending tasks. The results will be satisfying!',
        'Exciting opportunities await behind every challenge today. Trust your instincts and don\'t be afraid to stand out from the crowd.'
    ],
    Taurus: [
        'Your stability and composure are your greatest strengths today. Focus on the things that bring you security and comfort.',
        'A perfect day to enjoy the simple things in life. Treat yourself once in a while — you absolutely deserve it!',
        'Your patience will bear sweet fruit today. Stay consistent with your plans and trust the process.'
    ],
    Gemini: [
        'Your communication skills are on fire today! Use them to strengthen relationships and share your brilliant ideas.',
        'Your curiosity takes you on a fun adventure today. Keep your eyes and ears open — there\'s so much to learn.',
        'Both sides of your personality are perfectly balanced today. Use this flexibility to adapt to any situation.'
    ],
    Cancer: [
        'Your intuition is strong today. Listen to your heart when making decisions, and don\'t forget to take care of yourself.',
        'A perfect day to strengthen bonds with your closest people. Your warmth and care are your superpowers!',
        'Positive emotions flow freely today. Share your kindness and attention — the world needs gentleness like yours.'
    ],
    Leo: [
        'Time to shine! Your charisma and creativity are at their peak. Don\'t hold back from taking center stage today.',
        'You\'re a magnet for positive energy today. Spread your enthusiasm to those around you — the impact will be incredible!',
        'Your confidence radiates powerfully today. Use this moment to inspire and lead with style.'
    ],
    Virgo: [
        'Your attention to detail is your secret weapon today. Everything you touch will feel more organized and polished.',
        'A productive day awaits! Make a to-do list and tackle items one by one. Your satisfaction will multiply.',
        'Your analytical skills are razor-sharp today. Use this ability to solve problems that have been lingering.'
    ],
    Libra: [
        'Harmony and balance are your main themes today. You have a natural talent for bringing peace to any situation.',
        'Your aesthetic sense is heightened! A great day to beautify your workspace or try something artistic.',
        'Your diplomacy is needed today. With your wisdom, conflicts can transform into beautiful collaborations.'
    ],
    Scorpio: [
        'Your intensity and focus are extraordinary today. Whatever you set your sights on is almost guaranteed to be achieved.',
        'You possess transformative power today. Turn yesterday\'s experiences into stepping stones for positive change.',
        'Your mystery and allure are peaking today. Don\'t be surprised when people are drawn to your ideas and opinions.'
    ],
    Sagittarius: [
        'Your adventurous spirit burns bright! Open your mind today to new perspectives and exciting experiences.',
        'Your optimism is contagious to everyone around you. Be a source of inspiration and show that life is an adventure!',
        'A perfect day to learn something new. Your curiosity and enthusiasm will open doors of opportunity.'
    ],
    Capricorn: [
        'Your ambition and determination are strong today. Every step you take brings you closer to your goals.',
        'Your discipline and hard work are starting to show results. Stay focused, but don\'t forget to appreciate your own achievements.',
        'Today you\'re a role model for consistency. People quietly admire your dedication. Keep going!'
    ],
    Aquarius: [
        'Your innovative ideas are flowing freely today. Don\'t be afraid to be unique and different from the rest!',
        'A great day for collaboration and sharing your vision for the future. Your connections bring positive energy.',
        'Your creativity and independent thinking are your main strengths today. The world needs your fresh perspective!'
    ],
    Pisces: [
        'Your imagination and empathy are running high today. Use them to create something beautiful and meaningful.',
        'Your intuition is incredibly accurate today. Trust your feelings and let the flow of life guide you in the right direction.',
        'Your artistic and spiritual side shines bright. A perfect day for self-reflection and creating from the heart.'
    ]
};

const MONTHLY_PREDICTIONS = {
    Aries: 'This month is packed with opportunities to lead and take initiative. Mars energy supports every bold move you make. Don\'t hesitate to kick off new projects!',
    Taurus: 'This month brings financial and emotional stability. Focus on building a strong foundation for the future. Also enjoy beautiful moments with your loved ones.',
    Gemini: 'Communication and networking are the keys to success this month. Many opportunities come through connections and conversations. Stay open and flexible!',
    Cancer: 'This month is perfect for reorganizing your home life and family matters. Your intuition is extremely strong — use it for important decisions. Self-care is a priority.',
    Leo: 'A month full of creativity and self-expression! Your stage is set, it\'s time to showcase your talents. Romance and fun are also on the rise.',
    Virgo: 'Focus on health and productivity this month. The small details you pay attention to will lead to big changes. Organization is your superpower.',
    Libra: 'Relationships and partnerships are in the spotlight this month. Balance between giving and receiving is crucial. Beauty and harmony surround you.',
    Scorpio: 'Deep transformation is happening this month. Let go of the old and welcome the new with open arms. Your inner strength is at its peak.',
    Sagittarius: 'Adventure and expansion are this month\'s themes. Learn something new, explore new places, or broaden your horizons. Optimism brings good fortune!',
    Capricorn: 'Career and ambition dominate this month. Your hard work is finally being recognized and valued. Stay disciplined but don\'t forget to rest and have fun.',
    Aquarius: 'This month is full of innovation and positive change. Your unique ideas are starting to be appreciated by many. Community and friendships bring happiness.',
    Pisces: 'Spirituality and creativity reach their peak this month. A perfect time for meditation, creating art, or deepening hobbies. Your dreams can become reality.'
};

const seededRandom = (seed) => {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) & 0xffffffff;
        return (state >>> 0) / 0xffffffff;
    };
};

export const getZodiacForToday = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    for (const sign of ZODIAC_SIGNS) {
        if (sign.startMonth === sign.endMonth) {
            if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) return sign;
        } else if (sign.startMonth > sign.endMonth) {
            if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) return sign;
        } else {
            if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) return sign;
        }
    }
    return ZODIAC_SIGNS[0];
};

export const getFallbackHoroscope = (signName, type = 'daily') => {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const seed = dayOfYear * 31 + signName.charCodeAt(0) * 7 + (type === 'monthly' ? 1000 : 0);
    const rng = seededRandom(seed);

    const dailyPool = DAILY_PREDICTIONS[signName] || DAILY_PREDICTIONS.Aries;
    const predIndex = Math.floor(rng() * dailyPool.length);

    return {
        mood: MOODS[Math.floor(rng() * MOODS.length)],
        luckyNumber: Math.floor(rng() * 99) + 1,
        luckyColor: COLORS[Math.floor(rng() * COLORS.length)],
        rating: Math.floor(rng() * 3) + 3,
        prediction: type === 'monthly' ? MONTHLY_PREDICTIONS[signName] || MONTHLY_PREDICTIONS.Aries : dailyPool[predIndex],
        source: 'fallback'
    };
};
