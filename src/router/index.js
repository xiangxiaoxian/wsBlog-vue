import Vue from 'vue'
import Router from 'vue-router'



import Home from '../views/home'
import Blog from '../views/blog'
import Blogdetial from '../views/blogdetial'
import Login from '../views/login'
import Register from '../views/register'
import Header from '../components/header'
import ForgotPassword from '../views/forgotPassword'
import top from '../views/top'
import Sort from '../views/sort'
import Search from '../views/search'
import ManagerUser from '../components/managerUser'
import ManagerHome from '../views/managerHome'
import ManagerMan from '../components/managerMan'
import ManagerArticle from "../components/managerArticle";

import personalCenter from '../views/personalCenter'
import {Main} from "element-ui";

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.base_url,
  routes: [
    {
      path: '/',
      name: 'home',
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
      name: 'home',
      components: {
        default: Home,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/sort/:sortId',
      name: 'sort',
      components: {
        default: Sort,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/lable/:lableId',
      name: 'lable',
      components: {
        default: Sort,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/blog',
      name: 'blog',
      components: {
        default: Blog,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/blogEdit/:blogId',
      name: 'blogEdit',
      components: {
        default: Blog,
        header: Header
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/personalCenter/:userId',
      name: 'personalCenter',
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
    {
      path: '/blogDetial/:articleId',
      name: 'blogDetial',
      components: {
        default: Blogdetial,
        header:Header,
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/top',
      name: 'top',
      components: {
        default: top,
        header:Header,
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'search',
      components: {
        default: Search,
        header:Header,
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path:'/manager',
      name:'manager',
      component: ManagerHome,
      meta:{
        keepAlive: true
      },
      children: [
        {
        // 这里不设置值，是把main作为默认页面
        path: '/manager',
        name: 'manager',
        component: Main,
        meta:{
          keepAlive: true
        },
      },
        {
        path: '/manager/managerUser',
        name: 'ManagerUser',
        component: ManagerUser,
        meta:{
          keepAlive: true
        },
      },
        {
          path: '/manager/managerMan',
          name: 'ManagerMan',
          component: ManagerMan,
          meta:{
            keepAlive: true
          },
        },
        {
          path: '/manager/managerArticle',
          name: 'ManagerArticle',
          component: ManagerArticle,
          meta:{
            keepAlive: true
          },
        },
      ]
    },
  ]
})
