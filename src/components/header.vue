<template>
  <div class="mainNav">
    <!-- 前面五个分为一组分别是用来 -->
    <!-- <div>这里是一logo</div> -->
    <el-menu
      class="el-menu-header"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-menu-item index="1" style="width: 10%">
        <router-link :to="{ path: '/home' }">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2" style="width: 10%">
        <router-link :to="{ path: '/blog' }">博客</router-link>
      </el-menu-item>
      <!-- <el-menu-item index="3" style="width: 10%" ><router-link :to="{ path: '/blogdetial' }">详情页</router-link></el-menu-item> -->
      <!-- <el-menu-item index="4" style="width: 10%" ><router-link :to="{ path: '/search' }">搜索</router-link></el-menu-item> -->
      <el-menu-item index="8" style="width: 10%">
        <router-link :to="{ path: '/aboutus' }">排行</router-link>
      </el-menu-item>

      <el-input class="inputSreach" placeholder="请输入内容" v-model="input4">
        clearable>
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <!-- <span class=" iconfon icon-sousuo"></span> -->
      <el-menu-item index="6" style="width: 10%">
        <router-link :to="{ path: '/owner' }">个人中心</router-link>
      </el-menu-item>
      <el-menu-item class="writeblog" index="7" style="width: 10%">
        <router-link :to="{ path: '/message' }">创作中心</router-link>
      </el-menu-item>
      <!--若当前有用户登录，则不展示登录注册字样，展示登录用户头像等信息-->

      <!-- 测试 -->
      <el-menu-item
        >
        <el-menu-item
          class="loginSelect"
          style="width: 10%"
          v-if="this.$store.state.token === ''"
        >
          <router-link :to="{ path: '/login' }">登录/注册 </router-link>
        </el-menu-item>
        <el-menu-item
          class="loginSelect"
          style="width: 10%"
          v-if="this.$store.state.token !== ''"
        >
          <el-dropdown>
            <span class="el-dropdown-link" id="dropdown-link1">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu1">
              <el-dropdown-item class="el-icon-s-custom"
                >我的资料</el-dropdown-item
              >
              <el-dropdown-item class="el-icon-s-tools"
                >后台管理</el-dropdown-item
              >
              <el-dropdown-item @click.native="logOut"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu-item>
      <el-menu-item>       
          <el-avatar :size="size" :src="imgsrc"></el-avatar>       
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      input4: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
      imgsrc: require("../assets/images/yejing.jpg"),
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick() {
      alert("button click");
    },
    logOut() {
      const _this = this;
      _this.$axios
        .get("/logout", {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          if (200 == res.data.code) {
            this.$alert("退出成功", {
              confirmButtonText: "确定",
            });
            _this.$store.commit("REMOVE_USERINFO");
          }
        });
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  /* display: inline-block; */
}

.mainNav {
  background-color: #545c64;
  width: 100%;
  height: 60px;
}

.el-menu-header {
  margin: 0 85px;
  /* height: 40px; */
  display: flex;
  justify-content: space-between;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.el-input-header {
  width: 600px;
  margin: 10px 20px;
}

.inputSreach {
  width: 300px;
  margin: 10px;
  /* height: ; */
}

.el-input__icon el-icon-search {
  font: 16px;
}

.actor {
  margin: 10px;
}

.loginSelect:hover .OwnerCenter {
  display: block;
}

.OwnerCenter {
  width: 60px;
  /* height: 400px; */
  background-color: red;
  /* z-index: 10; */
  /* display: none; */
}

.se {
  display: flex;
}

/* .el-dropdown {
      vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
      margin-left: 15px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    } */
.el-dropdown-item {
  width: 100px;
}

#dropdown-link1 {
  position: relative;
}

.dropdown-menu1 {
  width: 100px;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0 2px;
  /* background: red; */
}
</style>

