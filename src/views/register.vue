<template>
  <div>
    <div class="backgroundAll">

      <img :src="imgsrc" alt="加载失败" />
   
    </div>

    <div class="register-wrapper">
       <button class="returnHome">返回首页</button>
      <div id="register">
        <p class="title">注册</p>
        <el-form
          :model="user"
          status-icon
          :rules="rules2"
          ref="user"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="user.username"
              auto-complete="off"
              placeholder="输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="nickName">
            <el-input
              v-model="user.nickName"
              auto-complete="off"
              placeholder="输入昵称"
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
          <el-form-item prop="checkPass">
            <el-input
              type="passwordword"
              v-model="user.checkPass"
              auto-complete="off"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="user.email"
              auto-complete="off"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item prop="smscode" class="code">
            <el-input v-model="user.smscode" placeholder="验证码"></el-input>
            <el-button type="primary" :disabled="isDisabled" @click="sendCode"
              >{{ buttonText }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('user')"
              style="width: 100%"
              >注册
            </el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (this.validationCode != value) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    //账号
    let checkUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (!this.checkUserName(value)) {
        callback(
          new Error("只能以小写字母开头，且只能包含英文字母、数字、下划线")
        );
      } else {
        callback();
      }
    };
    //邮箱
    let checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!this.checkEmail(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
    //昵称
    let checknickName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.checkPass !== "") {
          this.$refs.user.validateField("checkPass");
        }
        callback();
      }
    };
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imgsrc: require("../assets/images/001.jpg"),
        logo: require("../assets/images/logo.png"),
      user: {
        username: "",
        password: "",
        checkPass: "",
        smscode: "",
        nickName: "",
        email: "",
        
      },
      validationCode: "", //后台回值验证码
      rules2: {
        password: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        smscode: [{ validator: checkSmscode, trigger: "change" }],
        username: [{ validator: checkUserName, trigger: "change" }],
        nickName: [{ validator: checknickName, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
      },
      buttonText: "发送验证码",
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
    };
  },
  methods: {
    // <!--发送验证码-->
    sendCode() {
      let email = this.user.email;
      if (this.checkEmail(email)) {
        this.$axios.post("/register/validation", this.user).then((res) => {
          alert(res.data.msg);
          this.validationCode = res.data.data;
        });
        let time = 60;
        this.buttonText = "已发送";
        this.isDisabled = true;
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + " 秒";
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = "重新获取";
              this.isDisabled = false;
              this.flag = true;
            }
          }, 1000);
        }
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setTimeout(() => {
            this.$axios.put("/register", this.user).then((res) => {
              if (200 != res.data.code) {
                //注册失败，提示错误原因
                alert(res.data.msg);
                return false;
              } else {
                let bool = confirm("注册成功，去登录？"); //确定登录，跳转页面
                if (bool) {
                  this.$router.push("/login");
                  return false;
                } else {
                  this.user = {};
                }
              }
            });
          }, 400);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    // 验证账号
    checkUserName(str) {
      let re = /^[a-z][a-z0-9_]*$/g;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证邮箱
    checkEmail(str) {
      let re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9_\.\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
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

.register-wrapper img {
  position: absolute;
  z-index: 1;
}

.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
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

.login:hover {
  color: #2c2fd6;
}

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
