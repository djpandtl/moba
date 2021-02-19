import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/style/style.scss'

import http from './http.js'
Vue.prototype.$http = http

import MCard from './components/MCard.vue'
Vue.component('m-card', MCard)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
