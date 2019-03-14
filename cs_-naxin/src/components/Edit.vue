<template>
  <div class="edit">
    <el-alert
      v-show="alert"
      :title="alert"
      type="error"
      @close="failmessage()"
      show-icon>
    </el-alert>
    <p>填写信息</p>
    <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
             class="demo-ruleForm" status-icon>
      <el-form-item label="姓名" prop="name" placeholder="请输入姓名">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学号" prop="number" placeholder="请输入8位学号">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
      <el-form-item label="专业班级" prop="grade">
        <el-input v-model="ruleForm.grade" placeholder="例：软件1803"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model.number="ruleForm.qq"></el-input>
      </el-form-item>
      <el-form-item label="所选方向" prop="directed">
        <el-select v-model="ruleForm.directed" placeholder="请选择方向">
          <el-option label="产品" value="产品"></el-option>
          <el-option label="运营" value="运营"></el-option>
          <el-option label="视觉" value="视觉设计"></el-option>
          <el-option label="前端" value="前端"></el-option>
          <el-option label="后端" value="后端"></el-option>
          <el-option label="基础" value="基础"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btn-wrapper">
        <el-button class="btn" type="primary" @click="submitForm('ruleForm')" style="margin-left: -100px">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: "Edit",
    data() {
      let checknumber = (rule, value, callback) => {
        if (value.length != 8) {
          return callback(new Error('请输入有效的8位学号'))
        } else {
          callback()
        }
      };
      return {
        ruleForm: {
          name: '',
          sex: '',
          number: '',
          grade: '',
          qq: '',
          directed: ''
        },
        alert: '',
        labelPosition: 'left',
        addre: "",
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          number: [
            {required: true, message: '请输入学号', validator: checknumber, trigger: 'blur'},
          ],
          grade: [
            {required: true, message: '请输入专业班级', trigger: 'blur'}
          ],
          qq: [
            {required: true, message: '请输入QQ号码', trigger: 'blur'},
            {type: 'number', message: '请输入有效的QQ号码', trigger: 'blur'}
          ],
          directed: [
            {required: true, message: '请选择自己的方向', trigger: 'change'}
          ]
        }
      }
    },

    methods: {
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          // console.log(this.ruleForm.sex);
          if (valid) {
            //提交并发送
            let postData = this.$qs.stringify({
              name: this.ruleForm.name,
              sex: this.ruleForm.sex,
              number: this.ruleForm.number,
              grade: this.ruleForm.grade,
              qq: this.ruleForm.qq,
              directed: this.ruleForm.directed,
              phone: window.localStorage.getItem('phone'),
              status: 1
            });
            this.http({
              method: 'post',
              url: 'http://47.104.189.19:8080/nx/RegistServlet',
              data: postData
            })
              .then(res => {
                console.log(res)
                //获取请求头参数
                // console.log(res.headers['Date']);
                if (res.data.msg) {
                  if (res.data.phone != '' && res.data.phone != 'undefined') {
                    this.$router.push(`/show`)
                  } else {
                    this.alert = '操作失误'
                  }
                }
                // if(res.data == true){
                //   this.$router.push({path: `/edit/${res.data.name}`})
                // }
                // if (res.status == 200) {
                //   // this.addre = '/edit/'+ this.ruleForm.id
                //   // this.$router.push({path: `/edit/${res.data.name}`})
                //
                //   console.log(res);
                // } else {
                //   console.log("失败了")
                // }
              })
              .catch(function (err) {
                console.log(err)
              })
          }
        })
      },

    }
  }

</script>

<style scoped>
  .edit p {
    padding-top: 45px;
    font-family: PingFang SC;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    color: #ffffff;
    text-align: center;
  }

  .edit >>> .el-form-item__label {
    color: #fff !important;
  }

  .btn {
    align-items: center;
    border-color: #4adea3;
    background-color: #4adea3;
    width: 130px;
    height: 40px;
    border-radius: 25px;

    text-align: center;
  }

  .btn-wrapper {
    text-align: center;
  }

  .el-form {
    padding: 20px;
  }

  /*错误的边框颜色*/
  .el-form-item.is-error >>> .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input >>> input.invalid:focus {
    border-color: red !important;
  }

  /*错误的提示颜色*/
  .el-form-item.is-error >>> .el-form-item__error {
    color: red !important;
  }

  /*正确的边框颜色*/
  .el-form-item.is-success >>> .el-input__inner {
    border-color: #dcdfe6 !important;
  }

  /*.el-form-item.is-success >>> .el-input__inner{*/
  /*border-color: blueviolet !important;*/
  /*}*/
</style>
