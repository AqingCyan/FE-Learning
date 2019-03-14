<template>
    <dev-article>
        <Row style="margin-top: 75px">
            <i-col span="5">
                <h1>纳新名单状态管理</h1>
            </i-col>
            <i-col span="19">
                <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px" @on-ok="getTime"
                            v-model="countDate"></DatePicker>
            </i-col>
        </Row>
        <Card class="testCard"
              shadow
              title="纳新"
        >
            <Tag color="red" slot="extra">{{ testList.status }}</Tag>
            <Row :gutter="16">
                <i-col span="6" v-for="(question, index) in testList.questions" :key="question.quesId">
                    <Card bordered :title="'题库编号:'+question.quesId.toString()" style="margin-bottom: 10px">
                        <Tag color="green" slot="extra">{{ question.quesType }}</Tag>
                        <h3 class="questionName">{{ question.quesContent }}</h3>
                        <Divider></Divider>
                        <p class="answer">{{ question.quesAnswer }}</p>
                        <Divider></Divider>
                        <Button type="primary" long @click="handleSetTest(index)">修改</Button>
                        <Button type="warning" long @click="handleRemoveTest(question.quesId)" style="margin-top: 10px">
                            删除
                        </Button>
                    </Card>
                </i-col>
                <i-col span="6">
                    <Card bordered title="插入新题">
                        <Tag color="blue" slot="extra">新题目</Tag>
                        <h3>题目设置</h3>
                        <Divider></Divider>
                        <p>内容设置</p>
                        <p class="zhan">内容设置</p>
                        <Divider></Divider>
                        <Button type="success" long @click="handleAddTest">添加</Button>
                    </Card>
                </i-col>
            </Row>
        </Card>
        <Modal title="设置新试题"
               v-model="addValue"
               @on-ok="handleSendNewTest"
        >
            <Form label-postion="top">
                <FormItem label="问答题">
                    <Input v-model="questionTitle"/>
                    <Input type="textarea" :rows="4" v-model="questionAnswer"/>
                </FormItem>
                <FormItem label="方向">
                    <Select transfer v-model="tag">
                        <Option value="0">前端</Option>
                        <Option value="1">后端</Option>
                        <Option value="2">视觉</Option>
                        <Option value="3">产品</Option>
                        <Option value="4">运营</Option>
                        <Option value="5">大一</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal title="修改试题"
               v-model="setValue"
               @on-ok="handleSetOldTest"
               @on-cancel="handleClose"
        >
            <Form label-postion="top">
                <FormItem label="问答题">
                    <Input v-model="questionTitle"/>
                    <Input type="textarea" :rows="4" v-model="questionAnswer"/>
                    <Select transfer v-model="tag">
                        <Option value="0">前端</Option>
                        <Option value="1">后端</Option>
                        <Option value="2">视觉</Option>
                        <Option value="3">产品</Option>
                        <Option value="4">运营</Option>
                        <Option value="5">大一</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </dev-article>
</template>

<script>
    export default {
        name: "Answersystem",
        data() {
            return {
                countDate: '',
                addValue: false,
                setValue: false,
                questionTitle: '',
                questionAnswer: '',
                // 存放数据库题目的编号以及类型
                id: '',
                type: '',
                tag: '',
                testList: {
                    title: '纳新',
                    status: '进行中',
                    questions: []
                }
            }
        },
        methods: {
            getData() {
                if (this.loading) return; // 避免多次请求
                this.loading = true;
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/questions?page=1&size=100`
                }).then(res => {
                    console.log(res)
                    this.testList.questions = res.data
                })
                    .catch(err => {
                        console.log(err)
                    })
            },
            handleAddTest() {
                this.addValue = true
            },
            // 添加题目
            handleSendNewTest() {
                let newQuestion = {}
                // newQuestion.quesId = '问答题'
                newQuestion.quesContent = this.questionTitle
                newQuestion.quesAnswer = this.questionAnswer
                if (this.tag === '0') {
                    newQuestion.quesType = '前端'
                } else if (this.tag === '1') {
                    newQuestion.quesType = '后端'
                } else if (this.tag === '2') {
                    newQuestion.quesType = '视觉'
                } else if (this.tag === '3') {
                    newQuestion.quesType = '产品'
                } else if (this.tag === '4') {
                    newQuestion.quesType = '运营'
                } else if (this.tag === '5') {
                    newQuestion.quesType = '大一'
                }
                console.log(newQuestion)
                // newQuestion = qs.stringify(newQuestion)
                this.http({
                    method: 'post',
                    url: 'http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/questions',
                    data: JSON.stringify(newQuestion),
                    headers: {'Content-Type': 'application/json;charset=UTF-8'}
                }).then(res => {
                    // console.log(res)
                    if (res.data.code === 0) {
                        this.$router.replace('/empty')
                    }
                })
                this.quesContent = ''
                this.quesAnswer = ''
                this.tag = ''
            },
            handleSetTest(index) {
                this.setValue = true
                // console.log(this.testList.questions[index])
                this.questionTitle = this.testList.questions[index].quesContent
                this.questionAnswer = this.testList.questions[index].quesAnswer
                this.id = this.testList.questions[index].quesId
                this.type = this.testList.questions[index].quesType
                if (this.testList.questions[index].quesType === '前端') {
                    this.tag = '0'
                } else if (this.testList.questions[index].quesType === '后端') {
                    this.tag = '1'
                } else if (this.testList.questions[index].quesType === '视觉') {
                    this.tag = '2'
                } else if (this.testList.questions[index].quesType === '产品') {
                    this.tag = '3'
                } else if (this.testList.questions[index].quesType === '运营') {
                    this.tag = '4'
                } else if (this.testList.questions[index].quesType === '基础') {
                    this.tag = '5'
                }
            },
            // 发送修改题目
            handleSetOldTest() {
                let postTest = {}
                postTest.quesContent = this.questionTitle
                postTest.quesAnswer = this.questionAnswer
                postTest.quesType = this.type
                postTest.quesId = this.id
                this.http({
                    method: 'put',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/questions`,
                    data: JSON.stringify(postTest),
                    headers: {'Content-Type': 'application/json;charset=UTF-8'}
                }).then(res => {
                    // console.log(res)
                    if (res.data.code === 0) {
                        this.questionTitle = ''
                        this.questionAnswer = ''
                        this.$router.replace('/empty')
                    }
                })
            },
            handleClose() {
                // 清空
                this.questionTitle = ''
                this.questionAnswer = ''
            },
            handleRemoveTest(index) {
                this.http({
                    method: 'delete',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/questions/${index}`
                }).then(res => {
                    console.log(res)
                    if (res.data.code === 0) {
                        this.$router.replace('/empty')
                    } else if (res.data.code === -1) {
                        alert('哦豁，删除有问题')
                    }
                })
            },
            getTime() {
                // 0: "Thu"
                // 1: "Nov"
                // 2: "08"
                // 3: "2018"
                // 4: "00:00:00"
                // 5: "GMT+0800"
                // 6: "(中国标准时间)"
                let time = this.countDate.toString()
                let timeArr = time.split(' ')
                let year = timeArr[3]
                let month;
                switch (timeArr[1]) {
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
                let day = timeArr[2]
                let choseTime = year + month + day + '0000'
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/cache/updateDate?date=${choseTime}`
                }).then(res => {
                    if (res.data.code === 0) {
                        alert('设置时间成功')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>
    .testCard {
        margin-top: 20px;
    }

    .questionName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .answer {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .zhan {
        color: rgba(255, 255, 255, 0);
    }
</style>
