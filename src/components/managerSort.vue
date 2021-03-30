<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="searchField" clearable @clear="getSortList">
            <el-button slot="append" icon="el-icon-search" @click="getSortList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 分类列表区域 -->
      <el-table :data="sortlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="分类名" prop="sortName"></el-table-column>
        <el-table-column label="分类释义" prop="sortComments"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeSortById(scope.row.id)"></el-button>
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

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="sort"  ref="addFormRef" label-width="70px">
        <el-form-item label="分类名" prop="sortName">
          <el-input v-model="sort.sortName"></el-input>
        </el-form-item>
        <el-form-item label="分类释义" prop="sortComments">
          <el-input v-model="sort.sortComments"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSort">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类的对话框 -->
    <el-dialog title="修改分类" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editSort"  ref="editFormRef" label-width="70px">
        <el-form-item label="分类名" prop="sortName">
          <el-input v-model="editSort.sortName"></el-input>
        </el-form-item>
        <el-form-item label="分类释义" prop="sortComments">
          <el-input v-model="editSort.sortComments"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 获取分类列表的参数对象
        searchField: "",
        // 分页
        page: {
          current: 1,
          size: 15,
          total: 0,
        },
        sortlist: [],
        total: 0,
        // 控制添加分类对话框的显示与隐藏
        addDialogVisible: false,
        // 添加分类的表单数据
        sort: {
          sortName: '',
          sortComments: '',
        },
        // 控制修改分类对话框的显示与隐藏
        editDialogVisible: false,
        editSort:{
          id:"",
          sortName:"",
          sortComments:"",
        }
      }
    },
    created() {
      this.getSortList()
    },
    methods: {
      async getSortList() {
        const _this = this;
        _this.$axios
          .post("/sort", this.page, {
            params: {searchField: this.searchField}
          })
          .then((res) => {
            if (200 == res.data.code) {
              this.sortlist = res.data.data.records;
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
        this.getSortList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        this.page.current = newPage;
        this.getSortList()
      },
      // 监听添加分类对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮，添加新分类
      addSort() {
        const _this=this;
        _this.$axios.put("sort",this.sort).then(res=>{
          if (200===res.data.code){
            this.$message({
              message: 'success',
              type: 'success'
            });
            _this.getSortList();
            this.addDialogVisible=false;
            this.addDialogClosed();
          }
        })
      },
      // 展示编辑分类的对话框
      async showEditDialog(sort) {
        this.editSort.id=sort.id;
        this.editSort.sortName=sort.sortName;
        this.editSort.sortComments=sort.sortComments;
        this.editDialogVisible = true
      },
      // 监听修改分类对话框的关闭事件
      editDialogClosed() {
        this.$refs.editFormRef.resetFields()
      },
      // 修改分类信息并提交
      editUserInfo() {
        const _this=this;
        _this.$axios.put("sort",this.editSort).then(res=>{
          if (200===res.data.code){
            this.$message({
              message: 'success',
              type: 'success'
            });
            _this.getSortList();
            this.editDialogVisible=false;
            this.editDialogClosed();
          }
        })
      },
      // 根据Id删除对应的分类信息
      async removeSortById(id) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '此操作将永久删除该分类, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)
        // 如果用户确认删除，则返回值为字符串 confirm
        // 如果用户取消了删除，则返回值为字符串 cancel
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }
        const _this = this;
        _this.$axios.delete("/sort/" + id).then(res => {
          if (200 === res.data.code) {
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.getSortList();
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            });
          }
        })
      },

    }
  }
</script>

<style lang="less" scoped>
</style>
