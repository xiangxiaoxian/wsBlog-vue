<template>
  <div class="blogdetail">
    <el-row>
      <el-col :span="2.8"
        ><div class="grid-content bg-purple">
          <div class="blogdetail_left">
            <ul
              class="blogdetail_left_data"
              v-for="(detail_data, index) in leftdata"
              :key="index"
            >
              <li>
                <a href="#">{{ detail_data }}</a>
              </li>
            </ul>
          </div>
        </div></el-col
      >
      <el-col :span="18"
        ><div class="grid-content bg-purple-light">
          <div class="blogdetail_center">
            <div id="advertise"><img src="../assets/images/one.png" alt=""></div>
            <div>动图</div>
            <div>
              <h1>你有新的内容</h1>
              <div class="">多家企业将终止与B栈合作</div>
            </div>
          </div>
        </div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <div class="blogdetail_rightr">
            <div><a href="#">csdn官方博客</a></div>
          </div>
        </div></el-col
      >
    </el-row>

    <!-- deshi -->
    <div>主要内容
<div class="topbox toppebox">
			<div class="menu">
				<img src="images/menu.png" />
			</div>
			<!--移动端menu-->
			<div class="menubox">
				<div class="w_per clearfloat">
					<div class="w_pic">
						<a href="">
							<img src="images/temp/wtou.png" />
						</a>
					</div>
					<div class="w_login">
						<a href="">登录</a>/<a href="">注册</a>
					</div>
				</div>
				<div class="w_mav">
					<a href="" class="active">新闻</a>
					<a href="">产品</a>
					<a href="">技术</a>
					<a href="">用车</a>
					<a href="">热点</a>
				</div>
			</div>
			<div class="top clearfloat">
				<div class="logo">
					<a href="index.html"><img src="images/logo.png" /></a>
				</div>
				<div class="nav">
					<ul class="clearfloat">
						<li><a href="newslist.html">新闻</a></li>
						<li><a href="product.html">产品</a></li>
						<li><a href="">技术</a></li>
						<li><a href="">用车</a></li>
						<li><a href="">热点</a></li>
					</ul>
				</div>
				<div class="searchbox clearfloat">
					<input type="text" placeholder="关键字" />
					<span class="se_btn"></span>
				</div>
				<div class="dopebox clearfloat">
					<div class="dope">
						<a href=""><img src="images/dope.png" /> <span>4</span></a>
					</div>
					<div class="login_tou">
						<a href=""><img src="images/login.png" /></a>
						<div class="login_down">
							<ul>
								<li><img src="images/nolog.png" /> <span>超人2018</span></li>
								<li><a href="">个人中心</a></li>
								<li><a href="">设置</a></li>
								<li><a href="">退出</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="serbtn">
					<img src="images/sear.png" />
				</div>
				<!--移动端搜索按钮-->
				<div class="w_search clearfloat">
					<div class="w_se clearfloat">
						<input type="text" name="" id="" value="" placeholder="关键字" />
						<span></span>
					</div>
					<div class="w_sebtn">
						取消
					</div>
				</div>
			</div>
		</div>
		<!--top-->
		<div class="centop">
			<span class="cen_set">
				消息通知
			</span>
			<a href=""><img src="images/return.png" /><span>返回</span></a>
		</div>
		<!--消息通知返回-->
		<div class="newslist newscos">
			<img src="images/temp/pro.png" />
		</div>
		<div class="notice">

			<div class="notice_title">
				<img src="images/notice.png" /> <span>消息通知</span>
			</div>
			
			<ul class="listul">
			 		<li><a href="">我校召开本科教学工作审核评估动员会暨专业认证工作推进大会</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">张高丽参加党的十九大陕西省代表团讨论</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">高等流体力学(夏老师中文授课；高老师英文授课)</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">我校“三江源生态演变与环境保护”团队获教育部“创新团队发展计划”滚动支持</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">清华大学生物医学影像中心高原医学影像研究基地在我校挂牌</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">省教育工委专职副书记庞晓玲来校作省第十三次党代会精神宣讲报告</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">我校隆重举行2017届毕业典礼暨学位授予仪式</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">泰国正大集团、青海大学、中科院电子所正式签署三方合作协议</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">西宁市委常委、副市长许国成一行来我校调研</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">IFC标准的建设项目文本分类研究 结合IFC标准的建设项目中文文本分类研究</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">高等流体力学(夏老师授课；高老师英文授课)</a> <span class="time">2017-10-20  08:45</span> </li>
			 		<li><a href="">绿色化学与化工(吕老师上课，张老师全英文上课)</a> <span class="time">2017-10-20  08:45</span> </li>
			</ul>
			
			<div class="page">
						<em>第一页</em>
						<i>上一页</i>
						<a class="active" href="javascript:">1</a>
						<a href="javascript:">2</a>
						<a href="javascript:">3</a>
						<a href="javascript:">4</a>
						<a href="javascript:">5</a>
						<a href="javascript:">6</a>
						<i>下一页</i>
						<em>尾页</em>
						<p>第<span>1</span>页/共<span>20</span>页</p>
			</div>
			 	
		</div>

		<!--消息通知-->
		<div class="footbox">
			<div class="footer clearfloat">
				<div class="analyse">
					<h1>新能源情报分析网</h1>
					<p><a href="">新能源出行方式</a><span>| </span><a href="">电动汽车</a><span>|</span><a href="">智能车载有趣的和前沿的</a></p>
					<p class="ao">粤ICP备16013334号-1</p>
				</div>
				<div class="footline"></div>
				<div class="about">
					<h1>关于我们</h1>
					<p><a href="">联系我们</a></p>
					<p><a href="">商务合作</a></p>
				</div>
				<div class="serve">
					<h1>服务条款</h1>
					<p><a href="">招聘服务</a></p>
				</div>
				<div class="footline"></div>
				<div class="follow">
					<img src="images/temp/wei.png" />
					<p>关注公众号</p>
				</div>

			</div>
			<p class="w_ao">粤ICP备16013334号-1</p>
		</div>



    </div>
  </div>
</template>

<script>
// import images from '../assets/images'
export default {
  data() {
    return {
      leftdata: [
        "推荐",
        "动态",
        "排行榜",
        "程序人生",
        "推荐",
        "动态",
        "排行榜",
        "程序人生",
        "推荐",
        "动态",
        "排行榜",
        "程序人生",
        "",
      ],
    };
  },
};
</script>

<style scoped>
.blogdetail {
  margin: 0px 80px;
}
.el-row {
  margin-bottom: 20px;
}
*/ .bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.blogdetail_left li {
  /* width:px ; */
  height: 30px;
  border: 1px solid grey;
  border-radius: 8px;
  margin: 4px 4px;
  padding: 2px;
  text-align: center;
}
.blogdetail_left li:hover {
  background-color: grey;
}
#advertise{
    margin: 3px;
    height: 120px;
    border: 1px solid red;

}

</style>
