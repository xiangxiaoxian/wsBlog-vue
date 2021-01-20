import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import BlogAdd from '../views/blogAdd'

Vue.use(Router)

export default new Router({
    mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/blogAdd',
      name: 'blogAdd',
      component: BlogAdd
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import("../views/login")
    },
    {
      path: '/blogDetails',
      name: 'blogDetails',
      component: ()=>import("../views/blogDetails")
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: ()=>import("../views/personalCenter")
    }
  ]
})
