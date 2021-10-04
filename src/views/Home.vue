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
    <button @click="add(city)">Add City to Favs</button>
    <button @click="remove(city)">Remove city</button>
    <button @click="reset">Remove all cities</button>
    {{ state }}
    <hr />
    <Weather :weather="forecast"></Weather>
    {{ geoCoords }}
    {{ geoIsLoading }}
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
    const { forecast, getWeatheryByCoords, getWeatheryByCity, errorMessage } =
      useWeatherService();
    const { state, add, remove, reset } = useFavs();

    const errorToDisplay = computed(() => {
      const isBeforeWeatherFetch = !forecast.value && !errorMessage.value;
      return isBeforeWeatherFetch ? error.value?.message : errorMessage.value;
    });

    const onSearch = (city: string) => getWeatheryByCity(city);

    const onInitialGeolocation = () => {
      if (!forecast.value && coords.value) getWeatheryByCoords(coords.value);
      city.value = forecast.value?.name || "";
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
