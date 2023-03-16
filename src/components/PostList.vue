<template>
  <div id="post-list-container" class="ass1-section__list">
    <post-item
      v-for="item in getListPost"
      v-bind:key="item.PID"
      v-bind:post="item"
    />
    <h3 class="nan" v-if="!getListPost.length" style="font-size: 25px; font-weight: bold ">Chưa có bài viết nào thuộc danh mục này...</h3>
    <br>
    <h4 v-if="!getListPost.length">Nếu bạn có ý tưởng bài viết cho danh mục này, xin hãy vui lòng đóng góp <router-link to="/upload">tại đây</router-link> để diễn đàn thêm phong phú.</h4>
  </div>
</template>

<script>
import { PAGE_SIZE, CURRENT_PAGE } from "../constants";
import PostItem from "./PostItem";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "post-list",
  data() {
    return {
      loading: false,
      pagesize: PAGE_SIZE,
      currPage: CURRENT_PAGE,
      tagIndex: parseInt(this.$route.query.tagIndex)
    };
  },
  components: {
    PostItem
  },
  computed: {
    ...mapGetters(["getListPost"])
  },
  watch: {
    $route(to, from) {
      this.tagIndex = to.query.tagIndex;
      this.currPage = 1;
    }
  },
  methods: {
    ...mapActions(["getListPostHasPaging"]),

    async handleLoadMore() {
      if (this.loading) return;
      this.loading = true;
      try {
        this.currPage = this.currPage + 1;
        let obj = {
          pagesize: this.pagesize,
          currPage: this.currPage,
          tagIndex: this.tagIndex
        };
        await this.getListPostHasPaging(obj);
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async handleScroll() {
      const element = document.getElementById("post-list-container");
      if (element.getBoundingClientRect().bottom < window.innerHeight)
        await this.handleLoadMore();
    }
  },

  mounted() {
    document.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    document.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style></style>
