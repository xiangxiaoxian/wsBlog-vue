<template>
  <div class="article">
    <div class="article_list">
      <div class="article_listone">
        标题:<el-input class="articleInput" style="width:600px" placeholder="请输入标题："></el-input>
      </div>
      <div class="article_list_center">
        分类：
        <el-select v-model="value" placeholder="请选择分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="article_listtwo">
        标签：
        <el-select v-model="value" placeholder="请选择标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="blog_makdown">
      <h3>写博客</h3>
      <mavon-editor v-moudle="value" />
      <p></p>
    </div>
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
        lableComments: "",
      },
      sort: {
        id: "",
        sortName: "",
        sortComments: "",
      },
      article: {
        id: "",
        userId: "",
        title: "",
        content: "",
      },
      defaultData: "preview",
    };
  },
  mounted() {},
  methods: {
    getLable() {
      const _this = this;
      _this.$axios.get("/");
    },
  },
};
</script>

<style scoped>
.article {
  margin: 0 10%;
  background-color: #fff;
}

.article_list {
  /* margin-top: 6px;
  width: 70%;
 
  border: 1px solid #ccc;
  border-radius: 4px;
  background: rgba(255, 255, 255, 2); */
}

.article .article_list:hover {
  /* background: #f0f0f5; */
}
.article_list .article_listone h2:hover {
  /* color: orange; */
}

.article_listone  {
  /* display: flex; */
  margin: 8px 10px;
  padding: 2px 4px; 
}
.article_listone  .articleInput{
  /* display: flex; */
  margin: 8px 10px;
  /* padding: 2px 4px;  */
}

.article_list_center {
   margin: 14px 8px; 
  padding: 2px 0; 
}
.article_listtwo {
   margin: 14px 8px;
  padding: 2px 0;
 
}
.article_listtwo_right ul {
  /* display: flex;
  padding: 0 10px;
  margin: 0 8px; */
  /* background: red; */
}
.article_listtwo_right ul li {
  /* padding: 0 4px;
  margin: 0 8px; */
}

.article_listtwo_center {
  /* color: silver; */
}
</style>
