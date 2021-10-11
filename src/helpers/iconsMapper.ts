const weatherCodes = {
  clear: [800],
  fog: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  heavyClouds: [802, 803, 804],
  heavyRain: [500, 501, 502, 503, 504],
  lightClouds: [801],
  lightRain: [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531],
  shower: [500, 501],
  sleet: [611, 612, 613],
  snow: [511, 600, 601, 602, 615, 616, 620, 621, 622],
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
};

const iconsByCodes = {
  "heavy-clouds": [...weatherCodes.heavyClouds, ...weatherCodes.fog],
  "heavy-rain": weatherCodes.heavyRain,
  "light-clouds": weatherCodes.lightClouds,
  "light-rain": weatherCodes.lightRain,
  clear: weatherCodes.clear,
  shower: weatherCodes.shower,
  sleet: weatherCodes.sleet,
  snow: weatherCodes.snow,
  thunderstorm: weatherCodes.thunderstorm,
};

export const iconNameMapper = (code: number) => {
  return (
    Object.keys(iconsByCodes).find((key) =>
      iconsByCodes[key as keyof typeof iconsByCodes].includes(code)
    ) || ""
  );
};
