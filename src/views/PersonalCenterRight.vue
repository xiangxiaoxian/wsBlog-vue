<template>
    <div class="personal-cenetr-right">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="博客(0)" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="资源(0)" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="论坛(0)" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="问答(0)" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
     data() {
      return {
        activeName: 'first',
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style scoped>
    .personal-cenetr-right{
        width: 100%;
        background-color:white ;
    }
</style>