<template>
  <div>
    <div class="mblog">
      <h1 class="article-title">{{article.title}}</h1>
      <div class="article_message">
        <div class="article_top">
          <i v-on:click="toUser(article.userId)" class="article_author">作者:{{article.user.nickName}}</i>
          <i class="article_pubTime">发布时间:{{article.pubTime}}</i>
          <i class="article_browse">{{article.browse}}浏览</i>
        </div>
        <div>
          <i v-on:click="searchBySortId(article.sort.id)" class="article_sort">分类:<span class="sort">{{article.sort.sortName}}</span></i>
          <i v-on:click="searchByLableId(article.lable.id)">标签:<span
            class="lable">{{article.lable.lableName}}</span></i>
        </div>
      </div>
      <div class="markdown-body" v-html="article.content">
      </div>
      <div class="article-star-reply">
        <i v-on:click="upStar(article.id)" v-if="0===articleStar.status" class="starButton">点赞:{{article.star}}</i>
        <i v-on:click="lowStar(article.id)" v-else class="starButton">已赞:{{article.star}}</i>
        <i>评论:{{article.reply}}</i>
      </div>
      <div class="reply-text">
        <el-input type="textarea" v-model="replyCommentsContent"></el-input>
        <el-button @click="insertComment">评论</el-button>
      </div>
      <div class="article-reply" v-for="item in comments" v-if="comments.length!==0">
        <el-avatar :src="require('E:/wsBlogAvatar/'+item.user.avatar)" class="avatar"></el-avatar>
        <span class="nickName">{{item.user.nickName}}</span>
        <i class="nickNameReply" v-if="item.parentCommentsNickName!==''">回复</i>
        <span class="nickName" v-if="item.parentCommentsNickName!==''">{{item.parentCommentsNickName}}</span>
        <span class="commentContent">:{{item.content}}</span>
        <span class="article_pubTime">{{item.commentsDate}}</span>
        <a @click.prevent="openReply(item)">回复</a>
        <a @click.prevent="openReplyEdit(item)" v-if="item.userId===loginUserId">编辑</a>
        <a @click.prevent="deleteComment(item.id)" v-if="item.userId===loginUserId">删除</a>
        <div v-if="confirmation==item.id" class="reply-text">
          <el-input type="textarea" v-model="replyComments.content"></el-input>
          <el-button @click="closeReply">取消</el-button>
          <el-button @click="replyComment(item)">确定</el-button>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </div>

</template>

<script>
  import 'github-markdown-css'

  export default {
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
          sort: {
            id: "",
            sortName: "",
          },
          lable: {
            id: "",
            lableName: "",
          },
        },
        articleStar: {
          id: "",
          status: "",
        },
        comments: {
          id: "",
          commentsDate: "",
          userId: "",
          content: "",
          parentCommentsId: "",
          parentCommentsNickName: "",
          user: {
            avatar: "",
            nickName: "",
          },
        },
        confirmation: "",
        replyComments: {
          id: "",
          commentsDate: "",
          userId: "",
          content: "",
          articleId: "",
          parentCommentsId: "",
          parentCommentsNickName: "",
        },
        loginUserId: "",
        replyCommentsContent: "",
      };
    },
    created() {
      this.getArticleByArticleId();
      if(this.$store.getters.getUser) {
        this.loginUserId = this.$store.getters.getUser.id;
      }
      this.getCommentsByArticleId();
    },
    watch: {
      '$route': {
        handler(route) {
          const _this = this;
          if (route.name === 'blogDetial') {
            _this.getArticleByArticleId();
            if(this.$store.getters.getUser) {
              this.loginUserId = this.$store.getters.getUser.id;
            }
            _this.getCommentsByArticleId();
          }
        }
      }
    },
    methods: {
      //查询文章详情
      getArticleByArticleId() {
        const _this = this;
        this.article.id = _this.$route.params.articleId;
        _this.$axios.get("article/" + this.article.id).then(res => {
          if (200 == res.data.code) {
            this.article = res.data.data;
            var markdownIt = require("markdown-it");
            var md = new markdownIt();
            var result = md.render(res.data.data.content);
            _this.article.content = result;
            this.starTrueOrFalse();
          }
        })
      },
      //转到用户中心
      toUser(userId) {
        const _this = this;
        _this.$router.push("/personalCenter/" + userId);
      },
      //点赞
      upStar(articleId) {
        let result=this.checkLogin();
        if (!result){
          return false;
        }
        const _this = this;
        this.articleStar.status = 1
        _this.$axios.post("article/upStar/" + articleId, this.articleStar).then(res => {
          if (200 == res.data.code) {
            this.article.star += 1
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          } else {
            this.articleStar.status = 0
            this.article.star -= 1
          }
        })
      },
      //取消点赞
      lowStar(articleId) {
        let result=this.checkLogin();
        if (!result){
          return false;
        }
        const _this = this;
        this.articleStar.status = 0
        _this.$axios.post("article/lowStar/" + articleId, this.articleStar).then(res => {
          if (200 == res.data.code) {
            this.article.star -= 1
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          } else {
            this.articleStar.status = 1
            this.article.star += 1
          }
        })
      },
      //点赞与否
      starTrueOrFalse() {
        const _this = this;
        _this.$axios.get("article/starTrueOrFalse/" + this.article.id,
          {
            params: {
              userId: this.article.userId
            }
          }).then(res => {
          _this.articleStar.id = res.data.data.id;
          _this.articleStar.status = res.data.data.status;
        })
      },
      //请求评论数据
      getCommentsByArticleId() {
        const _this = this;
        let articleId = _this.$route.params.articleId;
        _this.$axios.get("/comments/" + articleId).then(res => {
          _this.comments = res.data.data;
        })
      },
      //打开回复框
      openReply(comments) {
        const _this = this;
        let result=this.checkLogin();
        if (!result){
          return false;
        }
        _this.replyComments.parentCommentsId = comments.id;
        _this.replyComments.parentCommentsNickName = comments.user.nickName;
        _this.replyComments.userId = _this.$store.getters.getUser.id;
        _this.replyComments.articleId = _this.$route.params.articleId;
        _this.confirmation = comments.id;
      },
      //回复用户评论
      replyComment(comments) {
        const _this = this;
        if (0 == _this.replyComments.content.length) {
          this.$message({
            message: "评论内容不能为空",
            type: "error",
          });
          return false;
        }
        _this.$axios.put("/comments", this.replyComments).then(res => {
          if (200 == res.data.code) {
            _this.closeReply();
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.getCommentsByArticleId();
          }
        })
      },
      //新增评论
      insertComment() {
        let result=this.checkLogin();
        if (!result){
          this.replyCommentsContent="";
          return false;
        }
        const _this = this;
        if (0 == _this.replyCommentsContent.length) {
          this.$message({
            message: "评论内容不能为空",
            type: "error",
          });
          return false;
        }
        _this.replyComments.userId = _this.$store.getters.getUser.id;
        _this.replyComments.articleId = _this.$route.params.articleId;
        _this.replyComments.content = _this.replyCommentsContent;
        _this.$axios.put("/comments", this.replyComments).then(res => {
          if (200 == res.data.code) {
            this.confirmation = 0;
            _this.replyComments.userId = "";
            _this.replyComments.content = "";
            _this.replyComments.articleId = "";
            _this.replyCommentsContent = "";
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.getCommentsByArticleId();
          }
        })
      },
      //删除评论
      deleteComment(id) {
        this.$confirm("是否删除该评论?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const _this = this;
            _this.$axios.delete("/comments/" + id, {
              params: {articleId: this.article.id}
            }).then(res => {
              if (200 == res.data.code) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                this.getCommentsByArticleId();
              }
            })
          })
      },
      openReplyEdit(comments) {;
        const _this = this;
        _this.confirmation = comments.id
        _this.replyComments.parentCommentsId = comments.parentCommentsId;
        _this.replyComments.parentCommentsNickName = comments.parentCommentsNickName;
        _this.replyComments.userId = _this.$store.getters.getUser.id;
        _this.replyComments.articleId = _this.$route.params.articleId;
        _this.replyComments.content = comments.content;
        _this.replyComments.id = comments.id;
      },
      closeReply() {
        const _this = this;
        _this.replyComments.parentCommentsId = "";
        _this.replyComments.parentCommentsNickName = "";
        _this.replyComments.userId = "";
        _this.replyComments.content = "";
        _this.replyComments.articleId = "";
        _this.replyComments.id = "";
        _this.confirmation = 0;
      },
      checkLogin(){
        const _this=this;
        if (_this.$store.getters.getUser==''){
          _this.$router.push("/login")
          return false;
        }else {
          return true;
        }
      },
      searchBySortId(id){
        const _this=this;
        _this.$router.push("/sort/"+id)
      },
      searchByLableId(id){
        const _this=this;
        _this.$router.push("/lable/"+id)
      },
    },
  };
</script>

<style scoped>
  .mblog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    width: 60%;
    height: 100%;
    margin: auto;
    background: #b5b5b5;
  }

  .article-title {
    margin-top: 10px;
    margin-left: 10px;
  }

  .article_message {
    height: 60px;
    width: 95%;
    background: #99a9bf;
    margin-left: 10px;
    margin-top: 10px;
  }

  .article_top {
    height: 40px;
  }

  .article_author {
    display: inline-block;
    height: 50px;
    margin-right: 30px;
    margin-left: 20px;
  }

  .article_author:hover {
    color: red;
  }

  .article_pubTime {
    display: inline-block;
    margin-right: 30px;
  }

  .article_sort {
    margin-left: 20px;
    margin-right: 30px;
  }

  .sort {
    margin-left: 10px;
    background: #bcbec2;
    color: #2d3deb;
  }

  .lable {
    margin-left: 10px;
    background: #bcbec2;
    color: #2d3deb;
  }

  .markdown-body {
    margin-top: 20px;
    margin-left: 10px;
  }

  .article-star-reply {
    margin-top: 20px;
    margin-left: 10px;
    width: 200px;
    background: rgba(168, 158, 172, 0.87);
  }

  .starButton {
    display: inline-block;
    margin-right: 40px;
  }

  .starButton:hover {
    color: red;
  }

  .reply-text {
    margin-top: 20px;
    margin-left: 10px;
    width: 90%;
  }

  .article-reply {
    margin-top: 30px;
    margin-left: 10px;
    width: 90%;

  }

  .avatar {
    height: 20px;
    width: 20px;
  }

  .nickName {
    margin-left: 5px;
  }

  .commentContent {
    margin-left: 10px;
    display: flow-root;

  }

  a {
    color: blue;
    transition: 0.3s;
  }

  a:hover {
    color: red;
  }

</style>
