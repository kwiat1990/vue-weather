<template>
  <keep-alive>
    <div class="home">
      <h1>Your weather forecast</h1>

      <Alert v-if="geoIsLoading" class="mb-12">
        One moment please, we are trying to fetch weather data for your location
      </Alert>

      <Alert v-if="errorToDisplay" :variant="AlertType.ERROR" class="mb-12">
        {{ errorToDisplay }}
      </Alert>

      <Searchbox
        :city="city"
        :disabled="geoIsLoading"
        @on-search="onSearch"
      ></Searchbox>

      <Weather v-if="forecast" :forecast="forecast" class="mt-12">
        <button
          v-if="!state.has(city)"
          aria-label="Add city to your fav list"
          @click.once="add(city)"
        >
          <ion-icon
            name="bookmark-outline"
            size="large"
            class="ml-auto mr-0"
          ></ion-icon>
        </button>
      </Weather>
    </div>
  </keep-alive>
</template>

<script lang="ts">
import Alert from "@/components/Alert.vue";
import Searchbox from "@/components/Searchbox.vue";
import Weather from "@/components/Weather.vue";
import { useFavs } from "@/composables/useFavs";
import { useGeoLocation } from "@/composables/useGeolocation";
import { useWeatherService } from "@/services/weather.service";
import { AlertType } from "@/types/alert.types";
import { Forecast } from "@/types/forecast.type";
import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";

export default defineComponent({
  name: "Home",
  components: { Alert, Searchbox, Weather },

  setup() {
    const city = ref("");
    const forecast = ref<Forecast | null>(null);

    const { isLoading, coords, error, locate } = useGeoLocation();
    const { add, state } = useFavs();
    const { getWeatheryByCoords, getWeatheryByCity, errorMessage } =
      useWeatherService();

    const errorToDisplay = computed(() => {
      const isBeforeWeatherFetch = !forecast.value && !errorMessage.value;
      return isBeforeWeatherFetch ? error.value?.message : errorMessage.value;
    });

    onMounted(() => {
      locate();
    });

    const onSearch = async (city: string) => {
      const res = await getWeatheryByCity(city);
      if (res) forecast.value = res;
    };

    const onInitialGeolocation = async () => {
      if (!forecast.value && coords.value) {
        const res = await getWeatheryByCoords(coords.value);
        if (res) forecast.value = res;
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
      forecast,
      errorToDisplay,
      state,
      AlertType,
    };
  },
});
</script>
