<template>
  <div class="article">
    <div class="article_list">
      <div class="article_listone">
        标题:
        <el-input class="articleInput" style="width:600px" placeholder="请输入标题：" v-model="article.title"></el-input>
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
      <mavon-editor ref="md" v-model="article.content" @imgAdd="imgAdd"  @imgDel="imgDel"/>
      <p></p>
    </div>
    <el-button type="success" @click="submitArticle()">发表文章</el-button>
  </div>
</template>

<script>
  export default {
    name: "blog",
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
        checkedSort: "",
        checkedLable: "",
        img_file: {},
      };
    },
    created() {
      this.getLable();
      this.getSort();
      this.articleEcho();
    },
    watch: {
      '$route': {
        handler(route) {
          const _this = this;
          if ('blogEdit' === route.name) {
            _this.articleEcho();
          } else if ('blog' === route.name) {
            this.article.title = "";
            this.article.content = "";
            this.article.id = "";
            this.article.userId = "";
            this.checkedLable = "";
            this.checkedSort = "";
          }
        }
      }
    },
    methods: {
      //图片删除
      imgDel(pos){
        console.log("imgDel pos:"+pos)
      },
      //图片上传
      imgAdd(pos, file){
        const _this=this;
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('pic', file);
        _this.$axios.post("/article/imgUpload",formdata,{
          headers: {Authorization: sessionStorage.getItem("token")},
        }).then((res) => {
          // 第二步.将返回的url替换到文本原位置
          var url = res.data.data;
          //通过引入对象获取: import {mavonEditor} from ... 等方式引入后，此时$vm即为mavonEditor
          //通过$refs获取: html声明ref : <mavon-editor ref=md ></mavon-editor>， 此时$vm为 this.$refs.md`
          this.$refs.md.$img2Url(pos,url);
        })
      },
      //获取所有标签
      getLable() {
        const _this = this;
        _this.$axios.get("/lable").then(res => {
          this.lable = res.data.data
        });
      },
      //获取所有分类
      getSort() {
        const _this = this;
        _this.$axios.get("/sort").then(res => {
          this.sort = res.data.data
        });
      },
      submitArticle() {
        const _this = this;
        this.article.userId = _this.$store.getters.getUser.id;
        if ("" == this.article.title) {
          this.$alert("标题不能为空", {
            confirmButtonText: "确定",
          });
          return false;
        } else if ("" == this.article.content) {
          this.$alert("内容不能为空", {
            confirmButtonText: "确定",
          });
          return false;
        } else if ("" == this.checkedSort) {
          this.$alert("请选择分类", {
            confirmButtonText: "确定",
          });
          return false;
        } else if ("" == this.checkedLable) {
          this.$alert("请选择标签", {
            confirmButtonText: "确定",
          });
          return false;
        }
        _this.$axios.put("/article", {
          article: this.article,
          sortId: this.checkedSort,
          lableId: this.checkedLable
        }, {
          headers: {Authorization: sessionStorage.getItem("token")},
        }).then(res => {
          if (200 == res.data.code) {
            this.$message({
              message:res.data.msg,
              type:"success"
            });
            _this.$router.push("/personalCenter/"+this.$store.getters.getUser.id);
          }
        })
      },
      articleEcho() {
        const blogId = this.$route.params.blogId;
        const _this = this;
        if (blogId) {
          this.$axios.get('/article/' + blogId).then(res => {
            _this.article.id = res.data.data.id;
            _this.article.userId = res.data.data.userId;
            _this.article.title = res.data.data.title;
            _this.article.content = res.data.data.content;
            _this.checkedSort = res.data.data.sort.id;
            _this.checkedLable = res.data.data.lable.id;
          })
        }
      },

    },
  };
</script>

<style scoped>
  .article {
    margin: 0 10%;
    background-color: #fff;

  }

  .article_listone {
    margin: 8px 10px;
    padding: 2px 4px;
  }

  .article_listone .articleInput {
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
