import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/newblood',
            component: () => import('./views/Content/Newblood.vue'),
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/answersystem',
            component: () => import('./views/Content/Answersystem.vue'),
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/testsystem',
            component: () => import('./views/Content/Testsystem.vue'),
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/empty',
            component: () => import('./views/Content/empty.vue'),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/',
            redirect: '/newblood'
        }
    ]
})
