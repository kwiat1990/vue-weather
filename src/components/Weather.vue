<template>
  <div>
    <section
      class="
        p-6
        text-base text-center
        bg-white
        border
        shadow-lg
        md:p-8
        rounded-xl
        md:text-left
      "
    >
      <div class="text-right">
        <slot></slot>
      </div>

      <div
        class="items-center justify-between gap-8 text-4xl font-bold md:flex"
      >
        <div>
          <div>{{ forecast.city }}</div>
          <div class="text-base font-normal">
            {{ forecast.weather.description }}
          </div>
        </div>
        <img
          class="block m-auto my-0 md:mr-0"
          alt="current weather"
          :src="`http://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`"
        />
        <div>{{ formatTemperature(forecast.temp.current) }}</div>
      </div>

      <div class="gap-8 mt-4 md:justify-between md:items-center md:flex">
        <span>Wind: {{ formatWind(forecast.wind.speed) }}</span>
        <div class="mt-2 space-x-8">
          <span>Low: {{ formatTemperature(forecast.temp.min) }}</span>
          <span>High: {{ formatTemperature(forecast.temp.max) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Forecast } from "@/types/forecast.type";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    forecast: {
      type: Object as PropType<Forecast>,
      default() {
        return {};
      },
    },
  },

  setup() {
    const formatTemperature = (temp: number) => {
      return `${Math.floor(temp)} °C`;
    };

    const formatWind = (val: number) => {
      return `${val.toFixed(1)} km/h`;
    };

    return {
      formatTemperature,
      formatWind,
    };
  },
});
</script>

<style></style>
