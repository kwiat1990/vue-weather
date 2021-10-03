<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="geoIsLoading">
      One moment, we are trying to fetch weather data for your location
    </div>
    <p v-if="errorToDisplay">{{ errorToDisplay }}</p>
    <Searchbox
      @on-search="onSearch"
      :city="city"
      :disabled="geoIsLoading"
    ></Searchbox>
    <hr />
    <Weather :weather="weatherData"></Weather>
    {{ geoCoords }}
    {{ geoIsLoading }}
  </div>
</template>

<script lang="ts">
import Searchbox from "@/components/Searchbox.vue";
import Weather from "@/components/Weather.vue";
import { useGeoLocation } from "@/composables/useGeolocation";
import { useWeatherService } from "@/services/weather.service";
import { computed, defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "Home",
  components: { Searchbox, Weather },

  setup() {
    const city = ref("");

    const { isLoading, coords, error } = useGeoLocation();
    const {
      weatherData,
      getWeatheryByCoords,
      getWeatheryByCity,
      errorMessage,
    } = useWeatherService();

    const errorToDisplay = computed(() => {
      const isBeforeWeatherFetch = !weatherData.value && !errorMessage.value;
      return isBeforeWeatherFetch ? error.value?.message : errorMessage.value;
    });

    const onSearch = (city: string) => getWeatheryByCity(city);

    const onInitialGeolocation = () => {
      coords.value && getWeatheryByCoords(coords.value);
      city.value = weatherData.value?.name || "";
    };

    watchEffect(() => {
      onInitialGeolocation();
    });

    return {
      onSearch,
      geoIsLoading: isLoading,
      geoCoords: coords,
      city,
      weatherData,
      errorToDisplay,
    };
  },
});
</script>
