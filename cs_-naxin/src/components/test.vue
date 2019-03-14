<template>
<div class="test">
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
    <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="dynamicValidateForm.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>

    <el-button type="primary" @click="test()">发送</el-button>
  </el-form>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "test",
      data() {
        return {
          dynamicValidateForm: {
            email: '',
            pass:''
          }
        };
      },
      methods:{
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              this.http({
                method:"post",
                url:"http://api.creatshare.com/homesick/user/login",
                data:{
                  email:this.dynamicValidateForm.email,
                  password:this.dynamicValidateForm.pass
                }
              }).then(res=>{
                console.log(res);
                const token= res.headers.authorization;
                console.log(token)
                //存储token到ls
                window.localStorage.setItem('token',token)
                // console.log(res.headers.get('Expires'))
              }).catch(function(err){
                console.log(err);
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        test(){
          this.http({
            method:'post',
            url:'http://api.creatshare.com/homesick/user/register'
          }).then(res=>{
            console.log(res)
          })
        }
      }
    }
</script>




<style scoped>

</style>
