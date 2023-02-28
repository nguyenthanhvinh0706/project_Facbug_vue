<template>
    <div>
        <user-page-infor v-bind:countPost="countPost" v-bind:userInfor="userInfor" />
        <div
            v-if="listPostOfUser && listPostOfUser.length"
            v-masonry
            column-width='.grid-sizer'
            transition-duration="0.3s" 
            item-selector=".ass1-section__item"
            class="ass1-section__wrap row ass1-section__isotope-init">
            
            <div class="grid-sizer"></div>
            
            <post-item 
                v-masonry-tile
                v-for="item in listPostOfUser"
                v-bind:key="item.PID"
                v-bind:post="item"
                class="col-lg-6"
            />

        </div>
    </div>
</template>

<script>
import PostItem from '../components/PostItem'
import UserPageInfor from '../components/UserPageInfor'
import {mapActions} from 'vuex'

export default {
    name: 'user-page',
    components: {
        UserPageInfor,
        PostItem,
    },
    data() {
        return {
            userInfor: null,
            listPostOfUser: [],
            userid: this.$route.params.id
        }
    },
    watch: {
        '$route' (to, from) {
            this.userid = to.params.id;
            this.fetchAllData();
        }
    },

    created(){
        this.fetchAllData()
        

    }, 
    computed: {
        countPost() {
            if(this.listPostOfUser && this.listPostOfUser.length){
                return this.listPostOfUser.length;
            } return 0;
        }

    },
    methods: {
        ...mapActions(['setLoading','getUserById','getListPostsByUserId'
        ]),
        async fetchAllData() {
            this.setLoading(true);
            let userid = this.userid;
            let promiseUser   =   this.getUserById(userid);
            let promisePostUser  =   this.getListPostsByUserId(userid);

            let [resultUser, resultPostUser] = await Promise.all([ promiseUser, promisePostUser ]);
            this.setLoading(false);
            if(resultUser.ok && resultPostUser.ok) {
                this.userInfor      = resultUser.data;
                this.listPostOfUser = resultPostUser.posts;
                this.$redrawVueMasonry();
            } else {
                this.$router.push('/');
            }
        }

    }
}
</script>

<style>

</style>