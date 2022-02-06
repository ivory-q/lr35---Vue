<template>
  <div class="col col-4 col-lg-2">
    <nav
      class="navbar navbar-light bg-light border shadow rounded"
      v-if="categories.length > 0"
    >
      <div class="navbar-collapse">
        <div class="navbar-nav">
          <router-link
            v-for="category in categories"
            v-bind:key="category.id"
            active-class="active"
            class="p-2 nav-item nav-link"
            :to="'/' + category.name.toLowerCase().replace(' ', '_')"
            >{{ category.name }}</router-link
          >
        </div>
      </div>
    </nav>
    <div
      v-show="
        this.$route.params.category &&
          !this.$route.path.includes('new') &&
          !this.$route.path.includes('edit')
      "
    >
      <router-link
        id="addBtn"
        class="
              border
              shadow
              rounded-circle
              mt-4
              mx-auto
              d-flex
              justify-content-center
              text-decoration-none
              bg-danger
              text-white
              fs-2
            "
        :to="'/' + this.$route.params.category + '/new'"
      ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.$http
      .get("http://localhost:3000/categories")
      .then(res => {
        this.categories = res.body;
      })
      .catch(err => console.error(err));
  }
};
</script>

<style scoped>
#addBtn {
  width: 50px;
  height: 50px;
}
#addBtn:before {
  content: "\FF0B";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}
.active {
  background-color: lightsalmon;
}
</style>
