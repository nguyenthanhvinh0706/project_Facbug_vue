import './plugins';
import './assets/style.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import Notifications from 'vue-notification';
import store from './store';
Vue.use(Notifications)

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})
