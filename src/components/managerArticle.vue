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
          <el-input placeholder="请输入文章标题查找" v-model="searchField" clearable @clear="getArticleList">
            <el-button slot="append" icon="el-icon-search" @click="getArticleList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="articlelist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="作者" prop="user.nickName"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="发布时间" prop="pubTime"></el-table-column>
        <el-table-column label="点赞" prop="star"></el-table-column>
        <el-table-column label="浏览" prop="browse"></el-table-column>
        <el-table-column label="回复" prop="reply"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除文章" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="removeArticleById(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 查看按钮 -->
            <el-tooltip effect="dark" content="查看文章" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-view" size="mini"
                         @click="getArticleById(scope.row.id)"></el-button>
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
    <!-- 文章详情的对话框 -->
    <el-dialog title="文章详情" :visible.sync="articleDialogVisible" width="50%" @close="articleDialogClosed">
      <div>
        <h2>作者:{{article.nickName}}</h2>
        <h2>标题:{{article.title}}</h2>
        <h2>正文：</h2>
        <el-divider></el-divider>
        <div class="markdown-body" v-html="article.content">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="articleDialogVisible = false">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "managerArticle",
    data() {
      return {
        // 分页
        page: {
          current: 1,
          size: 15,
          total: 0,
        },
        searchField: "",
        articlelist: [],
        article: {
          nickName: "",
          title: "",
          content: "",
        },
        articleDialogVisible: false,
      }
    },
    created() {
      this.getArticleList()
    },
    methods: {
      async getArticleList() {
        const _this = this;
        _this.$axios
          .post("/article", this.page, {
            params: {searchField: this.searchField}
          })
          .then((res) => {
            if (200 == res.data.code) {
              this.articlelist = res.data.data.records;
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
        this.getArticleList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        this.page.current = newPage;
        this.getArticleList()
      },
      // 根据Id删除对应的文章信息
      async removeArticleById(id) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '此操作将永久删除该文章, 是否继续?',
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
        _this.$axios.delete("/article/" + id).then(res => {
          if (200 === res.data.code) {
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.getArticleList();
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            });
          }
        })
      },
      //根据Id查看对应的文章信息
      async getArticleById(id) {
        const _this = this;
        _this.$axios.get("/article/" + id).then(res => {
          if (200 === res.data.code) {
            this.article.nickName = res.data.data.user.nickName;
            var markdownIt = require("markdown-it");
            var md = new markdownIt();
            var result = md.render(res.data.data.content);
            this.article.content = result;
            this.article.title = res.data.data.title;
            this.articleDialogVisible = true;
          } else {
            this.$message({
              message: '服务器错误',
              type: 'error'
            });
          }
        })
      },
      // 监听文章详情对话框的关闭事件
      articleDialogClosed() {
        this.articleDialogVisible = false;
      }
    }
  }
</script>

<style lang="less" scoped>
</style>


