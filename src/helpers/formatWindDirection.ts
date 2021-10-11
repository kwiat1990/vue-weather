export const formatWindDirection = (degree: number) => {
  const compassSectors = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  const singleSectorLength = 360 / compassSectors.length;
  const itemIndex = Math.floor(degree / singleSectorLength);

  return compassSectors[itemIndex];
};
