import { WeatherCard } from "./WeatherCard.jsx";
import { WeatherIcon } from "./WeatherIcon.jsx";
import { SearchInput } from "./SearchInput.jsx";

export function HoursInfo({ onSearch, hourlyForecast }) {
    return (
        <div className="w-full xl:w-auto h-[43vh] md:h-[30vh] xl:h-auto">
            {/* Десктоп версия */}
            <div className="hidden xl:flex h-dvh">
                <div className="w-1 h-full bg-gray-400/50"></div>
                <div className="pt-10 pl-8.75 pr-29 flex flex-col bg-black/30 backdrop-blur-sm">
                    <SearchInput onSearch={onSearch} className="w-92.75" />
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
                                        <p className="text-sm font-medium ml-1">{item.temperature}°</p>
                                    </div>
                                ));
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
}