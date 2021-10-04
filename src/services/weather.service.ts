import { forecastDataTransformer } from "@/datalayer/forecast.layer";
import { getJSON } from "@/helpers/fetch";
import { WeatherResponse } from "@/types/api/weather.types";
import { ApiResponse } from "@/types/apiResponse.types";
import { Coords } from "@/types/coords.type";
import { Forecast } from "@/types/forecast.type";
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

// TODO: Perhaps service should only make api calls and use "useForecast" composable to save transformed data
export const useWeatherService = () => {
  const errorMessage = ref("");

  const getWeatheryByCoords = async (coords: Coords) => {
    const res = await getByCoords(coords);
    return handleWeatherResponse(res);
  };

  const getWeatheryByCity = async (city: string) => {
    const res = await getByName(city);
    return handleWeatherResponse(res);
  };

  const handleWeatherResponse = (res: ApiResponse<WeatherResponse>) => {
    errorMessage.value = res.error;
    if (res.data) {
      return forecastDataTransformer(res.data);
    }
  };

  return {
    getWeatheryByCoords,
    getWeatheryByCity,
    errorMessage,
  };
};
