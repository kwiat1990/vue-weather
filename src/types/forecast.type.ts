export interface Forecast {
  weather: ForecastWeather;
  wind: ForecastWind;
  temp: ForecastTemp;
  city: string;
}

export interface ForecastWind {
  speed: number;
  deg: string;
}

export interface ForecastWeather {
  icon: string;
  description: string;
}

export interface ForecastTemp {
  current: number;
  min: number;
  max: number;
  pressure: number;
  humidity: number;
}
