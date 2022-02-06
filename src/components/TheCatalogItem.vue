<template>
  <div class="p-4">
    <div v-if="item != 0">
      <img
        :src="
          getRelevantImage(item.img ? category + '/' + item.img : 'logo.png')
        "
        alt=""
      />
    </div>
    <h1 class="text-secondary">{{ item.name }}</h1>
    <h3 class="link-danger">Id: {{ item.id }}</h3>
    <h1 class="mt-4">{{ item.price }}</h1>
    <br /><router-link
      class="mt-4 btn btn-danger"
      :to="'/' + this.category + '/' + this.page"
      >Back</router-link
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      page: this.$route.query.page,
      category: this.$route.params.category,
      categoryId: this.$route.query.categoryId,
      name: this.$route.query.name,
      item: 0,
    };
  },
  mounted() {
    this.$http
      .get("http://localhost:3000/items")
      .then((res) => {
        return res.body;
      })
      .then(
        (items) =>
          (this.item = items.find((el) => {
            return el.id == this.id;
          }))
      )
      .catch((err) => console.error(err));
  },
  methods: {
    getRelevantImage(searchString) {
      return require(`../assets/${searchString}`);
    },
  },
};
</script>

<style scoped>
img {
  width: 300px;
}
</style>
