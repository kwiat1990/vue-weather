<template>
  <div>
    <h1>Favlist</h1>

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <button
      v-if="state.size > 0"
      class="px-2 py-4 mb-4 text-white bg-blue-700 hover:bg-blue-900 rounded-xl"
      @click="reset"
    >
      Remove all cities
    </button>

    <Weather
      :forecast="forecast"
      v-for="forecast in forecasts"
      :key="forecast.city"
      class="mb-8"
    >
      <button aria-label="Remove city from your fav list" @click="remove('')">
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
import Weather from "@/components/Weather.vue";
import { useFavs } from "@/composables/useFavs";
import { useWeatherService } from "@/services/weather.service";
import { Forecast } from "@/types/forecast.type";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { Weather },

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

    return {
      forecasts,
      remove,
      reset,
      state,
      errorMessage,
    };
  },
});
</script>

<style></style>
