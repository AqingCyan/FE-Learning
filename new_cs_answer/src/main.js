import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './libs/utils'
import {
    Button,
    Tabbar,
    TabbarItem,
    NavBar,
    NoticeBar,
    Panel,
    Row,
    Col,
    Field,
    Cell,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Card,
    SubmitBar
} from 'vant'

Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Button).use(NoticeBar)
    .use(Panel).use(Row).use(Col).use(Field).use(Cell).use(CellGroup)
    .use(Checkbox).use(CheckboxGroup).use(Card).use(SubmitBar)

Vue.config.productionTip = false
// 配置axios默认路径
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
// 全局注册axios
Vue.prototype.http = axios
// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (window.localStorage.token) {
            next()
        } else {
            next({
                path: '/user'
            })
        }
    } else {
        next()
    }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
