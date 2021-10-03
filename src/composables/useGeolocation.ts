import { ref } from "vue";

export const useGeoLocation = () => {
  const coords = ref<GeolocationPosition["coords"] | null>(null);
  const error = ref<GeolocationPositionError | null>(null);
  const isLoading = ref(false);
  const isSupported = "geolocation" in navigator;

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const setLoading = (inProgress = true) => (isLoading.value = inProgress);

  const onSuccess = (pos: GeolocationPosition) => {
    coords.value = pos.coords;
    error.value = null;
    setLoading(false);
  };

  const onError = (err: GeolocationPositionError) => {
    coords.value = null;
    error.value = err;
    setLoading(false);
  };

  if (isSupported) {
    setLoading();
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }

  return {
    coords,
    error,
    isLoading,
    isSupported,
  };
};
