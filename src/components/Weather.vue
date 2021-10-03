<template>
  <div>
    <!-- <img
      v-for="icon in weather.weather"
      :key="icon"
      :src="`http://openweathermap.org/img/wn/${icon}@2x.png`"
      alt=""
    /> -->
    <ul>
      <li v-for="(item, i) in weather" :key="i">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    weather: {},
  },

  setup(props) {
    return {};
  },
});
</script>

<style></style>
