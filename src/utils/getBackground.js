import bgDefault from '../bg-photo/default_bliss.webp';

// Автоматически подхватываем все .webp из bg-photo
const allImages = import.meta.glob('../bg-photo/**/*.webp', { eager: true });

const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
};

const getSeason = () => {
    const currentMonth = new Date().getMonth();
    if (currentMonth === 11 || currentMonth <= 1) return 'winter';
    if (currentMonth >= 2 && currentMonth <= 4) return 'spring';
    if (currentMonth >= 5 && currentMonth <= 7) return 'summer';
    return 'autumn';
};

// Вспомогательная функция для извлечения URL из модуля Vite
const extractUrl = (mod) => {
    if (typeof mod === 'string') return mod;
    if (mod && mod.default && typeof mod.default === 'string') return mod.default;
    return null;
};

export const getRandomBackground = () => {
    const season = getSeason();
    const timeOfDay = getTimeOfDay();
    
    const seasonSegment = `${season}/${timeOfDay}`;
    const allSeasonsSegment = `all-seasons/${timeOfDay}`;

    // Собираем кандидатов, проверяя наличие URL и исключая Bliss
    const candidates = Object.entries(allImages)
        .filter(([path]) => {
            const isMatch = path.includes(seasonSegment) || path.includes(allSeasonsSegment);
            return isMatch && !path.includes('default_bliss');
        })
        .map(([, mod]) => extractUrl(mod))
        .filter(url => url !== null);

    if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    // Fallback: Любое фото кроме Bliss
    const fallbackCandidates = Object.entries(allImages)
        .filter(([path]) => !path.includes('default_bliss'))
        .map(([, mod]) => extractUrl(mod))
        .filter(url => url !== null);

    if (fallbackCandidates.length > 0) {
        return fallbackCandidates[Math.floor(Math.random() * fallbackCandidates.length)];
    }

    return bgDefault;
};

export const defaultBackground = bgDefault;

export const preloadImage = (url) => {
    if (!url) return Promise.resolve(bgDefault);
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(bgDefault);
        img.src = url;
    });
};
