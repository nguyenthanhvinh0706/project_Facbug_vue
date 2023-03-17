<template>
  <div class="ass1-login">
    <div class="ass1-login__logo">
      <router-link to="/" class="ass1-logo"
        ><span style="font-size: 50px ;"
          >Face<span style="color:#CC0000 ">Bug</span></span
        ><i style = "color:#CC0000; font-size: 30px;" class="fa fa-bug" aria-hidden="true"></i></router-link
      >
    </div>
    <div class="ass1-login__content">
      <p><span style="font-size: 17px; font-weight: bold;"><i class="fa fa-sign-in" aria-hidden="true"></i> Đăng nhập</span></p>

      <div class="ass1-login__form">
        <form action="#" v-on:submit.prevent="handleSubmitLogin">
          <input
            v-model="email"
            type="text"
            class="form-control"
            placeholder="Email"
            required
          />
          <small class="text-danger" v-if="email && !validEmail"
            >Email không hợp lệ</small
          >
          <div class="ass1-input-copy">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Mật khẩu"
              required
            />
          </div>

          <div class="ass1-login__send">
            <router-link to="/register">Đăng ký một tài khoản</router-link>
            <button type="submit" class="ass1-btn"><i class="fa fa-user" aria-hidden="true"></i>Đăng nhập</button>
          </div>
        </form>
      </div>

      <button class="loginBtn loginBtn--google" @click="loginWithGmail">Đăng nhập với Google</button>
      <br>
      <br>
      <p class="text-danger" v-if="error.length">{{ error }}</p>
    </div>
  </div>
</template>

<script>

import {LOGIN_COMPLETE} from "../constants"
import firebase from "firebase/app";
import { mapActions } from "vuex";
import { ggProvider, auth } from "../firebase";
export default {
  name: "login",
  data() {
    return {
      provider: null,
      error: "",
      email: "",
      password: ""
    };
  },
  computed: {
    validEmail() {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email);
    }
  },
  methods: {
    ...mapActions(["login", "register"]),
    
    handleSubmitLogin(e) {
      if (!this.validEmail) return;

      let data = {
        email: this.email,
        password: this.password
      };

      this.login(data).then(res => {
        if (!res.ok) {
          if (typeof res.error === "string") {
            this.error = res.error;
          } else {
            this.error = res.error.join("");
          }
        } else {
          this.$notify(LOGIN_COMPLETE)
          this.$router.push("/");
        }
      });
    },
    async loginWithGmail() {
      const result = await firebase.auth().signInWithPopup(this.provider);
      var user = result.user;
      const { displayName, email, uid } = user;

      // login first, if fail will register and login again
      try {
        let data = {
          email,
          password: uid
        };

        const res = await this.login(data);
        if (!res.ok) {
          let dataRegister = {
            email,
            fullname: displayName,
            password: uid,
            repassword: uid
          };

          const res = await this.register(dataRegister);
          if (!res.ok) {
            alert(res.error);
          } else {
            return this.$router.push("/");
          }
        } else {
          return this.$router.push("/");
        }
      } catch (error) {
        alert(error);
      }
    }
  },
  async mounted() {
    await auth().signOut();
    this.provider = ggProvider;
  }
};
</script>

<style>
body { padding: 2em; }
    .loginBtn {
      box-sizing: border-box;
      position: relative;
      margin: 0.2em;
      padding: 0 15px 0 46px;
      border: none;
      text-align: left;
      line-height: 34px;
      white-space: nowrap;
      border-radius: 0.2em;
      font-size: 16px;
      color: #FFF;
    }
    .loginBtn:before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 34px;
      height: 100%;
    }
    .loginBtn:focus {
      outline: none;
    }
    .loginBtn:active {
      box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
    }
    .loginBtn--google {
      background: #DD4B39;
    }
    .loginBtn--google:before {
      border-right: #BB3F30 1px solid;
      background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
    }
    .loginBtn--google:hover,
    .loginBtn--google:focus {
      background: #E74B37;
    }

</style>
