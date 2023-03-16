<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p> <span style="font-weight: bolder; font-size: 20px;"><i class="fa fa-unlock-alt" aria-hidden="true"></i> Đổi mật khẩu</span></p>
            <div class="ass1-login__form">
                <form action="#" v-on:submit.prevent="handleChangePassword">
                    <input v-model="oldPassword"
                        type="password" class="form-control" placeholder="Mật khẩu cũ" required="">
                    <input v-model="newPassword"
                        type="password" class="form-control" placeholder="Mật khẩu mới" required="">
                    <input v-model="reNewPassword"
                        type="password" class="form-control" placeholder="Xác nhận mật khẩu mới" required="">
                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn"><i class="fa fa-paper-plane" aria-hidden="true"></i> Gửi</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import { PASS_C0NFIRM } from '../constants/index' 
import {PASS_ERROR_C0NFIRM, PASS_TEXT, PASS_ERROR} from '../constants/index' 

export default {
    name: 'change-password',
    data() {
        return {
            oldPassword: "",
            newPassword: "",
            reNewPassword: "",
            userid: this.$route.params.id
        }
    },
    watch: {
        '$route' (to,from) {
            this.userid=to.params.id;
            this.checkIsCurrentUser()
        }
    },
    computed: {
        ...mapGetters(['currentUser'])
    },
    created(){
        this.checkIsCurrentUser()

    },
    methods:{
        ...mapActions(['changePassword']),
        checkIsCurrentUser() {
            if(this.userid && this.currentUser) {
                if(this.userid != this.currentUser.USERID) {
                    this.$router.push('/')
                }
            }
        },
        handleChangePassword() {
            let{oldPassword,newPassword,reNewPassword } = this;
            if(oldPassword&&newPassword&&reNewPassword) {
                if(oldPassword == newPassword) {
                    this.$notify(PASS_ERROR);
                } else if (newPassword != reNewPassword) {
                    this.$notify(PASS_ERROR_C0NFIRM);
                } else {
                    let data = {
                        oldPassword,
                        newPassword,
                        reNewPassword
                    }
                    this.changePassword(data).then(res => {
                        if(res.ok) {
                            this.$notify(PASS_C0NFIRM);
                            this.$router.push('/');
                        } else {
                            alert(res.error);
                        }
                    })
                }
            } else {
                this.$notify(PASS_TEXT);
            }
        }

    }
}
</script>

<style>

</style>