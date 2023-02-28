import Vue from 'vue'
import {CONFIG_ACCESS_TOKEN} from '../../constants'
export default {
    SET_USER_INFO(state,user){
        console.log(state,user)
        Vue.set(state.users, user.USERID, user)
    },
    SET_USER_POSTS(state, {posts, userid}){
        Vue.set(state.posts, userid, posts)
    },
    SET_LOGIN_INFO(state, {user = null, token=''}) {
        localStorage.setItem(CONFIG_ACCESS_TOKEN,token)
        state[CONFIG_ACCESS_TOKEN] = token;
        state.currentUser = user


    },
    SET_LOGOUT(state) {
        state[CONFIG_ACCESS_TOKEN] = '';
        state.currentUser = null;
        localStorage.removeItem(CONFIG_ACCESS_TOKEN);
    },
    SET_CURRENT_USER(state, user){
        state.currentUser=user

    },
    SET_USER_INFO_DATA(state, user) {
        if (!user) {
          state.userInfo = {};
          localStorage.removeItem("userInfo");
        }
        localStorage.setItem("userInfo", JSON.stringify(user));
        state.userInfo = user;
      },

}