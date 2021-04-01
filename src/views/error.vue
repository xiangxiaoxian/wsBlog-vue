<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="ht-not-found not-found-default">
          <div class="content">
            <img src="../assets/images/404.png" alt="404 image" width="560" height="428"/>
            <h2>噢！找不到页面。</h2>
            <h2 class="span" v-on:click="previousPage">回到上一页吧</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "error",

    methods:{
      previousPage(){
        const _this=this;
        _this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .container {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #faf8ff;
  }
  .content{
    margin: 10% 30%;
  }
  .span:hover{
    color: blue;
  }
  .span{
    color: #925b14;
  }
</style>
