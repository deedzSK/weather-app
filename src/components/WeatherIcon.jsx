import Sunny from '../svg/Sunny.svg';
import FewClouds from '../svg/Few-Clouds.svg';
import ScatteredClouds from '../svg/Scaterred-Clouds.svg';
import BrokenCloudy from '../svg/Broken-Cloudy.svg';
import ShowerRain from '../svg/Shower-Rain&Sun.svg';
import Rain from '../svg/Rain&Sun.svg';
import Thunderstorm from '../svg/Thunderstorm.svg';
import Snow from '../svg/Snow.svg';
import Fog from '../svg/Fog.svg';

// Маппинг weathercode (WMO) → иконка
const weatherIcons = {
    0: Sunny,              // Ясно
    1: FewClouds,          // Преимущественно ясно
    2: ScatteredClouds,    // Переменная облачность
    3: BrokenCloudy,       // Пасмурно
    45: Fog,               // Туман
    48: Fog,               // Изморозь
    51: ShowerRain,        // Лёгкая морось
    53: ShowerRain,        // Морось
    55: Rain,              // Сильная морось
    56: ShowerRain,        // Ледяная морось
    57: Rain,              // Сильная ледяная морось
    61: ShowerRain,        // Небольшой дождь
    63: Rain,              // Дождь
    65: Rain,              // Сильный дождь
    66: Rain,              // Ледяной дождь
    67: Rain,              // Сильный ледяной дождь
    71: Snow,              // Небольшой снег
    73: Snow,              // Снег
    75: Snow,              // Сильный снег
    77: Snow,              // Снежная крупа
    80: ShowerRain,        // Лёгкий ливень
    81: Rain,              // Ливень
    82: Rain,              // Сильный ливень
    85: Snow,              // Снегопад
    86: Snow,              // Сильный снегопад
    95: Thunderstorm,      // Гроза
    96: Thunderstorm,      // Гроза с градом
    99: Thunderstorm,      // Гроза с сильным градом
};

export function WeatherIcon({ code, size = 70, className = "" }) {
    const icon = weatherIcons[code] || BrokenCloudy;

    return (
        <img
            src={icon}
            alt="weather icon"
            width={size}
            height={size}
            className={className}
        />
    );
}
