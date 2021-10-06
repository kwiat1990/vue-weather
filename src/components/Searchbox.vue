<template>
  <form @submit.prevent="emitSearch" class="flex items-center justify-center">
    <label for="searchbox" class="sr-only">Search</label>

    <div class="relative w-full max-w-lg">
      <input
        class="w-full p-4 py-4 bg-white shadow-inner rounded-xl"
        type="text"
        id="searchbox"
        :placeholder="placeholder"
        v-model.trim="searchTerm"
        :disabled="disabled"
      />
      <button type="button" v-show="searchTerm" @click="clear">
        <ion-icon
          size="large"
          name="close-outline"
          class="absolute transform -translate-y-1/2 top-1/2 right-4"
        ></ion-icon>
      </button>
    </div>

    <button type="submit" class="ml-4 button">Search</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Searchbox",

  props: {
    disabled: Boolean,
    placeholder: String,
  },

  emits: {
    // Perform runtime validation
    onSearch: (payload: string) => payload.length > 0,
  },

  setup(props, { emit }) {
    const searchTerm = ref("");

    const emitSearch = () => {
      if (searchTerm.value) {
        emit("onSearch", searchTerm.value);
        clear();
      }
    };

    const clear = () => (searchTerm.value = "");

    return {
      emitSearch,
      searchTerm,
      clear,
    };
  },
});
</script>
