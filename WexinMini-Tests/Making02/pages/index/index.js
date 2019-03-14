//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id1:"clear",id2:"back",id3:"history",id4:"div",id5:"num_7",id6:"num_8",id7:"num_9",id8:"mul",id9:"num_4",                id10:"num_5",id11:"num_6",id12:"sub",id13:"num_1",id14:"num_2",id15:"num_3",id16:"add",id17:"num_0",id18:"dot",
    id19:"equals",result:"0",
    dotSign:false,

  },

  clickButton:function(e){
    console.log(e);//查看e输出的内容来获取我们需要的值
    var btnValue = e.target.id;
    var res = this.data.result;
    var newDotSign = this.data.dotSign;//存储小数点状态
    if(btnValue>="num_0"&&btnValue<="num_9"){
      // console.log(btnValue.split("_"));//查看获取的内容是否正确
      var num = btnValue.split("_")[1];//获取了数字按键的值
      if(res=="0"){
        res = num;
      }else {
        res = res+num;//利用字符串拼接
      }
    } else {
      if (btnValue == "dot") {//小数点按键操作
        if (!newDotSign) {//前面存了小数点的状态，这里判断如果不存在就添加小数点
          res = res + ".";
          newDotSign = true;
        }
      }else if(btnValue=="clear"){
        res = "0";
        newDotSign = false;//清除之后，小数点的状态也得变为未点击过才行
      }else if(btnValue=="back"){
        var length = res.length;
        if(length>1){//判断一下长度，确定有输入值
          res = res.substr(0,length-1);
        }else {
          res = "0";
        }
      }else if(btnValue == "add"||btnValue=="sub"||btnValue=="mul"||btnValue=="div"){
        newDotSign = false;
        var sign;
        switch(btnValue){
          case "add":
            sign = "+";
            break;
          case "sub":
            sign = "-";
            break;
          case "mul":
            sign = "*";
            break;
          case "div":
            sign = "/";
            break;
        }
        if(!isNaN(res.charAt(res.length-1))){//判断一下 是不是符号 是的话不进行字符串拼接
          res = res + sign;
        }
      }
    }
    this.setData({
      result: res,
      dotSign:newDotSign
    })
  },
  equals:function(){
   console.log(typeof this.data.result);
  }  
})
