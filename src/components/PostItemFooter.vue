<template>
  <div class="ass1-section__footer">
    <a class="ass1-section__btn-like ass1-btn-icon" @click="like"
      ><i class="fa fa-thumbs-o-up" aria-hidden="true"></i><span class="like-count">{{ likes }}</span></a
    >
    <a class="ass1-section__btn-like ass1-btn-icon" @click="dislike"
      ><i class="fa fa-thumbs-o-down" aria-hidden="true"></i><span class="dislike-count">{{ dislikes }}</span></a
    >
    <router-link
      v-bind:to="{ name: 'post-detail', params: { id: this.post.PID } }"
      href="#"
      class="ass1-section__btn-comment ass1-btn-icon"
      ><i class="fa fa-comment" aria-hidden="true"></i><span class="commentCount">{{ commentCount }}</span></router-link
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
    },
    dislikes() {
      let total = 0;
      if (this.postDetails && this.postDetails.dislikes)
        total = this.postDetails.dislikes.length;

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
    async dislike() {
      if (this.isLogin) {
        const postId = this.post.PID;
        const userId = this.currentUser.USERID.toString();

        // add dislike
        if (this.postDetails && !this.postDetails.dislikes.includes(userId)) {
          await PostService.dislikePost({
            postId,
            userId
          });

          this.postDetails.dislikes.push(userId);
        }
        // unlike
        else {
          await PostService.undislikePost({
            postId,
            userId
          });

          const index = this.postDetails.dislikes.findIndex(
            item => item === userId
          );
          this.postDetails.dislikes.splice(index, 1);
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
    },
    async getPostDetails() {
      this.postDetails = (await PostService.getPost(this.post.PID)).data();
      if (!this.postDetails)
        this.postDetails = {
          dislikes: []
        };
    }
  },
  async mounted() {
    await this.getPostDetails();
  }
};
</script>

<style></style>
