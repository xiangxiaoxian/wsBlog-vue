<template>
  <!-- 新写的页面 -->

  <div class="main">
    <div class="ownerCenten">
      <div class="ownerCenten_left">
        <!-- 个人信息展示 -->
        <el-menu style="width: 200px">
          <el-menu-item index="1">
            <el-button type="warning" @click="openCenter" class="ChangeOwn"
            >修改资料
            </el-button
            >
          </el-menu-item>
          <el-menu-item index="2">
            <el-button type="danger" @click="openPassword" class="ChangeOwn"
            >修改密码
            </el-button
            >
          </el-menu-item>
        </el-menu>
        <!-- 左边图片栏 -->
        <div class="ownerCentenImgdiv"><img :src="ownerCentenImg" alt="加载失败" width="200px" height="600px"></div>
      </div>
      <div class="ownerCenten_right">
        <Eiditor style="margin:10px 0px"/>
      </div>
    </div>
    <el-dialog
      class="Changedialog"
      title="修改资料"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="user">
        <el-form-item
          class="ChangedialogItemItem"
          label="昵称"
          :label-width="formLabelWidth"
          style="width: 500px"
        >
          <el-input v-model="user.nickName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <i>头像：</i>
      <el-upload
        action="#"
        list-type="picture-card"
        :multiple="false"
        :http-request="hjj"
        :before-upload="uploadAvatar"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateNickName"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>

    <!--    修改密码模态框-->
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item label="原密码" :label-width="formLabelWidth" style="width: 500px">
          <el-input v-model="oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" style="width: 500px">
          <el-input v-model="user.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" :label-width="formLabelWidth" style="width: 500px">
          <el-input v-model="checkedPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="tagsclous">
      <h2 class="aside_title">猜你喜欢</h2>
      <ul>
        <a href="/">
          <p>程序人生</p></a
        ><a href="/">
        <p>技术文摘</p></a
      ><a href="/">旅行</a
      ><a href="/">行万里路</a
      ><a href="/">女程序员</a
      ><a href="/">HTML5</a
      ><a href="/">小清新</a
      ><a href="/">兴趣梦想</a
      ><a href="/">美好的事情</a
      ><a href="/">休闲</a
      ><a href="/">技术文摘</a
      ><a href="/">旅行</a
      ><a href="/">行万里路</a
      ><a href="/">女程序员</a
      ><a href="/">互联网营销</a>
      </ul>
    </div>
  </div>
</template>
<script>
  import eiditor from "../components/eiditor";

  export default {
    data() {

      return {
        ownerCentenImg: require("../assets/images/owner.jpg"),
        user: {
          id: this.$store.getters.getUser.id,
          nickName: "",
          password: "",
        },
        oldPassword: "",
        checkedPassword: "",
        dialogImageUrl: '',
        dialogVisible: false,
        dialogFormVisible: false,
        dialogTableVisible: false,
        formLabelWidth: "100px",
      };
    },
    components: {
      Eiditor: eiditor,
    },
    methods: {
      handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
      openCenter() {
        const _this = this;
        this.user.nickName = _this.$store.getters.getUser.nickName;
        this.dialogFormVisible = true;
      },
      openPassword() {
        this.dialogTableVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传头像
      uploadAvatar(file){
        let fd=new FormData();
        fd.append('file',file);
        const _this=this;
        _this.$axios.post("/user/avatarUpload/"+this.user.id,fd,{
          headers: { Authorization: sessionStorage.getItem("token") },
        }).then(res=>{
          this.$alert(res.data.msg, {
            confirmButtonText: "确定",
          });
          if (200==res.data.code) {
            _this.$store.getters.getUser.avatar=res.data.data;
          }
        })
      },
      hjj(){

      },
      //修改密码
      updatePassword() {
        const _this = this;

        if (this.user.password != this.checkedPassword) {
          this.$alert("两次密码不一致", {
            confirmButtonText: "确定",
          });
          return false;
        }
          _this.$axios
            .post("/user/updatePassword", {
              oldPassword: this.oldPassword,
              user: this.user,
            },{
              headers: { Authorization: sessionStorage.getItem("token") },
            })
            .then((res) => {
              this.$alert(res.data.msg, {
                confirmButtonText: "确定",
              });
            });
      },
      //修改昵称
      updateNickName(){
        const _this = this;
        _this.$axios
          .post("/user/updateNickName",this.user,{
            headers: { Authorization: sessionStorage.getItem("token") },
          })
          .then((res) => {
            this.$alert(res.data.msg, {
              confirmButtonText: "确定",
            });
            if (200==res.data.code){
               _this.$store.getters.getUser.nickName=this.user.nickName ;
               this.dialogFormVisible=false;
            }
          });
      }
    },
  };
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .main {
    margin: 0 10%;
    background-color: #fff;
  }

  .ownerCenten {
    display: flex;
    /* justify-content: space-between; */
  }

  .ownerCenten_right {
    /* border: 1px solid red; */
    margin: 10px 10px;
  }

  .ChangeOwn {
    width: 100%;
    height: 50px;
  }

  .btnSubmit {
    width: 200px;
    height: 36px;
    margin: 10px 120px;
  }

  .el-upload__tip {
    color: red;
  }

  .dialog-footer button {
    width: 100px;
    height: 40px;
  }

  .tagsclous h2 {
    padding-bottom: 0 !important;
  }

  .tagsclous ul {
    padding: 20px;
    overflow: hidden;
    position: relative;
  }

  .tagsclous ul:before {
    animation: linescroll 5s;
    animation-iteration-count: infinite;
    content: "";
    width: 20px;
    height: 20px;
    background: red;
    position: absolute;
    z-index: 9;
  }

  .tagsclous a {
    display: inline-block;
    background: #ffffff;
    width: 33.3333%;
    font-size: 14px;

    line-height: 40px;
    text-align: center;
    position: relative;
  }

  .tagsclous a:nth-child(3n-1):before {
    width: 1px;
    height: 100%;
    content: "";
    position: absolute;
    background: #eae5e5;
    left: 0;
    top: 0;
  }

  .tagsclous a:nth-child(3n-1):after {
    width: 1px;
    height: 100%;
    content: "";
    position: absolute;
    background: #eae5e5;
    right: 0;
    top: 0;
  }

  .tagsclous a:nth-child(6n + 1) {
    background: #f5f5f5;
  }

  .tagsclous a:nth-child(6n + 2) {
    background: #f5f5f5;
  }

  .tagsclous a:nth-child(6n + 3) {
    background: #f5f5f5;
  }

  .tagsclous a:hover {
    background: #e01109;
    color: #fff;
  }

  @keyframes linescroll {
    0% {
      left: 0px;
      top: 0px;
    }
    25% {
      left: 100%;
      top: 0px;
    }
    50% {
      left: 100%;
      top: 220px;
    }
    75% {
      left: 0px;
      top: 100%;
    }
    100% {
      left: 0px;
      top: 0px;
    }
  }

  .tagsclous .aside_title {
    margin: 2px 200px;
  }

  .ownerCentenImgdiv {
    width: 200px;
    margin: 40px 10px;
  }
</style>
