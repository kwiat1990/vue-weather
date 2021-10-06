<template>
  <div class="p-4 text-white shaddow-xl rounded-xl" :class="styles[variant]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AlertType } from "@/types/alert.types";

export default defineComponent({
  name: "Alert",

  props: {
    variant: {
      type: String as PropType<AlertType>,
      default: () => AlertType.INFO,
    },
  },

  setup() {
    const styles = {
      [AlertType.ERROR]: "bg-red-400",
      [AlertType.INFO]: "bg-green-400",
    };

    return {
      styles,
    };
  },
});
</script>

<style></style>
