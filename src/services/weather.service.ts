import { forecastDataTransformer } from "@/datalayer/forecast.layer";
import { getJSON } from "@/helpers/fetch";
import { WeatherResponse } from "@/types/api/weather.types";
import { ApiResponse } from "@/types/apiResponse.types";
import { Coords } from "@/types/coords.type";
import { Forecast } from "@/types/forecast.type";
import { ref, readonly } from "vue";

const buildURL = (path: string) => {
  return `data/2.5/weather?${path}&units=metric&appid=${process.env.VUE_APP_API_KEY}`;
};

const getLocationByCoords = (coords: Coords) => {
  return getJSON<WeatherResponse>(
    buildURL(`lat=${coords.lat}&lon=${coords.lon}`)
  );
};

const getLocationByName = (city: string) => {
  return getJSON<WeatherResponse>(buildURL(`q=${city}`));
};

export const useWeatherService = () => {
  const forecast = ref<Forecast | null>(null);
  const errorMessage = ref("");

  const getWeatheryByCoords = async (coords: Coords): Promise<void> => {
    const res = await getLocationByCoords(coords);
    handleWeatherResponse(res);
  };

  const getWeatheryByCity = async (city: string): Promise<void> => {
    const res = await getLocationByName(city);
    handleWeatherResponse(res);
  };

  const handleWeatherResponse = (res: ApiResponse<WeatherResponse>): void => {
    if (res.data) {
      forecast.value = forecastDataTransformer(res.data);
    }

    if (res.error) {
      errorMessage.value = res.error;
    }
  };

  return {
    getWeatheryByCoords,
    getWeatheryByCity,
    errorMessage: readonly(errorMessage),
    forecast: readonly(forecast),
  };
};
