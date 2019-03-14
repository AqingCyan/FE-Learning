//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name:'',
    chinesefen:'',
    mathfen:'',
    avg:'',
    flag:false
  },
  input1:function(e){
    var input = e.detail.value;
    this.setData({
      name:input
    })
  },
  input2: function (e) {
    var input = e.detail.value;
    if(!isNaN(input)){//判断输入是否为数字
      this.setData({
        chinesefen: input
      })
    }
  },
  input3: function (e) {
    var input = e.detail.value;
    if(!isNaN(input)){
      this.setData({
        mathfen: input
      })
    }
  },
  make:function(){
    if(this.data.name==""||this.data.chinese==""||this.data.math==""){
      return;
    }
    var result = (this.data.chinesefen*1+this.data.mathfen*1)/2;//乘以1转字符串为数字
    this.setData({
      avg:result,
      flag:true
    })
  }
})
