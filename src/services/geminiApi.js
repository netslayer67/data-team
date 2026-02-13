const GEMINI_API_KEY = 'AIzaSyD6ghrO6aTcZSwVeqArVX1n2feDfrWlY10';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const CACHE_KEY = 'zodiac-horoscope-cache';
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours

const getCachedResult = (sign, type) => {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const cache = JSON.parse(raw);
        const key = `${sign}-${type}`;
        const entry = cache[key];
        if (!entry) return null;
        if (Date.now() - entry.timestamp > CACHE_TTL) return null;
        return entry.data;
    } catch {
        return null;
    }
};

const setCachedResult = (sign, type, data) => {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        const cache = raw ? JSON.parse(raw) : {};
        cache[`${sign}-${type}`] = { data, timestamp: Date.now() };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
        // silently fail
    }
};

export const generateHoroscope = async (sign, type = 'daily') => {
    const cached = getCachedResult(sign, type);
    if (cached) return cached;

    const now = new Date();
    const monthName = now.toLocaleString('en-US', { month: 'long' });
    const year = now.getFullYear();
    const day = now.getDate();

    const timeframe = type === 'monthly'
        ? `the month of ${monthName} ${year}`
        : `today, ${monthName} ${day}, ${year}`;

    const prompt = `You are a fun and playful professional astrologer. Create a zodiac horoscope for ${sign} for ${timeframe}.

Respond in the following JSON format (no markdown code block):
{
  "mood": "one word mood for today",
  "luckyNumber": lucky number (1-99),
  "luckyColor": "lucky color",
  "rating": number 1-5 for luck rating,
  "prediction": "a 2-3 sentence fun, positive, and motivational horoscope prediction. Use a casual and uplifting tone."
}

Make sure the response is ONLY valid JSON with no additional text.`;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 300
                }
            })
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const result = await response.json();
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        const parsed = JSON.parse(cleaned);

        const data = {
            mood: parsed.mood || 'Positive',
            luckyNumber: Number(parsed.luckyNumber) || Math.floor(Math.random() * 99) + 1,
            luckyColor: parsed.luckyColor || 'Blue',
            rating: Math.min(5, Math.max(1, Number(parsed.rating) || 3)),
            prediction: parsed.prediction || 'A day full of positive energy awaits you!',
            source: 'ai'
        };

        setCachedResult(sign, type, data);
        return data;
    } catch {
        return null;
    }
};
