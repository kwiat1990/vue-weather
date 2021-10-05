<template>
  <div>
    <h1>Favlist</h1>

    <Alert v-if="errorMessage" :variant="AlertType.ERROR" class="mb-12">
      {{ errorMessage }}
    </Alert>

    <button
      v-if="state.size > 0"
      class="px-4 py-2 mb-4 text-white bg-blue-700 hover:bg-blue-900 rounded-xl"
      @click="reset"
    >
      Remove all cities
    </button>

    <Weather
      :forecast="getForecast(city)"
      v-for="city in state"
      :key="city"
      class="mb-8"
    >
      <button aria-label="Remove city from your fav list" @click="remove(city)">
        <ion-icon
          name="trash-outline"
          size="large"
          class="ml-auto mr-0"
        ></ion-icon>
      </button>
    </Weather>
  </div>
</template>

<script lang="ts">
import Alert from "@/components/Alert.vue";
import Weather from "@/components/Weather.vue";
import { useFavs } from "@/composables/useFavs";
import { useWeatherService } from "@/services/weather.service";
import { AlertType } from "@/types/alert.types";
import { Forecast } from "@/types/forecast.type";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { Alert, Weather },

  setup() {
    const forecasts = ref<Forecast[]>([]);

    const { state, remove, reset } = useFavs();
    const { getWeatheryByCity, errorMessage } = useWeatherService();

    if (state) {
      state.forEach((city) => {
        getWeatheryByCity(city as string).then((res) => {
          if (res) forecasts.value.push(res);
        });
      });
    }

    const getForecast = (name: string): Forecast | [] => {
      return (
        Array.from(forecasts.value).find(({ city }) => city === name) || []
      );
    };

    return {
      forecasts,
      remove,
      reset,
      state,
      errorMessage,
      getForecast,
      AlertType,
    };
  },
});
</script>

<style></style>
