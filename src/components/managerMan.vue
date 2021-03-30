<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">

    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入昵称查找" v-model="searchField" clearable @clear="getManList">
            <el-button slot="append" icon="el-icon-search" @click="getManList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="账号" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="角色" prop="roles.roleName"></el-table-column>
        <el-table-column label="状态" width="200px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="-1" active-text="启用" inactive-text="冻结" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        class="pageIndex"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[15, 30, 50, 70, 100]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </el-card>

    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
      <div>
        <p>当前的用户：{{userInfo.nickName}}</p>
        <p>当前的角色：{{userInfo.roles.roleName}}</p>
        <p>分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:"managerMan",
    data() {
      return {
        // 分页
        page: {
          current: 1,
          size: 15,
          total: 0,
        },
        searchField: "",
        userlist: [],
        // 控制分配角色对话框的显示与隐藏
        setRoleDialogVisible: false,
        // 需要被分配角色的用户信息
        userInfo: {
          id:"",
          nickName:"",
          roles:{
            id:"",
            roleName:"",
          }
        },
        // 所有角色的数据列表
        rolesList: [],
        // 已选中的角色Id值
        selectedRoleId: ''
      }
    },
    created() {
      this.getManList()
    },
    methods: {
      async getManList() {
        const _this = this;
        _this.$axios
          .post("/user/man", this.page, {
            params: {searchField: this.searchField}
          })
          .then((res) => {
            if (200 == res.data.code) {
              this.userlist = res.data.data.records;
              this.page.total = res.data.data.total;
            } else {
              this.$alert("服务器错误", {
                confirmButtonText: "确定",
              });
              return false;
            }
          });
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        this.page.size = newSize;
        this.getManList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        this.page.current = newPage;
        this.getManList()
      },
      // 监听 switch 开关状态的改变
      async userStateChanged(userinfo) {
        const _this=this;
        _this.$axios.put("/user",userinfo).then(res=>{
          if (200===res.data.code){
            this.$message({
              message: 'success',
              type: 'success'
            });
          }
        })
      },
      // 展示分配角色的对话框
      async setRole(userInfo) {
        this.userInfo.id = userInfo.id
        this.userInfo.nickName = userInfo.nickName
        this.userInfo.roles.id = userInfo.roles.id
        this.userInfo.roles.roleName = userInfo.roles.roleName
        // 在展示对话框之前，获取所有角色的列表
        const _this=this;
        _this.$axios.get("/role").then(res=>{
          this.rolesList=res.data.data;
        })
        this.setRoleDialogVisible = true
      },
      // 点击按钮，分配角色
      async saveRoleInfo() {
        if (!this.selectedRoleId) {
          return this.$message.error('请选择要分配的角色！')
        }
        const _this=this;
        _this.$axios.post("user/userRole/"+_this.userInfo.id+"/"+_this.selectedRoleId).then(res=>{
          if (200===res.data.code){
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.getManList()
            this.setRoleDialogVisible = false
          }
        })

      },
      // 监听分配角色对话框的关闭事件
      setRoleDialogClosed() {
        this.setRoleDialogVisible=false;
      }
    }
  }
</script>

<style lang="less" scoped>
</style>


