import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://127.0.0.1:8585/admin/api'
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // return Promise.reject(error);
  console.log('interceptors', error.response)

  // 
  if (error.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: error.response.data.message
    })

    // 等 401 错误 即没有登录无token时，跳转到登录页
    if (error.response.status === 401) {
      console.log('跳转了！')
      router.push('/login')
    }
  }
});

// 添加请求拦截器，发送 token
http.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.Authorization = 'bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default http