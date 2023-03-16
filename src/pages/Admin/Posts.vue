<template>
  <div class="row">
    <div class="col-lg-12
    ">
    <br>
    <br>
      <h1 style="font-weight: bolder;"><i class="fa fa-pencil-square" aria-hidden="true"></i> Quản lý bài viết users.</h1>
      <br>
      <br>
      <table style ="background-color: white" class="table table-bordered">
        <thead>
          <tr>
            <!-- <th scope="col">#</th> -->
            <th scope="col"><i class="fa fa-user" aria-hidden="true"></i> ID</th>
            <th scope="col"><i class="fa fa-list" aria-hidden="true"></i> Tên Users</th>
            <th scope="col"><i class="fa fa-book" aria-hidden="true"></i> Nội dung</th>
            <th scope="col"><i class="fa fa-calendar" aria-hidden="true"></i> Ngày đăng</th>
            <th scope="col"><i class="fa fa-cog" aria-hidden="true"></i> Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="index">
            <!-- <th scope="row">{{ index + 1 }}</th> -->
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
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deletePost(post.PID)"
              >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" @click="getPosts(paging.currPage - 1)"
              ><i class="fa fa-caret-square-o-left" aria-hidden="true"></i><span style="font-weight: bolder;"> Trước</span></a
            >
          </li>
          <li class="page-item">
            <a class="page-link" href="#" @click="getPosts(paging.currPage + 1)"
              ><span style="font-weight: bolder;">Sau</span> <i class="fa fa-caret-square-o-right" aria-hidden="true"></i></a
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
    async deletePost(id) {
      if (!confirm("Bạn chắc chắn xoá bài viết này?")) {
        return;
      }

      try {
        await axiosInstance.post(
          "/post/delete.php",
          {
            postid: id
          },
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
            }
          }
        );
        await this.getPosts();
        alert("Đã xoá bài viết");
      } catch (error) {}
    }
  },
  async mounted() {
    await this.getPosts();
  }
};
</script>
