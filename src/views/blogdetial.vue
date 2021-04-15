<template>
  <div>
    <div class="blogDetail-left">
      <el-button type="success" @click="previousPage">点此返回哦</el-button>
    </div>
    <div class="mblog">
      <h1 class="article-title">{{article.title}}</h1>
      <div class="article_message">
        <div class="article_top">
          <i v-on:click="toUser(article.userId)" class="article_author">作者:{{article.user.nickName}}</i>
          <i class="article_pubTime">发布时间:{{article.pubTime}}</i>
          <i class="el-icon-view">{{article.browse}}</i>
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
        <i v-on:click="upStar(article.id)" v-if="0===articleStar.status"
           class="el-icon-star-off">点赞:{{article.star}}</i>
        <i v-on:click="lowStar(article.id)" v-else class="el-icon-star-on">已赞:{{article.star}}</i>
        <i class="el-icon-chat-line-round">评论{{article.reply}}</i>
      </div>
      <div class="reply-text">
        <el-input type="textarea" v-model="replyCommentsContent"></el-input>
        <el-button @click="insertComment" type="primary">评论</el-button>
        <el-button @click="getCommentsByArticleId" type="success">刷新评论</el-button>
      </div>
      <div class="article-reply" v-for="item in comments" v-if="comments.length!==0">
        <div style="display: inline;">
          <el-avatar :src="require('E:/wsBlogAvatar/'+item.user.avatar)" class="avatar"
                     v-on:click="toUser(item.userId)"></el-avatar>
        </div>
        <div style="display: inline;">
          <i class="el-icon-s-custom" style="vertical-align: top" v-if="item.userId===article.userId"></i>
          <span class="nickName" v-on:click="toUser(item.userId)">{{item.user.nickName}}</span>
          <span class="commentContent">{{item.content}}</span>
          <span class="article_pubTime" style="vertical-align: top;">{{dateDifference(item.commentsDate)}}</span>
        </div>
        <div style="display: inline;float: right;margin-right: 10px">
          <a @click.prevent="openReply(item,item.id)">回复</a>
          <a @click.prevent="openReplyEdit(item)" v-if="item.userId===loginUserId">编辑</a>
          <a @click.prevent="deleteComment(item.id)" v-if="item.userId===loginUserId">删除</a>
        </div>
        <div v-if="confirmation==item.id" class="reply-text">
          <el-input type="textarea" v-model="replyComments.content"></el-input>
          <el-button @click="closeReply">取消</el-button>
          <el-button @click="replyComment">确定</el-button>
        </div>
        <el-divider></el-divider>
        <!--回复框-->
        <div class="article-reply" v-for="items in item.commentsReply" v-if="comments.length!==0">
          <div style="display: inline;">
            <el-avatar :src="require('E:/wsBlogAvatar/'+items.user.avatar)" class="avatar"
                       v-on:click="toUser(items.userId)"></el-avatar>
          </div>
          <div style="display: inline;">
            <i class="el-icon-s-custom" style="vertical-align: top" v-if="items.userId===article.userId"></i>
            <span class="nickName" v-on:click="toUser(items.userId)">{{items.user.nickName}}</span>
            <i  style="vertical-align: top;font-family: '黑体'">回复</i>
            <span class="nickName" >{{items.parentCommentsNickName}}</span>
            <span class="commentContent">{{items.content}}</span>
            <span class="article_pubTime" style="vertical-align: top;">{{dateDifference(items.commentsDate)}}</span>
          </div>
          <div style="display: inline;float: right;margin-right: 10px">
            <a @click.prevent="openReply(items,item.id)">回复</a>
            <a @click.prevent="openReplyEdit(items)" v-if="items.userId===loginUserId">编辑</a>
            <a @click.prevent="deleteComment(items.id)" v-if="items.userId===loginUserId">删除</a>
          </div>
          <div v-if="confirmation==items.id" class="reply-text">
            <el-input type="textarea" v-model="replyComments.content"></el-input>
            <el-button @click="closeReply">取消</el-button>
            <el-button @click="replyComment">确定</el-button>
          </div>
          <el-divider></el-divider>
        </div>
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
        comments: [],
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
      if (this.$store.getters.getUser) {
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
            if (this.$store.getters.getUser) {
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
        let result = this.checkLogin();
        if (!result) {
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
        let result = this.checkLogin();
        if (!result) {
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
              userId: this.loginUserId
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
      openReply(comments,parentCommentsId) {
        const _this = this;
        let result = this.checkLogin();
        if (!result) {
          return false;
        }
        _this.replyComments.parentCommentsId = parentCommentsId;
        _this.replyComments.parentCommentsNickName = comments.user.nickName;
        _this.replyComments.userId = _this.$store.getters.getUser.id;
        _this.replyComments.articleId = _this.$route.params.articleId;
        _this.confirmation = comments.id;
      },
      //回复用户评论
      replyComment() {
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
        let result = this.checkLogin();
        if (!result) {
          this.replyCommentsContent = "";
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
      //打开编辑评论框
      openReplyEdit(comments) {
        const _this = this;
        _this.confirmation = comments.id
        _this.replyComments.parentCommentsId = comments.parentCommentsId;
        _this.replyComments.parentCommentsNickName = comments.parentCommentsNickName;
        _this.replyComments.userId = _this.$store.getters.getUser.id;
        _this.replyComments.articleId = _this.$route.params.articleId;
        _this.replyComments.content = comments.content;
        _this.replyComments.id = comments.id;
      },
      //关闭编辑框
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
      //查询登录人
      checkLogin() {
        const _this = this;
        if (sessionStorage.getItem("token") === ''|| !sessionStorage.getItem("token")) {
          _this.$router.push("/login")
          return false;
        } else {
          return true;
        }
      },
      //查询分类文章
      searchBySortId(id) {
        const _this = this;
        _this.$router.push("/sort/" + id)
      },
      //查询标签文章
      searchByLableId(id) {
        const _this = this;
        _this.$router.push("/lable/" + id)
      },
      //返回上一页
      previousPage() {
        const _this = this;
        _this.$router.go(-1);
      },
      //计算时间差
      dateDifference(commentsDate) {
        //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
        let dateBegin = new Date(commentsDate.replace(/-/g, "/"));//将-转化为/，使用new Date
        let dateEnd = new Date();//获取当前时间
        //计算年
        let yearDiff=dateEnd.getFullYear()-dateBegin.getFullYear();
        if (yearDiff>0){
          return yearDiff+"年前"
        }
        //计算月
        let monthDiff=dateEnd.getMonth()-dateBegin.getMonth();
        if (monthDiff>0){
          return monthDiff+"月前"
        }
        //计算天
        let dayDiff=dateEnd.getDay()-dateBegin.getDay();
        if (dayDiff>0){
          if (dayDiff<2){
            //计算小时
            let hourDiff=dateEnd.getHours()-dateBegin.getHours();
            if (hourDiff<0){
              return 24+hourDiff+"小时前"
            }
            return dayDiff+"天前"
          }
          return dayDiff+"天前"
        }
        //计算小时
        let hourDiff=dateEnd.getHours()-dateBegin.getHours();
        if (hourDiff>0){
          return hourDiff+"小时前"
        }
        //计算分
        let minuteDiff=dateEnd.getMinutes()-dateBegin.getMinutes();
        if (minuteDiff>0){
          return minuteDiff+"分钟前"
        }
        //计算秒
        let secondDiff=dateEnd.getSeconds()-dateBegin.getSeconds();
        if (secondDiff>0){
          return secondDiff+"秒前"
        }
        return "刚刚"
      },

    },
  };
</script>

<style scoped>
  .blogDetail-left {
    position: fixed;
    margin-left: 14%;
    margin-top: 0px;
  }

  .mblog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    width: 60%;
    height: 100%;
    margin: auto;
    background: #d6d5cd;
  }

  .article-title {
    margin-top: 10px;
    margin-left: 10px;
  }

  .article_message {
    height: 60px;
    width: 95%;
    background: #afc0d6;
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
    margin-left: 30px;
  }

  .article_sort {
    margin-left: 20px;
    margin-right: 30px;
  }

  .sort {
    margin-left: 10px;
    font-family: "黑体";
    font-size: 18px;
    color: #6989eb;
  }

  .lable {
    margin-left: 10px;
    font-family: "黑体";
    font-size: 18px;
    color: #6989eb;
  }

  .sort:hover {
    color: red;
  }

  .lable:hover {
    color: red;
  }

  .markdown-body {
    margin-top: 20px;
    margin-left: 50px;
    width: 90%;
  }

  .article-star-reply {
    background: #cdc7c4;
    margin-top: 20px;
    margin-left: 50px;
    width: 90%;
    height: 30px;
  }

  .el-icon-star-off {
    display: inline-block;
    margin-right: 40px;
  }

  .el-icon-star-off:hover {
    color: red;
  }

  .el-icon-star-on {
    display: inline-block;
    margin-right: 40px;
  }

  .el-icon-star-on:hover {
    color: red;
  }

  .reply-text {
    margin-top: 20px;
    margin-left: 50px;
    width: 90%;
  }

  .article-reply {
    margin-top: 30px;
    margin-left: 50px;
    width: 90%;
    background: #e3dedd;
    padding-top: 1%;
  }

  .avatar {
    height: 20px;
    width: 20px;
  }

  .nickName:hover {
    color: #af0f09;
  }

  .nickName {
    vertical-align: top;
    margin-left: 5px;
    font-family: "黑体";
  }

  .commentContent {
    display: inline-block;
    vertical-align: top;
    font-family: "楷体";
    word-break: break-all;
    margin-left: 10px;
    font-size: 18px;
    color: #2c6fc1;
  }

  a {
    color: blue;
    transition: 0.3s;
  }

  a:hover {
    color: red;
  }

</style>
