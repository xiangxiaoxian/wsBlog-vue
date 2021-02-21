import Vue from 'vue'
import Router from 'vue-router'



import Home from '../views/home'
import Blog from '../views/blog'
import blogdetial from '../views/blogdetial'
import login from '../views/login'
import register from '../views/register'
import BlogAdd from '../views/blogAdd'
import Owner from '../views/owner'
import Message from '../views/message'




Vue.use(Router)

export default new Router({
    mode: 'history',
    base:process.env.base_url,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/blog',
      name: '博客',
      component: Blog
    },
    {
      path: '/blogAdd',
      name: 'blogAdd',
      component: BlogAdd
    },
    {
      path: '/blogdetial',
      name: '详情页',
      component: blogdetial
    },
    {
      path: '/register',
      name: 'register',
      component: ()=>import("../views/register")
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import("../views/login")
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: ()=>import("../views/personalCenter")
    },{
      path: '/headerone',
      name: 'headerone',
      component: ()=>import("../components/headerone")
    },
    {
      path: '/owner',
      name: 'owner',
      component: ()=>import("../views/owner")

    },
    {
      path: '/message',
      name: 'owner',
      component: ()=>import("../views/message")

    }

    

  ]
})
