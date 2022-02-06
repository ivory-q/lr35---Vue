import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import VueResource from "vue-resource";

import "bootstrap/dist/css/bootstrap.css";

Vue.use(VueRouter);
Vue.use(VueResource);

new Vue({
  el: "#app",
  render: h => h(App),
  router: router
});
