<template>
    <Layout>
        <Header class="header">
            <Row>
                <i-col span="8" offset="1">
                    <h1>CreatShare答题纳新后台管理</h1>
                </i-col>
                <i-col span="10">
                    <div style="height: 1px; width: 100%;"></div>
                </i-col>
                <i-col span="5">
                    <Row>
                        <i-col span="4">
                            <Dropdown>
                                <Avatar size="large" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1540705118&di=5c9026e100d6847e4f59c1b611837dd4&src=http://img3.duitang.com/uploads/item/201504/06/20150406H1639_ihtT2.thumb.700_0.jpeg"></Avatar>
                                <DropdownMenu slot="list" style="text-align: center">
                                    <DropdownItem>{{ name }}</DropdownItem>
                                    <DropdownItem><Button @click="logout">退出登录</Button></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </Header>
        <Layout>
            <Sider class="sider" width="240" collapsible v-model="isCollapsed" :class="{'sider-hide': isCollapsed}">
                <Menu class="sider-menu" theme="dark" :active-name="activeName" @on-select="handleSelectPath">
                    <MenuItem name="/newblood">
                        <Icon type="ios-contact"></Icon>
                        <span>纳新管理</span>
                    </MenuItem>
                    <MenuItem name="/answersystem">
                        <Icon type="ios-apps"></Icon>
                        <span>试卷设置</span>
                    </MenuItem>
                    <MenuItem name="/testsystem">
                        <Icon type="ios-bookmark"></Icon>
                        <span>答题管理</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Content class="content" :class="{'content-expand': isCollapsed}">
                <slot></slot>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import {getCookie, delCookie} from "../assets/cookie"
    export default {
        name: "dev-article.vue",
        data () {
            return {
                activeName: this.$route.path,
                openTheme: false,
                isCollapsed: false,
                name: ''
            }
        },
        created () {
            this.activeName = this.$route.path;
        },
        methods: {
            handleSelectPath (name) {
                this.$router.push(name);
            },
            logout () {
                this.http({
                    method: 'get',
                    url: 'api/nxdt-0.0.1-SNAPSHOT/admin/logout'
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                /*删除cookie*/
                delCookie('username')
                if (!getCookie('username')) {
                    this.$router.push('/login')
                }
                /* 删除token */
                window.localStorage.clear()
            }
        },
        mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.name = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname === ""){
                this.$router.push('/login')
            }
        },
    }
</script>

<style scoped>
    .header {
        height: 75px;
        width: 100%;
        background: #fff;
        position: fixed;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        z-index: 2;
    }
    .sider {
        position: fixed;
        height: 100%;
        left: 0;
        overflow: hidden;
        z-index: 1;
    }
    .sider-menu {
        margin-top: 75px;
    }
    .sider-hide .ivu-menu-item span {
        display: none;
    }
    .content {
        margin-left: 240px;
        padding: 16px;
        transition: all .2s ease-in-out;
    }
    .content-expand {
        margin-left: 64px;
    }
</style>