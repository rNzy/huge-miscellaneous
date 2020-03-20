import Vue from "vue";
import VueRouter from "vue-router";
import SinglePage from "../views/SinglePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: SinglePage
  }
  // ,{
  // 		path: '/detail/:playerID',
  // 		name: 'detail',
  // 		props: true,
  // 		component: () => import('../views/Detail.vue')
  // }
];

const router = new VueRouter({
  routes
});

export default router;
