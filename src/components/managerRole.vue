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
          <el-input placeholder="请输入角色名称查找" v-model="searchField" clearable @clear="getRoleList">
            <el-button slot="append" icon="el-icon-search" @click="getRoleList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="rolelist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="role_name"></el-table-column>
        <el-table-column label="角色释义" prop="role_comments"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="编辑角色" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="editRole(scope.row)"></el-button>
            </el-tooltip>
            <!-- 查看按钮 -->
            <el-tooltip effect="dark" content="查看角色" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-view" size="mini"
                         @click="getRoleById(scope.row)"></el-button>
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
    <!-- 角色详情的对话框 -->
    <el-dialog title="角色详情" :visible.sync="roleDialogVisible" width="50%" @close="roleDialogClosed">
      <div>
        <h2>角色名称:{{role.roleName}}</h2>
        <h2>角色释义:{{role.roleComments}}</h2>
        <div class="markdown-body" v-html="role.content">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="role"  ref="editFormRef" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="role.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色释义" prop="email">
          <el-input v-model="role.roleComments" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleById">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "managerRole",
    data() {
      return {
        // 分页
        page: {
          current: 1,
          size: 15,
          total: 0,
        },
        searchField: "",
        rolelist: [],
        role: {
          id:"",
          roleName: "",
          roleComments: "",
        },
        roleDialogVisible: false,
        editDialogVisible:false,
      }
    },
    created() {
      this.getRoleList()
    },
    methods: {
      async getRoleList() {
        const _this = this;
        _this.$axios
          .post("/role", this.page, {
            params: {searchField: this.searchField}
          })
          .then((res) => {
            if (200 == res.data.code) {
              this.rolelist = res.data.data.records;
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
        this.getRoleList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        this.page.current = newPage;
        this.getRoleList()
      },
      // 根据Id编辑对应的文章信息
      async editRoleById() {
        const _this = this;
        _this.$axios.put("/role",this.role).then(res => {
          if (200 === res.data.code) {
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.getRoleList();
            this.editDialogVisible=false;
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            });
          }
        })
      },
      //根据Id查看对应的角色信息
      async getRoleById(role) {
        const _this = this;
        _this.role.roleName=role.role_name
        _this.role.roleComments=role.role_comments
        _this.roleDialogVisible=true;
      },
      // 监听角色详情对话框的关闭事件
      roleDialogClosed() {
        this.roleDialogVisible = false;
      },
      // 监听编辑角色对话框的关闭事件
      editDialogClosed(){
        this.editDialogVisible=false;
      },
      //打开编辑角色对话框
      editRole(role){
        this.role.roleName=role.role_name;
        this.role.roleComments=role.role_comments;
        this.role.id=role.id;
        this.editDialogVisible=true;
      },
    }
  }
</script>

<style lang="less" scoped>
</style>


