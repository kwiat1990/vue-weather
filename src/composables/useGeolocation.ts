import { ref, Ref } from "vue";

interface UseGeolocationType {
  coords: Ref<GeolocationPosition["coords"] | null>;
  error: Ref<GeolocationPositionError | null>;
  isSupported: boolean;
}

export const useGeoLocation = (): UseGeolocationType => {
  const coords = ref<GeolocationPosition["coords"] | null>(null);
  const error = ref<GeolocationPositionError | null>(null);
  const isSupported = "geolocation" in navigator;

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const onSuccess = (pos: GeolocationPosition) => {
    coords.value = pos.coords;
    error.value = null;
  };

  const onError = (err: GeolocationPositionError) => {
    coords.value = null;
    error.value = err;
  };

  if (isSupported) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }

  return {
    coords,
    error,
    isSupported,
  };
};