<template>
  <form @submit.prevent="emitSearch">
    <button type="submit">Search</button>
    <input
      class="border-2 border-black"
      type="text"
      v-model.lazy.trim="searchTerm"
      :disabled="disabled"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "Searchbox",

  props: {
    city: {
      type: String,
      default: "",
    },
    disabled: Boolean,
  },

  emits: {
    // Perform runtime validation
    onSearch: (payload: string) => payload.length > 0,
  },

  setup(props, { emit }) {
    const searchTerm = ref("");

    watchEffect(() => {
      searchTerm.value = props.city;
    });

    const emitSearch = () => {
      if (searchTerm.value) {
        emit("onSearch", searchTerm.value);
      }
    };

    return {
      emitSearch,
      searchTerm,
    };
  },
});
</script>
