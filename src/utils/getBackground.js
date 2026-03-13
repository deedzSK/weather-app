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

export const getRandomBackground = () => {
    const season = getSeason();
    const timeOfDay = getTimeOfDay();

    const seasonKey = `../bg-photo/${season}/${timeOfDay}/`;
    const allSeasonsKey = `../bg-photo/all-seasons/${timeOfDay}/`;

    const candidates = Object.entries(allImages)
        .filter(([path]) => path.startsWith(seasonKey) || path.startsWith(allSeasonsKey))
        .map(([, mod]) => mod.default);

    if (candidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        return `url(${candidates[randomIndex]})`;
    }

    return `url(${bgDefault})`;
};

export const defaultBackground = `url(${bgDefault})`;

// Предзагрузка картинки — показываем только когда она готова
export const preloadImage = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(`url(${bgDefault})`);
        img.src = url;
    });
};
