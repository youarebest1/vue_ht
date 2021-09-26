aster<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="login_header">
        <img src="../assets/logo.png" />
      </div>
      <!-- 头像区域 -->
      <el-form
        ref="login_form"
        :rules="rules"
        :model="form"
        label-width="0px"
        class="form_box"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>

        <!-- 按钮-->
        <el-form-item class="login_btns">
          <el-button type="primary" @click=login>登录</el-button>
          <el-button type="info" @click=res>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {post} from '../util/request'
export default {
  components: {},
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          //必须，错误提示，失去焦点时
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
          //最少3位，最长5位，错误信息，失去焦点时
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          //必须，错误提示，失去焦点时
          { min: 3, max: 7, message: "长度在 3 到 5 个字符", trigger: "blur" },
          //最少3位，最长5位，错误信息，失去焦点时
        ],
      }
    };
  },
  computed: {},
  watch: {},

  methods: {
      res(){
        console.log(this.$refs.login_form);
        this.$refs.login_form.resetFields()
        //重置方法
      },
      login(){
          this.$refs.login_form.validate(async (valed)=>{
             if(!valed){
              return false
             } else{
              let {data:res}=await post('login',this.form)
              console.log(res);
              if(res.meta.status!==200){
                 this.$message.error(res.meta.msg);  
                 //失败消息弹窗
              }else{
                  window.sessionStorage.setItem("token",res.data.token);
                    this.$message.success("登陆成功");
                    this.$router.push("/home")
                 //成功消息弹窗  
              }
             }   
          })
      }
      
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.login {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_header {
  width: 139px;
  height: 139px;
  border: 1px solid greenyellow;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: white;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: gray;
  }
}
.login_btns {
  display: flex;
  justify-content: flex-end;
}
.form_box {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
