<template>
  <div class="row">
    <div class="col-lg-8">
      <h1>Bài viết của users</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Fullname</th>
            <th scope="col">Content</th>
            <th scope="col">Post date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ post.PID }}</td>
            <td>{{ post.fullname }}</td>
            <td>{{ post.post_content }}</td>
            <td>{{ formatDate(post.time_added) }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="editPost(post.PID)"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" @click="getPosts(paging.currPage - 1)"
              >Previous</a
            >
          </li>
          <li class="page-item">
            <a class="page-link" href="#" @click="getPosts(paging.currPage + 1)"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { CONFIG_ACCESS_TOKEN } from "../../constants";
import axiosInstance from "../../plugins/axios";
import moment from "moment";
export default {
  name: "AdminPosts",
  data() {
    return {
      paging: {
        pagesize: 5,
        currPage: 1
      },
      totalPosts: 0,
      posts: [],
      fetching: false
    };
  },

  methods: {
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY, HH:mm:ss");
    },
    async getPosts(page = 1) {
      if (this.fetching) return;

      this.fetching = true;

      this.paging.currPage = page;

      const config = {
        params: this.paging,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      };

      try {
        const response = await axiosInstance.get(
          "/post/getListPagination.php",
          config
        );
        const { posts } = response.data;

        this.posts = posts;
      } catch (error) {
        this.posts = [];
      } finally {
        this.fetching = false;
      }
    },
    editPost(id) {
      this.$router.push(`/post-edit/${id}`);
    },
  },
  async mounted() {
    await this.getPosts();
  }
};
</script>
