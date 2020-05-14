import Vue from "vue";
import VueRouter from "vue-router";
import cj from "../components/pagecreatejoin.vue";
import select from "../components/selection.vue";
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
];

const router = new VueRouter({ routes });
export default router;
