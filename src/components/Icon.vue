<template>
  <div
    v-html="require(`!!html-loader!svgo-loader!../assets/symbols/${icon}.svg`)"
    :class="size"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: String,
    size: {
      type: String,
      default: "w-8",
    },
  },
});
</script>
