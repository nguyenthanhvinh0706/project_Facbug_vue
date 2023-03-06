<template>
    <div class="ass1-login">
      <div class="ass1-login__logo">
        <router-link to="/" class="ass1-logo"
          ><span style="font-size: 50px ;"
            >Face<span style="color:#CC0000 ">Bug</span></span
          ></router-link
        >
      </div>
      <div class="ass1-login__content">
        <p><span style="font-size: 17px; font-weight: bold;">Đăng nhập</span></p>
  
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
              >Email không đúng định dạng</small
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
              <button type="submit" class="ass1-btn">Đăng nhập</button>
            </div>
          </form>
        </div>
  
        <p class="text-danger" v-if="error.length">{{ error }}</p>
      </div>
    </div>
  </template>

<script>
import {PASS_LOGIN, LOGIN_COMPLETE} from "../constants/index"
       
import {mapActions} from 'vuex'
export default {
    name: 'login',
    data(){
        return{
            error: "",
            email: '',
            password:''
        }
    },
    computed: {
    validEmail() {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email);
    }
  },
    methods:{
        ...mapActions(['login']),
        handleSubmitLogin(e) {
            let data = {
                email:this.email,
                password: this.password
            }

            this.login(data).then(res => {
                if(!res.ok){
                    if(typeof res.error ==='string'){
                        this.$notify(PASS_LOGIN)
                    } else{
                        alert(res.error.join(''));
                    }
                }else{
                    this.$notify(LOGIN_COMPLETE)
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>

<style>


</style>