<template>
  <div class="sort">
    <Main></Main>
  </div>
</template>
<script>
  import main from "../components/main";

  export default {
    name: "sort",
    data() {
      return {
      }
    },
    components: {
      Main: main,
    },
    created() {
    },
    methods:{

    },
  }
</script>

<style scoped>
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
  .sortLeft{
    position: fixed;
    height: 20%;
    width: 20%;
    margin-left: 95px;
    background: #d7dbda;
    margin-top: 0px;
  }
  .sortLeft-title{
    font-family: "宋体";
    color: #925b14;
    text-align: center;
    background: #5a8caa;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 20px;
    opacity: 0.75;
    line-height: 30px;
    margin: 0;
  }
</style>
