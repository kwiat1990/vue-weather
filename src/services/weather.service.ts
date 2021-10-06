import { forecastDataTransformer } from "@/datalayer/forecast.layer";
import { getJSON } from "@/helpers/fetch";
import { Location, Weather } from "@/types/api/weather.types";
import { ApiResponse } from "@/types/apiResponse.types";
import { Coords } from "@/types/coords.type";
import { Forecast } from "@/types/forecast.type";
import { ref, readonly } from "vue";

const buildURL = (path: string) => {
  return path;
};

const getLocationByCoords = (coords: Coords) => {
  return getJSON<Location[]>(
    buildURL(`search/?lattlong=${coords.lat},${coords.lon}`)
  );
};

const getLocationByName = (city: string) => {
  return getJSON<Location[]>(buildURL(`search/?query=${city}`));
};

const getForecast = (id: string) => {
  return getJSON<Weather>(buildURL(`${id}/`));
};

export const useWeatherService = () => {
  const forecasts = ref<Forecast[]>([]);
  const errorMessage = ref("");

  const getWeatheryByCoords = async (coords: Coords, reset = true) => {
    reset && clear();
    const res = await getLocationByCoords(coords);
    handleLocationResponse(res);
  };

  const getWeatheryByCity = async (city: string, reset = true) => {
    reset && clear();
    const res = await getLocationByName(city);
    handleLocationResponse(res);
  };

  const getWeatherForLocation = async (id: number) => {
    const res = await getForecast(id.toString());
    return handleWeatherResponse(res);
  };

  const handleLocationResponse = (res: ApiResponse<Location[]>) => {
    if (!res.data?.length) {
      errorMessage.value = "Oops, this city couldn't be found.";
    } else {
      getWeatherForLocation(res.data[0].woeid);
    }

    if (res.error) {
      errorMessage.value = res.error;
    }
  };

  const handleWeatherResponse = (res: ApiResponse<Weather>) => {
    errorMessage.value = res.error;
    if (res.data) {
      forecasts.value = [...forecasts.value, forecastDataTransformer(res.data)];
    }
  };

  const clear = () => {
    forecasts.value = [];
  };

  return {
    getWeatheryByCoords,
    getWeatheryByCity,
    errorMessage: readonly(errorMessage),
    forecasts: readonly(forecasts),
  };
};
