<template>

    <div class="login1">
      <!--<Alert v-if="alert" :message="alert"></Alert>-->
      <el-alert
        v-show="alert"
        :title="alert"
        type="error"
        @close="failmessage()"
        show-icon>
      </el-alert>
      <div class="login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="regform">
        <div class="text1">
          <p>欢迎登录</p>
          <p>CreatShare纳新系统</p>
        </div>
        <el-form-item prop="phone">
          <label>手机号</label>
          <el-input v-model.number="loginForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item class="valid">
          <label style="display: block;" >图形码</label>
          <el-input placeholder="请输入图形验证码" v-model="loginForm.valid" style="width: 190px;"></el-input>
          <img :src="src" @click="AccesImg">
          <!--<p >看不清</p>-->
        </el-form-item>
        <el-form-item prop="vavid">
          <label>验证码</label>
          <el-input placeholder="请输入短信验证码" v-model="loginForm.code" class="a"></el-input>
          <span  v-show="sendAuthCode" class="auth_text" @click="getAuthCode('loginForm')">获取验证码</span>
          <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue"> {{auth_time}}</span> s后重新发送</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="check('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
</template>

<script>
import Alert from './Alert'
import jwt from 'jwt-decode';
  export default {
    data(){
      let telCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('手机号码不能为空'))
        } else if (!Number.isInteger(value)) {
          return callback(new Error('请输入有效的手机号码'))
        } else if (value.toString().length !== 11) {
          return callback(new Error('请输入有效的手机号码'))
        } else {
          callback()
        }
      };
      return{
        loginForm:{
          phone:"",
          //图形验证码
          valid:"",
          //手机验证码
          code:""
        },
        mes:"fgjidfjgidjfg",
        src:'',
        alert:'',
        ms1:'请输入正确的图片验证码',
        ms2:'请输入正确的短信验证码',
        ms3:'30秒内操作频繁，请稍后',
        ms4:'一小时内操作频繁，请稍后',
        ms5:'24小时内操作频繁，请稍后',
        sendAuthCode:true, /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
        auth_time:0 ,  /*倒计时*/
        rules:{
          phone: [
            {
              required: true,
              validator: telCheck,
              trigger: 'blur'
             }
           ]
        }
      }
    },
    methods:{
      failmessage(){
        if(this.alert === this.ms1 || this.alert === this.ms3 || this.alert === this.ms4 || this.alert === this.ms5){
          this.loginForm.valid = ''
        }
        if(this.alert === '请输入正确的短信验证码'){
          this.loginForm.code = ''
        }
        // console.log(title)

        this.alert = ''
      },
      //向后台发送手机号码 和 图形验证码，并设置倒计时
      getAuthCode:function (formname) {
          this.$refs[formname].validate((valid)=>{
            if(valid){
              //向后台接口发送手机号码和图片验证码
              console.log(this.loginForm.phone)
              // console.log(this.loginForm.valid)
              let postData = this.$qs.stringify({
                phone: this.loginForm.phone,
                valid: this.loginForm.valid
              });
              this.http({
                method: "post",
                url: 'http://47.104.189.19:8080/nx/VerifyServlet',
                data:postData,
              }).then(res=>{
                console.log(res.data.msg)
                if(res.data.msg.code === 0){
                  this.sendAuthCode = false;
                  //设置倒计时秒
                  this.auth_time = 60;
                  var auth_timetimer = setInterval(()=>{
                    this.auth_time--;
                    if(this.auth_time<=0){
                      this.sendAuthCode = true;
                      clearInterval(auth_timetimer);
                    }
                  }, 1000);
                } else if (res.data.msg.code === 22) {
                  this.alert = this.ms4
                } else if (res.data.msg.code === 43) {
                  this.alert = this.ms5
                } else if (res.data.msg.code === 33) {
                  this.alert = this.ms3
                } else if (res.data.msg.code === 17) {
                  this.alert = this.ms5
                } else {
                  this.alert = this.ms1
                }
                })
            }
            else{
              console.log("err1");
              return false;
            }
          })

      },
      //向后台发送手机号码和短信验证码 判断是否登陆成功
      check:function(formname){
        this.$refs[formname].validate((valid)=>{
          if(valid && this.loginForm.code!=" "){
            let testdata = this.$qs.stringify({
              phone: this.loginForm.phone,
              code: this.loginForm.code
            });
            this.http({
              method:"post",
              url:"http://47.104.189.19:8080/nx/LoginServlet",
              data:testdata
            }).then(res=> {

              console.log(res.data.msg)
              if(res.data.msg === 0){
                this.alert = this.ms2
                return
              }
              //登陆成功之后要做的事情
                console.log(res);

                //存储token到ls
                const {token} = res.data;
                window.localStorage.setItem('token',token);
                window.localStorage.setItem('phone',this.loginForm.phone)
                // 解析token
                const decoded = jwt(token);
                // console.log(decoded);

                //分发action
              this.$store.dispatch("setIsAuthenticated",!this.IsEmpty(decoded))
                //首次登陆
                if(res.data.msg == 1){
                    console.log("首次登录") // 跳转至填写信息界面
                  this.$router.replace(`/edit`)

                }
                //并非首次登陆
                if(res.data.msg == 2){
                  console.log("并非首次登录")
                //  跳转至个人信息页面
                  this.$router.replace('/show')
                  // this.$router.push({path: `/show`})
               }
            }).catch(function(err){
               console.log(err);
              // this.alert = this.ms2
            })
          }
          // else{
          //   console.log("err")
          //   this.al rt = "请输入有效的验证码 "
          //   // this.$router.push({path:'/',query:{alert:"登录失败"}})
          //   return false
          // }
         })
      },


      AccesImg(){
        //获取图片验证码
        this.http({
          method:'get',
          url:'http://47.104.189.19:8080/nx/VerifyCodeServlet',
          responseType: 'arraybuffer'
        }).then(res=>{
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )
        }).then(data=>{
          this.src=data
        })
      },
      IsEmpty(value){
        return(
          value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0 ) || (typeof value === 'string' && value.trim().length === 0)
        )
      },
    },
    //刚一进来 就向后端发送请求获取图形验证码
    created(){

    },
    // 一波小优化，在created的时候加载验证码，会导致其他内容必须等验证码加载完才开始加载，改为mounted等挂在结束后加载
    mounted(){
      this.AccesImg()
    },
    components:{
      Alert
    }
  }
</script>

<style scoped>
  .valid img{
    width: 25%;
    height: 90%;
  }
  .login{
    display: flex;
    height: 100%;
  }
.regform{
  flex: 1;
  margin: 61px 9% 0px 9%;
  width: 100%;
  position: relative;
}
.text{
  height: 90px;
  margin-bottom: 45px;
}
.regform p{
    font-family: PingFang SC;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    color: #ffffff;
}
.regform label{
    width: 42px;
    height: 20px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;

}
.auth_text{
  position: absolute;
  right: 5%;
  margin-top: -40px;
  line-height:40px ;
  color: #676c70;

}
.btn{
 align-items: center;
  border-color: #4adea3;
  background-color: #4adea3;
  width: 130px;
  margin: 40px 25% 0 25%;
  height: 40px;
  border-radius: 25px;
  text-align: center;
}
 /*错误的边框颜色*/
 .el-form-item.is-error >>> .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input >>> input.invalid:focus{
   border-color: red !important;
  }
  /*错误的提示颜色*/
  .el-form-item.is-error >>> .el-form-item__error{
    color: red !important;
   }
  /*正确的边框颜色*/
  .el-form-item.is-success >>> .el-input__inner{
  border-color: #dcdfe6 !important;
  }



.el-message-box{
    width: 100px;
    background-color: red;
  }

  /*.regform {*/
    /*margin: 20px auto;*/
    /*width: 310px;*/
    /*background: #fff;*/
    /*box-shadow: 0 0 10px #B4BCCC;*/
    /*padding: 30px 30px 0 30px;*/
    /*border-radius: 25px;*/
  /*}*/
  /*.auth_text{*/

  /*}*/
  /*.auth_input{*/
    /*width:140px;*/
    /*height:38px;*/
    /*margin-bottom:20px;*/
    /*border:1px solid #DCDFE6;*/
    /*!* color:red; *!*/
    /*padding-left:10px;*/
    /*border-radius: 8%;*/
  /*}*/
  /*.regform[data-v-92def6b0]{*/
    /*width:370px;*/
    /*min-height: 440px;*/
  /*}*/
  /*.login-text{*/
    /*text-align: center;*/
    /*margin-bottom:20px;*/
  /*}*/
</style>
