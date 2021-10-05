<template>
  <div>
    <Alert v-if="errorMessage" :variant="AlertType.ERROR" class="mb-12">
      {{ errorMessage }}
    </Alert>

    <template v-if="state.size">
      <button
        v-if="state.size"
        class="
          px-4
          py-2
          mb-4
          text-white
          bg-blue-700
          hover:bg-blue-900
          rounded-xl
        "
        @click="clear"
      >
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

    <Alert v-else :variant="AlertType.INFO">
      You do not have any locations yet.
    </Alert>
  </div>
</template>

<script lang="ts">
import Alert from "@/components/Alert.vue";
import Card from "@/components/Card.vue";
import { useFavs } from "@/composables/useFavs";
import { useWeatherService } from "@/services/weather.service";
import { AlertType } from "@/types/alert.types";
import { Forecast } from "@/types/forecast.type";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Fav",
  components: { Alert, Card },

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
      AlertType,
    };
  },
});
</script>

<style></style>
