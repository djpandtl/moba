import axios from 'axios'
// import Vue from 'vue'
// import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://127.0.0.1:8585/admin/api'
})

export default http