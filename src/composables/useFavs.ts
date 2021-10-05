import { reactive, readonly } from "vue";

const state = reactive({ cities: new Set() });

export const useFavs = () => {
  const add = (city: string) => state.cities.add(city.toLowerCase());
  const clear = () => state.cities.clear();
  const has = (value: string) => state.cities.has(value.toLowerCase());
  const remove = (city: string) => state.cities.delete(city);

  return {
    add,
    clear,
    has,
    remove,
    state: readonly(state.cities),
  };
};
