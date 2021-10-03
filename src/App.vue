<template>
  <Header></Header>
  <main class="container prose prose-xl">
    <router-view></router-view>
  </main>
  <footer class="text-center">
    Mateusz Kwiatkowski &copy; {{ currentYear }}
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  components: {
    Header,
  },

  setup() {
    const currentYear = new Date().getFullYear();

    return {
      currentYear,
    };
  },
});
</script>
