//index.js
//获取应用实例
const app = getApp();
var source = require('../../base/data/source.js');//当然 这里引入的时候，我们需要对数据进行处理，把它接口暴露出来

Page({
  data: {
   flag:false,
  //  保存省份名字和编号采用数组，同时用字符串保存一下选中时的序号
   provinceName:[],
   provinceCode:[],
   provinceIndex:'',
  // 市区
  cityName:[],
  cityCode:[],
  cityIndex:'',
  // 区域
  countryName:[],
  countryCode:[],
  countryIndex:'',

  show:true,

  //存储选中的地区的下标（detail的value中）
  pro:0,
  cit:0,
  cou:0,
  },

  //利用生命周期函数加载一下数据
  onLoad:function(){
    this.setSource();
  },


  // 地区数据加载方法
  //为了动态的接收数据，所以我们传入三个参数
  setSource:function(pro,cit,cou) {
    var pro = pro || 0;
    var cit = cit || 0;
    var cou = cou || 0;
    var province = source['100000'];
    // console.log(province); //省份都存在编号为100000的对象里

    var provinceName = [];
    var provinceCode = [];

    //尝试获取省份的信息
    for (var item in province) {
      // console.log(item); //item是所以省份的编号

      provinceCode.push(item);
      provinceName.push(province[item]);
    }
    // console.log(provinceName); //成功输出了所有省份
    this.setData({
      provinceName:provinceName,
      provinceCode:provinceCode
    });

    //尝试获得市的信息
    var city = source[provinceCode[pro]];//试试能不能拿到第一个市区的信息
    // console.log(city); //{110100: "北京市市辖区"}

    var cityName = [];
    var cityCode = [];
    for(var item in city){
      cityCode.push(item);
      cityName.push(city[item]);
    }
    this.setData({
      cityName:cityName,
      cityCode:cityCode
    });

    //尝试获得区的信息
    var country = source[cityCode[cit]];
    // console.log(country);//尝试输入城区信息

    var countryName = [];
    var countryCode = [];

    for(var item in country) {
      countryCode.push(item);
      countryName.push(country[item]);
      // console.log(countryName);
    }
    this.setData({
      countryName:countryName,
      countryCode:countryCode
    })
    //至此 所有的省份 市  区的名字和编号我们都已经存入了data中
  },

  //隐藏弹出框
  showPicker:function(){
    this.setData({
      show:false,
    })
  },
  cancel: function () {
    this.setData({
      show: true,
    })
  },

  //获得选中信息的序号
  pickerChange:function(e){
    // console.log(e);//输出了详细的信息，我们可以在detail中的value通过下标来查看获取的内容
    var pro = e.detail.value[0];
    var cit = e.detail.value[1];
    var cou = e.detail.value[2];
    this.setSource(pro,cit,cou);
    this.setData({//把下标存储到data数据中
      pro:pro,
      cit:cit,
      cou:cou
    })
  },

  //确定信息方法
  sure:function(){
    this.setData({
      provinceIndex:this.data.pro,
      cityIndex:this.data.cit,
      countryIndex:this.data.cou,
      flag:true
    });
    //确定后关掉弹窗
    this.cancel();
  }
})
