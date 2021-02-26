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
      <el-menu-item index="1" style="width: 10%"
      >
        <router-link :to="{ path: '/home' }">首页</router-link>
      </el-menu-item
      >
      <el-menu-item index="2" style="width: 10%"
      >
        <router-link :to="{ path: '/blog' }">博客</router-link>
      </el-menu-item
      >
      <!-- <el-menu-item index="3" style="width: 10%" ><router-link :to="{ path: '/blogdetial' }">详情页</router-link></el-menu-item> -->
      <!-- <el-menu-item index="4" style="width: 10%" ><router-link :to="{ path: '/search' }">搜索</router-link></el-menu-item> -->
      <el-menu-item index="8" style="width: 10%"
      >
        <router-link :to="{ path: '/aboutus' }"
        >排行
        </router-link
        >
      </el-menu-item
      >

      <el-input class="inputSreach" placeholder="请输入内容" v-model="input4">
        clearable>
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <!-- <span class=" iconfon icon-sousuo"></span> -->
      <el-menu-item index="6" style="width: 10%"
      >
        <router-link :to="{ path: '/owner' }"
        >个人中心
        </router-link
        >
      </el-menu-item
      >
      <el-menu-item class="writeblog" index="7" style="width: 10%"
      >
        <router-link :to="{ path: '/message' }"
        >创作中心
        </router-link
        >
      </el-menu-item>
      <!--若当前有用户登录，则不展示登录注册字样，展示登录用户头像等信息-->
      <el-menu-item
        index="5"
        style="width: 10%"
        :to="{ path: '/personalcenter' }"
        v-if="this.$store.state.token === ''"
      >
        <router-link :to="{ path: '/login' }"
        >登录/注册
        </router-link
        >
      </el-menu-item
      >
      <el-dropdown v-if="this.$store.state.token !==''">
       <span class="el-dropdown-link">
          <el-avatar class="actor" :size="large" :src="circleUrl" ></el-avatar>
       </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: "1",
        activeIndex2: "1",
        input4: "",
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["large", "medium", "small"]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
    display: inline-block;
  }

  .mainNav {
    background-color: #545c64;
    width: 100%;
    height: 60px;
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
</style>
