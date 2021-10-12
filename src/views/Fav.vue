<template>
  <div>
    <template v-if="state.size">
      <button v-if="state.size > 1" class="mb-4 button" @click="clear">
        Remove all cities
      </button>

      <template v-for="forecast in state" :key="forecast.city">
        <Card v-if="forecast" :forecast="forecast" class="mb-8">
          <button
            aria-label="Remove city from your fav list"
            @click="remove(forecast)"
          >
            <ion-icon
              name="trash-outline"
              size="large"
              class="ml-auto mr-0"
            ></ion-icon>
          </button>
        </Card>
      </template>
    </template>

    <p v-else class="text-center">You do not have any locations saved yet.</p>
  </div>
</template>

<script lang="ts">
import Card from "@/components/Card.vue";
import { useFavs } from "@/composables/useFavs";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Fav",
  components: { Card },

  setup() {
    const { state, remove, clear } = useFavs();

    return {
      remove,
      clear,
      state,
    };
  },
});
</script>
