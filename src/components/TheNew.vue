<template>
  <div class="container mt-5" v-if="category && items">
    <h1 v-if="!edit">Add to {{ category.name }}</h1>
    <h1 v-else>Editing {{ item.name }}</h1>
    <div class="row mt-5 w-50">
      <div class="form-group w-50">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="form-control"
          placeholder="Name"
        />
      </div>
      <div class="form-group w-50">
        <label for="price">Price:</label>
        <input
          type="number"
          id="price"
          v-model="price"
          class="form-control"
          placeholder="Price"
        />
      </div>
      <div class="form-group w-100 mt-4">
        <label for="image">Image:</label>
        <input disabled type="file" id="image" class="form-control" />
      </div>
      <div class="form-group w-100 mt-4">
        <button class="btn btn-danger w-100" v-if="!edit" @click="addNew">
          Add
        </button>
        <button class="btn btn-danger w-100" v-else @click="saveEdit">
          Save
        </button>
      </div>
    </div>
    <div class="row mt-5 w-50" v-if="status">
      <h2 v-if="status == 'success'">
        <span class="text-success">Successuflly</span>
        <span v-if="!edit">added:</span> <span v-else>edited:</span>
      </h2>
      <h2 v-else>
        <span class="text-danger">Error</span>
      </h2>
      <div class="card shadow-sm mb-5">
        <p class="mt-3 fs-3">
          <span class="fw-bold">name:</span> {{ nameSend }}
        </p>
        <p class="fs-3"><span class="fw-bold">price:</span> {{ priceSend }}</p>
        <p class="fs-3"><span class="fw-bold">img:</span> logo.png</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: this.$attrs.edit || false,
      name: "",
      price: "",
      nameSend: "",
      priceSend: "",
      img: "",
      category: null,
      items: null,
      item: null,
      status: null
    };
  },
  mounted() {
    this.$http
      .get("http://localhost:3000/categories")
      .then(res => {
        this.category = res.body.find(
          cat =>
            cat.name.toLowerCase().replace(" ", "_") ==
            this.$route.params.category
        );
      })
      .catch(err => console.error(err));
    this.$http
      .get("http://localhost:3000/items")
      .then(res => {
        this.items = res.body;
        this.item = this.items.find(item => item.id == this.$route.params.id);
        if (this.edit) {
          this.name = this.item.name;
          this.price = this.item.price;
        }
      })
      .catch(err => console.error(err));
  },
  methods: {
    addNew() {
      let item = {
        id: (this.items[this.items.length - 1].id || 0) + 1,
        name: this.name,
        cat: this.category.name.toLowerCase().replace(" ", "_"),
        price: this.price
      };
      this.nameSend = this.name;
      this.priceSend = this.price;
      this.$http
        .post(`http://localhost:3000/items`, item)
        .then(res => {
          this.status = "success";
        })
        .catch(res => {
          this.status = "error";
        });
    },
    saveEdit() {
      let item = {
        id: this.item.id,
        name: this.name,
        cat: this.item.cat,
        price: this.price
      };
      this.item.img ? (item = { ...item, img: this.item.img }) : "";
      this.nameSend = this.name;
      this.priceSend = this.price;
      this.$http
        .put(`http://localhost:3000/items/${this.item.id}`, item)
        .then(res => (this.status = "success"))
        .catch(err => {
          this.status = "error";
        });
    }
  }
};
</script>

<style></style>
