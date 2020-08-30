import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PostsList from '../views/PostsList.vue'
import UserInfo from '../views/UserInfo.vue'
import PostPage from '../views/PostPage.vue'
import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: { requireAuth: true },
    // component: Home
    component: PostsList
  },
  {
    path: '/postslist/page=:page/:tags?',
    name: 'PostsList',
    meta: { requireAuth: true },
    component: PostsList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user/userId=:userId',
    name: 'User',
    meta: { requireAuth: true },
    component: UserInfo
  },
  {
    path: '/blog/id=:id&author=:userId',
    name: 'Blog',
    meta: { requireAuth: true },
    component: PostPage
  },
  {
    path: '/test',
    name: 'Test',
  }
]

const router = new VueRouter({
  routes
})

export default router
