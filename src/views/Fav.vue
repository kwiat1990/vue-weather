<template>
  <div>
    <Alert v-if="errorMessage" :variant="AlertType.ERROR" class="mb-12">
      {{ errorMessage }}
    </Alert>

    <template v-if="state.size">
      <button v-if="state.size > 1" class="mb-4 button" @click="clear">
        Remove all cities
      </button>

      <template v-for="city in state">
        <Card
          v-if="getForecast(city)"
          :forecast="getForecast(city)"
          :key="city"
          class="mb-8"
        >
          <button
            aria-label="Remove city from your fav list"
            @click="remove(city)"
          >
            <ion-icon
              name="trash-outline"
              size="large"
              class="ml-auto mr-0"
            ></ion-icon>
          </button>
        </Card>
      </template>
    </template>

    <p v-else class="text-center">You do not have any locations saved yet.</p>
  </div>
</template>

<script lang="ts">
import Card from "@/components/Card.vue";
import { useFavs } from "@/composables/useFavs";
import { useWeatherService } from "@/services/weather.service";
import { Forecast } from "@/types/forecast.type";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Fav",
  components: { Card },

  setup() {
    const { state, remove, clear } = useFavs();
    const { errorMessage, forecasts, getWeatheryByCity } = useWeatherService();

    if (state.size) {
      state.forEach((city) => getWeatheryByCity(city as string, false));
    }

    const getForecast = (name: string): Forecast | [] => {
      return (
        forecasts.value.find(({ city }) => city.toLowerCase() === name) || []
      );
    };

    return {
      forecasts,
      remove,
      clear,
      state,
      errorMessage,
      getForecast,
    };
  },
});
</script>

<style></style>
