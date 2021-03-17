<template>
  <div class="mainNav">
    <!-- 前面五个分为一组分别是用来 -->
    <!-- <div>这里是一logo</div> -->
    <el-menu
      class="el-menu-header"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-menu-item index="1" style="width: 10%">
        <router-link :to="{ path: '/home' }">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2" style="width: 10%">
        <router-link :to="{ path: '/blog' }">博客</router-link>
      </el-menu-item>
      <el-menu-item index="8" style="width: 10%">
        <router-link :to="{ path: '/aboutus' }">排行</router-link>
      </el-menu-item>

      <el-input class="inputSreach" placeholder="请输入内容" v-model="input4">
        clearable>
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <!-- <span class=" iconfon icon-sousuo"></span> -->
      <el-menu-item index="6" style="width: 10%">
        <router-link :to="{ path: '/personalCenter/'+this.$store.getters.getUser.id}">个人中心</router-link>
      </el-menu-item>
      <el-menu-item class="writeblog" index="7" style="width: 10%">
        <router-link :to="{ path: '/message' }">创作中心</router-link>
      </el-menu-item>
      <!--若当前有用户登录，则不展示登录注册字样，展示登录用户头像等信息-->

      <!-- 测试 -->
      <el-menu-item
        >
        <el-menu-item
          class="loginSelect"
          style="width: 10%"
          v-if="this.$store.getters.getUser === '' ||this.$store.getters.getUser ===null "
        >
          <router-link :to="{ path: '/login' }">登录/注册 </router-link>
        </el-menu-item>
        <el-menu-item
          class="loginSelect"
          style="width: 10%"
          v-else
        >
          <el-dropdown>
            <el-menu-item index="avatar">
              <el-avatar  :src="require('E:/wsBlogAvatar/'+imgsrc)"></el-avatar>
            </el-menu-item>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu1">
              <el-dropdown-item class="el-icon-s-custom" @click.native="mineData"
                >我的资料</el-dropdown-item
              >
              <el-dropdown-item class="el-icon-s-tools"
                >后台管理</el-dropdown-item
              >
              <el-dropdown-item @click.native="logOut"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu-item>
    </el-menu>
    <!--    修改密码模态框-->
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item label="昵称" :label-width="formLabelWidth" style="width: 500px">
          <el-input v-model="user.nickName" auto-complete="off" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" style="width: 500px">
          <el-input v-model="user.username" auto-complete="off" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" style="width: 500px">
          <el-input v-model="user.email" auto-complete="off" disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input4: "",
      imgsrc: '',
      dialogTableVisible: false,
      formLabelWidth: "100px",
      user: {
        nickName: "",
        password: "",
        email:"",
      },
    };
  },
  mounted() {
    this.getUserInfo();
    this.getAvatar();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick() {
      alert("button click");
    },
    logOut() {
      const _this = this;
      _this.$axios
        .get("/logout", {
          headers: { Authorization: sessionStorage.getItem("token") },
        })
        .then((res) => {
          if (200 == res.data.code) {
            _this.$store.commit("REMOVE_USERINFO");
            _this.$router.push("/login")
          }
        });
    },
    getAvatar(){
      const _this=this;
      let avatarUrl=_this.$store.getters.getUser.avatar;
      if(avatarUrl) {
        this.imgsrc = this.imgsrc + avatarUrl;
      }
    },
    getUserInfo(){
      const _this=this;
      let token=localStorage.getItem("token");
      if (token!=""){
        _this.$store.commit("SET_TOKEN", token);
        _this.$store.commit("SET_USERINFO",JSON.parse(localStorage.getItem("userInfo")));
      }
    },
    mineData(){
      this.user=JSON.parse(sessionStorage.getItem("userInfo"));
      this.dialogTableVisible=true;
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  /* display: inline-block; */
}

.mainNav {
  background-color: #545c64;
  width: 100%;
  height: 60px;
  text-align: center;
}
.el-menu-header {
  margin: 0 85px;
  /* height: 40px; */
  display: flex;
  justify-content: space-between;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.el-input-header {
  width: 600px;
  margin: 10px 20px;
}

.inputSreach {
  width: 300px;
  margin: 10px;
  /* height: ; */
}

.el-input__icon el-icon-search {
  font: 16px;
}

.actor {
  margin: 10px;
}

.loginSelect:hover .OwnerCenter {
  display: block;
}

.OwnerCenter {
  width: 60px;
  /* height: 400px; */
  background-color: red;
  /* z-index: 10; */
  /* display: none; */
}

.se {
  display: flex;
}

/* .el-dropdown {
      vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
      margin-left: 15px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    } */
.el-dropdown-item {
  width: 100px;
}

#dropdown-link1 {
  position: relative;
}

.dropdown-menu1 {
  width: 100px;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0 2px;
  /* background: red; */
}
.dialog-footer button {
  width: 100px;
  height: 40px;
}
</style>

