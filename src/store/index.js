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
      sessionStorage.setItem("token",token)
    },
    SET_USERINFO: (state,userInfo)=>{
      state.userInfo=userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_USERINFO: (state)=>{
      state.userInfo={}
      state.token=''
      sessionStorage.setItem("userInfo",JSON.stringify(''))
      sessionStorage.setItem("token",'')
      localStorage.setItem("token",'')
      localStorage.setItem("userInfo",JSON.stringify(''))
    },
    SET_TOKEN_REMEMBER:(state,token)=>{
      state.token=token
      sessionStorage.setItem("token",token)
      localStorage.setItem("token",token)
    },
    SET_USERINFO_REMEMBER:(state,userInfo)=>{
      state.userInfo=userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
      localStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
  },
  getters: {
    //拿到当前登录用户信息
    getUser: state => {
      return state.userInfo
    }
  }

})
