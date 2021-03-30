<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>ws后台管理系统</span>
      </div>
      <div>
      <i slot="title">{{this.$store.getters.getRole.roleName}}{{this.$store.getters.getUser.nickName}},您好</i>
      </div>
      <div>
        <el-button @click="toHome">返回</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" v-on:click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" default-active="0">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">人员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" v-on:click="toManagerUser">用户管理</el-menu-item>
              <el-menu-item index="1-2" v-on:click="toManagerMan" v-if="this.$store.getters.getRole.roleName==='超级管理员'">管理员管理</el-menu-item>
              <el-menu-item index="1-3" v-on:click="toManagerRole" v-if="this.$store.getters.getRole.roleName==='超级管理员'">角色管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span slot="title">文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" v-on:click="toManagerArticle">文章列表</el-menu-item>
              <el-menu-item index="2-2" v-on:click="toManagerSort">文章分类</el-menu-item>
              <el-menu-item index="2-3" v-on:click="toManagerLable">文章标签</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span slot="title">公告管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" v-on:click="toManagerNotice">公告列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        // 是否折叠
        isCollapse: false,
      }
    },
    created() {

    },
    methods: {
      //导航栏
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      // 点击按钮，切换菜单的折叠与展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      toManagerUser(){
        const _this=this;
        _this.$router.push("/manager/managerUser")
      },
      toManagerMan(){
        const _this=this;
        _this.$router.push("/manager/managerMan")
      },
      toManagerArticle(){
        const _this=this;
        _this.$router.push("/manager/managerArticle")
      },
      toManagerRole(){
        const _this=this;
        _this.$router.push("/manager/managerRole")
      },
      toManagerSort(){
        const _this=this;
        _this.$router.push("/manager/managerSort")
      },
      toManagerLable(){
        const _this=this;
        _this.$router.push("/manager/managerLable")
      },
      toManagerNotice(){
        const _this=this;
        _this.$router.push("/manager/managerNotice")
      },
      //回博客
      toHome(){
        const _this=this;
        _this.$router.push("/home")
      },
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
