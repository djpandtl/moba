import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoriesCreate from '../views/CategoryCreate.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'categories/create',
        name: 'categories-create',
        component: CategoriesCreate
      },
      // 创建页 和 编辑页共用一个组件
      {
        path: 'categories/edit/:id',
        name: 'categories-create',
        component: CategoriesCreate,
        // props 表明该组件接收的属性
        props: true
      },
      {
        path: '/categories/list',
        name: 'categories-list',
        component: CategoryList
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
