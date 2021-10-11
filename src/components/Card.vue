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
        <div class="mb-4">
          <div>{{ forecast?.city }}</div>
          <div class="text-base font-normal">
            {{ forecast?.description }}
          </div>
        </div>
        <Icon
          v-if="forecast?.icon"
          class="block m-auto mb-4 md:mr-0"
          :icon="forecast?.icon"
          size="w-16"
        ></Icon>
        <div>{{ formatTemperature(forecast?.temp?.current) }}</div>
      </div>

      <div class="gap-8 mt-4 md:justify-between md:items-center md:flex">
        <span
          >Wind: {{ formatWindSpeed(forecast?.wind?.speed) }} ({{
            forecast?.wind?.direction
          }})</span
        >
        <div class="mt-2 space-x-8">
          <span>Low: {{ formatTemperature(forecast?.temp?.min) }}</span>
          <span>High: {{ formatTemperature(forecast?.temp?.max) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import { Forecast } from "@/types/forecast.type";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { Icon },
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

    const formatWindSpeed = (val: number) => {
      return `${val?.toFixed(1)} km/h`;
    };

    return {
      formatTemperature,
      formatWindSpeed,
    };
  },
});
</script>

<style></style>
