import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [
      { path: '/home', name: 'Home', component: Home, },
      { path: '/article/:id', name: 'Article', component: Article, props: true },
    ]
  },
  {
    path: '/hero/:id', name: "Hero", component: Hero, props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
