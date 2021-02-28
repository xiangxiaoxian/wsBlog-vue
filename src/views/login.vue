<template>
  <div>
    <div class="backgroundAll">

      <img :src="imgsrc" alt="加载失败" />

    </div>
    <div class="login">
      <button class="returnHome" @click="toHome">返回首页</button>
      <div class="login-wrapper">
        <div id="login">
          <img :src="logo" alt="加载失败" style="width: 60px" />
          <p class="title">登录</p>
          <el-form
            :model="user"
            status-icon
            ref="user"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="user.username"
                auto-complete="off"
                placeholder="请输入手机号/账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="passwordword"
                v-model="user.password"
                auto-complete="off"
                placeholder="输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('user')"
                style="width: 100%"
                >登录
              </el-button>
            </el-form-item>
            <div class="registerStyle">
              <p @click="toRegister">注册邮箱</p>
              <p @click="forgotPassword">忘记密码?</p>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        password: "",
        username: "",
      },
      buttonText: "发送验证码",
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
      valid: false,
      imgsrc: require("../assets/images/yejing.jpg"),
      logo: require("../assets/images/logo.png"),
    };
  },
  created() {
    this.$emit("public_header", false);
  },
  methods: {
    // <!--提交登录-->
    submitForm(formName) {
      this.checkData();
      this.$refs[formName].validate((valid) => {
        if (this.valid) {
          const _this = this;
          setTimeout(() => {
            this.$axios.post("/login", this.user).then((res) => {
              if (200 != res.data.code) {
                alert(res.data.msg);
                return;
              } else {
                //登录成功，保存token和用户信息到浏览器
                const jwt = res.headers["authorization"];
                const userInfo = res.data.data;
                _this.$store.commit("SET_TOKEN", jwt);
                _this.$store.commit("SET_USERINFO", userInfo);
                this.user.password="";
                this.user.username="";
                _this.$router.push("/home");
              }
            });
          }, 400);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /*检查账号密码是否为空*/
    checkData() {
      if (0 == this.user.username.length) {
        alert("账号不能为空");
        return;
      } else if (0 == this.user.password.length) {
        alert("密码不能为空");
        return;
      } else {
        this.valid = true;
      }
    },
    // <!--进入注册页-->
    toRegister() {
      const _this = this;
      _this.$router.push("/register");
    },

    //进入忘记密码
    forgotPassword(){
      const _this = this;
      _this.$router.push("/forgotPassword");
    },
    //返回首页
    toHome(){
      const _this = this;
      _this.$router.push("/home");
    }
  },
};
</script>
<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-wrapper img {
  position: absolute;
  z-index: 1;
}

.login-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  /* background-color: #fff; */
}

#login {
  max-width: 340px;
  margin: 15% 30%;
  background: rgba(255, 255, 255, 0.2);
  padding: 40px 60px;
  border-radius: 30px;
  position: relative;
  z-index: 9;
  /* position: relative; */
}

.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}

.el-form-item {
  text-align: center;
}

.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}

/* .login:hover {
    color: #2c2fd6;
  } */
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}

.el-button--primary:focus {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
.backgroundAll img {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  /* top: 30px; */
  bottom: 0;
}

.front {
  z-index: 10;
  position: absolute;
}

.registerStyle{
  display: flex;
 justify-content: space-between;
}
.returnHome{
  position: absolute;
  top:0%;
  z-index: 10;
  width: 60px;
  height: 40px;
  color:#409eff;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

</style>
