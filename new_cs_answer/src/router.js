import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Questions from './views/questions'
import Datas from './views/datas'
import User from './views/user'
import LoginUser from './views/loginUser'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home',
            component: Index
        },
        {
            path: '/data',
            component: Datas
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/loginUser',
            component: LoginUser,
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/questions',
            component: Questions,
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/',
            redirect: '/loginUser'
        }
    ]
})
