<template>
    <van-row>
        <div class="top"></div>
        <img src="../assets/logo-email-template.png" style="width: 100%;" alt="">
        <van-cell-group>
            <van-field
                    v-model="info[0]"
                    type="tel"
                    label="手机号"
                    icon="question"
                    left-icon="contact"
                    placeholder="请输入手机号码"
                    @click-icon="question"
            />

            <div style="display: flex;flex-direction: row">
                <van-field
                        v-model="imgWord"
                        label="验证码"
                        left-icon="records"
                        placeholder="请输入验证码"
                        style="width: 77%;"
                />
                <img :src="src" style="width: 20%;" @click="AccesImg">
            </div>
            <van-field
                    center
                    v-model="info[1]"
                    left-icon="edit-data"
                    label="短信码"
                    placeholder="请输入短信验证码"
            >
                <van-button slot="button" size="small" type="primary" @click="getCode"  :disabled="sendAuthCode">{{auth_time}}</van-button>
            </van-field>
        </van-cell-group>
        <div class="top"></div>
        <router-link to="/loginUser">
            <van-row type="flex" justify="center">
                <van-button type="primary" size="large" round style="width: 330px" @click="login">进入系统</van-button>
            </van-row>
        </router-link>
        <div class="bottom"></div>
    </van-row>
</template>

<script>
    // import axios from 'axios'
    import {Dialog} from 'vant'
    import qs from 'qs'
    // info存储的是用户输入的手机号和短信验证码
    // imgWord存储的是用户输入的图形验证码
    // 取到内容后发送ajax请求获取登录信息路由跳转
    export default {
        name: 'user',
        data() {
            return {
                info: [],
                imgWord: '',
                src: '',
                ms1: '请输入正确的图片验证码',
                ms2: '请输入正确的短信验证码',
                ms3: '30秒内操作频繁，请稍后',
                ms4: '一小时内操作频繁，请稍后',
                ms5: '24小时内操作频繁，请稍后',
                auth_time: '发送验证码' ,  /*倒计时*/
                sendAuthCode: false
            }
        },
        mounted() {
            this.AccesImg()
        },
        methods: {
            question() {
                Dialog.alert({
                    title: '提示',
                    message: '请输入注册纳新系统时绑定的号码'
                })
            },
            /* 获取短信验证码 */
            getCode() {
                let postData = qs.stringify({
                    phone: this.info[0],
                    valid: this.imgWord
                })
                this.http({
                    method: 'post',
                    url: 'http://47.104.189.19:8080/nx/VerifyServlet',
                    data: postData
                }).then(res => {
                    // console.log(res.data.msg)
                   if (res.data.msg.code === 0) {
                       this.sendAuthCode = true
                       //设置倒计时秒
                       this.auth_time = 60
                       let auth_timetimer = setInterval(()=>{
                           this.auth_time--;
                           if(this.auth_time <= 0){
                               this.sendAuthCode = false;
                               clearInterval(auth_timetimer)
                               this.auth_time = '发送验证码'
                           }
                       }, 1000);
                   } else if (res.data.msg.code === 22) {
                       Dialog.alert({
                           title: '警告',
                           message: this.ms4
                       })
                   } else if (res.data.msg.code === 43) {
                       Dialog.alert({
                           title: '警告',
                           message: this.ms5
                       })
                   } else if (res.data.msg.code === 33) {
                       Dialog.alert({
                           title: '警告',
                           message: this.ms3
                       })
                   } else if (res.data.msg.code === 17) {
                       Dialog.alert({
                           title: '警告',
                           message: this.ms5
                       })
                   } else {
                       Dialog.alert({
                           title: '警告',
                           message: this.ms1
                       })
                   }
                })
            },
            /* 刷新图片 */
            AccesImg() {
                this.http({
                    method: 'get',
                    url: 'http://47.104.189.19:8080/nx/VerifyCodeServlet',
                    responseType: 'arraybuffer'
                }).then(res => {
                    return 'data:image/png;base64,' + btoa(
                        new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    )
                }).then(data => {
                    this.src = data
                })
            },
            //向后台发送手机号码和短信验证码 判断是否登陆成功
            login () {
                let testdata = qs.stringify({
                    phone: this.info[0],
                    code: this.info[1]
                });
                this.http({
                    method:"post",
                    url:"http://47.104.189.19:8080/nx/LoginServlet",
                    data:testdata
                }).then(res => {
                    // console.log(res)
                    if(res.data.msg === 0){
                        Dialog.alert({
                            title: '警告',
                            message: this.ms2
                        })
                        return
                    }
                    //存储token到ls
                    const {token} = res.data
                    window.localStorage.setItem('token',token);
                    window.localStorage.setItem('phone',this.info[0])
                    window.localStorage.setItem('directed', res.data.directed)
                    // 如果是首次登录
                    if(res.data.msg === 1){
                        // console.log("首次登录") // 跳转至纳新系统的edit
                        // windows.location.href="/url"
                        Dialog.alert({
                            title: '警告',
                            message: '我寻思你也没用纳新系统注册啊？'
                        })
                        return
                    }
                    // 如果不是
                    if(res.data.msg === 2){
                        // console.log("并非首次登录")
                        //  跳转至个人信息页面
                        // console.log(1)
                        this.$router.push(`/loginUser`)
                    }
                })
            }
            // 管理员账号登录先行调试
            // admin () {
            //   let data = {
            //       'adminNum': 'creatshare',
            //       'adminPassword': 'creatshare2018'
            //   }
            //   this.http({
            //       method: 'post',
            //       url: 'api/nxdt-0.0.1-SNAPSHOT/admin/login',
            //       data:JSON.stringify(data),
            //       headers: {
            //           "Content-Type": "application/json; charset=utf-8"
            //       }
            //   }).then(res => {
            //       console.log(res)
            //       this.$router.push('/loginUser')
            //   })
            // }
        }
    }
</script>

<style scoped>
</style>
