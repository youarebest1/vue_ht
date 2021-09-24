import Vue from 'vue'
import VueRouter from 'vue-router' //引入路由插件
Vue.use(VueRouter) //使用组件

const router = new VueRouter({
  routes: [
    //  配置路由表
    {
      path: '/', //路由重定向（设置默认地址）
      redirect: '/login'
    },
    {
      path: '/login', //登录页面
      component: () => import('../components/login.vue'),
      meta: {
        footShow: true
      }
    },
    {
      path: '/home', //首页
      component: () => import('../views/home'),
      meta: {
        footShow: true
      }
    }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router //导出路由模块
