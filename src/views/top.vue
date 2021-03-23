<template>
  <div class="top">
    <div class="artics" v-for="(item,index) in article">
      <div class="topIndex"><span>{{index+1}}</span></div>
      <div class="article" >
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
  </div>
</template>

<script>

  export default {
    name: "top",
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
      };
    },
    created() {
      this.getArticleTop20();
    },
    methods: {
      getArticleTop20() {
        const _this = this;
        _this.$axios.get("/article").then(res => {
          if (200 == res.data.code) {
            _this.article = res.data.data;
          }
        })
      },
      toUser(userId) {
        const _this = this;
        _this.$router.push("/personalCenter/" + userId);
      },
      toBlogDetial(articleId) {
        const _this = this;
        _this.$router.push("/blogDetial/" + articleId);
      },
    },
  }
</script>

<style scoped>

  .top {
    margin: 40px auto;
    background-color: #f9f9f9;
    width: 50%;
  }

  .topIndex {
    display: inline-block;
    width: 100px;
    height: 40px;
    color: #cb0200;
    font-size: 30px;
    font-family: "Times New Roman";
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
  .article_author:hover{
    color: red;
  }
</style>
