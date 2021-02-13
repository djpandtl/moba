import axios from 'axios'
import Vue from 'vue'

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

  }
});

export default http