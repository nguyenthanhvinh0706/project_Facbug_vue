<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="ass1-section ass1-section__edit-post">
        <div class="ass1-section__content">
          <form action="#">
            <div class="form-group">
              <input
                v-model="url_image"
                type="text"
                class="form-control ttg-border-none"
                placeholder="https://"
              />
              <small class="text-danger" v-if="errors.url_image">
                {{ errors.url_image }}</small
              >
            </div>
            <div class="form-group">
              <textarea
                v-model="post_content"
                type="text"
                class="form-control ttg-border-none"
                placeholder="Mô tả ..."
              ></textarea>
              <small class="text-danger" v-if="errors.post_content">
                {{ errors.post_content }}</small
              >
            </div>
          </form>
          <div class="ass1-section__image" v-on:click="uploadImage">
            <img v-bind:src="renderImage" alt="default" />
          </div>
          <button v-on:click="uploadImage" class="ass1-btn ass1-btn-meme">
            Chọn ảnh từ thiết bị
          </button>
          <!-- ref -->
          <input
            v-on:change="handleUploadImage"
            style="display: none;"
            ref="imageUpload"
            type="file"
            name="images"
            class="form-control"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <aside class="ass1-aside ass1-aside__edit-post">
        <div>
          <button v-on:click="handleEditPost" class="ass1-btn">
            Cập nhật
          </button>
        </div>
        <div class="ass1-aside__edit-post-head">
          <span style="display: block; font-weight: bolder; width: 100%"
            >Chọn danh mục:</span
          >

          <small
            class="text-danger"
            style="display: block; width: 100%; margin-bottom: 10px;"
            v-if="errors.categories"
          >
            {{ errors.categories }}</small
          >

          <label
            class="ass1-checkbox"
            v-for="item in allCategories"
            v-bind:key="item.id"
          >
            <input
              v-bind:value="item.id"
              v-model="categories"
              type="checkbox"
              name="state-post"
            />
            <span></span>
            <p>{{ item.text }}</p>
          </label>
        </div>
        <div class="ass1-aside__get-code">
          <p>Chia sẻ với :</p>
        </div>
        <div class="ass1-aside__social">
          <a
            href="https://www.facebook.com/"
            class="ass1-btn-social__facebook ass1-btn-social"
            ><i class="fa fa-facebook" aria-hidden="true"></i
          ></a>
          <a
            href="https://twitter.com/"
            class="ass1-btn-social__twitter ass1-btn-social"
            ><i class="fa fa-twitter" aria-hidden="true"></i
          ></a>
          <a href="" class="ass1-btn-social__google ass1-btn-social"
            ><i class="fa fa-google-plus" aria-hidden="true"></i
          ></a>
        </div>

        <!-- <span
          class="ml-2 badge badge-danger"
          :style="{ cursor: 'pointer' }"
          @click.prevent="deletePost"
          >Xoá bài viết</span
        > -->
      </aside>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { CONFIG_ACCESS_TOKEN } from "../constants";
import { checkImageFile, checkImageURL } from "../helpers";
import axiosInstance from "../plugins/axios";
import {EDIT_COMPLETE, EDIT_ERROR_COMPLETE, EDIT_ERROR, CHECK_FILE} from "../constants/index"
export default {
  name: "post-upload",
  data() {
    return {
      postId: this.$route.params.id,
      post_content: "",
      url_image: "",
      obj_image: {
        objFile: null,
        base64URL: ""
      },
      categories: [],
      errors: {
        url_image: "",
        post_content: "",
        categories: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getDataPostDetail"]),
    allCategories() {
      return this.$store.state.post.categories;
    },
    renderImage() {
      if (this.obj_image.base64URL) return this.obj_image.base64URL;
      else if (this.url_image) return this.url_image;
      return "/dist/images/no_image_available.jpg";
    }
  },

  methods: {
    ...mapActions(["updatePost", "getPostDetailById"]),
    uploadImage() {
      this.$refs.imageUpload.click();
    },
    handleUploadImage(e) {
      if (e.target.files && e.target.files.length) {
        const imageUpload = e.target.files[0];

        let check = checkImageFile(imageUpload);

        if (!check) {
          this.$notify(CHECK_FILE);
          return;
        }

        let reader = new FileReader();

        reader.addEventListener(
          "load",
          () => {
            let previewSrc = reader.result;
            this.obj_image.base64URL = previewSrc;
            this.obj_image.objFile = imageUpload;
          },
          false
        );

        if (imageUpload) {
          reader.readAsDataURL(imageUpload);
        }
      }
    },
    resetData() {
      this.categories = [];
      this.post_content = "";
      this.url_image = "";
      this.obj_image = {
        base64URL: "",
        objFile: null
      };
      this.errors = Object.assign(
        {},
        {
          url_image: "",
          post_content: "",
          categories: ""
        }
      );
    },
    async handleEditPost() {
      let { postId, post_content, url_image, categories, obj_image } = this;
      // Validate
      this.errors = Object.assign(
        {},
        {
          url_image: "",
          post_content: "",
          categories: ""
        }
      );

      // Url
      if (!(await checkImageURL(url_image))) {
        this.errors.url_image = "File ảnh không hợp lệ (jpg, jpeg, png, gif)";
      }
      // Content
      if (!Boolean(post_content)) {
        this.errors.post_content = "Nội dung không được để trống";
      }
      // Content
      if (categories.length === 0) {
        this.errors.categories = "Ít nhất một danh mục";
      }

      if (post_content && categories.length) {
        if (url_image || obj_image.objFile) {
          let data = {
            postid: postId,
            post_content,
            url_image,
            category: categories
          };

          if (obj_image.objFile) data.obj_image = obj_image.objFile;
          this.updatePost(data).then(async res => {
            if (res.ok) {
              await this.fetchDataPostDetail();
              this.$notify(EDIT_COMPLETE);
            } else {
              alert(res.error);
            }
          });
        } else {
          this.$notify(EDIT_ERROR);
        }
      } else {
        this.$notify(EDIT_ERROR_COMPLETE)
      }
    },
    async fetchDataPostDetail() {
      this.getPostDetailById(this.postId).then(res => {
        if (!res.ok) {
          return this.$router.push("/");
        }

        if (this.getDataPostDetail) {
          const {
            post: { url_image, post_content },
            categoties
          } = this.getDataPostDetail;

          this.url_image = url_image;
          this.post_content = post_content;

          this.categories = categoties.map(item => parseInt(item.tag_index));
        }
      });
    },
    async deletePost() {
      if (!confirm("Bạn chắc chắn xoá bài viết này?")) {
        return;
      }

      try {
        await axiosInstance.post(
          "/post/delete.php",
          {
            postid: this.postId
          },
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
            }
          }
        );
        alert("Đã xoá bài viết");
        this.$router.push("/");
      } catch (error) {}
    }
  },
  async created() {
    await this.fetchDataPostDetail();
  }
};
</script>

<style></style>
