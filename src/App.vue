<template>
  <div id="app">
    <link rel="stylesheet" href="//at.alicdn.com/t/font_2368587_9rvaeddnviv.css">
    <el-container>
      <el-header ><Header v-show="currentPath !=='/login'"></Header> </el-header>
      <el-main><router-view ></router-view></el-main>
      <el-footer><Footer></Footer> </el-footer>
    </el-container>



  </div>
</template>

<script>
import header from "../src/components/header";
import footer from "../src/components/footer";


export default {
  name: "App",
  data(){
    return{currentPath:'/'}
  },
  mounted(){
    //是否显示头部
    this.currentPath=this.$route.path
    console.log(this.currentPath)

  },
  components: {
    Header: header,
    Footer: footer,
  },
};
</script>

<style>
#app {
  height: 700px;
  width: 100%;
  /*background-color:#F6F6F6 ;*/

}
a{
  text-decoration: none;

}
li{
  list-style: none;
}
*{
  margin: 0px;
  padding: 0px;
}

</style>
