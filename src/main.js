import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //已经引入 router组件
import element from "./config/element/index";

import "element-ui/lib/theme-chalk/index.css"; //已经引入elementui组件样式
import "./assets/fonts/iconfont.css"; //导入样式表
import "./assets/css/res.css";

Vue.config.productionTip = false;
Vue.use(element);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");


