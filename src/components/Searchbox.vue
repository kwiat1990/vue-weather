<template>
  <form @submit.prevent="emitSearch">
    <button type="submit">Search</button>
    <input type="text" v-model="searchTerm" />
    <hr />
    {{ geoposition.coords }}
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useGeoLocation } from "@/composables/useGeolocation";

export default defineComponent({
  name: "Searchbox",

  emits: {
    // Perform runtime validation
    onSearch: (payload: string) => payload.length > 0,
  },

  setup(_, { emit }) {
    const searchTerm = ref("");
    const geoposition = useGeoLocation();

    const emitSearch = () => {
      emit("onSearch", searchTerm.value);
    };

    return {
      emitSearch,
      searchTerm,
      geoposition,
    };
  },
});
</script>

<style scoped></style>
