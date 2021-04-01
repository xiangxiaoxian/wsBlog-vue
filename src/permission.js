import router from "./router"

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {//判断该路由是否需要登录权限
    const token = sessionStorage.getItem("token")
    if (token){//已经登录
      if (to.matched.some(record => record.meta.manager)) {//判断该路由是否需要管理员权限
        const roleName=JSON.parse(sessionStorage.getItem("userInfo")).roles.roleName
        if (roleName==="用户"){
          next({
            path: '/404',//没权限
          })
        }else {
          next();
        }
      }else {
        next();
      }
    }else {
      next({
        path: '/404',//未登录
      })
    }
  }else {
    next();//不需要权限
  }
})
