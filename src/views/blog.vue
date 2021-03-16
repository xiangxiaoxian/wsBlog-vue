<template>
  <div class="article">
    <div class="article_list">
      <div class="article_listone">
        标题:<el-input class="articleInput" style="width:600px" placeholder="请输入标题：" v-model="article.title"></el-input>
      </div>
      <div class="article_list_center">
        分类：
        <el-select v-model="checkedSort" placeholder="请选择分类">
          <el-option
            v-for="item in sort"
            :key="item.id"
            :label="item.sortName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="article_listtwo">
        标签：
        <el-select v-model="checkedLable" placeholder="请选择标签">
          <el-option
            v-for="item in lable"
            :key="item.id"
            :label="item.lableName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="blog_makdown">
      <h3>写博客</h3>
      <mavon-editor v-model="article.content" />
      <p></p>
    </div>
    <el-button type="success" @click="submitArticle()">发表文章</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      lable: {
        id: "",
        lableName: "",
      },
      sort: {
        id: "",
        sortName: "",
      },
      article: {
        id: "",
        userId: "",
        title: "",
        content: "",
      },
      checkedSort:"",
      checkedLable:"",
      defaultData: "preview",
    };
  },
  created() {
    this.getLable();
    this.getSort();
    this.articleEcho();
  },
  watch: {
    '$route'(to, from) {
      this.articleEcho(); // 这是获取文章信息的方法
    }
  },
  methods: {
    //获取所有标签
    getLable() {
      const _this = this;
      _this.$axios.get("/lable").then(res=>{
        this.lable=res.data.data
      });
    },
    //获取所有分类
    getSort() {
      const _this = this;
      _this.$axios.get("/sort").then(res=>{
        this.sort=res.data.data
      });
    },
    submitArticle(){
      const _this=this;
      this.article.userId=_this.$store.getters.getUser.id;
      if (""==this.article.title){
        this.$alert("标题不能为空", {
          confirmButtonText: "确定",
        });
        return false;
      }else if (""==this.article.content){
        this.$alert("内容不能为空", {
          confirmButtonText: "确定",
        });
        return false;
      }else if (""==this.checkedSort){
        this.$alert("请选择分类", {
          confirmButtonText: "确定",
        });
        return false;
      }else if (""==this.checkedLable){
        this.$alert("请选择标签", {
          confirmButtonText: "确定",
        });
        return false;
      }
      _this.$axios.put("/article",{
        article:this.article,
        sortId:this.checkedSort,
        lableId:this.checkedLable
      },{
        headers: { Authorization: sessionStorage.getItem("token")},
      }).then(res=>{
        if (200==res.data.code){
          this.article={};
          this.checkedLable="";
          this.checkedSort="";
          _this.$router.push("/home");
        }
      })
    },
    articleEcho(){
      const blogId=this.$route.params.blogId;
      const _this=this;
      if (blogId){
        this.$axios.get('/article/'+blogId).then(res=>{
          _this.article.id=res.data.data.id;
          _this.article.userId=res.data.data.userId;
          _this.article.title=res.data.data.title;
          _this.article.content=res.data.data.content;
          _this.checkedSort=res.data.data.sort.id;
          _this.checkedLable=res.data.data.lable.id;
        })
      }else {
        _this.article.id="";
        _this.article.userId="";
        _this.article.title="";
        _this.article.content="";
        _this.checkedSort="";
        _this.checkedLable="";
      };
    }

  },
};
</script>

<style scoped>
.article {
  margin: 0 10%;
  background-color: #fff;
}
.article_listone  {
  margin: 8px 10px;
  padding: 2px 4px;
}
.article_listone  .articleInput{
  margin: 8px 10px;
}

.article_list_center {
   margin: 14px 8px;
  padding: 2px 0;
}
.article_listtwo {
   margin: 14px 8px;
  padding: 2px 0;

}
</style>
