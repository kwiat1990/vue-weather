import { reactive, readonly } from "vue";

const state = reactive({ cities: new Set() });

export const useFavs = () => {
  const add = (city: string) => {
    state.cities.add(city);
  };

  const remove = (city: string) => {
    state.cities.delete(city);
  };

  const reset = () => {
    state.cities.clear();
  };

  return {
    state: readonly(state.cities),
    add,
    remove,
    reset,
  };
};
