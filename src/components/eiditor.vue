<template>
<div class="artics">
  <div class="article">
    <div class="article_title" :src="title">{{title}}标题</div>
    <div class="article_content">文章全网最全的Python学习路线图，看完直接劝退！慎入！</div>
    <div class="article_bottom">
      <div class="article_author">
           <el-avatar :size="size" :src="circleUrl"></el-avatar>
          </div>
      <div class="article_time">发布时间</div>
      <div class="btn">
          
           <el-button type="warning" plain>编辑/删除</el-button>
          </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
          title:"对标大厂标准，C站（CSDN）软件工程师能力认证正式上线看完直接劝退！慎入",
          circleUrl: require("../assets/images/yejing.jpg"),
    };
  },
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
