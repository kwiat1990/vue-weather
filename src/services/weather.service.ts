import { getJSON } from "@/helpers/fetch";
import { Coords } from "@/types/coords.type";
import { WeatherResponse } from "@/types/weather.types";
import { ref } from "vue";

const buildURL = (path: string) => {
  return `weather?${path}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`;
};

const getByCoords = (coords: Coords) => {
  return getJSON<WeatherResponse>(
    buildURL(`lat=${coords.lat}&lon=${coords.lon}`)
  );
};

const getByName = (city: string) => {
  return getJSON<WeatherResponse>(buildURL(`q=${city}`));
};

export const useWeatherService = () => {
  const errorMessage = ref("");
  const forecast = ref<WeatherResponse | null>(null);

  const getWeatheryByCoords = async (coords: Coords) => {
    const res = await getByCoords(coords);
    handleWeatherResponse(res);
  };

  const getWeatheryByCity = async (city: string) => {
    const res = await getByName(city);
    handleWeatherResponse(res);
  };

  const handleWeatherResponse = (res: any) => {
    if (res.data) {
      forecast.value = res.data;
      errorMessage.value = "";
    } else {
      errorMessage.value = res.error;
      forecast.value = null;
    }
  };

  return {
    getWeatheryByCoords,
    getWeatheryByCity,
    errorMessage,
    forecast,
  };
};
