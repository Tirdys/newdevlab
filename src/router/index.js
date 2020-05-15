import Vue from "vue";
import VueRouter from "vue-router";
import cj from "../components/pagecreatejoin.vue";
import select from "../components/selection.vue";
import picknbanA from "../components/picknbanA";
import picknbanB from "../components/picknbanB";
import picknbanS from "../components/picknbanS";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "cj",
    component: cj,
  },
  {
    path: "/:id",
    name: "select",
    component: select,
  },
  {
    path: "/:id/TeamA",
    name: "TeamA",
    component: picknbanA,
  },
  {
    path: "/:id/TeamB",
    name: "TeamB",
    component: picknbanB,
  },
  {
    path: "/:id/Spectator",
    name: "TeamSpectator",
    component: picknbanS,
  },
];

const router = new VueRouter({ routes });
export default router;
