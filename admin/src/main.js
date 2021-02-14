import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

import http from './http.js'
Vue.prototype.$http = http

// 配置图片上传的 headers 和 地址
Vue.mixin({
  computed: {
    uploadUrl() {
      return Vue.prototype.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        'Authorization': `Bearer ${localStorage.token || ''}`
      }
    }
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
