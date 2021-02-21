<template>
  <div class="search">
    <el-select
      v-model="value"
      class="search-top"
      style="width:270px;"
      size="small"
      multiple
      filterable
      placeholder="搜博主文章">
    </el-select>
  </div>
</template>
<script>
export default {
    data(){
      return {
          value:''
      }
    }
};
</script>
<style scoped>
.search {
  width: 300px;
  height: 48px;
  background-color: white;
  margin-top: 10px;
  padding-left: 20px;
  line-height: 45px;
}
.search-top{
    width: 226px;
}
</style>