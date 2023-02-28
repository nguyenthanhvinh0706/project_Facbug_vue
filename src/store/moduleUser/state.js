import {CONFIG_ACCESS_TOKEN} from '../../constants'
export default {
    [CONFIG_ACCESS_TOKEN]: localStorage.getItem(CONFIG_ACCESS_TOKEN),
    currentUser: null ,
    userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {},
    users:{},
    posts: {}
}

