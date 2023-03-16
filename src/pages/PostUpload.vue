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
              <i class="fa fa-file-image-o" aria-hidden="true"></i>Chọn ảnh từ thiết bị
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
            <button v-on:click="handleUploadPost" class="ass1-btn">
              Đăng bài 
            </button>
          </div>
          <div class="ass1-aside__edit-post-head">
            <span style="margin-bottom:13px; display: block; font-weight: bolder; width: 100%"
              >Chọn danh mục (<i class="fa fa-tags" aria-hidden="true"></i>):</span
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
        </aside>
      </div>
    </div>
  </template>

<script>
import { mapActions } from 'vuex';
import { checkImageFile,checkImageURL  } from '../helpers';
import {EDIT_ERROR, EDIT_ERROR_COMPLETE, UPLOAD_COMPLETE } from "../constants/index"
export default {
    name: 'post-upload',
    data() {
        return {
            post_content: '',
            url_image: '',
            obj_image: {
                objFile: null,
                base64URL: ''
            },
            categories: [],
            errors: {
                url_image: "",
                post_content: "",
                categories: ""
            }

        }
    },
    computed: {
        allCategories() {
            return this.$store.state.post.categories
        },
        renderImage() {
            if (this.obj_image.base64URL) return this.obj_image.base64URL;
            else if(this.url_image) return this.url_image;
            return '/dist/images/no_image_available.jpg';
        }
        
    },
    methods: {
        ...mapActions([
            'createNewPost'
        ]),
        uploadImage() {
            this.$refs.imageUpload.click();
        },
        handleUploadImage(e) {
            if(e.target.files && e.target.files.length) {
                const imageUpload = e.target.files[0];
                
                let check = checkImageFile(imageUpload);

                if(!check) {
                    this.$notify(EDIT_ERROR);
                    return;
                }

                let reader  = new FileReader();

                reader.addEventListener("load", () => {
                    let previewSrc = reader.result;
                    this.obj_image.base64URL = previewSrc;
                    this.obj_image.objFile = imageUpload;
                }, false);

                if (imageUpload) {
                    reader.readAsDataURL(imageUpload);
                }
            }
        },
        resetData() {
            this.categories = [];
            this.post_content = '';
            this.url_image = '';
            this.obj_image = {
                base64URL: '',
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
        async handleUploadPost() {
      let { post_content, url_image, categories, obj_image } = this;

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
        this.errors.url_image = "Định dạng hình ảnh không hợp lệ (file upload: jpg, jpeg, png, gif)";
      }
      // Content
      if (!Boolean(post_content)) {
        this.errors.post_content = "Nội dung không được để trống";
      }
      // Content
      if (categories.length === 0) {
        this.errors.categories = "Ít nhất một danh mục";
      }

      if (Object.values(this.errors).some(item => Boolean(item))) return;

      if (post_content && categories.length) {
        if (url_image || obj_image.objFile) {
          let data = {
            post_content,
            url_image,
            category: categories
          };

          if (obj_image.objFile) data.obj_image = obj_image.objFile;
          this.createNewPost(data).then(res => {
            if (res.ok) {
              this.resetData();
              this.$notify(UPLOAD_COMPLETE);
            } else {
              alert(res.error);
            }
          });
        } else {
            this.$notify(EDIT_ERROR);
        }
      } else {
        this.$notify(EDIT_ERROR_COMPLETE);
      }
    }
    }
}
</script>

<style>

</style>