export default {

    SET_LIST_POSTS(state, data) {
        state.listPosts = data;
    },
    PUSH_LIST_POSTS(state, data) {
        state.listPosts = [...state.listPosts, ...data];
    }, 
    SET_POST_DETAIL(state, data){
        state.postDetail = data

    },
    PUST_LIST_COMMENTS(state, comment) {
        console.log("PUSH_LIST_COMMENTS = ", comment);
        state.postDetail.comments.push(comment);
    },
    REMOVE_POST(state, id) {
        const index = state.listPosts.findIndex(post => post.PID === id);
        if (index !== -1) {
          state.listPosts.splice(index, 1);
        }
      }



}