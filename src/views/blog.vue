<template>
  <div class="article">
    <div class="article_list">
      <div class="article_listone">
        <h2>标题</h2>
        <div>
        <button>编辑</button>
        <button>删除</button>
      </div>
        
      </div>
      <div class="article_list_center">文章主要内容</div>
      <div class="article_listtwo">
        <div class="article_listtwo_left">
          <!-- 发表的人的头像 和昵称 -->
          <span  id="people" class="el-icon-user-solid"></span>
          Blink小姐姐
        </div>
        <div class="article_listtwo_center">本文转自 雷军科技</div>
        <div class="article_listtwo_right">
          <ul>
            <li>日期</li>
            <!-- <li class="iconfont icon-dianzan">点赞</li>
            <li class="iconfont icon-yanjing">浏览量</li>
            <li class="iconfont icon-icon-sms">信息</li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="blog_makdown">
      <h3>写博客</h3>
      <mavon-editor v-moudle="value" />
      <p>
        
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      defaultData: "preview",
    };
  },
};
</script>

<style scoped>
.article {
  margin: 0 10%;
  background-color: #fff;
}

.article_list{
    margin-top: 6px;
    width: 70%;
    /* height: 80px; */
    border: 1px solid #ccc;
    border-radius: 4px;
    background: rgba(255, 255, 255, 2);
}

.article .article_list:hover{
    background:#F0F0F5;

}
.article_list .article_listone h2:hover{
  color: orange;
}

.article_listone {
  display: flex;
  justify-content: space-between;
  margin: 2px 8px;
  
  /* border: 1px solid #ccc; */
}
.article_list_center{
    margin: 14px 8px;
    padding: 2px 0;
}
.article_listtwo {
    margin: 14px 8px;
    padding: 2px 0;
  display: flex;
  justify-content: space-between;
}
.article_listtwo_right ul {
  display: flex;
  padding:  0 10px;
  margin: 0 8px;
  /* background: red; */
}
.article_listtwo_right ul  li{
  padding:  0 4px;
  margin: 0 8px;
  /* background: red; */
}

.article_listtwo_center {
  color: silver;
}
</style>
