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

Vue.use(VueRouter)

const routes = [
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
    ]
  },
  /* {
    path: '/about',
    name: 'About',
    
    component: () => import('../views/About.vue')
  } */
]

const router = new VueRouter({
  routes
})

export default router
