<template>
  <div class="home">
    <Alert v-if="geoIsLoading" class="mb-12">
      One moment please, we are trying to fetch weather data for your location
    </Alert>

    <Alert v-if="errorToDisplay" :variant="AlertType.ERROR" class="mb-12">
      {{ errorToDisplay }}
    </Alert>

    <Searchbox :disabled="geoIsLoading" @on-search="onSearch"></Searchbox>

    <Card v-if="forecasts[0]" :forecast="forecasts[0]" class="mt-12">
      <button
        v-if="!has(city)"
        aria-label="Add city to your fav list"
        @click.once="add(city)"
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
import Searchbox from "@/components/Searchbox.vue";
import Card from "@/components/Card.vue";
import { useFavs } from "@/composables/useFavs";
import { useGeoLocation } from "@/composables/useGeolocation";
import { useWeatherService } from "@/services/weather.service";
import { AlertType } from "@/types/alert.types";
import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";

export default defineComponent({
  name: "Home",
  components: { Alert, Searchbox, Card },

  setup() {
    const city = ref("");

    const { isLoading, coords, error, locate } = useGeoLocation();
    const { add, has, state } = useFavs();
    const { errorMessage, forecasts, getWeatheryByCoords, getWeatheryByCity } =
      useWeatherService();

    const errorToDisplay = computed(() => {
      const isBeforeWeatherFetch =
        !forecasts.value.length && !errorMessage.value;
      return isBeforeWeatherFetch ? error.value?.message : errorMessage.value;
    });

    onMounted(() => {
      locate();
    });

    const onSearch = (name: string) => {
      city.value = name;
      getWeatheryByCity(name);
      stopWatcher();
    };

    const onInitialGeolocation = () => {
      if (!forecasts.value.length && coords.value) {
        getWeatheryByCoords(coords.value);
      }
      city.value = forecasts.value[0]?.city || "";
    };

    // watchEffect returns a stop handler which can be called to explicitly stop the watcher
    const stop = watchEffect(() => {
      onInitialGeolocation();
    });

    const stopWatcher = () => !isLoading.value && stop();

    return {
      onSearch,
      geoIsLoading: isLoading,
      geoCoords: coords,
      city,
      add,
      has,
      forecasts,
      errorToDisplay,
      state,
      AlertType,
    };
  },
});
</script>
