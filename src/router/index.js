import Vue from 'vue'
import Router from 'vue-router'



import Home from '../views/home'
import Blog from '../views/blog'
import Blogdetial from '../views/blogdetial'
import Login from '../views/login'
import Register from '../views/register'
import Owner from '../views/owner'
import Message from '../views/message'

import Header from '../components/header'
import ForgotPassword from '../views/forgotPassword'

import personalCenter from '../views/personalCenter'


Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.base_url,
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      components: {
        default: Home,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/blog',
      name: '博客',
      components: {
        default: Blog,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    // {
    //   path: '/blogAdd',
    //   name: 'blogAdd',
    //   components: {
    //     default: BlogAdd,
    //     header: Header
    //   },
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    {
      path: '/personalCenter',
      name: '个人中心',
      components: {
        default: personalCenter,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/register',
      name: 'register',
      // component: ()=>import("../views/register")
      components: {
        default: Register,
      },
      meta: {
        keepAlive: true
      }

    },
    {
      path: '/login',
      name: 'login',
      // component: ()=>import("../views/login")
      components: {
        default: Login,
      },
      meta: {
        keepAlive: true
      }
    },
    // {
    //   path: '/personalCenter',
    //   name: 'personalCenter',
    //   component: () => import("../views/personalCenter")
    // }, 
    {
      path: '/headerone',
      name: 'headerone',
      component: () => import("../components/headerone")
    },
    {
      path: '/owner',
      name: 'owner',
      // component: ()=>import("../views/owner")
      components: {
        default: Owner,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/message',
      name: 'owner',
      components: {
        default: Message,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      components: {
        default: ForgotPassword,
      },
      meta: {
        keepAlive: true
      }
    },
  ]
})
