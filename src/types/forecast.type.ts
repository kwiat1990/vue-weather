export interface Forecast {
  weather: ForecastWeather;
  wind: ForecastWind;
  temp: ForecastTemp;
  city: string;
}

export interface ForecastWind {
  speed: number;
  deg: number;
}

export interface ForecastWeather {
  main: string;
  icon: string;
  description: string;
}

export interface ForecastTemp {
  current: number;
  feelsLike: number;
  min: number;
  max: number;
  pressure: number;
  humidity: number;
}
