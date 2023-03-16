<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <!-- <router-link to ="/" class="ass1-logo">
					Face<span style = "color:#CC0000 ">Bug</span><i style = "color:#CC0000; font-size: 20px;" class="fa fa-bug" aria-hidden="true"></i>
					</router-link> -->
                    <br>
            <p style="font-weight: bolder; font-size: 20px;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> : Chỉnh sửa thông tin cá nhân.</p>

            <div class="ass1-login__form">
                <div class="avatar">
                    <img v-bind:src="getAvatar" alt="">
                </div>
                <form action="#" v-if="currentUser"
                v-on:submit.prevent="handleEditProfile">
                    <input
                        v-bind:value="currentUser.fullname" v-on:input="fullname = $event.target.value"
                        type="text" class="form-control" placeholder="Tên ..." required="">
                    
                    <select
                    
                        v-bind:value="currentUser.gender"
                        v-on:change="gender = $event.target.value"  
                        class="form-control">
                        <option value="" disabled>Giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nu">Nữ</option>
                    </select>

                    <input 
                        v-on:change="uploadAvatar"
                        type="file" name="avatar"  placeholder="Ảnh đại diện" class="form-control">
                    
                    <textarea 
                    v-bind:value="currentUser.description"
                        v-on:input="description = $event.target.value"
                        class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ..."></textarea>
                    
                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn"><i class="fa fa-upload" aria-hidden="true"></i> Cập nhật</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { mapActions } from 'vuex';
import { NOTI_PROFILE_COMPLETE } from '../constants/index';
export default {
    name: 'user-profile',
    data() {
        return {
            fullname: '',
            description: '',
            gender: '',
            avatar: {
                objFile: null,
                base64URL: ''
            },
            userid: this.$route.params.id
        }
    },
    watch: {
        '$route' (to, from) {
            this.userid = to.params.id;
            this.checkIsCurrentUser();
        }
    },
    created(){
        this.checkIsCurrentUser()

    },
    computed:{
        ...mapGetters(['currentUser']),
        getAvatar() {
            if(this.avatar.base64URL === '' && this.currentUser) {
                return this.currentUser.profilepicture;
            } else {
                return this.avatar.base64URL;
            }
        }
    },
    methods:{
        ...mapActions(['updateProfile']),
        checkIsCurrentUser() {
            if(this.userid && this.currentUser) {
                if(this.userid != this.currentUser.USERID) {
                    this.$router.push('/')
                }
            }
        },
        handleEditProfile() {
            if(!this.gender) this.gender = this.currentUser.gender;
            if(!this.fullname) this.fullname = this.currentUser.fullname;
            if(!this.description) this.description = this.currentUser.description;
            console.log("fullname:",this.fullname)
            console.log("description:",this.description)
            console.log("gender: ",this.gender)
            if(this.fullname && this.description && this.gender) {
                let data = {
                    fullname: this.fullname,
                    description: this.description,
                    gender: this.gender
                }
                if(this.avatar.objFile) {
                    data.objFile = this.avatar.objFile;
                }
                this.updateProfile(data).then(res => {
                    if(res.ok){
                        this.$notify(NOTI_PROFILE_COMPLETE)
                    }else{alert(res.error)}
                })
            }

        },
        uploadAvatar(e) {
            if(e.target.files && e.target.files.length) {
                const fileAvatar = e.target.files[0];
                console.log(fileAvatar);
                
                let reader  = new FileReader();

                reader.addEventListener("load", () => {
                    let previewSrc = reader.result;
                    this.avatar.base64URL = previewSrc;
                    this.avatar.objFile = fileAvatar;
                }, false);

                if (fileAvatar) {
                    reader.readAsDataURL(fileAvatar);
                }
            }
        }

    }
}
</script>

<style scoped>
    .avatar {
        border-radius: 50%;
        overflow: hidden;
    }
</style>