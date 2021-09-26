<template>
    <div class='home'>
     <el-container class="container">
         <!-- 头部主题区域 -->
  <el-header class="header">
      <div class="header_box">
          <img src="../../assets/heima.png">
          <span>后台管理系统</span>
     </div> 
      <el-button type="info" @click=tuichu>退出</el-button>
  </el-header>
  <el-container>
      <!-- 侧边栏 -->
    <el-aside :width="isfold?'64px':'240px'" class="aside">
      <div class="zhedie" @click="zhedie">收起</div>
        <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="blue"
      unique-opened	
      :collapse="isfold"
      :collapse-transition='false' 
      router
      :default-active="foldMenu"	> 

      <!-- 一级菜单 -->
      <el-submenu :index="item.id+''" v-for="item in menulist" :key='item.id'>
      <!--  为了表识不同，可以用item.id代替，又因为值只能为字符串，所有加上空字符串  -->
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>

    <!-- 二级菜单 -->
        <el-menu-item :index="child.path+''"  v-for="child in item.children" :key='child.id'
        @click="saveMenu(child.path)">
 <!--  为了表识不同，可以用item.id代替，又因为值只能为字符串，所有加上空字符串  -->
            <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{child.authName}}</span>
        </template>
        </el-menu-item>

      </el-submenu>

      
    </el-menu>
    </el-aside>
    <!-- 内容区 -->
    <el-main class="main">
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
import {get} from "../../util/request"
export default {
    
    components: {},
    data() {
        
        return {
             menulist:[],
           iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
          },
          isfold:false,
          foldMenu:''
        };
    },
    computed: {},
    watch: {},
    
    methods: {
        tuichu(){
            window.sessionStorage.clear()
            this.$router.push("/login")
        },
       async getMenuList(){
         let result =await get('menus');
         console.log(result);
         if(result.data.meta.status!==200){
          this.$message.error(result.data.meta.msg);  
         }else{
             this.menulist=result.data.data;
         }
        },
        zhedie(){
         this.isfold=!this.isfold
        },
        saveMenu(Menu){  //点击时保存index的数据
         window.sessionStorage.setItem("foldMenu",Menu);
         this.foldMenu=Menu
        }
    },
    created() {
        this.getMenuList()
       this.foldMenu=window.sessionStorage.getItem("foldMenu")
    },
    mounted() {
        
    },
    }
</script>
<style scoped lang="less">
.home{
    height: 100%;
}
.container{
        height: 100%;
}
.header{
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding-left: 0;
    font-size: 20px;
   >div{
       display: flex;
       align-items: center;
       >span{
       margin-left: 10px;

       }
   }
}
.iconfont{
    margin-right: 10px;
}
.el-menu{
    border-right: none;
}
.aside{
    background-color: gray;
} 
.main{
    background-color: hotpink;
}  
.zhedie{
    background-color:darkgray;
    text-align: center;
    font-size: 12px;
}

</style>