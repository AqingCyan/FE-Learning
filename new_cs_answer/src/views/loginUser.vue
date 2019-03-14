<template>
    <div>
        <div class="top"></div>
        <van-row type="flex" justify="center">
            <div class="headImg">
                <img :src="userInfo.hover">
            </div>
        </van-row>

        <van-panel title="分组" :desc="userInfo.directed" :status="userInfo.status">
            <van-row>
                <van-cell title="姓名" :value="userInfo.name"/>
                <van-cell title="联系电话" :value="userInfo.phone"/>
                <van-cell title="专业班级" :value="userInfo.grade"/>
                <van-cell title="QQ号码" :value="userInfo.qq"/>
            </van-row>
            <div slot="footer">
                <van-row type="flex" justify="space-around">
                    <van-button size="normal" type="danger" style="width: 100%" @click="logout">注销登录</van-button>
                </van-row>
            </div>
        </van-panel>
        <div class="bottom"></div>
    </div>
</template>

<script>
    /**
     * 约定:desc:0前端 1后端 2产品 3运营 4视觉
     *status:0非正式成员 1体验式成员 2正式成员 3小组负责人
     * */
    // const USERINFO = {
    //   desc: ['Web前端', '服务端', '产品', '运营', '视觉', '基础'],
    //   status: ['未笔试', '笔试完成', '等待一面', '等待终面', '体验式成员']
    // }
    import qs from 'qs'
    import {Dialog} from 'vant'
    export default {
        name: 'loginUser',
        data() {
            return {
                userInfo: {
                    hover: '',
                    directed: '',
                    status: '',
                    name: '',
                    phone: '',
                    grade: '',
                    qq: ''
                },
                imageURL: [
                    'http://img.creatshare.com/28f33a05c5dc07bcf604d74a3a790ddd.png',
                    'http://img.creatshare.com/fef44741d3dab40b391219258b3b5aae.png',
                    'http://img.creatshare.com/b0cba98aeb6a79ac90296abeed528cbf.png',
                    'http://img.creatshare.com/a241fd4f07f5e74399937f9ac3d9fd24.png',
                    'http://img.creatshare.com/4565a26a47d226cea83750a31f269f74.png',
                    'http://img.creatshare.com/337bbf18333d63758c595ae91363f5c3.png',
                ],
            }
        },
        methods: {
            // 注销登录
            logout() {
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('phone')
                if (!window.localStorage.getItem('token') || !window.localStorage.getItem('phone')) {
                    this.$router.replace('/user')
                }
            },
            // 判断用户登录是否成功
            isLogin () {
                if (!window.localStorage.token || !window.localStorage.phone) {
                    Dialog.alert({
                        title: '提示',
                        message: '登录失败，请稍后重试'
                    })
                }
            },
            // 获取用户信息
            getData() {
                let id = window.localStorage.getItem('phone')
                let phone = qs.stringify({phone: id})
                this.http({
                    method: 'post',
                    url: 'http://47.104.189.19:8080/nx/FindServlet',
                    data: phone
                }).then(res => {
                    // console.log(res.data)
                    this.userInfo.directed = res.data.directed
                    this.userInfo.grade = res.data.grade
                    this.userInfo.qq = res.data.qq
                    this.userInfo.phone = res.data.phone
                    this.userInfo.name = res.data.name
                    switch (res.data.status) {
                        case 1: this.userInfo.status = '未笔试';break;
                        case 2: this.userInfo.status = '笔试结束';break;
                        case 3: this.userInfo.status = '等待一面';break;
                        case 4: this.userInfo.status = '等待二面';break;
                        case 5: this.userInfo.status = '等待三面';break;
                    }
                    switch (res.data.directed) {
                        case '前端': this.userInfo.hover = this.imageURL[0];break;
                        case '后端': this.userInfo.hover = this.imageURL[1];break;
                        case '视觉设计': this.userInfo.hover = this.imageURL[2];break;
                        case '产品': this.userInfo.hover = this.imageURL[3];break;
                        case '运营': this.userInfo.hover = this.imageURL[4];break;
                        case '基础': this.userInfo.hover = this.imageURL[5];break;
                    }
                }).catch(err => {
                    if (err) {
                        window.localStorage.removeItem('phone')
                        window.localStorage.removeItem('token')
                        window.localStorage.removeItem('directed')
                        this.$router.replace('/user')
                    }
                })
            }
        },
        created() {
            this.getData()
            this.isLogin()
        }
    }
</script>

<style scoped>
    .headImg {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 3px solid darkseagreen;
        margin: 30px 0;
    }

    .headImg img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
</style>
