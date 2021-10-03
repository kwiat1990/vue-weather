<template>
  <div class="home">
    <h1>Home</h1>
    <Searchbox @on-search="onSearch"></Searchbox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Searchbox from "@/components/Searchbox.vue";

export default defineComponent({
  name: "Home",
  components: { Searchbox },

  setup() {
    const onSearch = (event: string) => console.log("oko", event);

    return {
      onSearch,
    };
  },
});
</script>
