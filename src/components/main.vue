<template>
  <div class="homeMain" v-if="0!==this.article.length">
    <div class="artics">
      <div class="article" v-for="item in article">
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
    <div>
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
  </div>
  <div v-else style="text-align: center">
    <h1 style="margin: auto">哦豁，该分类下没有文章哦，快去发布吧</h1>
    <el-button @click="backPreviousPage" type="primary">返回</el-button>
  </div>
</template>

<script>


  export default {
    data() {
      return {
        article: [],
        page: {
          current: 1,
          size: 15,
          total: 0,
        },
        searchField: "",
      };
    },
    created() {
      this.beforUpdateUrl();
    },
    watch: {
      '$route':{
        handler(route){
          const _this=this;
          _this.beforUpdateUrl();
        }
      }
    },
    methods: {
      getAllArticlesAndPages() {
        const _this = this;
        _this.$axios
          .post("/article", this.page, {
            params: {searchField: this.searchField}
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
      beforUpdateUrl(){
        if (this.$route.name=='home') {
          this.getAllArticlesAndPages();
        }else if(this.$route.name=='sort') {
          this.getArticlesBySortId();
        }else if(this.$route.name=='lable'){
          this.getArticlesByLableId();
        }
      },
      getArticlesBySortId(){
        const _this=this;
        const sortId=_this.$route.params.sortId;
        _this.$axios.post("/sort/"+sortId,this.page).then(res=>{
          if (200 == res.data.code) {
            this.article = res.data.data.records;
            this.page.total = res.data.data.total;
          } else {
            this.$alert("服务器错误", {
              confirmButtonText: "确定",
            });
            return false;
          }
        })
      },
      getArticlesByLableId(){
        const _this=this;
        const lableId=_this.$route.params.lableId;
        _this.$axios.post("/lable/"+lableId,this.page).then(res=>{
          if (200 == res.data.code) {
            this.article = res.data.data.records;
            this.page.total = res.data.data.total;
          } else {
            this.$alert("服务器错误", {
              confirmButtonText: "确定",
            });
            return false;
          }
        })
      },
      toUser(userId) {
        const _this = this;
        _this.$router.push("/personalCenter/" + userId);
      },
      handleSizeChange(val) {
        this.page.size = val;
        this.getAllArticlesAndPages();
      },
      handleCurrentChange(val) {
        this.page.current = val;
        this.getAllArticlesAndPages();
      },
      toBlogDetial(articleId) {
        const _this = this;
        _this.$router.push("/blogDetial/" + articleId);
      },
      //回到上一页
      backPreviousPage(){
        const _this=this;
        _this.$router.go(-1);
      },
    },
  }
  ;
</script>

<style scoped>

  .homeMain {
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

  .pageIndex {
    width: 100%;
    height: 100px;
    text-align: center;
    margin-top: 40px;
    margin-right: auto;
  }
  .article_author:hover{
    color: red;
  }
</style>
