<template>
    <div class="ass1-add-comment">
      <form action="#" v-on:submit.prevent="handleAddComment">
        <textarea
          v-model="comment"
          class="form-control ttg-border-none"
          placeholder="Thêm một bình luận..."
        ></textarea>
      </form>
      <div class="ass1-add-comment__content">
        <a
          href="#"
          v-on:click.prevent="handleAddComment"
          class="ass1-add-comment__btn-save ass1-btn-icon"
          ><span>{{ renderMaxLength }}</span
          ><i class="fa fa-commenting-o" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  import { PostService } from "../services/post.service";
  import {CMT_COMPLETE, CMT_WARNING} from "../constants/index"
  export default {
    name: "post-comment-add",
    data() {
      return {
        comment: "",
        maxLength: 200,
        postId: this.$route.params.id
      };
    },
    watch: {
      $route(to, from) {
        this.postId = to.params.id;
      }
    },
    computed: {
      ...mapGetters(["currentUser"]),
      renderMaxLength() {
        return this.maxLength - this.comment.length;
      }
    },
    methods: {
      ...mapActions(["addNewComment"]),
      async handleAddComment() {
        if (this.comment.length && this.comment.length <= this.maxLength) {
          let data = {
            comment: this.comment,
            postid: this.postId
          };
          const response = await this.addNewComment(data);
  
          if (response.ok) {
            this.$notify(CMT_COMPLETE);
            await PostService.addComment({
              msg: this.comment,
              postId: this.postId,
              userId: this.currentUser.USERID
            });
            this.comment = "";
          } else {
            alert(res.error);
          }
        } else {
            this.$notify(CMT_WARNING);
        }
      }
    }
  };
  </script>
  
  <style></style>

  </script>
