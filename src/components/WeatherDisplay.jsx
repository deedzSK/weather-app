import { WeatherIcon } from './WeatherIcon.jsx';

export function WeatherDisplay({ weather, city }) {
    const now = new Date();

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(now);

    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(now);
    const finalDateStr = formattedDate.replace(/ (\d{2})$/, " '$1");

    return (
        <div>
            {/* Десктоп */}
            <div className="px-1 py-2 mb-30.5 hidden xl:flex items-end gap-2.5 bg-black/30 backdrop-blur-sm rounded-2xl">
                <h1 className="text-[143px] leading-none -mb-3 -mt-4">{weather.temperature_2m}°</h1>
                <div className="weather-info flex flex-col gap-1.5">
                    <h3 className="text-[48px] leading-none">{city}</h3>
                    <p className="text-[16px] leading-non">{formattedTime} - {finalDateStr}</p>
                    <p className="text-[20px] leading-none mb-2">Feels like {weather.apparent_temperature}°</p>
                </div>
                <WeatherIcon code={weather.weathercode} size={70} className="mb-0.5" />
            </div>
            {/* Мобилка */}
            <div className="px-1 sm:px-4 py-2 ml-5.5 sm:ml-9.75 mb-7.5 sm:mb-20.25 flex xl:hidden items-end gap-2.5 bg-black/30 backdrop-blur-sm rounded-2xl">
                <h1 className="text-[64px] sm:text-[120px] leading-none -mb-0.5 -mt-3">{weather.temperature_2m}°</h1>
                <div className="weather-info flex flex-col gap-1.5 sm:gap-2">
                    <h3 className="text-[22px] sm:text-[44px] leading-none">{city}</h3>
                    <p className="text-[10px] sm:text-[17px] leading-none">{formattedTime} - {finalDateStr}</p>
                    <p className="text-[12px] sm:text-[19px] leading-none sm:mb-2 text-white/70">Feels like {weather.apparent_temperature}°</p>
                </div>
                <WeatherIcon code={weather.weathercode} size={70} className="mb-0.5 hidden sm:block" />
                <WeatherIcon code={weather.weathercode} size={40} className="mb-0.5 sm:hidden block" />
            </div>
        </div>
    )
}