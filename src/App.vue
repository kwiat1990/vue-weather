<template>
  <Header></Header>

  <main class="container prose prose-xl">
    <h1 v-if="title">{{ title }}</h1>

    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>

  <footer class="p-4 text-center">
    <p>
      Powered by
      <a href="https://www.metaweather.com/" class="underline">Meta Weather</a>
    </p>
    <p>Mateusz Kwiatkowski &copy; {{ currentYear }}</p>
  </footer>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    Header,
  },

  setup() {
    const currentYear = new Date().getFullYear();
    const route = useRoute();

    const title = computed(() => {
      return route?.meta?.title;
    });

    return {
      currentYear,
      route,
      title,
    };
  },
});
</script>
