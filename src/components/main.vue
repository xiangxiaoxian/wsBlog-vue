<template>
  <div class="main">
    <!-- 第一行数据 动态渲染-->
    <div class="first_top">
      <div class="first_top_left">
        <div>
          <div class="iconfont icon-index"></div>
          <div>首页</div>
        </div>
        <div>
          <div class="iconfont icon-dongtai1"></div>
          <div>动态</div>
        </div>
        <div>
          <div class="iconfont icon-paihangbang"></div>
          <div>排行</div>
        </div>
      </div>
      <div class="first_top_content"></div>
      <div class="first_top_right">
        <div v-for="(itemo, indexo) in mian_firstdata" :key="indexo">
          <span class="first_top_rightfor">{{ itemo }}</span>
          <span class="first_top_rightfor">{{ itemo }}</span>
        </div>
      </div>
    </div>
    <!-- <span  class="iconfont  icon-redian"></span> -->
    <div
      class="secound_top"
      v-for="(secounditem, a) in mian_secounddata"
      :key="a"
    >
      <!-- 这里是循环渲染的数据标题 -->
      <div>
        <h1>{{ secounditem.title }}</h1>
        <!-- 热门话题的相关操作页面 -->
        <div v-if="secounditem.title == '热门话题'">
          <div class="hottitle">
            <div class="hottitle1">
              <span class="span1">投票</span>
              <span class="span2">11111111</span>
              <a href="#" class="span3">查看更多</a>
            </div>
            <div class="hottitle1">
              <span>投票</span>
              <span>11111111</span>
              <a href="#" class="span3">查看更多</a>
            </div>
            <div class="hottitle1">
              <span>投票</span>
              <span>11111111</span>
              <a href="#">查看更多</a>
            </div>
            <div>
              <span>投票</span>
              <span>11111111</span>
              <a href="#" class="span3">查看更多</a>
            </div>
          </div>
        </div>
        <div class="toutiao" v-if="secounditem.title == '精选头条'">
          <!-- 精选头条的相关内容 -->
          <div class="toutiao_left">
            <img
              src="http://soutupian.ip3q.com/d/img/wm23.jpg"
              alt="加载失败"
              width="480px"
              height="180px"
            />
            <div>
              Linux 登陆火星，占有率再超 Windows，<br />NASA 还在 GitHub
              发布源码教程
            </div>
          </div>
          <div class="toutiao_centent">
            <ul class="forlist">
              <li>
                <img src="#" alt="" />「1s」即可！用 VS Code 一键玩转 GitHub
                代码！
              </li>
              <li>
                <img src="#" alt="" />Android 12 预览版发布，64g
                手机用户：我又活了
              </li>
              <li>
                <img src="#" alt="" />Go 开源库 Excelize 介绍，电子 Excel
                表格操作强大的库
              </li>
            </ul>
          </div>
          <div class="toutiao_right">
            <Slideshow class="picture" />
          </div>
        </div>

        <div v-if="secounditem.title == '精彩视频'">
          <div>左边</div>
          <div>
            
          </div>
        </div>

        <div v-if="secounditem.title == '技术团队'">技术团队</div>

        <div v-if="secounditem.title == '会员精选'">会员精选</div>
         <!-- <Hot/> -->
      </div>
     
      <!-- <div class="secound_style">
        <div
          class="secound_styleson"
          v-for="(itemfour, id) in mian_styledata"
          :key="id"
        >
          {{ itemfour.title }}
        </div>
      </div> -->
      <!-- 主内容 -->
    </div>
    <!-- <Slideshow /> -->
    这里是热点
    <Hot/>
  </div>
</template>

<script>
// import Slideshow from "./slideshow";
import hot from "./hot";
import Hot from './hot.vue';
import slideshow from "./slideshow.vue";

export default {
  components: {
    // Slideshow: slideshow
    Hot: hot,
    Slideshow: slideshow,
    Hot,
  },
  data() {
    return {
      mian_firstdata: [
        "Python",
        "Java",
        "架构",
        "人工智能",
        "移动开发",
        "程序人生",
        "计算机基础",
        "物联网",
        "前端",
        "区块链",
        "游戏开发",
        "运维",
        "5G",
        "音频开发",
        "研发管理",
        "信息安全",
        "考试认证",
        "数据库",
        "云计算",
        "物联网",
        "前端",
        "区块链",
        "游戏开发",
        "运维",
      ],
      mian_secounddata: [
        {
          id: 1,
          title: "热门话题",
          first_slideshow: require("../assets/images/one.png"),
          first_slideshow_content: "11111",
        },
        {
          id: 2,
          title: "精选头条",
          first_slideshow: require("../assets/images/two.png"),
          first_slideshow_content: "11111",
        },
        // {
        //   id: 3,
        //   title: "精彩视频",
        //   first_slideshow: require("../assets/images/tr.png"),
        //   first_slideshow_content: "222",
        // },
        // {
        //   id: 4,
        //   title: "技术团队",
        //   first_slideshow: require("../assets/images/one.png"),
        //   first_slideshow_content: "333",
        // },
        // {
        //   id: 5,
        //   title: "会员精选",
        //   first_slideshow: require("../assets/images/one.png"),
        //   first_slideshow_content: "444",
        // },
        // {
        //   id: 6,
        //   title: "推荐专题",
        //   first_slideshow: require("../assets/images/one.png"),
        //   first_slideshow_content: "555",
        // },
        // {
        //   id: 7,
        //   title: "Python",
        //   first_slideshow: require("../assets/images/one.png"),
        // },
        // {
        //   id: 8,
        //   title: "大前端",
        //   first_slideshow: require("../assets/images/one.png"),
        // },
        // {
        //   id: 9,
        //   title: "Java",
        //   first_slideshow: require("../assets/images/one.png"),
        // },
      ],
      
      solt: [],
      Imgs: [(require = "")],
    };
  },

  methods: {
    getfirstdata() {
      let that = this;
      that
        .$axios({
          method: "post",
          url: "",
        })
        .then((res) => {
          //获取分类表里面的分类名放在首页
          console.log(res);
          this.data = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSolt() {
      console.log(111);
    },
    //  测试
  },
};
</script>

<style scoped>
.main {
  margin: 0 10%;
  background-color: #fff;
}

.first_top {
  /* background-color: yellow; */
  /* width: 100px; */
  /* height: 100px; */
  display: flex;
}

.first_top_left {
  display: flex;
  width: 210px;
  height: 90px;
}
.first_top_left div {
  padding: 4px;
  margin: 4px;
  justify-content: space-between;
}
.first_top_left .iconfont {
  font-size: 32px;
}

.first_top_left_content span {
  display: inline-block;
  margin-top: 30px;
  padding-bottom: 0px;
  background-color: blue;
}
.icon-index {
  color: #ff4d4d;
}
.icon-dongtai1 {
  color: #4d77ff;
}
.icon-paihang-copy-cop {
  counter-reset: #ff904d;
}

.first_top_left_iconfont {
  width: 210px;
  height: 30px;
}

.first_top_content {
  width: 1px;
  /* padding: 10px; */
  margin: 20px 0px;
  height: 60px;
  background-color: rgb(148, 143, 143);
}

.first_top_right {
  display: flex;
  /* background-color: red; */
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
}
.first_top_rightfor {
  /* border: 1px solid red; */
  margin: 20px;
  display: inline-block;
  width: 82px;
  height: 40px;
}
.first_top_rightfor:hover {
  color: #ff904d;
  font: 16px;
}

.secound_top {
  /* height: 200px; */
  width: 100%;
  padding: 2px;
  margin: 0px 8px;
  display: flex;
}
.secound_slideshowfather {
  background-color: red;
  width: 40px;
  height: 40px;
  /* display: flex; */
}

.secound_style {
  /* width: 600px; */
  height: 140px;
  /* border: 1px solid red; */
  /* background-color: red; */
  /* display: flex; */
}

.secound_styleson {
  /* display: block; */
  width: 300px;
  /* height: 80px; */
  background-color: khaki;
  margin: 4px;
  /* border: 1px solid green; */
  border-radius: 12px;
}
.hottitle {
  width: 100%;
  /* height: 80px; */
  /* background-color: #ff904d; */
  display: flex;
}
.hottitle div {
  width: 25%;
  /* width: 300px; */
  /* height: 80px; */
  /* background-color:red; */
  /* border: 1px solid red ; */
  display: flex;
  flex-direction: column;
}

.hottitle div:hover {
  /* transform: scale(1.1); */
  color: #4d77ff;
}
.hottitle div span {
  display: inline-block;
  width: 200px;
  padding: 8px;
}
.hottitle div .span3 {
  display: inline-block;
  width: 100px;
  height: 100px;
  /* padding-right: 0px; */
  /* margin-left: 100px; */
  /* margin: 10px 80px; */
  margin: 0px 0px 0px 100px;
}
.toutiao {
  /* width: 100px; */
  /* height: 100px; */
  /* background-color: red; */
  display: flex;
}
.toutiao div {
  /* border: 1px solid grey; */
  /* width: 100px; */
  /* height: 80px; */
}
.toutiao .toutiao_left {
  /* background-color: fuchsia; */
  font-size: 20px;
  /* width: 300px; */
  /* height: 100px; */
}
.toutiao .toutiao_left:hover {
  color: #ff4d4d;
}

.toutiao .toutiao_centent {
  /* background-color:yellow; */
  width: 300px;
  /* height: 100px; */
}
.toutiao .toutiao_centent ul {
  /* background-color:goldenrod; */
  /* border: 1px solid red; */
}
.toutiao .toutiao_centent ul li {
  /* background-color:goldenrod; */
  /* border: 1px solid green; */
  width: 300px;
  height: 60px;
  border-radius: 4px;
  font-size: 18px;
  margin: 2px;
  padding: 10px;
}
.toutiao .toutiao_centent ul li:hover {
  color: #ff904d;
}
.toutiao_right .picture {
  width: 380px;
  height: 300px;
  /* background-color: red; */
}

.mainbody {
  clear: both;

  /* padding-top: 40px; */

  overflow: hidden;
}

.left {
  width: 66.666666%;

  float: left;

  padding: 0 15px;
}

.right {
  width: 33.333333%;

  float: right;

  padding: 0 15px;
}

.post-nav {
  padding: 0 10px;

  margin-bottom: 15px;
}
</style>
