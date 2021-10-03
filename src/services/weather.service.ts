import { getJSON } from "@/helpers/fetch";

export const getLocation = (lat: number, lon: number) => {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=2323${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`;
  return getJSON(url);
};
