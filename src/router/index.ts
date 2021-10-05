import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "Home",
    meta: {
      title: "Weather around the world",
    },
    component: Home,
  },
  {
    path: "/fav",
    name: "Fav",
    meta: {
      title: "Favorite locations",
    },
    component: () => import(/* webpackChunkName: "fav" */ "@/views/Fav.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "border-b-1",
});

export default router;
