<template>
  <div class="row">
    <div class="col-lg-8">
      <div
        class="ass1-section__post-detail"
        v-if="getDataPostDetail && getDataPostDetail.post"
      >
        <div class="ass1-section">
          <post-item v-bind:post="getDataPostDetail.post" />
          <div class="list-categories">
            <h5><strong>Danh mục: </strong></h5>
            <ul>
              <li v-for="item in matchedCategories" :key="item.TAG_ID">
                <router-link v-bind:to="getLinkCategory(item)">{{
                  item.text
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>

        <post-comment-add />

        <post-comments v-bind:comments="getDataPostDetail.comments" />
      </div>
    </div>
    <div class="col-lg-4">
      <sidebar />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import PostItem from "../components/PostItem";
import PostComments from "../components/PostComments";
import PostCommentAdd from "../components/PostCommentAdd";
import { mapActions, mapGetters } from "vuex";
import { removeVietnameseFromString } from "../helpers";
import { COLLECTION, db } from "../firebase";

let unsubcribeComments;

export default {
  name: "post-detail",
  data() {
    return {
      postId: this.$route.params.id
    };
  },
  components: {
    Sidebar,
    PostItem,
    PostComments,
    PostCommentAdd
  },
  watch: {
    $route(to, from) {
      this.postId = to.params.id;
      this.fetchDataPostDetail();
    }
  },
  computed: {
    ...mapGetters(["getDataPostDetail"]),
    categories() {
      return this.$store.state.post.categories;
    },
    matchedCategories() {
      return this.getDataPostDetail.categoties
        .map(item => {
          const category = this.categories.find(
            cate => cate.id === parseInt(item.tag_index)
          );
          item.text = category ? category.text : "";

          return item;
        })
        .filter(Boolean);
    }
  },
  created() {
    unsubcribeComments = db
      .collection(COLLECTION.POST)
      .doc(this.postId)
      .onSnapshot(doc => {
        this.fetchDataPostDetail();
      });
  },
  destroyed() {
    unsubcribeComments();
  },
  methods: {
    ...mapActions(["getPostDetailById"]),
    fetchDataPostDetail() {
      this.getPostDetailById(this.postId).then(res => {
        if (!res.ok) {
          this.$router.push("/");
        }
      });
    },
    getLinkCategory(category) {
      return {
        name: "home-page",
        query: {
          text: removeVietnameseFromString(category.tag_value),
          tagIndex: category.tag_index
        }
      };
    }
  }
};
</script>

<style>
.ass1-section__post-detail {
  margin-top: 44px;
}
.ass1-section__post-detail .ass1-section .ass1-section {
  box-shadow: none;
  padding: 0;
  border-bottom: solid 1px #f3f3f3;
}
.list-categories {
  padding-bottom: 20px;
}
.list-categories ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
}
.list-categories ul li {
  margin: 5px;
}
.list-categories ul li a {
  color: #333;
  font-size: 14px;
  display: block;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 3px 10px;
  transition: all 0.3s ease;
}
.list-categories ul li a:hover {
  background-color: #333;
  border-color: #333;
  color: #fff;
}
</style>
