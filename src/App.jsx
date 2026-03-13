import { useState, useEffect } from 'react'
import { WeatherDisplay } from "./components/WeatherDisplay.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { getRandomBackground, defaultBackground } from "./utils/getBackground.js";

const DEFAULT_LAT = 55.697108;
const DEFAULT_LONG = 37.578585;

function App() {
    const [city, setCity] = useState("Moscow");
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [hasErrorCity, setHasErrorCity] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);

    // Загрузка погоды по названию города
    const fetchWeather = (searchQuery) => {
        setIsLoading(true);

        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=1&language=en&format=json`)
            .then(res => {
                if (!res.ok) throw Error('Error geolocation');
                return res.json();
            })
            .then(geoData => {
                if (!geoData.results || geoData.results.length === 0) {
                    throw Error('City not found');
                }
                const lat = geoData.results[0].latitude;
                const long = geoData.results[0].longitude;
                return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,is_day,wind_speed_10m,weathercode`);
            })
            .then(res => {
                if (!res.ok) throw new Error('HTTP error: ' + res.status);
                return res.json();
            })
            .then(data => {
                setCity(searchQuery);
                setWeather(data.current);
                setIsLoading(false);
                setBackgroundImage(getRandomBackground());
            })
            .catch(error => {
                console.log("Ошибка:", error);
                if (error.message === 'City not found') {
                    setHasErrorCity(true);
                    setTimeout(() => setHasErrorCity(false), 3000);
                } else {
                    setHasError(true);
                }
                setIsLoading(false);
            });
    }

    // Загрузка погоды по координатам
    const fetchWeatherByCoords = (lat, long) => {
        setIsLoading(true);

        const weatherPromise = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,is_day,wind_speed_10m,weathercode`)
            .then(res => res.json());

        const cityPromise = fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
            .then(res => res.json());

        Promise.all([weatherPromise, cityPromise])
            .then(([weatherData, geoData]) => {
                setWeather(weatherData.current);
                setCity(geoData.city || geoData.locality || "My Location");
                setIsLoading(false);
                setBackgroundImage(getRandomBackground());
            })
            .catch(error => {
                console.log("Ошибка геолокации:", error);
                setHasError(true);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    fetchWeatherByCoords(DEFAULT_LAT, DEFAULT_LONG);
                }
            );
        } else {
            fetchWeatherByCoords(DEFAULT_LAT, DEFAULT_LONG);
        }
    }, []);

    if (isLoading) {
        return (
            <div
                className="relative w-full h-full box-border flex items-center justify-center
                bg-fixed bg-center bg-cover min-h-screen transition-all duration-700"
                style={{ backgroundImage: defaultBackground }}
            >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>
                <h2 className="relative z-10 text-4xl">Get the weather...</h2>
            </div>
        )
    }

    if (hasError) {
        return (
            <div
                className="relative w-full h-full box-border flex flex-col items-center justify-center gap-4
                bg-fixed bg-center bg-cover min-h-screen transition-all duration-700"
                style={{ backgroundImage: defaultBackground }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
                <h2 className="relative z-10 text-red-500 text-4xl font-bold">Download error</h2>
                <button
                    onClick={() => window.location.reload()}
                    className="relative z-10 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-xl backdrop-blur-md transition-colors font-medium"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <>
            {hasErrorCity && (
                <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-lg z-50">
                    Город не найден! Показываю предыдущий.
                </div>
            )}
            <div className="w-full h-full box-border xl:pl-29 flex flex-col xl:flex-row items-start xl:items-end justify-end xl:justify-between bg-fixed bg-center bg-cover min-h-screen"
                style={{ backgroundImage: backgroundImage || defaultBackground }}>
                <WeatherDisplay weather={weather} city={city} />
                <SearchBar onSearch={fetchWeather} />
            </div>
        </>
    )
}

export default App
