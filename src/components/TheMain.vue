<template>
  <div>
    <div class="container my-5">
      <router-link class="link-danger" exact to="/"
        ><h1>Tech Shop</h1></router-link
      >
      <div class="row">
        <Sidebar />
        <div class="col border shadow rounded pb-5">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./TheMainSidebar.vue";

export default {
  components: {
    Sidebar
  }
};
</script>

<style></style>
