<template>
  <div class="home">
    <Alert v-if="geoIsLoading" class="mb-12">
      One moment please, we are trying to fetch weather data for your location
    </Alert>

    <Alert v-if="errorToDisplay" :variant="AlertType.ERROR" class="mb-12">
      {{ errorToDisplay }}
    </Alert>

    <Searchbox
      :disabled="geoIsLoading"
      placeholder="Enter a city"
      @on-search="onSearch"
    ></Searchbox>

    <Card v-if="forecast" :forecast="forecast" class="mt-12">
      <button
        v-if="!has(forecast)"
        aria-label="Add city to your fav list"
        @click.once="add(forecast)"
      >
        <ion-icon
          name="bookmark-outline"
          size="large"
          class="ml-auto mr-0"
        ></ion-icon>
      </button>
    </Card>
  </div>
</template>

<script lang="ts">
import Alert from "@/components/Alert.vue";
import Card from "@/components/Card.vue";
import Searchbox from "@/components/Searchbox.vue";
import { useFavs } from "@/composables/useFavs";
import { useGeoLocation } from "@/composables/useGeolocation";
import { useWeatherService } from "@/services/weather.service";
import { AlertType } from "@/types/alert.types";
import { computed, defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "Home",
  components: { Alert, Searchbox, Card },

  setup() {
    const city = ref("");

    const { isLoading, coords, error, locate } = useGeoLocation();
    const { add, has, state } = useFavs();
    const { errorMessage, forecast, getWeatheryByCoords, getWeatheryByCity } =
      useWeatherService();

    const errorToDisplay = computed(() => {
      const isBeforeWeatherFetch = !forecast.value && !errorMessage.value;
      return isBeforeWeatherFetch ? error.value?.message : errorMessage.value;
    });

    locate();

    const onSearch = (name: string) => {
      city.value = name;
      getWeatheryByCity(name);
      stopWatcher();
    };

    const onInitialGeolocation = () => {
      if (!forecast.value && coords.value) {
        getWeatheryByCoords(coords.value);
      }
      city.value = forecast.value?.city || "";
    };

    // watchEffect returns a stop handler which can be called to explicitly stop the watcher
    const stop = watchEffect(() => {
      onInitialGeolocation();
    });

    const stopWatcher = () => !isLoading.value && stop();

    return {
      onSearch,
      geoIsLoading: isLoading,
      add,
      has,
      forecast,
      errorToDisplay,
      state,
      AlertType,
    };
  },
});
</script>
