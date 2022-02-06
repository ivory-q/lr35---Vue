<template>
  <div v-if="categories.length > 0 && items.length > 0">
    <h1 class="m-4">{{ currentCategory.name }}</h1>
    <ul class="pb-4" v-if="categoryItems.length > 0">
      <li
        class="my-2 card shadow-sm"
        v-for="item in categoryItems"
        :key="item.id"
      >
        <router-link
          class="p-3 text-decoration-none text-reset"
          exact
          :to="{
            path: '/' + category + '/item/' + item.id,
            query: {
              name: item.name,
              categoryId: currentCategory.id,
              page: currPage
            }
          }"
        >
          <div class="container position-relative">
            <div id="menu">
              <button class="border btn" @click.prevent="edit(item.id)">
                <img src="../assets/icons/pencil.png" alt="" />
              </button>
              <button class="border btn" @click.prevent="del(item.id)">
                <img src="../assets/icons/trash-bin.png" alt="" />
              </button>
            </div>
            <div class="row">
              <div class="col-auto">
                <img
                  :src="
                    getRelevantImage(
                      item.img ? category + '/' + item.img : 'logo.png'
                    )
                  "
                  alt=""
                  width="150px"
                />
              </div>
              <div class="col-6">
                <h2 class="link-secondary">{{ item.name }}</h2>
                <h3 class="link-danger">Id: {{ item.id }}</h3>
              </div>
              <div class="col d-flex justify-content-end align-items-center">
                <h3 class="fw-bold">
                  <span v-if="item.price">{{ item.price }} Р</span>
                  <span v-else>Нет в продаже</span>
                </h3>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <h2 v-else class="alert alert-danger">Ничего нет</h2>
    <ul class="pagination pagination-lg" v-show="pagesNum">
      <li class="page-item">
        <router-link
          :class="`page-link link-dark ${currPage == 1 ? 'disabled' : ''}`"
          :to="
            '/' + category + '/' + (currPage == 1 ? '' : parseInt(currPage) - 1)
          "
          >Previous</router-link
        >
      </li>

      <li class="page-item" v-for="page in pagesNum" v-bind:key="page">
        <router-link
          :class="`page-link link-dark ${page == currPage ? 'active' : ''}`"
          :to="'/' + category + '/' + page"
        >
          {{ page }}
        </router-link>
      </li>

      <li class="page-item">
        <router-link
          :class="
            `page-link link-dark ${currPage == pagesNum ? 'disabled' : ''}`
          "
          :to="
            '/' +
              category +
              '/' +
              (currPage == pagesNum ? '' : parseInt(currPage) + 1)
          "
          >Next</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: this.$route.params.category,
      currPage: this.$route.params.page,
      categories: [],
      items: []
    };
  },
  mounted() {
    this.$http
      .get("http://localhost:3000/categories")
      .then(res => {
        this.categories = res.body;
      })
      .catch(err => console.error(err));
    this.$http
      .get("http://localhost:3000/items")
      .then(res => {
        this.items = res.body;
      })
      .catch(err => console.error(err));
  },
  watch: {
    "$route.params.page": {
      handler(newValue) {
        this.currPage = newValue || 1;
      },
      immediate: true
    },
    "$route.params.category": {
      handler(newValue) {
        this.category = newValue;
      }
    }
  },
  methods: {
    getRelevantImage(searchString) {
      return require(`../assets/${searchString}`);
    },
    edit(id) {
      this.$router.push("/" + this.category + "/edit/" + id);
    },
    del(id) {
      this.$http
        .delete("http://localhost:3000/items/" + id)
        .then(res => console.log(res))
        .catch(err => {
          console.log(err);
        });
      this.items = this.items.filter(item => {
        return item.id != id;
      });
    }
  },
  computed: {
    categoryItems() {
      let cut = this.currPage * 5;
      return this.items
        .filter(item => {
          return item.cat == this.category;
        })
        .slice(cut - 5, cut);
    },
    pagesNum() {
      return Math.ceil(
        this.items.filter(item => {
          return item.cat == this.category;
        }).length / 5
      );
    },
    currentCategory() {
      return this.categories.find(category => {
        return category.name.toLowerCase().replace(" ", "_") == this.category;
      });
    }
  }
};
</script>

<style scoped>
ul {
  padding: 0;
}
#menu {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  display: flex;
}
#menu button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
}
#menu img {
  width: 20px;
}
.disabled,
.disabled:hover {
  background-color: lightgrey !important;
  color: grey !important;
}
.active {
  background-color: lightsalmon;
}
.page-item a:hover {
  background-color: lightsalmon;
}
.page-item a:focus {
  background-color: lightsalmon;
  box-shadow: none;
}
</style>
