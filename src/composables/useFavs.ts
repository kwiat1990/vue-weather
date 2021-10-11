import { Forecast } from "@/types/forecast.type";
import { ref, readonly } from "vue";

const state = ref<Set<Forecast>>(new Set());

export const useFavs = () => {
  const add = (city: Forecast) => state.value.add(city);
  const clear = () => state.value.clear();
  const has = (city: Forecast) => state.value.has(city);
  const remove = (city: Forecast) => state.value.delete(city);

  return {
    add,
    clear,
    has,
    remove,
    state: readonly(state.value),
  };
};
