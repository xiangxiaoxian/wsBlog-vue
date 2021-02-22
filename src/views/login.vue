<template>
  <div class="login">
    <div class="login-wrapper">
      <div id="login">
        <p class="title">登录</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="tel">
            <el-input
              v-model="ruleForm2.tel"
              auto-complete="off"
              placeholder="请输入手机号/账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm2.pass"
              auto-complete="off"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm2')"
              style="width: 100%"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm2: {
        pass: "",
        tel: "",
      },
      buttonText: "发送验证码",
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
    };
  },
  created(){
this.$emit('public_header',false)
  },
  methods: {
    // <!--提交登录-->
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setTimeout(() => {
            alert("登录成功");
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
  // 烟花背景


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
  background-color:#fff;
}
#login {
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


</style>
