import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoriesCreate from '../views/CategoryCreate.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemList from '../views/ItemList.vue'
import ItemEdit from '../views/ItemEdit.vue'

import HeroList from '../views/HeroList.vue'
import HeroEdit from '../views/HeroEdit.vue'

import ArticleEdit from '../views/ArticleEdit'
import ArticleList from '../views/ArticleList'

import AdEdit from '../views/AdEdit'
import AdList from '../views/AdList'


import AdminUserEdit from '../views/AdminUserEdit'
import AdminUserList from '../views/AdminUserList'

import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, 
    meta: {
      isPublic: true
    } 
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: 'categories/create',
    children: [
      {
        path: 'categories/create',
        name: 'categories-create',
        component: CategoriesCreate
      },
      // 创建页 和 编辑页共用一个组件
      {
        path: 'categories/edit/:id',
        name: 'categories-edit',
        component: CategoriesCreate,
        // props 表明该组件接收的属性
        props: true
      },
      {
        path: '/categories/list',
        name: 'categories-list',
        component: CategoryList
      },
      {
        path: '/items/list',
        name: 'items-list',
        component: ItemList
      },
      {
        path: '/items/create',
        name: 'items-create',
        component: ItemEdit
      },
       // 创建页 和 编辑页共用一个组件
       {
        path: 'items/edit/:id',
        name: 'items-edit',
        component: ItemEdit,
        // props 表明该组件接收的属性
        props: true
      },
      // 英雄列表哦
      {
        path: '/heros/create',
        name: 'heros-create',
        component: HeroEdit
      },
      {
        path: '/heros/list',
        name: 'heros-list',
        component: HeroList
      },
      // 英雄编辑
      {
        path: '/heros/edit/:id',
        name: 'heros-edit',
        component: HeroEdit,
        props: true
      },
      {
        path: '/articles/list',
        name: 'articles-list',
        component: ArticleList
      },
      {
        path: '/articles/create',
        name: 'articles-create',
        component: ArticleEdit
      },

      // 文章编辑
      {
        path: '/articles/edit/:id',
        name: 'articles-edit',
        component: ArticleEdit,
        props: true
      },
      // 广告
      {
        path: '/ads/list',
        name: 'ads-list',
        component: AdList
      },
      {
        path: '/ads/create',
        name: 'ads-create',
        component: AdEdit
      },

      {
        path: '/ads/edit/:id',
        name: 'ads-edit',
        component: AdEdit,
        props: true
      },

      // 管理员用户
      {
        path: '/admin_user/list',
        name: 'admin-list',
        component: AdminUserList
      },
      {
        path: '/admin_user/create',
        name: 'admin-create',
        component: AdminUserEdit
      },

      {
        path: '/admin_user/edit/:id',
        name: 'admin-edit',
        component: AdminUserEdit,
        props: true
      },

    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('from router', from)
  // console.log('to router', to)
  // 通过 isPublic 字段确定访问权限
  if(!to.meta.isPublic && !localStorage.token) {
    // token 简单验证，伪造 token的时候可以进去.....
    next({ path: '/login'})

  } else {
    next()

  }
})

export default router
