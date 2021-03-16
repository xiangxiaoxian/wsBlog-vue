<template>
<div>
<div class="artics" v-if="articleShow">
 <div class="article" v-for="item in article" >
    <div class="article_title" >{{item.title}}</div>
    <div class="article_content">{{item.content}}</div>
    <div class="article_bottom">
      <div class="article_author" >

        <el-avatar :size="size" :src="require('E://wsBlogAvatar//'+item.user.avatar+'.jpg')"></el-avatar>
        <i v-on:click="toUser(item.userId)">{{item.user.nickName}}</i>
          </div>
      <div class="article_time" value-format="yyyy-MM-dd hh:mm:ss">发布时间:{{item.pubTime}}</div>
      <div>
        <i>{{item.browse}}浏览</i>
        <i>{{item.star}}点赞</i>
        <i>{{item.reply}}评论</i>
      </div>
      <div class="btn" >
           <el-button type="warning" plain v-if="loginUserId===item.userId" v-on:click="toBlogEdit(item.id)">编辑</el-button>
           <el-button type="warning" plain v-if="loginUserId===item.userId" v-on:click="deleteBlog(item.id)">删除</el-button>
      </div>
    </div>
  </div>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
  <div class="block">
  </div>
</div>
  <div class="artics" v-else>
    <h1 >还没有文章哦</h1>
    <el-button style="background: #af0f09;color: #3f3f3f" @click="toBlog">写博客</el-button>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      article:{
        "id": "",
        "userId": "",
        "title": "",
        "content": "",
        "pubTime": "",
        "star": "",
        "reply": "",
        "browse": "",
        user:{
          "avatar": "",
          "nickName": "",
        }
      },
       page:{
        "current":"1",
        "size":"10",
         "total":"0",
       },
      loginUserId:"",
      articleShow:false
    };
  },
  created() {
    this.getLoginUserId();
    this.getArticleByUserId();
  },
  watch: {
    '$route'(to, from) {
      this.getArticleByUserId(); // 这是我ajax获取用户信息的方法
    }
  },
  methods:{
    getArticleByUserId(){
      const _this=this;
      _this.$axios.post("/article/user/"+this.loginUserId,this.page).then(res=>{
        if (200==res.data.code){
          this.article=res.data.data.records
          this.page.total=res.data.data.total
          if (0!=this.page.total){
            this.articleShow=true;
          }
        }
        else {
          this.$alert("服务器错误", {
            confirmButtonText: "确定",
          });
          return false;
        }
      })
    },
    toUser(userId){
      alert(userId);
      const _this=this;
      _this.$router.push('/home')
    },
    getLoginUserId(){
      const _this=this;
      this.loginUserId=_this.$store.getters.getUser.id;
    },
    handleSizeChange(val) {
      this.page.size=val;
      this.getArticleByUserId();
    },
    handleCurrentChange(val) {
      this.page.current=val;
      this.getArticleByUserId();
    },
    toBlogEdit(id){
      const _this=this;
      _this.$router.push("/blogEdit/"+id);
    },
    deleteBlog(id){
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _this=this;
        _this.$axios.delete("/article/"+id,).then(res=>{
          if (200==res.data.code){
            this.$message({
              type: 'success',
              message: res.data.msg
            });
            this.getArticleByUserId();
          }else {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    toBlog(){
      const _this=this;
      _this.$router.push("/blog");
    },
  },
};
</script>

<style scoped>
  .artics{
    width: 1000px;
  }
  .article:hover{
    /* border: 1px solid red; */
    background-color:#F5F6F7;
    border-radius: 2px;
  }
  .article{
    /* margin: 30px; */
    padding: 2px;
  }
  .article_title {
    font-size: 24px;
    /* background: red; */
    margin: 2px 10px;
    border-radius: 4px;
    width: 800px;
    height: 32px;
    overflow: hidden;
  }
  .article_title:hover {
    color: orange;
  }
  .article_content {
    font-size: 18px;
    color: darkgray;
    margin: 16px 0px 10px 16px;
    height: 48px;
    width: 820px;
    height: 76px;
    overflow: hidden;
    text-indent:2em
  }
  .article_bottom{
    width: 800px;
    /* height: 80px; */
    display: flex;
    justify-content: space-between;
    margin: 0 auto ;
    padding: 4px;
    /* background-color: yellow; */
    text-align: center;
  }
  .article_time{
    margin-bottom: 0px;
    width: 200px;
    /* background-color: orange; */
    /* text-align:center; */
    margin: 8px;
  }
</style>
