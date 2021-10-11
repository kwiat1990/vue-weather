import { formatWindDirection } from "@/helpers/formatWindDirection";
import { iconNameMapper } from "@/helpers/iconsMapper";
import { WeatherResponse } from "@/types/api/weather.types";
import { Forecast } from "@/types/forecast.type";

export const forecastDataTransformer = (
  response: WeatherResponse
): Forecast => {
  const { weather, main, name, wind } = response;
  const today = weather[0];

  const forecast: Forecast = {
    city: name,
    temp: {
      current: main.temp,
      max: main.temp_max,
      min: main.temp_min,
    },
    humidity: main.humidity,
    pressure: main.pressure,
    description: today.description,
    icon: iconNameMapper(today.id),
    wind: {
      speed: wind.speed,
      deg: wind.deg,
      direction: formatWindDirection(wind.deg),
    },
  };

  return forecast;
};
