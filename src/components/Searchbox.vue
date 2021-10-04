<template>
  <form
    @submit.prevent="emitSearch"
    class="flex items-center justify-center gap-4"
  >
    <input
      class="w-full max-w-lg p-4 py-4 bg-white shadow-xl rounded-xl"
      type="text"
      v-model.lazy.trim="searchTerm"
      :disabled="disabled"
    />
    <button
      type="submit"
      class="
        p-4
        font-bold
        text-white
        uppercase
        bg-blue-700
        rounded-xl
        hover:bg-blue-900
      "
    >
      Search
    </button>
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
