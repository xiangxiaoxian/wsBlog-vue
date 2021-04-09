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
      <el-menu-item index="8" style="width: 10%">
        <router-link :to="{ path: '/top' }">排行</router-link>
      </el-menu-item>
      <el-input class="inputSreach" placeholder="请输入内容" v-model="searchField"
                @keyup.enter.native="toSearchArticle(searchField)">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-menu-item index="2" style="width: 10%" v-if="this.loginStatus">
        <router-link :to="{ path: '/blog' }">写博客</router-link>
      </el-menu-item>
      <el-menu-item index="6" style="width: 10%" v-show="this.loginStatus">
        <span v-on:click="toPersonalCenter">个人中心</span>
      </el-menu-item>
      <el-menu-item
      >
        <el-menu-item
          class="loginSelect"
          style="width: 10%"
          v-if="!this.loginStatus"
        >
          <router-link :to="{ path: '/login' }">登录/注册</router-link>
        </el-menu-item>
        <el-menu-item
          class="loginSelect"
          style="width: 10%"
          v-else
        >
          <el-dropdown>
            <el-menu-item index="7">
              <el-avatar :src="require('E:/wsBlogAvatar/'+imgsrc)"></el-avatar>
            </el-menu-item>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu1">
              <el-dropdown-item class="el-icon-s-custom" @click.native="mineData"
              >我的资料
              </el-dropdown-item
              >
              <el-dropdown-item class="el-icon-s-tools"
                                v-if="['管理员','超级管理员'].includes(this.$store.getters.getRole.roleName)"
                                @click.native="toManager"
              >后台管理
              </el-dropdown-item
              >
              <el-dropdown-item @click.native="logOut"
              >退出登录
              </el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu-item>
    </el-menu>
    <!--   个人资料模态框-->
    <el-drawer title="我的资料" direction="rtl" :visible.sync="dialogTableVisible" custom-class="demo-drawer">
      <div class="demo-drawer__content">
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
        <div slot="footer" class="demo-drawer__footer">
          <el-button type="primary" @click="cancelForm" class="closeButton">关闭</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchField: "",
        imgsrc: '001.jpg',
        dialogTableVisible: false,
        formLabelWidth: "100px",
        user: {
          nickName: "",
          password: "",
          email: "",
        },
        loginStatus: false,
      };
    },
    created() {
      this.getLoginStatus();
      this.searchField=this.$route.query["searchField"];
    },
    watch: {
      '$route': {
        handler(route) {
          this.getLoginStatus();
          this.searchField=this.$route.query["searchField"];
        }
      }
    },
    methods: {
      getLoginStatus() {
        if (localStorage.getItem("token")) {
          this.getUserInfo();
          this.getAvatar();
          this.loginStatus = true;
        }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logOut() {
        const _this = this;
        _this.$axios
          .get("/logout", {
            headers: {Authorization: sessionStorage.getItem("token")},
          })
          .then((res) => {
            if (200 == res.data.code) {
              _this.$store.commit("REMOVE_USERINFO");
              _this.$router.push("/login")
            }
          });
      },
      getAvatar() {
        const _this = this;
        let avatarUrl = _this.$store.getters.getUser.avatar;
        if (avatarUrl) {
          this.imgsrc = avatarUrl;
        }
      },
      getUserInfo() {
        const _this = this;
        let token = localStorage.getItem("token");
        let tokenSessionStorage = sessionStorage.getItem("token");
        if (token !== "" && !tokenSessionStorage) {
          let user = JSON.parse(localStorage.getItem("userInfo"));
          _this.$axios.get("/user/" + user.id).then(res => {
            if (user.password !== res.data.data.password) {
              _this.$store.commit("REMOVE_USERINFO");
              this.$confirm('该登录账号信息已失效，请重新登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                _this.$router.push("/login");
              }).catch(()=>{
                _this.$router.push("/login");
              })
              return false;
            } else {
              _this.$store.commit("SET_TOKEN", token);
              _this.$store.commit("SET_USERINFO", JSON.parse(localStorage.getItem("userInfo")));
              this.getAvatar();
              this.loginStatus = true;
            }
          })
        }
      },
      mineData() {
        this.user = JSON.parse(sessionStorage.getItem("userInfo"));
        this.dialogTableVisible = true;
      },
      toPersonalCenter() {
        const _this = this;
        let loginUsreId = _this.$store.getters.getUser.id;
        _this.$router.push("/personalCenter/" + loginUsreId);
      },
      toSearchArticle(searchField) {
        const _this = this;
        _this.$router.push({path: "/search", query: {searchField: searchField}})
      },
      toManager() {
        const _this = this;
        _this.$router.push("/manager")
      },
      cancelForm() {
        this.dialogTableVisible = false;
        clearTimeout(this.timer);
      }
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

  .closeButton {
    width: 60px;
    height: 40px;
    margin-top: 700px;
    margin-left: 10px;
  }
</style>

