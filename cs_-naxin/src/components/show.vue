<template>
  <div class="show">
    <h2>个人主页</h2>
    <!--{{ruleForm.name}} -&#45;&#45; {{ruleForm.interest}}-->
    <div class="wrapper">
      <div class="info">
        <span class="name">{{ruleForm.name}}</span>
        <span class="mod" @click="modify()">修改</span>
        <p>{{phone}}</p>
        <span class="interest">{{ruleForm.directed}}</span>
        <img src="../assets/creat.png">
      </div>
    </div>
    <div class="penwrapper">
      <h3>笔试</h3>
      <div class="pen">
        <div class="bg">
          <p>{{testStatus}}</p>
          <p>笔试系统在：{{testTime}}开启</p>
        </div>
      </div>
    </div>
    <div class="mianshi">
      <h3>面试</h3>
      <div class="mianWrapper">
        <div style="height: 130px;">
          <el-steps direction="vertical" :active="1">
            <el-step title="一轮面试" :description=result1></el-step>
            <el-step title="二轮面试" :description="result2"></el-step>
          </el-steps>
          <el-button style="width: 100%; margin-top: 10px;" type="small" @click="logout">退出登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "show",
    data() {
      return {
        phone: '',
        ruleForm: "",
        result1: '未开始',
        result2: '未开始',
        testStatus: '笔试未开始',
        testTime: ''
      }
    },
    methods: {
      fechId() {
        let id = window.localStorage.getItem('phone')
        // console.log(id);
        var one = id.toString().substring(0, 3)
        var two = id.toString().substring(3, 7)
        var three = id.toString().substring(7, 11)
        this.phone = one + '-' + two + '-' + three
        // this.$route.params.id = phone
        // console.log(this.phone)
        //向后端发送手机号  得到一些信息
        let postData = this.$qs.stringify({
          phone: id
        });
        this.http({
          method: 'post',
          url: 'http://47.104.189.19:8080/nx/FindServlet',
          data: postData
        })
          .then(res => {
            // console.log(res);
            this.ruleForm = res.data;
            switch (this.ruleForm.status) {
              case 1:
                this.testStatus = '等待笔试，请在指定时间完成笔试';
                this.result1 = '未开始';
                this.result2 = '未开始';
                break;
              case 2:
                this.testStatus = '笔试结束，请耐心等待结果';
                this.result1 = '未开始';
                this.result2 = '未开始';
                break;
              case 3:
                this.testStatus = '笔试通过，请按时参加实验室第一次面试';
                this.result1 = '一面开始';
                this.result2 = '未开始';
                break;
              case 4:
                this.testStatus = '笔试通过，请按时参加实验室最终面试';
                this.result1 = '一面通过，准备开始终面';
                this.result2 = '终面开始';
                break;
              case 5:
                this.testStatus = '笔试通过';
                this.result1 = '一面通过';
                this.result2 = '终面通过，恭喜';
                break;
            }
          })
          .catch(function (err) {
            if (err) {
              this.$router.replace('/login')
            }
          })
      },
      // 获取答题时间
      getTime() {
        this.http({
          // 请求笔试开始时间 this.testTime
          method: 'get',
          url: `http://47.104.189.19:8080/nxdt-0.0.1-SNAPSHOT/cache/getOpenDate`
        }).then(res => {
          // console.log(res.data)
          let time = res.data.toString().substring(4, 12)
          let month = time.substring(0, 2)
          let day = time.substring(2, 4)
          let hour = time.substring(4, 6)
          let minute = time.substring(6, 9)
          this.testTime = `${month}月${day}日${hour}点${minute}分`
          // console.log(time)
        }).catch(err => {
          console.log(err)
        })
      },
      modify() {
        this.$router.replace('/modify')
      },
      logout() {
        localStorage.removeItem('phone');
        localStorage.removeItem('token');
        this.$router.replace('/login');
      }
    },
    created() {
      // console.log(this.$route.params.id);
      this.fechId()
      this.getTime()
    }
  }
</script>

<style scoped>

  h2 {
    height: 25px;
    font-family: PingFang SC;
    font-size: 18px;
    padding-top: 15px;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: center;
  }

  .wrapper {
    padding: 13px;
    /*border: 1px solid #e2e2e2;*/
    margin-bottom: 40px;
  }

  .info {
    border: 1px solid #e2e2e2;
    height: 128px;
    background-color: #fff;
    box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .info .name {
    float: left;
    padding-left: 17px;
    padding-top: 13px;
    font-size: 24px;
    height: 33px;
    line-height: 33px;
    color: #2c2d2e;
    font-family: PingFang SC;
  }

  .info .mod {
    float: right;
    padding-right: 17px;
    padding-top: 23px;
    font-family: PingFang SC;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    color: #6f7774;
    opacity: 0.78;
  }

  .info p {
    clear: both;
    padding-top: 20px;
    padding-left: 17px;
    height: 25px;
    font-size: 18px;
    line-height: 25px;
    color: #333333;
  }

  .info .interest {
    display: inline-block;
    padding-left: 17px;
    margin-top: 10px;
    color: #333333;
  }

  .info img {
    float: right;
    padding-top: 28px;
  }

  .penwrapper {
    padding: 13px;
  }

  .penwrapper h3 {
    margin-top: -10px;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
  }

  .pen {
    height: 128px;
    margin-bottom: 40px;
    /*padding: 17px;*/
    border: 1px solid #fff;
    background: #ffff !important;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }

  .bg {
    background: #fff;
    height: 100%;
    width: 100%;
    padding: 17px;
  }

  .pen p {
    font-size: 16px;
    line-height: 22px;
    color: #3a8ee6;
  }

  .mianshi {
    padding: 10px;
    margin-top: -15px;
    height: 191px;
    /*border: 1px solid #e2e2e2;*/
  }

  .mianshi h3 {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .mianWrapper {
    height: 191px;
    background-color: #ffffff;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.16);
    padding: 13px;
    border-radius: 4px;
  }

  .mianshi >>> .el-step__head.is-finish {
    color: #b7b7b7;
    border-color: #b7b7b7b7;
  }

  .mianshi >>> .el-step__head.is-process {
    color: #b7b7b7;
    border-color: #b7b7b7b7;
  }

  .mianshi >>> .el-step__title.is-finish {
    color: #777777;
    font-size: 16px;
    line-height: 22px;
  }

  .mianshi >>> .el-step__description.is-finish {
    font-family: PingFang SC;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #9c9c9c;
    padding-top: 10px;
  }

  .mianshi >>> .el-step__title.is-process {
    color: #777777;
    font-size: 16px;
    line-height: 22px;
  }

  .mianshi >>> .el-step__description.is-process {
    font-family: PingFang SC;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #9c9c9c;
    padding-top: 10px;
  }

</style>
