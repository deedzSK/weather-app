import { useState } from 'react';
import { WeatherCard } from "./WeatherCard.jsx";
import { WeatherIcon } from "./WeatherIcon.jsx";

export function SearchBar({ onSearch, hourlyForecast }) {
    // Локальный стейт для хранения того, что пользователь вводит прямо сейчас
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        if (inputValue.trim() !== '') {
            onSearch(inputValue.trim()); // Отправляем город в App.jsx только при нажатии!
            setInputValue(''); // Очищаем поле после поиска
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Искать при нажатии на Enter
        }
    };

    return (
        <div className="w-full xl:w-auto h-[50vh] md:h-[30vh] xl:h-auto">
            {/* Десктоп версия */}
            <div className="hidden xl:flex h-dvh">
                <div className="w-1 h-full bg-gray-400/50"></div>
                <div className="pt-10 pl-8.75 pr-29 flex flex-col bg-black/30 backdrop-blur-sm">
                    <div className="flex items-center w-92.75 border-b border-white pb-2">
                        <input
                            className="outline-none w-full"
                            type="text"
                            placeholder="Search Location..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={handleSearch}
                            className="cursor-pointer ml-2.5 mr-3 hover:opacity-70 transition-opacity"
                        >
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.3846 11.8462C19.3846 9.77083 18.647 7.99559 17.1719 6.52043C15.6967 5.04527 13.9215 4.30769 11.8462 4.30769C9.77083 4.30769 7.99559 5.04527 6.52043 6.52043C5.04527 7.99559 4.30769 9.77083 4.30769 11.8462C4.30769 13.9215 5.04527 15.6967 6.52043 17.1719C7.99559 18.647 9.77083 19.3846 11.8462 19.3846C13.9215 19.3846 15.6967 18.647 17.1719 17.1719C18.647 15.6967 19.3846 13.9215 19.3846 11.8462ZM28 25.8462C28 26.4295 27.7869 26.9343 27.3606 27.3606C26.9343 27.7869 26.4295 28 25.8462 28C25.2404 28 24.7356 27.7869 24.3317 27.3606L18.5601 21.6058C16.5521 22.9968 14.3141 23.6923 11.8462 23.6923C10.242 23.6923 8.70793 23.381 7.24399 22.7584C5.78005 22.1358 4.51803 21.2945 3.45793 20.2344C2.39784 19.1743 1.55649 17.9123 0.933894 16.4483C0.311298 14.9844 0 13.4503 0 11.8462C0 10.242 0.311298 8.70793 0.933894 7.24399C1.55649 5.78005 2.39784 4.51803 3.45793 3.45793C4.51803 2.39784 5.78005 1.55649 7.24399 0.933894C8.70793 0.311298 10.242 0 11.8462 0C13.4503 0 14.9844 0.311298 16.4483 0.933894C17.9123 1.55649 19.1743 2.39784 20.2344 3.45793C21.2945 4.51803 22.1358 5.78005 22.7584 7.24399C23.381 8.70793 23.6923 10.242 23.6923 11.8462C23.6923 14.3141 22.9968 16.5521 21.6058 18.5601L27.3774 24.3317C27.7925 24.7468 28 25.2516 28 25.8462Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                    <p className="pt-10.25">Today’s Weather Forecast...</p>
                    <div className="pt-14 flex flex-col gap-4 overflow-y-auto">
                        {hourlyForecast && (() => {
                            const now = new Date();
                            const currentHour = now.getHours();
                            const todayStr = now.toISOString().split('T')[0];
                            const currentTimeStr = `${todayStr}T${String(currentHour).padStart(2, '0')}:00`;

                            return hourlyForecast.time
                                .map((time, i) => ({
                                    time,
                                    temperature: hourlyForecast.temperature_2m[i],
                                    weathercode: hourlyForecast.weathercode[i],
                                }))
                                .filter(item => item.time >= currentTimeStr)
                                .slice(0, 7)
                                .map((item, i) => (
                                    <WeatherCard
                                        key={i}
                                        time={item.time}
                                        temperature={item.temperature}
                                        weathercode={item.weathercode}
                                    />
                                ));
                        })()}
                    </div>
                </div>
            </div>
            {/* Мобильная версия: фон на всю ширину, инпут по центру */}
            <div className="xl:hidden flex flex-col h-full">
                <div className="w-full h-1 bg-gray-400/50"></div>
                <div className="w-full h-full flex flex-col items-center bg-black/30 backdrop-blur-sm">
                    <p className="pt-8">Today’s Weather Forecast...</p>
                    <div className="pt-8 flex flex-wrap gap-4 justify-center pb-2">
                        {hourlyForecast && (() => {
                            const now = new Date();
                            const currentHour = now.getHours();
                            const todayStr = now.toISOString().split('T')[0];
                            const currentTimeStr = `${todayStr}T${String(currentHour).padStart(2, '0')}:00`;
                            return hourlyForecast.time
                                .map((time, i) => ({
                                    time,
                                    temperature: hourlyForecast.temperature_2m[i],
                                    weathercode: hourlyForecast.weathercode[i],
                                }))
                                .filter(item => item.time >= currentTimeStr)
                                .slice(0, 10)
                                .map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 min-w-[60px]">
                                        <p className="text-sm">{item.time.split('T')[1]}</p>
                                        <WeatherIcon code={item.weathercode} size={28} />
                                        <p className="text-sm font-medium">{item.temperature}°</p>
                                    </div>
                                ));
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
}