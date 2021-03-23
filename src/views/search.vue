<template>
  <div class="search">
    <el-tabs type="card" v-model="activeName2" @tab-click="handleClick">
      <el-tab-pane label="文章" name="first">
        <div class="artics" v-for="item in article">
          <div class="article">
            <div class="article_title" v-on:click="toBlogDetial(item.id)">{{ item.title }}</div>
            <div class="article_content">{{ item.title }}</div>
            <div class="article_bottom">
              <div class="article_author" v-on:click="toUser(item.userId)">
                <el-avatar :src="require('E:/wsBlogAvatar/'+item.user.avatar)" class="article-avatar"></el-avatar>
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
            </div>
            <el-divider></el-divider>
          </div>
        </div>
        <div v-if="article.length!==0">
          <el-pagination
            class="pageIndex"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[15, 30, 50, 70, 100]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </div>
        <div v-else>
          <h1>sorry,没有找到文章哦</h1>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户" name="second">
        <div v-for="item in user">
          <div class="article_author" v-on:click="toUser(item.id)">
            <el-avatar :src="require('E:/wsBlogAvatar/'+item.avatar)" class="article-avatar"></el-avatar>
            <i>{{ item.nick_name}}</i>
            <el-divider></el-divider>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  export default {
    name: "search",
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
        user: {
          id: "",
          nick_name: "",
          avatar: "",
        },
        page: {
          current: 1,
          size: 15,
          total: 0,
        },
        activeName2: "first"
      };
    },
    created() {
        this.getArticleBySearchField();
    },
    watch: {
      '$route': {
        handler(route) {
          if ('search' === route.name) {
            if ('first'===this.activeName2) {
              this.getArticleBySearchField();
            }else {
              this.getUserBySearchField();
            }
          }
        }
      }
    },
    methods: {
      getArticleBySearchField() {
        const _this = this;
        const searchField = _this.$route.query["searchField"];
        _this.$axios
          .post("/article", this.page, {
            params: {searchField: searchField}
          })
          .then((res) => {
            if (200 == res.data.code) {
              this.article = res.data.data.records;
              this.page.total = res.data.data.total;
            } else {
              this.$alert("服务器错误", {
                confirmButtonText: "确定",
              });
              return false;
            }
          });
      },
      getUserBySearchField() {
        const _this = this;
        const searchField = _this.$route.query["searchField"];
        _this.$axios
          .post("/user", this.page, {
            params: {searchField: searchField}
          })
          .then((res) => {
            if (200 == res.data.code) {
              this.user = res.data.data.records;
              this.page.total = res.data.data.total;
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
      toBlogDetial(articleId) {
        const _this = this;
        _this.$router.push("/blogDetial/" + articleId);
      },
      handleSizeChange(val) {
        this.page.size = val;
        this.getArticleBySearchField();
      },
      handleCurrentChange(val) {
        this.page.current = val;
        this.getArticleBySearchField();
      },
      handleClick(tab, event) {
        if ('second' == tab.name) {
          this.getUserBySearchField();
        }
      },

    },
  }
</script>

<style scoped>

  .search {
    margin: 40px auto;
    background-color: #f9f9f9;
    width: 50%;
  }

  .article:hover {
    /* border: 1px solid red; */
    background-color: #d0d1d2;
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
    height: 30px;
    overflow: hidden;
  }

  .article_title:hover {
    color: orange;
  }

  .article_content {
    font-size: 18px;
    color: darkgray;
    margin: 4px 0px 10px 8px;
    height: 20px;
    width: 820px;
    overflow: hidden;
    text-indent: 2em;
  }

  .article_bottom {
    width: 800px;
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    padding: 4px;
    text-align: center;
    height: 20px;
    margin-top: 6px;
  }

  .article-avatar {
    height: 20px;
    width: 20px;
  }

  .article_time {
    width: 200px;
    margin: 8px;
  }

  .article_author:hover {
    color: red;
  }

  .pageIndex {
    width: 100%;
    height: 100px;
    text-align: center;
    margin-top: 40px;
    margin-right: auto;
  }
</style>
