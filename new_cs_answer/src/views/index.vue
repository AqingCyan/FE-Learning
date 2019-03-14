<template>
    <van-row>
        <div class="top"></div>
        <van-notice-bar>
            欢迎使用CrestShare在线答题系统，答题测试将在{{openTime}}开始。
        </van-notice-bar>
        <div>
            <van-card
                    tag="正在进行"
                    desc="2018.11.30-19:00"
                    title="前端组测试"
                    :thumb="imageURL[0]"
            >
                <div slot="footer">
                    <van-button size="small" type="primary" @click="need('前端')" :disabled="timeFlag">查看详情</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    tag="正在进行"
                    desc="2018.11.30-19:00"
                    title="后端组测试"
                    :thumb="imageURL[1]"
            >
                <div slot="footer">
                    <van-button size="small" type="primary" @click="need('后端')" :disabled="timeFlag">查看详情</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    tag="正在进行"
                    desc="2018.11.30-19:00"
                    title="视觉设计组测试"
                    :thumb="imageURL[2]"
            >
                <div slot="footer">
                    <van-button size="small" type="primary" @click="need('视觉设计')" :disabled="timeFlag">查看详情</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    tag="正在进行"
                    desc="2018.11.30-19:00"
                    title="产品组测试"
                    :thumb="imageURL[3]"
            >
                <div slot="footer">
                    <van-button size="small" type="primary" @click="need('产品')" :disabled="timeFlag">查看详情</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    tag="正在进行"
                    desc="2018.11.30-19:00"
                    title="运营组测试"
                    :thumb="imageURL[4]"
            >
                <div slot="footer">
                    <van-button size="small" type="primary" @click="need('运营')" :disabled="timeFlag">查看详情</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    tag="正在进行"
                    desc="2018.11.30-19:00"
                    title="基础组测试"
                    :thumb="imageURL[5]"
            >
                <div slot="footer">
                    <van-button size="small" type="primary" @click="need('大一')" :disabled="timeFlag">查看详情</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div class="bottom"></div>
    </van-row>
</template>

<script>
    import {Dialog} from 'vant'
    export default {
        name: 'index',
        data() {
            return {
                imageURL: [
                    'http://img.creatshare.com/28f33a05c5dc07bcf604d74a3a790ddd.png',
                    'http://img.creatshare.com/fef44741d3dab40b391219258b3b5aae.png',
                    'http://img.creatshare.com/b0cba98aeb6a79ac90296abeed528cbf.png',
                    'http://img.creatshare.com/a241fd4f07f5e74399937f9ac3d9fd24.png',
                    'http://img.creatshare.com/4565a26a47d226cea83750a31f269f74.png',
                    'http://img.creatshare.com/337bbf18333d63758c595ae91363f5c3.png',
                ],
                openTime: '',
                timeFlag: true
            }
        },
        methods: {
            // 提示
            need(direction) {
                let isLogin = (window.localStorage.token&&window.localStorage.phone) ? true : false
                if (!isLogin) {
                    Dialog.alert({
                        title: '警告',
                        message: '我寻思你也没登录啊？'
                    })
                } else if (direction === window.localStorage.directed) {
                    Dialog.confirm({
                        title: `${direction}测试`,
                        message: `测试将于${this.openTime}开始，请按时参加。答题时间不做限制，点击确定开始正式答题，答题时请保证独立完成。保存答卷后，在规定时间的最后一天才可以提交试卷，之后在历史界面可以查看参考答案。`
                    }).then(() => {
                        if (direction === '视觉设计') {
                            window.localStorage.setItem('answer_directed', '视觉')
                        } else {
                            window.localStorage.setItem('answer_directed', direction)
                        }
                        // on confirm ajax
                        if (confirm) {
                            this.$router.push('/questions')
                        }
                    }).catch(() => {

                    })
                } else {
                    Dialog.confirm({
                        title: '温馨提示',
                        message: `你选择的面试方向好像不是${direction}哦,是否要作答呢？`
                    }).then(() => {
                        if (confirm) {
                            if (direction === '视觉设计') {
                                window.localStorage.setItem('answer_directed', '视觉')
                            } else {
                                window.localStorage.setItem('answer_directed', direction)
                            }
                            this.$router.push('/questions')
                        }
                    }).catch(() => {})
                }
            },
            // 获取答题开放时间并进行判断
            getTime () {
                this.http({
                    method: 'get',
                    url: 'http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/cache/getOpenDate'
                }).then(res => {
                    let year = res.data.toString().substring(0,4)
                    let month = res.data.toString().substring(4,6)
                    let day = res.data.toString().substring(6,8)
                    let hour = res.data.toString().substring(8,10)
                    let minute = res.data.toString().substring(10,12)
                    this.openTime = `${year}年${month}月${day}日${hour}时${minute}分`
                })
                // 获取当前时间
                let now = Date()
                // console.log(now)
                now = now.split(' ')
                // console.log(now)
                let time = now[4].split(':')
                // console.log(time)
                let month = ''
                switch (now[1]) {
                    case 'Jan':
                        month = '01';
                        break;
                    case 'Feb':
                        month = '02';
                        break;
                    case 'Mar':
                        month = '03';
                        break;
                    case 'Apr':
                        month = '04';
                        break;
                    case 'May':
                        month = '05';
                        break;
                    case 'Jun':
                        month = '06';
                        break;
                    case 'Jul':
                        month = '07';
                        break;
                    case 'Aug':
                        month = '08';
                        break;
                    case 'Sep':
                        month = '09';
                        break;
                    case 'Oct':
                        month = '10';
                        break;
                    case 'Nov':
                        month = '11';
                        break;
                    case 'Dec':
                        month = '12';
                        break;
                }
                now = now[3] + month + now[2] + time[0] + time[1]
                // console.log(now)
                if (now < this.openTime) {
                    this.timeFlag = true
                } else if (now > this.openTime || now === this.openTime) {
                    this.timeFlag = false
                }
            }
        },
        created () {
            this.getTime()
        }
    }
</script>

<style scoped>
</style>
