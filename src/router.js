import VueRouter from "vue-router";
import MainPage from "./components/TheMainPage.vue";
import Catalog from "./components/TheCatalog.vue";
import Item from "./components/TheCatalogItem.vue";
import New from "./components/TheNew.vue";

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: MainPage },
    { path: "/:category/new", component: New },
    { path: "/:category/edit/:id", component: New, props: { edit: true } },
    { path: "/:category/:page?", component: Catalog },
    { path: "/:category/item/:id", component: Item }
  ]
});
