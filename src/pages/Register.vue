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
        <p><span style="font-size: 17px; font-weight:bold;"><i class="fa fa-user-plus" aria-hidden="true"></i> Đăng Ký</span></p>
        <div class="ass1-login__form">
          <form action="#" v-on:submit.prevent="handleSubmitRegister">
            <input
              v-model="fullname"
              type="text"
              class="form-control"
              placeholder="Tên hiển thị"
              required
            />
            <input
              v-model="email"
              type="text"
              class="form-control"
              placeholder="Email"
              required
            />
            <small class="text-danger" v-if="email && !validEmail"
              >Email is invalid</small
            >
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Mật khẩu"
              required
            />
            <input
              v-model="repassword"
              type="password"
              class="form-control"
              placeholder="Nhập lại mật khẩu"
              required
            />
            <small
              class="text-danger"
              v-if="password && repassword && !validPassword"
              >Password is not matched</small
            >
            <div class="ass1-login__send">
              <router-link to="/login">Đăng nhập</router-link>
              <button type="submit" class="ass1-btn"><i class="fa fa-user-plus" aria-hidden="true"></i> Đăng ký</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  import {REGISTER_COMPLETE} from "../constants"
  import { ggProvider, auth } from "../firebase";
  
  export default {
    name: "register",
    data() {
      return {
        email: "",
        fullname: "",
        password: "",
        repassword: ""
      };
    },
    computed: {
      validEmail() {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email);
      },
      validPassword() {
        return this.password === this.repassword;
      }
    },
    methods: {
      ...mapActions(["register"]),
      async handleSubmitRegister(e) {
        if (!this.validEmail || !this.validPassword) return;
  
        let data = {
          email: this.email,
          fullname: this.fullname,
          password: this.password,
          repassword: this.repassword
        };
  
        const registerAndLogin = () => {
          this.register(data).then(res => {
            if (!res.ok) {
              alert(res.error);
            } else {
              this.$notify(REGISTER_COMPLETE);
              this.$router.push("/");
              
            }
          });
        };
  
        if (data.email && data.fullname && data.password && data.repassword) {
          try {
            // Đăng ký với firebase
            const userCredential = await auth().createUserWithEmailAndPassword(
              data.email,
              data.password
            );
            await userCredential.user.sendEmailVerification();
          } catch (error) {
            // Email đã tồn tại
            if (error.code === "auth/email-already-in-use") {
              alert(`Email ${data.email} đã tồn tại!`);
              return;
            }
          }
  
          alert("Vui lòng kiểm tra email!");
  
          // Listener khi user đã click verify mail
          const onIdTokenChangedUnsubscribe = auth().onIdTokenChanged(user => {
            const unsubscribeSetInterval = setTimeout(() => {
              auth().currentUser.reload();
              auth().currentUser.getIdToken(true);
            }, 1000);
  
            // Nếu đã verify mail sẽ thực hiện call api đăng ký và login
            if (user && user.emailVerified) {
              clearInterval(unsubscribeSetInterval); // clear interval
              registerAndLogin();
              return onIdTokenChangedUnsubscribe(); // unsubscribe onIdTokenChanged
            }
          });
        } else {
          alert("nhập đầy đủ thông tin");
        }
      }
    },
    async mounted() {
      await auth().signOut();
    }
  };
  </script>
  
  <style></style>
  