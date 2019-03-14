<template>
    <dev-article>
        <Row style="margin-top: 75px">
            <i-col span="4">
                <h1>答题试卷管理</h1>
            </i-col>
            <i-col span="20">
                <Input v-model="selectPhone" placeholder="Enter phone number" style="width: 250px"/>
                <Button type="warning" style="margin:0 16px" @click="handleGetMemberByPhone">查询</Button>
                <Button type="primary" style="margin:0 16px" @click="getData">全部</Button>
            </i-col>
        </Row>
        <Card class="testCard">
            <Table :columns="columns" :data="data" :loading="loading" border size="large" stripe></Table>
            <div style="text-align: center; margin:16px 0">
                <!--.sync修饰符是一个语法糖，iView的Page组件内部是通过$emit('update:current')触发时间的-->
                <Page
                        :total="total"
                        :current.sync="current"
                        @on-change="getData"
                        :page-size = "size"
                ></Page>
            </div>
        </Card>
        <Modal v-model="value" draggable title="Modal 2" fullscreen>
            <h1>{{userTest.dtPhone}}</h1>
            <div v-for="(item, index) in answer" :key="index">
                <h2 style="margin:10px 0">{{index+1}}:{{ques[index]}}</h2>
                <h3>{{item}}</h3>
            </div>
        </Modal>
    </dev-article>
</template>

<script>
    export default {
        name: "Testsystem",
        data () {
            return {
                total: 0,
                current: 1,
                size: 10,
                loading: false,
                value: false,
                userTest: {},
                answer: [],
                data: [],
                ques: [],
                selectPhone: '',
                questionList: [],
                columns: [
                    {
                        title: '序',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        indexMethod: (row) => {
                            return (row._index + 1) + (this.size * this.current) - this.size;
                        }
                    },
                    {
                        title: 'QQ',
                        align: 'center',
                        key: 'qq'
                    },
                    {
                        title: '电话',
                        align: 'center',
                        key: 'phone'
                    },
                    {
                        title: '方向',
                        align: 'center',
                        key: 'directed'
                    },
                    {
                        title: '班级',
                        align: 'center',
                        key: 'grade'
                    },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'name',
                        render: ((h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'success'
                                },
                                on: {
                                    click: () => {
                                        this.handleSetTestScore(params.index, this.current)
                                    }
                                }
                            }, '批阅试卷');
                        })
                    }
                ],
            }
        },
        methods: {
            getData () {
                if (this.loading) return; // 避免多次请求
                this.loading = true
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user?page=${this.current}&size=10`
                }).then( res => {
                    this.total = res.data.object.total
                    let data = res.data.object.list
                    this.data = data
                    this.loading = false
                })
            },
            handleSetTestScore (index, current) {
                // console.log(index + '   ' + current);
                // 请求第几页的第几个的人的试卷
                // 显示试卷内容到Modal
                this.answer = []
                this.ques = []
                if (this.selectPhone) {
                    console.log(1)
                    this.http({
                        method: 'get',
                        url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user/${this.selectPhone}`
                    }).then(res => {
                        // console.log(res)
                        let userPhone = res.data.object.phone
                        console.log(userPhone)
                        return userPhone
                    }).then(userPhone => {
                        // console.log(userPhone)
                        this.http({
                            method: 'get',
                            url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/paper/getAnswer?phone=${userPhone}`
                        }).then(res => {
                            // console.log(res.data.object[0])
                            this.userTest = res.data.object[0]
                            this.value = true
                            let answer = JSON.parse(res.data.object[0].dtAnswer)
                            // console.log(answer)
                            for (let key in answer) {
                                // console.log(answer[key])
                                for (let i=0; i<this.questionList.length;i++) {
                                    if (this.questionList[i].quesId == key) {
                                        // console.log(key)
                                        this.ques.push(this.questionList[i].quesContent)
                                    }
                                }
                                this.answer.push(answer[key])
                            }
                        })
                    })
                } else {
                    this.http({
                        method: 'get',
                        url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user?page=${current}&size=10`
                    }).then(res => {
                        // console.log(res)
                        let userPhone = res.data.object.list[index].phone
                        // console.log(userPhone)
                        return userPhone
                    }).then(userPhone => {
                        // console.log(userPhone)
                        this.http({
                            method: 'get',
                            url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/paper/getAnswer?phone=${userPhone}`
                        }).then(res => {
                            // console.log(res.data.object[0])
                            this.userTest = res.data.object[0]
                            this.value = true
                            let answer = JSON.parse(res.data.object[0].dtAnswer)
                            // console.log(answer)
                            for (let key in answer) {
                                // console.log(answer[key])
                                for (let i=0; i<this.questionList.length;i++) {
                                    if (this.questionList[i].quesId == key) {
                                        // console.log(key)
                                        this.ques.push(this.questionList[i].quesContent)
                                    }
                                }
                                this.answer.push(answer[key])
                            }
                        })
                    })
                }
            },
            getQuestion() {
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/questions?page=1&size=100`
                }).then(res => {
                    // console.log(res)
                    this.questionList = res.data
                    // console.log(this.questionList)
                })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 查询具体某个人的信息
            handleGetMemberByPhone () {
                if (!this.selectPhone) {
                    alert('请填入电话号')
                    return
                }
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user/${this.selectPhone}`
                }).then(res => {
                    // console.log(res)
                    if (res.data.code === 0) {
                        let data = []
                        data.push(res.data.object)
                        this.data = data
                    } else if (res.data.code === -1) {
                        alert('该号码不存在，请再确认一次')
                        this.SelectPhone = ''
                    }
                })
            },
        },
        mounted () {
            this.getData()
            this.getQuestion()
        }
    }
</script>

<style scoped>
    .testCard {
        margin-top: 20px;
    }
</style>