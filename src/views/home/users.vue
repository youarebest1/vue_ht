<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 小卡片区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <!-- 间隔 -->
        <el-col :span="6">
          <!-- 输入框和搜索n -->
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="usersParameter.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 添加按钮 -->
        <el-col :span="6"
          ><el-button type="primary" @click="dialogVisible = true"
            >添加按钮</el-button
          ></el-col
        >
      </el-row>

      <el-table :data="userlist" border style="width: 100%">
        <el-table-column type="index"> </el-table-column>

        <el-table-column prop="username" label="名字"> </el-table-column>

        <el-table-column prop="mobile" label="电话"> </el-table-column>

        <el-table-column prop="email" label="邮箱"> </el-table-column>

        <el-table-column prop="role_name" label="角色"> </el-table-column>

        <el-table-column label="状态">
          <!-- 自定义插槽开关 -->
          <template slot-scope="scope">
            <!-- 获取当前一行的数据 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userinfo(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <!-- 自定义插槽开关 -->
          <template slot-scope="scope">
            <!-- 获取当前一行的数据 -->
            <!-- 修改按钮 -->
            <el-tooltip content="修改" placement="top" enterable >
              <el-button type="primary" icon="el-icon-edit" circle @click="editUser(scope.row.id)"></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip content="删除" placement="top" enterable>
              <el-button type="danger" icon="el-icon-delete" circle @click="delUser(scope.row.id)"></el-button>
            </el-tooltip>

            <el-tooltip content="设置按钮" placement="top" enterable>
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="usersParameter.pagenum"
        :page-sizes="[1, 3, 5, 7]"
        :page-size="usersParameter.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 用户添加 对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close='closeDialog'>
      <!-- 表单 -->
      <el-form
        :model="addForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 电话 -->
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser"
          >确 定</el-button
        >
      </span>
    </el-dialog>

<!-- 用户修改信息对话框 -->
<el-dialog title="修改用户信息" 
 :visible.sync="editVisible"
  width="50%" 
 @close='editClose'>
  <span>
   <el-form
        :model="editForm"
        status-icon
        :rules="rules"
        ref="editFormRefs"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" >
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 电话 -->
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>


  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editVisible = false">取 消</el-button>
    <el-button type="primary" @click="postEditUser">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { get, put,post,del } from '../../util/request'
export default {
  components: {},
  data() {
      //定义邮箱规则
       var emailRule = (rule, value, callback) => {
          const regEmail = /^\w+@\w+(\.\w+)+$/;
          if(regEmail.test(value)){
            return callback()  
          }else{
              callback(new Error("邮箱格式不正确"))  
          }
    };
    //定义手机号规则
    //定义邮箱规则
       var mobileRule = (rule, value, callback) => {
           const regMobile = /^1[34578]\d{9}$/
          if(regMobile.test(value)){
            return callback()  
          }else{
              callback(new Error("手机格式不正确"))  
          }
    };
    return {
      usersParameter: {
        //接口请求参数
        query: '',
        pagenum: 1, //当前页数
        pagesize: 5 //当前每页显示多少条数据
      },
      userlist: [], //用户列表
      total: 0, //总共多少条数据
      dialogVisible: false, //用户添加开关
      addForm: {
        //需要添加form数据
        username: '', //用户名
        password: '', //密码
        email: '', // 电子邮箱
        mobile: '' //电话号
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          //必须，错误提示，失去焦点时
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          //最少3位，最长5位，错误信息，失去焦点时
        ],
       password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //必须，错误提示，失去焦点时
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          //最少3位，最长5位，错误信息，失去焦点时
        ],
         email: [
          { required: true, message: '邮箱格式不正确', trigger: 'blur' },
          //必须，错误提示，失去焦点时
           { validator: emailRule, trigger: "blur" }  
          //最少3位，最长5位，错误信息，失去焦点时
        ],
          mobile: [
          { required: true, message: '手机号格式不正确', trigger: 'blur' },
          //必须，错误提示，失去焦点时
         { validator: mobileRule, trigger: "blur" }  
          //最少3位，最长5位，错误信息，失去焦点时
        ],
      },
      editVisible:false,   //修改用户对话框开关
      editForm: {
        //需要添加form数据
        id:'',
        username: '', //用户名
        email: '', // 电子邮箱
        mobile: '' //电话号
      },
    }
  },
  computed: {},
  watch: {},

  methods: {
    async getUserList() {
      let { data: result } = await get('users', this.usersParameter)
      console.log(result)
      if (result.meta.status !== 200) {
        this.$message.error(result.meta.msg)
      } else {
        this.userlist = result.data.users
        this.total = result.data.total
      }
    },
    //监听下拉菜单的多少条数据的值
    handleSizeChange(newsize) {
      this.usersParameter.pagesize = newsize
      this.getUserList()
    },
    //监听下拉菜单的页码值
    handleCurrentChange(newpagesize) {
      this.usersParameter.pagenum = newpagesize
      this.getUserList()
    },
    //获取用户改变的状态
    async userinfo(userinfo) {
      console.log(userinfo)
      let { data: res } = await put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      console.log(res)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('改变状态失败')
      } else {
        this.$message.success('改变状态成功')
      }
    },
    //清除表单数据方法
    closeDialog(){
        this.$refs.ruleForm.resetFields()
    },
    //添加用户方法
    addUser(){
        this.$refs.ruleForm.validate(async (boolean)=>{ //判断表单是否验证通过
             console.log(boolean);
             if(boolean){
                 this.dialogVisible=false    //关闭弹窗
               let {data:res}= await post('users',this.addForm); 
               if(res.meta.status!==201){ //判断是否添加成功
                   this.$message.error("请完成表单后操作")
               }else{
                    this.getUserList()
                    this.$message.success(res.meta.msg)       
               }
             console.log(res); 
             }else{
                 return this.$message.error("请完成表单后操作")
             }
              //点击登录，通过正则返回true，否则返回false
             
          })
    
    },
    //获取修改列表回显
   async editUser(id){
     this.editVisible=true
    let {data:res}=await get("users/"+id);
    console.log(res);
    this.editForm.id=res.data.id
    this.editForm.username=res.data.username 
    this.editForm.email=res.data.email;
    this.editForm.mobile=res.data.mobile;
       },
    //修改完成清除表单内容
    editClose(){
        this.$refs.editFormRefs.resetFields()
    },
    //提交用户修改信息
     postEditUser(){
        console.log(this.$refs.editFormRefs);
     this.$refs.editFormRefs.validate(async (boolean)=>{ //判断表单是否验证通过
        if(boolean){   //如果通过正则
          let { data: res } = await put("users/"+this.editForm.id,{
              email:this.editForm.email,
              mobile:this.editForm.mobile
            /*  email邮箱可以为空mobile手机号可以为空  */
          })  //
          if(res.meta.status!==200){
              this.editVisible=false
                return this.$message.error("修改失败")
          }
          this.editVisible=false
           this.getUserList() //更新列表
           this.$message.success("修改用户信息成功")
           
        }
    })

    },

    //删除用户
    delUser(id){
        console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data:res}=await del("users/"+id);
          if(res.meta.status!==200){
              return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
          this.getUserList()
          console.log(res);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  },
  created() {
    this.getUserList()
  },
  mounted() {}
}
</script>
<style scoped>
.box-card {
  margin-top: 10px;
}
</style>
