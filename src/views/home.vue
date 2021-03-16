<template>
  <div>
    <!-- 头部作为全局组件进行渲染 -->

   <Main></Main>
  </div>
</template>
<script>
  // import header from "../components/header";
  import aside from "../components/aside";
  import main from "../components/main";
  // import footer from "../components/footer";
  export default {
    name: "home",
    data(){
      return {}
    },
    components:{
      // Header:header,
      Aside:aside,
      Main:main,

    },
    comments: {}
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
