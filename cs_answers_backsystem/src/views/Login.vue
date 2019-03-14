<template>
    <div class="body">
        <Card class="card" bordered shadow>
            <div class="login">
                <Form label-postion="top">
                    <FormItem label="账号">
                        <Input type="text" placeholder="输入账号..." v-model="username"/>
                    </FormItem>
                    <FormItem label="密码">
                        <Input type="password" placeholder="输入密码..." v-model="password"/>
                    </FormItem>
                </Form>
                <Button long type="success" @click="login">登入系统</Button>
            </div>
        </Card>
    </div>
</template>

<script>
    import jwt from 'jwt-decode'
    import {setCookie, getCookie} from "../assets/cookie"
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        mounted() {
            /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            if(getCookie('username')){
                this.$router.push('/newblood')
            }
        },
        methods: {
            login() {
                if (this.username === '' || this.password === '') {
                    alert("请输入用户名或密码")
                } else {
                    let data = {'adminNum': this.username, 'adminPassword': this.password}
                    /*接口请求*/
                    this.http({
                        method: 'post',
                        url: 'http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/admin/login',
                        data: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        }
                    }).then((res) => {
                        console.log(res)
                        if (res.data.code === -1) {
                            alert("账号或密码错误")
                        } else if (res.data.code === 0) {
                            // 登录成功后要做的事
                            // 先把用户存到cookie中
                            setCookie('username', this.username, 1000*60*10)
                            // 把token存到localStorage
                            const token = res.data.object
                            window.localStorage.setItem('token', token)
                            // 解析token
                            const decoded = jwt(token)
                            console.log(decoded)
                            // 分发actions
                            // this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded))
                            // 跳转路由
                            this.$router.push('/newblood')
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            isEmpty (value) {
                return(
                    value === undefined || value === null || (typeof  value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
                )
            }
        }
    }
</script>

<style scoped>
    .body {
        height: 100%;
        width: 100%;
        background: #f8f8f9;
    }

    .card {
        margin-top: 350px;
        width: 400px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .login {
    }
</style>