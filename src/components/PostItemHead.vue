<template>
  <div class="ass1-section__head">
    <router-link
      v-bind:to="getUserLink"
      class="ass1-section__avatar ass1-avatar"
    >
      <img v-bind:src="getAvatar" v-bind:alt="post.fullname" />
    </router-link>
    <div>
      <router-link
        v-if="querySearch"
        v-bind:to="getUserLink"
        class="ass1-section__name"
        v-html="formatFullname"
      ></router-link>
      <router-link v-else v-bind:to="getUserLink" class="ass1-section__name">{{
        formatFullname
      }}</router-link>
      <span class="ass1-section__passed"><i class="fa fa-calendar" aria-hidden="true"></i> : {{ formatTimeAdded }}</span>
    </div>
    <router-link
      v-bind:to="getUserLink"
      class="ass1-section__link ass1-btn-icon"
      ><i class="icon-Link"></i
    ></router-link>
    <span
      v-if="currentUser && currentUser.USERID === post.USERID"
      class="ml-2 badge badge-primary"
      :style="{ cursor: 'pointer' }"
      @click="editPost"
      ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span
    >
    <span
      v-if="currentUser && currentUser.USERID === post.USERID"
      class="ml-2 badge badge-danger"
      :style="{ cursor: 'pointer' }"
      @click="deletePost"
      ><i class="fa fa-trash-o" aria-hidden="true"></i></span
    >
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import { CONFIG_ACCESS_TOKEN } from "../constants";
import { replaceAll } from "../helpers";
import axiosInstance from "../plugins/axios";
import { NOTI_DELETE_COMPLETE} from "../constants/index"

export default {
  name: "post-item-head",
  props: {
    post: { type: Object, default: null }
  },
  data() {
    return {
      querySearch: this.$route.query.query
    };
  },
  watch: {
    $route(to, from) {
      this.querySearch = to.query.query;
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    getAvatar() {
      if (this.post.profilepicture) return this.post.profilepicture;
      return "/dist/images/avatar-02.png";
    },
    getUserLink() {
      return { name: "user-page", params: { id: this.post.USERID } };
    },
    formatTimeAdded() {
      moment.locale("vi");
      return moment(this.post.time_added).fromNow();
    },
    formatFullname() {
      if (this.querySearch) {
        return replaceAll(
          this.post.fullname,
          this.querySearch,
          `<mark>${this.querySearch}</mark>`
        );
      } else {
        return this.post.fullname;
      }
    }
  },
  methods: {
    ...mapActions(["removePost"]),
    editPost() {
      this.$router.push(`/post-edit/${this.post.PID}`);
    },
    async deletePost() {
      if (!confirm("Bạn chắc chắn xoá bài viết này?")) {
        return;
      }

      try {
        await axiosInstance.post(
          "/post/delete.php",
          {
            postid: this.post.PID
          },
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
            }
          }
        );
        this.removePost(this.post.PID);
        // alert("Đã xoá bài viết");
        this.$notify(NOTI_DELETE_COMPLETE);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
.ass1-section__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ass1-section__name {
  text-transform: capitalize;
}
</style>
