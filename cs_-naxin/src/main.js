// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import qs from 'qs'
import axios from './utils/http'
import store from './store'
import Login from "./components/Login"
import Edit from "./components/Edit"
import Show from './components/show'
import Modify from './components/Modify'


Vue.config.productionTip = false
Vue.use(VueRouter)
//设置路由
const routes = [
  {path:"/",redirect:'/show'},
  {path:"/login",component:Login},
  {path:"/edit",component:Edit,
      meta:{
        requiresAuth:true
      }
    },
  {path:'/show',component:Show,
    meta:{
      requiresAuth:true
    }
  },
  {path:'/modify',component:Modify,
    meta:{
      requiresAuth:true
    }
  },
  // {path:"/show",component:Show},
  // {path:'/modify',component:Modify},

  // {path:'/test',component:Test}
]

const router = new VueRouter({routes})
//配置axios默认路径
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
//配置axios的原型

Vue.prototype.http = axios
Vue.prototype.$qs = qs
Vue.use(Element)

// 配置全局守卫
router.beforeEach((to,from,next)=>{
  //获取token
  const islogin = localStorage.token?true:false;
  const isPhone = localStorage.phone?true:false;
  if(to.path === "/login"){
    next();
  }else{
    // (islogin&&isPhone)?next():next('/login')
    if (islogin && isPhone) {
      next()
    } else {
      next('/login')
    }
  }
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',

})
