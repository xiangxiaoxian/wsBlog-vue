<template>
  <!-- 新写的页面 -->
  <div class="main">
    <div class="ownerCenten">
      <div class="ownerCenten_left">
        <!-- 个人信息展示 -->
        <el-menu style="width: 200px">
          <el-menu-item index="1">
             <el-button type="text" @click="openCenter">个人中心</el-button>
            <!-- <span slot="title">个人中心</span> -->
          </el-menu-item>
          <el-menu-item index="2">
            <!-- <span slot="title">修改密码</span> -->
             <!-- <el-button type="text" @click="open">修改密码</el-button> -->
             <el-button type="text" @click="openPassword">修改密码</el-button>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="ownerCenten_right">
        <Eiditor />
      </div>
    </div>
  </div>

  <!-- 新写的页面 -->

  <!-- 
    <div class="personal-center">
        <PersonalCenterTop></PersonalCenterTop>
        <div class="personal-center-2">
            <div>
                 <PersonalCenterLeft></PersonalCenterLeft>
                 <Search></Search>
            </div>
            <PersonalCenterRight class="personal-center-3"></PersonalCenterRight>
        </div>
    </div> -->
</template>
<script>
import eiditor from "../components/eiditor";
export default {
  components: {
    Eiditor: eiditor,
  },
  
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
     
      openCenter() {
        this.$alert('进入个人中心吗？', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      openPassword() {
        this.$confirm('是否修改密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }

    
    },
  
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  margin: 0 10%;
  background-color: #fff;
}
.ownerCenten {
  display: flex;
  /* justify-content: space-between; */
}
.ownerCenten_right {
  /* border: 1px solid red; */
  margin: 10px 10px;
}
</style>