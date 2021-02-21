<template>
  <div>
    <el-tabs type="border-card" :tab-position="tabPosition">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <div>z这里怎么实现</div>
  </div>
</template>

<script>
export default {
   data() {
      return {
        tabPosition: 'left'
      };
    }
  
};
</script>

<style scoped>


</style>
