import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'
import axios from './libs/utils'
import store from './store'

import devArticle from './components/dev-article'
import {getCookie} from "./assets/cookie"
// 全局注册这个组件
Vue.component('dev-article', devArticle)

// 配置axios默认路径
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
// 全局注册axios
Vue.prototype.http = axios
Vue.config.productionTip = false
// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (getCookie('username')) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
