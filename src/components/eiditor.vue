<template>
  <div>
    <div class="artics" v-if="articleShow">
      <div class="article" v-for="item in article">
        <div class="article_title" v-on:click="toBlogDetial(item.id)">{{ item.title }}</div>
        <div class="article_content">{{ item.title }}</div>
        <div class="article_bottom">
          <div class="article_author" v-on:click="toUser(item.userId)">
            <el-avatar :src="require('E:/wsBlogAvatar/'+item.user.avatar)"></el-avatar>
            <i>{{ item.user.nickName }}</i>
          </div>
          <div class="article_time" value-format="yyyy-MM-dd hh:mm:ss">
            发布时间:{{ item.pubTime }}
          </div>
          <div>
            <i>{{ item.browse }}浏览</i>
            <i>{{ item.star }}点赞</i>
            <i>{{ item.reply }}评论</i>
          </div>
          <div class="btn">
            <el-button
              type="warning"
              plain
              v-if="loginUserId === item.userId"
              v-on:click="toBlogEdit(item.id)"
            >编辑
            </el-button
            >
            <el-button
              type="warning"
              plain
              v-if="loginUserId === item.userId"
              v-on:click="deleteBlog(item.id)"
            >删除
            </el-button
            >
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      <div>
        <el-pagination
          class="pageIndex"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="artics" v-else>
      <h1>还没有文章哦</h1>
      <el-button style="background: #af0f09; color: #3f3f3f" @click="toBlog"
      >写博客
      </el-button
      >
    </div>
  </div>
</template>
<script>

  export default {
    props: {
      currentUserId: "",
    },
    data() {
      return {
        article: {
          id: "",
          userId: "",
          title: "",
          content: "",
          pubTime: "",
          star: "",
          reply: "",
          browse: "",
          user: {
            avatar: "",
            nickName: "",
          },
        },
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        articleShow: false,
        loginUserId: this.$store.getters.getUser.id
      };
    },
    methods: {
      getArticleByUserId() {
        const _this = this;
        _this.$axios
          .post("/article/user/" + this.currentUserId, this.page)
          .then((res) => {
            if (200 == res.data.code) {
              this.article = res.data.data.records;
              this.page.total = res.data.data.total;
              if (0 != this.page.total) {
                this.articleShow = true;
              }
            } else {
              this.$alert("服务器错误", {
                confirmButtonText: "确定",
              });
              return false;
            }
          });
      },
      toUser(userId) {
        const _this = this;
        _this.$router.push("/personalCenter/" + userId);
      },
      getCurrentUserId() {
        this.currentUserId = this.$route.params.userId;
      },
      handleSizeChange(val) {
        this.page.size = val;
        this.getArticleByUserId();
      },
      handleCurrentChange(val) {
        this.page.current = val;
        this.getArticleByUserId();
      },
      toBlogEdit(id) {
        const _this = this;
        _this.$router.push("/blogEdit/" + id);
      },
      deleteBlog(id) {
        this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const _this = this;
            _this.$axios.delete("/article/" + id).then((res) => {
              if (200 == res.data.code) {
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
                this.getArticleByUserId();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      toBlog() {
        const _this = this;
        _this.$router.push("/blog");
      },
      toBlogDetial(articleId) {
        const _this = this;
        _this.$router.push("/blogDetial/" + articleId);
      }
    },
  };
</script>

<style scoped>
  .article:hover {
    /* border: 1px solid red; */
    background-color: #f5f6f7;
    border-radius: 2px;
  }

  .article {
    /* margin: 30px; */
    padding: 2px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 150px;
  }

  .article_title {
    font-size: 24px;
    /* background: red; */
    margin: 2px 10px;
    border-radius: 4px;
    width: 800px;
    height: 30px;
    overflow: hidden;
  }

  .article_title:hover {
    color: orange;
  }

  .article_content {
    font-size: 18px;
    color: darkgray;
    margin: 8px 0px 10px 8px;
    height: 20px;
    width: 820px;
    overflow: hidden;
    text-indent: 2em;
  }

  .article_bottom {
    width: 800px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
    height: 30px;
  }

  .article_time {
    width: 200px;
    margin: 8px;
  }

  .pageIndex {
    width: 100%;
    height: 100px;
    text-align: center;
    margin-top: 40px;
    margin-right: auto;
  }
</style>
