<template>
  <!-- 新写的页面 -->
  <div class="main">
    <div class="ownerCenten">
      <div class="ownerCenten_left">
        <!-- 个人信息展示 -->
        <el-menu style="width: 200px">
          <el-menu-item index="1" >
             <el-button type="warning" @click="openCenter">修改资料</el-button>
          </el-menu-item>
          <el-menu-item index="2" >
             <el-button type="danger" @click="openPassword">修改密码</el-button>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="ownerCenten_right">
        <Eiditor />
      </div>
    </div>
    <el-dialog title="修改资料" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="user.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button  type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

<!--    修改密码模态框-->
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
      <el-form>
      <el-form-item label="原密码" :label-width="formLabelWidth">
        <el-input v-model="oldPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth">
        <el-input v-model="user.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="再次输入" :label-width="formLabelWidth">
        <el-input v-model="checkedPassword" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import eiditor from "../components/eiditor";
export default {
  data(){
    return{
      user: {
        id:"",
        nickName: "",
        password:"",
      },
      oldPassword:"",
      checkedPassword:"",
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      dialogFormVisible: false,
      dialogTableVisible: false,
      formLabelWidth: '120px'
    }
  },
  components: {
    Eiditor: eiditor,
  },

    methods: {
      /*handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },*/

      openCenter() {
        this.dialogFormVisible=true;
      },
      openPassword() {
        this.dialogTableVisible=true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      updatePassword(){
        const _this=this;

        if (this.user.password!=this.checkedPassword){
          this.$alert("两次密码不一致", {
            confirmButtonText: "确定",
          });
          return false;
        }
        this.user.id=_this.$store.getters.getUser.id,
        _this.$axios.post("/user/updatePassword",{
          oldPassword:this.oldPassword,
          user:this.user,
        }).then(res=>{
          this.$alert(res.data.msg, {
            confirmButtonText: "确定",
          });
        })
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

</style>
