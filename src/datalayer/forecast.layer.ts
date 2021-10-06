import { Weather } from "@/types/api/weather.types";
import { Forecast } from "@/types/forecast.type";

export const forecastDataTransformer = (response: Weather): Forecast => {
  const { consolidated_weather: weather, title } = response;
  const today = weather[0];

  const forecast: Forecast = {
    city: title,
    temp: {
      current: today.the_temp,
      min: today.min_temp,
      max: today.max_temp,
      pressure: today.air_pressure,
      humidity: today.humidity,
    },
    weather: {
      description: today.weather_state_name,
      icon: today.weather_state_abbr,
    },
    wind: {
      speed: today.wind_speed,
      deg: today.wind_direction_compass,
    },
  };

  return forecast;
};
