<template>
    <div class="ass1-login">
        <div class="ass1-login__logo">
            <router-link to="/" class="ass1-logo"><span style ="font-size: 50px ;">Face<span style = "color:#CC0000 ">Bug</span></span></router-link>
        </div>
        <div class="ass1-login__content">
            <p><span style="font-size: 17px; font-weight:bold;">Đăng Ký</span></p>
            <div class="ass1-login__form">
                <form action="#" v-on:submit.prevent="handleSubmitRegister">
                    <input v-model="fullname"
                        type="text" class="form-control" placeholder="Tên hiển thị" required="">
                    <input v-model="email" 
                        type="text" class="form-control" placeholder="Email" required="">
                    <input v-model="password" 
                        type="password" class="form-control" placeholder="Mật khẩu" required="">
                    <input v-model="repassword" 
                        type="password" class="form-control" placeholder="Nhập lại mật khẩu" required="">
                    <div class="ass1-login__send">
                        <router-link to="/login">Đăng nhập</router-link>
                        <button type="submit" class="ass1-btn">Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'register',
    data() {
        return {
            email: '',
            fullname: '',
            password: '',
            repassword: ''
        }
    },
    methods: {

        ...mapActions(['register']),
        handleSubmitRegister(e) {
            let data= {
                email: this.email,
                fullname: this.fullname,
                password: this.password,
                repassword: this.repassword

            }
            if(data.email && data.fullname && data.password && data.repassword){
                this.register(data).then(res => {
                    console.log("res = ", res)
                    if(!res.ok){
                        alert(res.error);
                    }else{
                        this.$router.push('/')
                        alert("đăng ký thành công")
                    }
                })

            }else{ alert ('nhập đầy đủ thông tin')
            }
        }
    }

}
</script>

<style>

</style>