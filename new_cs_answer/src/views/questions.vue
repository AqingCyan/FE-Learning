<template>
    <div>
        <div class="top"></div>
        <van-notice-bar mode="closeable">
            为确保问答题的认真做答，请综合资料学习后再答，系统会缓存您的答案，提交按钮会在交卷日期开放
        </van-notice-bar>
        <van-row>
            <van-col offset="1">
                <h3 @click="getSub">问答题</h3>
            </van-col>
        </van-row>
        <div v-for="(item, index) in testList" :key="index">
            <van-row>
                <van-col offset="1">
                    <p>{{ item.quesContent }}
                        <small style="color: #999;margin-left: 5px">题库编号{{ item.quesId }}</small>
                    </p>
                </van-col>
            </van-row>
            <van-cell-group>
                <van-field
                        label="答案"
                        type="textarea"
                        placeholder="请输入答案"
                        rows="1"
                        :autosize="area"
                        v-model="readList[item.quesId]"
                        @blur="save(item.quesId)"
                />
            </van-cell-group>
        </div>
        <van-submit-bar
                button-text="提交试卷"
                @submit="onSubmit"
                disabled
        >
            <span slot="tip">
                点击这里保存试卷哦： <a href="#" style="color: blue;" @click="saveAll">保存试卷</a>
            </span>
        </van-submit-bar>
        <div style="height: 56px"></div>
    </div>
</template>

<script>
    import {Dialog} from 'vant'
    import qs from 'qs'

    export default {
        name: 'questions',
        data() {
            return {
                area: {maxHeight: 300, minHeight: 100},
                answerList: {},
                testList: [],
                readList: {}
            }
        },
        methods: {
            // 页面初始化，请求题目
            getQues() {
                const phone = window.localStorage.getItem('phone')
                const directed = window.localStorage.getItem('answer_directed')
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/paper/get?phone=${phone}&type=${directed}&num=7`
                }).then(res => {
                    // console.log(res)
                    this.testList = res.data
                })
            },
            // 提交试卷
            // onSubmit() {
            //     let phone = window.localStorage.getItem('phone')
            //     // console.log(this.answerList)
            //     Dialog.confirm({
            //         title: '再次确认',
            //         message: '你确定要提交吗？我指的是提交，而不是保存！'
            //     }).then(() => {
            //         // on confirm
            //         // console.log(this.answerList)
            //         let answer = {
            //             dtPhone: phone,
            //             dtAnswer: JSON.stringify(this.readList)
            //         }
            //         console.log(JSON.stringify(answer))
            //         // console.log(answer)
            //         if (confirm) {
            //             this.http({
            //                 method: "post",
            //                 url: 'api/nxdt-0.0.1-SNAPSHOT/paper/insert',
            //                 data: answer
            //             })
            //                 .then(res => {
            //                 console.log(res);
            //             })
            //             // this.$router.push('/home')
            //         }
            //     }).catch(() => {
            //         // on cancel
            //     })
            // },
            // 缓存
            save(id) {
                // console.log(id)
                let phone = window.localStorage.getItem('phone')
                let subNum = id
                let subContent = this.answerList[id] || ''
                // 由于后端数据库对汉字处理有问题，所以前端对字符串进行转码
                var res = [];
                for (var i = 0; i < subContent.length; i++) {
                    res[i] = ("00" + subContent.charCodeAt(i).toString(16)).slice(-4);
                }
                subContent = "\\u" + res.join("\\u");
                // console.log(subContent)
                let postData = {
                    phone: phone,
                    subNum: subNum,
                    subContent: subContent
                }
                // console.log(postData)
                postData = qs.stringify(postData)
                // console.log(JSON.stringify(postData))
                this.http({
                    method: 'post',
                    url: 'http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/cache/subCache',
                    data: postData
                })
                    .then(res => {
                        console.log(res)
                    })
            },
            // 获取缓存
            getSub() {
                let phone = window.localStorage.getItem('phone')
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/cache/getCache?phone=${phone}`
                }).then(res => {
                    // console.log(res)
                    // console.log(res.data)
                    for (let key in res.data) {
                        // console.log(res.data[key])
                        // console.log(this.toChina(res.data[key]))
                        let item = this.toChina(res.data[key])
                        this.answerList[key] = item
                    }
                    console.log(this.answerList)
                    this.readList = this.answerList
                })
            },
            // unicode转utf8
            toChina(data) {
                if (data == '') return;
                data = data.split("\\u");
                let str = '';
                for (let i = 0; i < data.length; i++) {
                    str += String.fromCharCode(parseInt(data[i], 16).toString(10));
                }
                return str;
            },
            // 直接跳转到首页，给人视觉效果是保存辽
            saveAll() {
                this.$router.replace('/home')
            }
        },
        created() {
            // this.getAnswerWhichDid()
            // this.getQues()
            this.getQues()
        },
        mounted() {
            this.getSub()
        }
    }
</script>

<style scoped>

</style>
