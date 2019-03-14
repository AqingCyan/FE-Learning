<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login'
import Hello from "./components/HelloWorld"
import Edit from './components/Edit'
import jwt from 'jwt-decode';
export default {
  name: 'App',
  components: {

    "app-login":Login,
    "app-he":Hello,
    "app-edit":Edit
  },
  created(){
    // if(localStorage.token){
    //   const decoded = jwt(localStorage.token);
    //
    //   // // 获取当前时间
    //   // const currentTime = Date.now()/1000;
    //   // //检测token 是否过期
    //   //过期了
    //   // if(decoded.exp < currentTime)
    //   // {
    //   //   this.$store.dispatch("setIsAuthenticated",false)
    //  // this.$router.push('/login')
    //   // }
    //   //没过期
    //   //else{下边那句}
    //
    //   console.log(decoded)
    //   this.$store.dispatch("setIsAuthenticated",!this.IsEmpty(decoded))
    // }
    this.tulin()
  },
  methods:{
    IsEmpty(value){
      return(
        value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0 ) || (typeof value === 'string' && value.trim().length === 0)
      )
    },
    // 彩蛋
    tulin () {
      console.log("%c\n     ","font-size:220px;background:url('https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D480/sign=60ed9db5573d26972ed3095565fbb24f/14ce36d3d539b600faf2afc8ef50352ac65cb795.jpg') no-repeat 0 0")
      console.log('当你发现这个彩蛋的时候，请带着你的截图发送邮件到xuekaiqi@creatshare.com。我有特殊的奖励给予热爱瞎捯饬的人')
    }
  }
}
</script>

<style>

</style>
