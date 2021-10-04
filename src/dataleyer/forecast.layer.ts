import { WeatherResponse } from "@/types/api/weather.types";
import { Forecast } from "@/types/forecast.type";

export const transformForecastData = (response: WeatherResponse): Forecast => {
  const { main, weather, wind, name } = response;

  const forecast: Forecast = {
    weather: {
      description: weather[0].description,
      main: weather[0].main,
    },
    wind: {
      speed: wind.speed,
      deg: wind.deg,
    },
    city: name,
    temp: {
      current: main.temp,
      feelsLike: main.feels_like,
      min: main.temp_min,
      max: main.temp_max,
      pressure: main.pressure,
      humidity: main.humidity,
    },
  };

  return forecast;
};
