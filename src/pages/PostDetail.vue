<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="ass1-section__post-detail" v-if="getDataPostDetail && getDataPostDetail.post">
                <div class="ass1-section">
                    <post-item v-bind:post="getDataPostDetail.post" />
                    <!---->
                </div>
  
                <post-comment-add />
  
                <post-comments/>
            </div>
        </div>
        <div class="col-lg-4">
            <sidebar />
        </div>
    </div>
  </template>
  
  <script>
  import Sidebar from "../components/Sidebar";
  import PostItem from "../components/PostItem";
  import PostFeeling from "../components/PostFeeling";
  import PostComments from "../components/PostComments";
  import PostCommentAdd from "../components/PostCommentAdd";
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  
  export default {
    name: "post-detail",
    components: {
      Sidebar,
      PostItem,
      PostFeeling,
      PostComments,
      PostCommentAdd
    },
    data() {
      return {
          postId: this.$route.params.id
      };
    },
    watch: {
      '$route'(to, from) {
          this.postId = to.params.id;
          this.fetchDataPostDetail();}
    },
    created(){
  
      this.fetchDataPostDetail()
  
    },
  
    computed: {
      ...mapGetters(['getDataPostDetail'])
    },
  
    methods: {
      ...mapActions(['getPostDetailById']),
      fetchDataPostDetail(){
          this.getPostDetailById(this.postId).then(res => {
          if(!res.ok){
                  this.$router.push('/')
  
              }
      })
      }
    }
  };
  </script>
  
  <style></style>
  