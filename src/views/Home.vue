<template>
  <div class="home">
    <h1>Your weather forecast</h1>

    <p v-if="geoIsLoading" class="p-4 mb-12 text-white bg-green-600">
      One moment, we are trying to fetch weather data for your location
    </p>

    <p v-if="errorToDisplay" class="p-4 mb-12 text-white bg-red-600">
      {{ errorToDisplay }}
    </p>

    <Searchbox
      :city="city"
      :disabled="geoIsLoading"
      @on-search="onSearch"
    ></Searchbox>

    <Weather v-if="forecast" :forecast="forecast" class="mt-12"></Weather>
  </div>
</template>

<script lang="ts">
import Searchbox from "@/components/Searchbox.vue";
import Weather from "@/components/Weather.vue";
import { useGeoLocation } from "@/composables/useGeolocation";
import { useFavs } from "@/composables/useFavs";
import { useWeatherService } from "@/services/weather.service";
import { computed, defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "Home",
  components: { Searchbox, Weather },

  setup() {
    const city = ref("");

    const { isLoading, coords, error } = useGeoLocation();
    const { state, add, remove, reset } = useFavs();
    const { forecast, getWeatheryByCoords, getWeatheryByCity, errorMessage } =
      useWeatherService();

    const errorToDisplay = computed(() => {
      const isBeforeWeatherFetch = !forecast.value && !errorMessage.value;
      return isBeforeWeatherFetch ? error.value?.message : errorMessage.value;
    });

    const onSearch = (city: string) => getWeatheryByCity(city);

    const onInitialGeolocation = () => {
      if (!forecast.value && coords.value) {
        getWeatheryByCoords(coords.value);
      }
      city.value = forecast.value?.city || "";
    };

    watchEffect(() => {
      onInitialGeolocation();
    });

    return {
      onSearch,
      geoIsLoading: isLoading,
      geoCoords: coords,
      city,
      add,
      remove,
      reset,
      state,
      forecast,
      errorToDisplay,
    };
  },
});
</script>
