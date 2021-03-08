<template>
<div>
<div class="artics">
  <!-- <div class="article" v-for="item in article"> -->
    <div class="article_title" ></div>
    <div class="article_content"></div>
    <div class="article_bottom">
      <div class="article_author" >

        <!-- <el-avatar :size="size" :src="require('E://wsBlogAvatar//'+item.user.avatar+'.jpg')"></el-avatar> -->
        <i v-on:click="toUser(item.userId)">{{item.user.nickName}}</i>
          </div>
      <div class="article_time">发布时间:{{item.pubTime}}</div>
      <div>
        <i>{{item.browse}}浏览</i>
        <i>{{item.star}}点赞</i>
        <i>{{item.reply}}评论</i>
      </div>
      <div class="btn" >
           <el-button type="warning" plain>编辑</el-button>
           <el-button type="warning" plain >删除</el-button>
      </div>
    </div>
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
       },
      loginUserId:"",
    };
  },
  
  methods:{
    getArticleByUserId(){
      const _this=this;
      _this.$axios.post("/article/user/"+1,this.page).then(res=>{
        if (200==res.data.code){
          this.article=res.data.data.records
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
  }
};
</script>

<style scoped>
.article:hover{
    /* border: 1px solid red; */
    background-color:#F5F6F7;
    border-radius: 2px;
}
.article{
    margin: 30px;
    padding: 2px;
}
.article_title {
  font-size: 24px;
  /* background: red; */
  /* width: 300px; */
  border-radius: 4px;
}
.article_title:hover {
  color: orange;
}
.article_content {
  font-size: 18px;
  color: darkgray;
  margin: 16px;
}
.article_bottom{

    /* width: 300px; */
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
    /* width: 100px; */
    /* background-color: orange; */
    /* text-align:center; */
    margin: 8px;
}
</style>
