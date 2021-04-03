<template>
  <div class="home">
    <div class="homeLeft">
      <h1 class="homeLeft-title">公告栏</h1>
      <div class="block">
        <el-carousel height="150px" :interval="10000">
          <el-carousel-item v-for="item in notice" :key="item.index">
            <h3>{{ item.pubTime }}</h3>
            <h3>{{ item.content }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <Main></Main>
    <div class="homeRight">
      <el-tabs type="border-card">
        <el-tab-pane  label="分类">
          <div v-for="item in sort">
            <span class="rightSort" v-on:click="searchBySortId(item.id)">{{item.sortName}}</span>
            <el-divider>ws</el-divider>
          </div>
        </el-tab-pane>
        <el-tab-pane  label="标签">
          <div v-for="item in lable">
            <span class="rightLable" v-on:click="searchByLableId(item.id)">{{item.lableName}}</span>
            <el-divider>ws</el-divider>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import main from "../components/main";

  export default {
    name: "home",
    data() {
      return {
        notice: {
          id: "",
          content: "",
          pubTime: "",
        },
        sort: {
          id: "",
          sortName: "",
        },
        lable: {
          id: "",
          lableName: "",
        },
      }
    },
    components: {
      Main: main,
    },
    created() {
      this.getNotice();
      this.getSort();
      this.getLable();
    },
    methods: {
      getNotice() {
        const _this = this;
        _this.$axios.get("/notice").then(res => {
          if (200 === res.data.code)
            _this.notice = res.data.data;
        })
      },
      getSort() {
        const _this = this;
        _this.$axios.get("/sort").then(res => {
          if (200 === res.data.code) {
            _this.sort = res.data.data;
          }
        })
      },
      getLable() {
        const _this = this;
        _this.$axios.get("/lable").then(res => {
          if (200 === res.data.code) {
            _this.lable = res.data.data;
          }
        })
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
  }
</script>

<style scoped>
  .home {

  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .homeLeft {
    position: fixed;
    height: 20%;
    width: 20%;
    margin-left: 95px;
    background: #d7dbda;
    margin-top: 0px;
  }

  .homeRight {
    position: fixed;
    background: #d7dbda;
    top: 100px;
    right: 14.9%;
    width: 10%;
  }

  .rightSort {
    background: #d1d3d7;
    display: block;
    font-family: "宋体";
    color: #925b14;
    font-size: 18px;
    text-align: center;
  }

  .rightLable {
    background: #d1d3d7;
    display: block;
    font-family: "宋体";
    color: #925b14;
    font-size: 18px;
    text-align: center;
  }

  .rightSort:hover {
    color: red;
  }

  .rightLable:hover {
    color: red;
  }

  .homeLeft-title {
    font-family: "宋体";
    color: #925b14;
    text-align: center;
    background: #5a8caa;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 20px;
    opacity: 0.75;
    line-height: 30px;
    margin: 0;
  }
</style>
