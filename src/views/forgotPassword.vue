<template>
  <div class="forgetbox">
    <div class="backgroundAll">
      <img :src="imgsrc" alt="加载失败"/>
    </div>
    <el-button type="primary" @click="previousPage">返回</el-button>
    <div class="forgetPassword">
      <el-steps :active=steps align-center>
        <el-step title="步骤1" description="邮箱验证"></el-step>
        <el-step title="步骤2" description="重置密码"></el-step>
        <el-step title="步骤3" description="重置成功，登录"></el-step>
      </el-steps>
      <div>
        <template v-if="1==steps">
          <el-form
            :model="user"
            status-icon
            :rules="rules2"
            ref="user"
            label-width="0"
            class="demo-ruleForm">
            <el-form-item prop="email">
              <el-input
                v-model="user.email"
                auto-complete="off"
                placeholder="请输入注册时的邮箱"
              ></el-input>
            </el-form-item>

            <el-form-item prop="smscode" class="code">
              <div class="codebetween">
                <el-input v-model="user.smscode" placeholder="验证码"></el-input>
                <el-button type="primary" :disabled="isDisabled" @click="sendCode"
                >{{ buttonText }}
                </el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitSmSCode"
                style="width: 100%"
              >下一步
              </el-button>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="2==steps">
          <el-form
            :model="user"
            status-icon
            :rules="rules2"
            ref="user"
            label-width="0"
            class="demo-ruleForm">
            <el-form-item prop="password">
              <el-input
                type="passwordword"
                v-model="user.password"
                auto-complete="off"
                placeholder="请输入新密码"
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
            <el-form-item>
              <el-button
                type="primary"
                @click="submitPassword"
                style="width: 100%"
              >下一步
              </el-button>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="3==steps">
          <el-button @click="goLogin">修改完成，去登录</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "forgotPassword",
    data() {
      //验证码是否为空
      let checkSmscode = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入验证码"));
        } else if (this.validationCode != value) {
          callback(new Error("验证码错误"));
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
      // //昵称
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
        //背景图片
        imgsrc: require("../assets/images/001.jpg"),
        //步骤进度条
        steps: 1,
        //后台回值验证码
        validationCode: "",
        //表格信息
        user: {
          id: "",
          password: "",
          checkPass: "",
          smscode: "",
          email: "",
          nickName: "",
          username: "",
        },
        rules2: {
          password: [{validator: validatePass, trigger: "change"}],
          checkPass: [{validator: validatePass2, trigger: "change"}],
          smscode: [{validator: checkSmscode, trigger: "change"}],
          email: [{validator: checkEmail, trigger: "change"}],
        },
        buttonText: "发送验证码",
        isDisabled: false, // 是否禁止点击发送验证码按钮
        flag: true,
      }


    },
    methods: {
      //进度条变化
      stepsAdd() {
        this.steps++
      },
      // <!--发送验证码-->
      sendCode() {
        let email = this.user.email;
        if (this.checkEmail(email)) {
          this.$axios.post("/forgotPassword", this.user).then((res) => {
            this.$alert(res.data.msg, {
              confirmButtonText: '确定',
            })
            if (200 != res.data.code) {
              return false;
            } else {
              this.validationCode = res.data.data["smsCode"];
              this.user.id = res.data.data["id"];
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
          });
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
      //提交验证码后下一步
      submitSmSCode() {
        this.stepsAdd();
      },
      //提交新的密码
      submitPassword() {
        const _this = this;
        _this.$axios.put("/user", this.user).then(res => {
          this.$alert(res.data.msg, {
            confirmButtonText: '确定',
          })
          if (200 == res.data.code) {
            this.validationCode = "";
            this.stepsAdd();
          }
        })
      },
      //跳转登录界面
      goLogin() {
        this.$router.push("/login");
      },
      //返回上一页
      previousPage(){
        const _this=this;
        _this.$router.go(-1);
      },
    }
  }

</script>

<style scoped>
  .forgetbox {
    width: 100%;
    height: 100%;

  }

  .forgetPassword {
    width: 300px;
    height: 100%;
    margin: 100px auto;

  }

  .codebetween {
    display: flex;
  }

  .backgroundAll img {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    bottom: 0;
  }


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

</style>
