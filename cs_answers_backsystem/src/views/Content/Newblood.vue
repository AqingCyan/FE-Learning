<template>
    <dev-article>
        <Row style="margin-top: 75px">
            <i-col span="4">
                <h1>纳新人员后台管理</h1>
            </i-col>
            <i-col span="20">
                <Row :gutter="16">
                    <i-col span="10">
                        <Input v-model="SelectPhone" placeholder="Enter phone number" style="width: 150px"/>
                        <Button type="success" style="margin:0 16px" @click="handleGetMemberByPhone">查询</Button>
                        <Button type="primary" @click="getData">全部</Button>
                    </i-col>
                    <i-col span="6">
                        <Select v-model="SelectDec" style="width:150px" @on-change="handleSelectDec">
                            <Option v-for="item in decList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </i-col>
                    <i-col span="8">
                        <Select v-model="SelectStatus" style="width:150px" @on-change="handleSelectStatus">
                            <Option v-for="item in StatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </i-col>
                </Row>
            </i-col>
        </Row>
        <Card class="card">
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
        <!--Modal组件的transfer属性默认为true，它是直接加载在body里的，所以无关Modal放置的位置-->
        <Modal title="确定面试成绩" v-model="value" @on-ok="handleSendMembersInfo">
            <Row>
                <i-col span="10" offset="2">
                    <Dropdown @on-click="handleGetItemName">
                        <Button type="warning">
                            修改面试状态
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="first">等待笔试</DropdownItem>
                            <DropdownItem name="second">笔试结束</DropdownItem>
                            <DropdownItem name="third">等待一面</DropdownItem>
                            <DropdownItem name="fourth">等待二面</DropdownItem>
                            <DropdownItem name="last">终面通过</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </i-col>
                <i-col>
                    <h2>{{ setInfo }}</h2>
                </i-col>
            </Row>
        </Modal>
    </dev-article>
</template>

<script>
    import {delCookie} from "../../assets/cookie"
    export default {
        name: "Newblood",
        data () {
            return {
                SelectPhone: '',
                // 要修改的页面序setCurrent。 要修改的项目的序setIndex。要修改成的状态 setStatus
                setCurrent: '',
                setIndex: '',
                setStatus: '',
                // 状态显示 setInfo
                setInfo: '',
                userInfo: '',
                value: false,
                data: [],
                total: 0,
                current: 1,
                loading: false,
                size: 10,
                decList: [
                    {
                        value: '前端',
                        label: '前端'
                    },
                    {
                        value: '后端',
                        label: '后端'
                    },
                    {
                        value: '视觉设计',
                        label: '视觉设计'
                    },
                    {
                        value: '产品',
                        label: '产品'
                    },
                    {
                        value: '运营',
                        label: '运营'
                    },
                    {
                        value: '基础',
                        label: '基础'
                    }
                ],
                SelectDec: '',
                StatusList: [
                    {
                        value: 1,
                        label: '未笔试'
                    },
                    {
                        value: 2,
                        label: '笔试等结果'
                    },
                    {
                        value: 3,
                        label: '等待一面'
                    },
                    {
                        value: 4,
                        label: '等待二面'
                    },
                    {
                        value: 5,
                        label: '二面通过'
                    },
                ],
                SelectStatus: '',
                columns: [
                    {
                        title: '序',
                        type: 'index',
                        width: 60,
                        align: 'center',
                        indexMethod: (row) => {
                            return (row._index + 1) + (this.size * this.current) - this.size;
                        }
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
                        title: '学号',
                        align: 'center',
                        key: 'number'
                    },
                    {
                        title: '电话',
                        align: 'center',
                        key: 'phone'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'name',
                        render: ((h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                    click: () => {
                                        this.value = true
                                        this.handleSetMembers(params.index, this.current)
                                    }
                                }
                            }, '操作信息');
                        })
                    }
                ]
            }
        },
        methods: {
            getData () {
                if (this.loading) return; // 避免多次请求
                this.loading = true;
                // 发起请求
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user?page=${this.current}&size=10`
                }).then(res => {
                    // console.log(res.data)
                    if (res.data.code === 0) {
                        let data = res.data.object.list
                        data.forEach(item => {
                            switch (item.status) {
                                case 1: item.status = '等待笔试';break;
                                case 2: item.status = '笔试结束';break;
                                case 3: item.status = '等待一面';break;
                                case 4: item.status = '等待二面';break;
                                case 5: item.status = '终面通过';break;
                            }
                        })
                        this.data = data
                        this.total = res.data.object.total
                        this.loading =false
                        this.SelectStatus = ''
                        this.SelectPhone = ''
                        this.SelectDec = ''
                    } else if (res.data.code === '-1') {
                        alert('登录身份已经过期，请重新登录')
                        window.localStorage.removeItem('token')
                        delCookie('username')
                        this.$router.replace('/login')
                    }
                })
            },
            // 给后端发送第几页的第几个进行操作
            handleSetMembers (params ,current) {
                // console.log(params + '---' + current)
                this.setCurrent = current
                this.setIndex = params
            },
            handleGetItemName (name) {
                switch (name) {
                    case 'first': this.setStatus = 1; this.setInfo = '等待笔试';break;
                    case 'second': this.setStatus = 2; this.setInfo = '笔试结束';break;
                    case 'third': this.setStatus = 3; this.setInfo = '等待一面';break;
                    case 'fourth': this.setStatus = 4; this.setInfo = '等待二面';break;
                    case 'last': this.setStatus = 5; this.setInfo = '终面结束';break;
                }
                // console.log(this.setCurrent + '  ' + this.setIndex + '  ' + this.setStatus)
                if (this.SelectDec) {
                    this.http({
                        method: 'get',
                        url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user/direction?page=${this.current}&size=${this.size}&direction=${this.SelectDec}`
                    }).then(res => {
                        // console.log(res)
                        let userInfo = res.data.object.list[this.setIndex]
                        userInfo.status = this.setStatus
                        // console.log(userInfo)
                        this.userInfo = JSON.stringify(userInfo)
                        console.log(this.userInfo)
                    })
                } else if (this.SelectStatus) {
                    this.http({
                        method: 'get',
                        url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user/status/${this.SelectStatus}?page=${this.current}&size=10`
                    }).then(res => {
                        // console.log(res)
                        let userInfo = res.data.object.list[this.setIndex]
                        userInfo.status = this.setStatus
                        // console.log(userInfo)
                        this.userInfo = JSON.stringify(userInfo)
                        console.log(this.userInfo)
                    })
                } else if (this.SelectPhone) {
                    this.http({
                        method: 'get',
                        url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user/${this.SelectPhone}`
                    }).then(res => {
                        // console.log(res)
                        let userInfo = res.data.object
                        userInfo.status = this.setStatus
                        // console.log(userInfo)
                        this.userInfo = JSON.stringify(userInfo)
                        console.log(this.userInfo)
                    })
                } else {
                    this.http({
                        method: 'get',
                        url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user?page=${this.setCurrent}&size=${this.size}`
                    }).then(res => {
                        // console.log(res)
                        let userInfo = res.data.object.list[this.setIndex]
                        userInfo.status = this.setStatus
                        // console.log(userInfo)
                        this.userInfo = JSON.stringify(userInfo)
                        console.log(this.userInfo)
                    })
                }
            },
            handleSendMembersInfo () {
                // 发送ajax请求,修改数据库成员信息
                this.http({
                    method: 'put',
                    url: 'http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user',
                    data: this.userInfo,
                    headers: {'Content-Type': 'application/json;charset=UTF-8'}
                }).then(res => {
                    if (res.data.code === 0) {
                        alert('修改成功')
                        this.getData()
                    }
                }).catch(err => {
                    if (err) {
                        alert('状态未修改')
                    }
                })
                // 把设置内容清空
                this.setInfo = ''
            },
            // 查询具体某个人的信息
            handleGetMemberByPhone () {
                if (!this.SelectPhone) {
                    alert('请填入电话号')
                    return
                }
                this.SelectStatus = ''
                this.SelectDec = ''
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user/${this.SelectPhone}`
                }).then(res => {
                    // console.log(res)
                    if (res.data.code === 0) {
                        let data = []
                        data.push(res.data.object)
                        switch (data[0].status) {
                            case 1: data[0].status = '等待笔试';break;
                            case 2: data[0].status = '笔试结束';break;
                            case 3: data[0].status = '等待一面';break;
                            case 4: data[0].status = '等待二面';break;
                            case 5: data[0].status = '终面通过';break;
                        }
                        this.data = data
                    } else if (res.data.code === -1) {
                        alert('该号码不存在，请再确认一次')
                        this.SelectPhone = ''
                    }
                })
            },
            // 根据方向请求
            handleSelectDec () {
                // console.log(this.SelectDec)
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user/direction?page=${this.current}&size=${this.size}&direction=${this.SelectDec}`
                }).then(res => {
                    if (res.data.code === 0) {
                        let data = res.data.object.list
                        data.forEach(item => {
                            switch (item.status) {
                                case 1: item.status = '等待笔试';break;
                                case 2: item.status = '笔试结束';break;
                                case 3: item.status = '等待一面';break;
                                case 4: item.status = '等待二面';break;
                                case 5: item.status = '终面通过';break;
                            }
                        })
                        this.data = data
                        this.total = res.data.object.total
                        this.SelectPhone = ''
                        this.SelectStatus = ''
                    }
                })
            },
            // 根据状态选择
            handleSelectStatus () {
                this.SelectPhone = ''
                this.SelectDec = ''
                this.http({
                    method: 'get',
                    url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/user/status/${this.SelectStatus}?page=${this.current}&size=10`
                }).then(res => {
                    // console.log(res)
                    if (res.data.code === 0) {
                        this.total = res.data.object.total
                        let data = res.data.object.list
                        data.forEach(item => {
                            switch (item.status) {
                                case 1: item.status = '等待笔试';break;
                                case 2: item.status = '笔试结果';break;
                                case 3: item.status = '等待一面';break;
                                case 4: item.status = '等待二面';break;
                                case 5: item.status = '终面通过';break;
                            }
                        })
                        this.data = data
                    }
                })
            }
        },
        mounted () {
            this.getData()
        }
    }
</script>

<style scoped>
    .card {
        margin-top: 20px;
    }
</style>