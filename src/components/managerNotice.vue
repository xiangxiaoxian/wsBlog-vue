<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容查找" v-model="searchField" clearable @clear="getNoticeList">
            <el-button slot="append" icon="el-icon-search" @click="getNoticeList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加公告</el-button>
        </el-col>
      </el-row>

      <!-- 公告列表区域 -->
      <el-table :data="noticelist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="公告内容" prop="content"></el-table-column>
        <el-table-column label="发布时间" prop="pubTime"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeNoticeById(scope.row.id)"></el-button>
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

    <!-- 添加公告的对话框 -->
    <el-dialog title="添加公告" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="notice"  ref="addFormRef" label-width="70px">
        <el-form-item label="公告内容" prop="noticeName">
          <el-input v-model="notice.content"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNotice">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改公告的对话框 -->
    <el-dialog title="修改公告" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editNotice"  ref="editFormRef" label-width="70px">
        <el-form-item label="公告名" prop="noticeName">
          <el-input v-model="editNotice.content"></el-input>
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
        // 获取公告列表的参数对象
        searchField: "",
        // 分页
        page: {
          current: 1,
          size: 15,
          total: 0,
        },
        noticelist: [],
        total: 0,
        // 控制添加公告对话框的显示与隐藏
        addDialogVisible: false,
        // 添加公告的表单数据
        notice: {
          content: '',
        },
        // 控制修改公告对话框的显示与隐藏
        editDialogVisible: false,
        editNotice:{
          id:"",
          content:"",
        }
      }
    },
    created() {
      this.getNoticeList()
    },
    methods: {
      async getNoticeList() {
        const _this = this;
        _this.$axios
          .post("/notice", this.page, {
            params: {searchField: this.searchField}
          })
          .then((res) => {
            if (200 == res.data.code) {
              this.noticelist = res.data.data.records;
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
        this.getNoticeList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        this.page.current = newPage;
        this.getNoticeList()
      },
      // 监听添加公告对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮，添加新公告
      addNotice() {
        const _this=this;
        _this.$axios.put("notice",this.notice).then(res=>{
          if (200===res.data.code){
            this.$message({
              message: 'success',
              type: 'success'
            });
            _this.getNoticeList();
            this.addDialogVisible=false;
            this.addDialogClosed();
          }
        })
      },
      // 展示编辑公告的对话框
      async showEditDialog(notice) {
        this.editNotice.id=notice.id;
        this.editNotice.content=notice.content;
        this.editDialogVisible = true
      },
      // 监听修改公告对话框的关闭事件
      editDialogClosed() {
        this.$refs.editFormRef.resetFields()
      },
      // 修改公告信息并提交
      editUserInfo() {
        const _this=this;
        _this.$axios.put("notice",this.editNotice).then(res=>{
          if (200===res.data.code){
            this.$message({
              message: 'success',
              type: 'success'
            });
            _this.getNoticeList();
            this.editDialogVisible=false;
            this.editDialogClosed();
          }
        })
      },
      // 根据Id删除对应的公告信息
      async removeNoticeById(id) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '此操作将永久删除该公告, 是否继续?',
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
        _this.$axios.delete("/notice/" + id).then(res => {
          if (200 === res.data.code) {
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.getNoticeList();
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
