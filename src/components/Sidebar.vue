<template>
  <aside class="ass1-aside">
      <div class="ass1-content-head__t">
          <div><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Bài viết gần đây của bạn.</div>
      </div>
      <div class="hic_key" v-if="!isLogin">Vui lòng đăng nhập để xem nội dung này 
          <router-link to="/login">Đăng nhập</router-link>
      </div>
      <div v-else-if="isLogin && getListPostOfCurrentUser && getListPostOfCurrentUser.length">
          <post-item 
              v-for="item in getListPostOfCurrentUser" 
              v-bind:key="item.PID" 
              v-bind:post="item"
          />
      </div>
  </aside>
</template>

<script>
import PostItem from "./PostItem";
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  components: {
    PostItem
  },
  computed: {
    ...mapGetters(['isLogin', 'getListPostOfCurrentUser'])
  }
};
</script>

<style></style>
