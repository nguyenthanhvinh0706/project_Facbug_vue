<template>
  <div class="ass1-head-user" v-if="userInfor">
    <div class="ass1-head-user__content">
      <div class="ass1-head-user__image">
        <a href="#"
          ><img v-bind:src="getAvatar" v-bind:alt="userInfor.fullname"
        /></a>
      </div>
      <div class="ass1-head-user__info">
        <div class="ass1-head-user__info-head">
          <div class="ass1-head-user__name">
            <span style="font-weight: bolder;">{{ userInfor.fullname }}</span>
          </div>
          <div class="w-100"></div>
          <a
            v-if="!isCurrentUser"
            href="#"
            class="ass1-head-user__btn-follow ass1-btn"
            ><i style="color: #3482e2;" class="icon-Followers"></i>Theo dõi</a
          >

          <template v-else>
            <router-link
              v-bind:to="{
                name: 'change-password',
                params: { id: userInfor.USERID }
              }"
              class="ass1-head-user__btn-follow ass1-btn"
              ><i style="color: #3482e2;" class="fa fa-exchange" aria-hidden="true"></i> Đổi mật khẩu</router-link
            >
            <router-link
              v-bind:to="{
                name: 'user-profile',
                params: { id: userInfor.USERID }
              }"
              class="ass1-head-user__btn-follow ass1-btn"
              ><i style="color: #3482e2;" class="fa fa-pencil-square-o" aria-hidden="true"></i> Sửa thông tin cá nhân</router-link
            >
            <template v-if="userInfo && userInfo.permission === 'admin'">
              <router-link
                v-bind:to="{
                  name: 'admin-members'
                }"
                class="ass1-head-user__btn-follow ass1-btn"
                ><i style="color: #3482e2;" class="fa fa-users" aria-hidden="true"></i> Quản lý members</router-link
              >
              <router-link
                v-bind:to="{
                  name: 'admin-posts'
                }"
                class="ass1-head-user__btn-follow ass1-btn"
                ><i style="color: #3482e2;" class="fa fa-pencil-square" aria-hidden="true"></i> Quản lý bài viết</router-link
              >
            </template>
          </template>
        </div>
        <div class="ass1-head-user__info-statistic">
          <div class="ass1-btn-icon">
            <i class="icon-Post"></i><span class="www">Bài viết: {{ countPost }}</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Followers"></i><span class="uuu">Theo dõi: 0</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Following"></i><span class="vvv">Đang theo dõi: 0</span>
          </div>
        </div>
        <p class="userInfor_description">{{ userInfor.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "user-page-info",
  props: {
    userInfor: { type: Object, default: null },
    countPost: { type: Number, default: 0 }
  },
  computed: {
    ...mapGetters(["currentUser", "userInfo"]),
    isCurrentUser() {
      if (this.userInfor && this.currentUser) {
        if (this.userInfor.USERID == this.currentUser.USERID) return true;
      }
      return false;
    },
    getAvatar() {
      if (this.userInfor && this.userInfor.profilepicture) {
        return this.userInfor.profilepicture;
      }
      return "/dist/images/cat-1634369_1920.jpg";
    }
  }
};
</script>

<style></style>
