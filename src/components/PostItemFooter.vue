<template>
  <div class="ass1-section__footer">
    <a class="ass1-section__btn-like ass1-btn-icon" @click="like"
      ><i class="icon-Favorite_Full"></i><span>{{ likes }}</span></a
    >
    <router-link
      v-bind:to="{ name: 'post-detail', params: { id: this.post.PID } }"
      href="#"
      class="ass1-section__btn-comment ass1-btn-icon"
      ><i class="icon-Comment_Full"></i
      ><span>{{ commentCount }}</span></router-link
    >
  </div>
</template>

<script>
import { PostService } from "../services/post.service";
import { mapGetters } from "vuex";
export default {
  name: "post-item-footer",
  props: {
    post: { type: Object, default: null }
  },
  data() {
    return {
      postDetails: {}
    };
  },
  computed: {
    ...mapGetters(["isLogin", "currentUser"]),
    commentCount() {
      if (this.post.count) return this.post.count;
      return 0;
    },
    likes() {
      let total = 0;
      if (this.postDetails && this.postDetails.likes)
        total = this.postDetails.likes.length;

      return total;
    }
  },
  methods: {
    async like() {
      if (this.isLogin) {
        const postId = this.post.PID;
        const userId = this.currentUser.USERID.toString();

        // add like
        if (this.postDetails && !this.postDetails.likes.includes(userId)) {
          await PostService.likePost({
            postId,
            userId
          });

          this.postDetails.likes.push(userId);
        }
        // unlike
        else {
          await PostService.unlikePost({
            postId,
            userId
          });

          const index = this.postDetails.likes.findIndex(
            item => item === userId
          );
          this.postDetails.likes.splice(index, 1);
        }
      } else {
        this.$router.push("/login");
      }
    },
    async getPostDetails() {
      this.postDetails = (await PostService.getPost(this.post.PID)).data();
      if (!this.postDetails)
        this.postDetails = {
          likes: []
        };
    }
  },
  async mounted() {
    await this.getPostDetails();
  }
};
</script>

<style></style>
