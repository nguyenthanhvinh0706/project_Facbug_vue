<template>
  <div class="row">
    <div class="col-lg-12">
      <br>
      <h1 style="font-weight: bolder;"><i class="fa fa-users" aria-hidden="true"></i> Thành viên:</h1>
      <br>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"><i class="fa fa-user" aria-hidden="true"></i> ID</th>
            <th scope="col"><i class="fa fa-envelope" aria-hidden="true"></i> Email</th>
            <th scope="col">Fullname</th>
            <th scope="col"><i class="fa fa-male" aria-hidden="true"></i>/<i class="fa fa-female" aria-hidden="true"></i></th>
            <th scope="col"><i class="fa fa-user-times" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in members" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ member.USERID }}</td>
            <td>{{ member.email }}</td>
            <td>{{ member.fullname }}</td>
            <td>{{ member.gender }}</td>
            <td>
              <input
                type="checkbox"
                v-model="member.active"
                @change="toggle(member.USERID)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{
              active: paging.currPage === page
            }"
            v-for="(page, index) in totalPages"
            :key="index"
            @click="getMembers(page)"
          >
            <a class="page-link" href="#">{{ page }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { CONFIG_ACCESS_TOKEN } from "../../constants";
import {STATUS_COMPLETE} from "../../constants/index"
import axiosInstance from "../../plugins/axios";


export default {
  name: "AdminMembers",
  data() {
    return {
      paging: {
        pagesize: 5,
        currPage: 1
      },
      totalMembers: 0,
      members: [],
      fetching: false
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalMembers / this.paging.pagesize);
    }
  },
  methods: {
    async getMembers(page = 1) {
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
          "/member/getListPaging.php",
          config
        );
        const {
          body: { total, users }
        } = response.data;

        this.totalMembers = total;
        this.paging.currPage = page;
        this.members = users.map(user => {
          user.active = user.status !== "1";

          return user;
        });
      } catch (error) {
        this.members = [];
      } finally {
        this.fetching = false;
      }
    },
    async toggle(id) {
      try {
        const config = {
          params: this.paging,
          headers: {
            Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
          }
        };

        await axiosInstance.post(
          "/member/activeDeactive.php",
          { userid: id },
          config
        );

         this.$notify(STATUS_COMPLETE);
      } catch (error) {
        console.log(error);
      } finally {
        this.getMembers();
      }
    }
  },
  async mounted() {
    await this.getMembers();
  }
};
</script>
