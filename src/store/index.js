import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    SET_TOKEN: (state,token)=>{
      state.token=token
      localStorage.setItem("token",token)
    },
    SET_USERINFO: (state,userInfo)=>{
      state.userInfo=userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_USERINFO: (state)=>{
      state.userInfo={}
      state.token=''
      sessionStorage.setItem("userInfo",JSON.stringify(''))
      localStorage.setItem("token",'')
    }
  },
  getters: {
    //拿到当前登录用户信息
    getUser: state => {
      return state.userInfo
    }
  }

})
