<template>
  <div id="app-body">
    <link rel="stylesheet" href="//at.alicdn.com/t/font_2368587_e8xm0d0e9k.css">
    <router-view name="header"></router-view>
    <el-main style="padding:0px">
    <transition >
      <keep-alive>
       <router-view class="view-router" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view class="view-router" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    </el-main>

  </div>


</template>

<script>
import header from "../src/components/header";
import footer from "../src/components/footer";

export default {
  name: "App",

  components: {
    Header: header,
    Footer: footer,
  },
};
</script>

<style>
#app-body {
  height: 100%;
  width: 100%;
}

a {
  text-decoration: none;
}
li {
  list-style: none;
}
* {
  margin: 0px;
  padding: 0px;
}
.view-router {
  height: 100%;
}


</style>
