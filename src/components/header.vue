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

      <el-menu-item index="1" style="width: 10%"><router-link :to="{ path: '/home' }">首页</router-link></el-menu-item >
      <el-menu-item index="2" style="width: 10%"><router-link :to="{ path: '/blog' }">博客</router-link></el-menu-item>
      <el-menu-item index="3" style="width: 10%" ><router-link :to="{ path: '/blogdetial' }">详情页</router-link></el-menu-item>
      <el-menu-item index="4" style="width: 10%" ><router-link :to="{ path: '/search' }">搜索</router-link></el-menu-item>
      <el-menu-item index="8" style="width: 10%"><router-link :to="{ path: '/aboutus' }">关于我们</router-link></el-menu-item>
      <el-input
        class="el-input-header "
        placeholder="请输入需要搜索的内容"
        style="width: 400px"
      >
      </el-input>
      <!-- <span class=" iconfon icon-sousuo"></span> -->
      <!--若当前有用户登录，则不展示登录注册字样，展示登录用户头像等信息-->
      <el-menu-item
        index="5"
        style="width: 10%"
        :to="{ path: '/personalcenter' }"
        v-if="this.$store.getters===null"
        ><router-link :to="{ path: '/login' }">登录/注册</router-link></el-menu-item
      >
      <el-menu-item index="6" style="width: 10%"><router-link :to="{ path: '/owner' }">个人中心</router-link></el-menu-item>
      <el-menu-item  class="writeblog" index="7" style="width: 10%"><router-link :to="{ path: '/message' }">创作中心</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
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
  height: 60px;
}
.el-menu-header {
  margin: 0 85px;
  /* height: 40px; */
  display: flex;
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

</style>
