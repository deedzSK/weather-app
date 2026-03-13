import { WeatherIcon } from './WeatherIcon.jsx';

export function WeatherCard({ time, temperature, weathercode }) {
    // Форматируем время "2026-03-13T06:00" → "06:00"
    const hour = time.split('T')[1];

    // Описание погоды по коду
    const weatherDescriptions = {
        0: 'Clear', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
        45: 'Fog', 51: 'Drizzle', 61: 'Rain', 63: 'Heavy Rain',
        71: 'Snow', 73: 'Heavy Snow', 80: 'Showers', 95: 'Thunderstorm'
    };

    const description = weatherDescriptions[weathercode] || 'Cloudy';

    return (
        <div className="flex justify-between align-items-center">
            <div className="flex gap-10.25">
                <WeatherIcon code={weathercode} size={36} />
                <div className="text-[18px]">
                    <p>{hour}</p>
                    <p className="text-white/70">{description}</p>
                </div>
            </div>
            <p className="text-[24px] text-white/70">{temperature}°</p>
        </div>
    );
}
