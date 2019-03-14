// pages/list/list.js
//先引入写好的请求配置文件
var url = require('../../utils/config.js');
var jumpFlag = true;//该变量防止多次点击跳转使页面错误

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[//根据接口保存的图片地址(url)以及调用数据需要的信息(topid存为num)，还有标题(title)
      {
        url:"https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_4_300_213922043.jpg?max_age=2592000",
        num:4,
        title:"巅峰榜·流行指数",
        content: [],//用来保存返回值，(返回的曲目是存在数组中的)
        code: [],//用来保存编码后的数据
      },
      {
        url:"https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_27_300_213922043.jpg?max_age=2592000",
        num:27,
        title:"巅峰榜·新歌",
        content: [],
        code: [],
      },
      {
        url:"https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_5_300_213942399.jpg?max_age=2592000",
        num:5,
        title:"巅峰榜·内地",
        content: [],
        code: [],
      },
      {
        url:"https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_6_300_213922043.jpg?max_age=2592000",
        num:6,
        title:"巅峰榜·港台",
        content: [],
        code: [],
      },
      {
        url:"https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_3_300_213907427.jpg?max_age=2592000",
        num:3,
        title:"巅峰榜·欧美",
        content: [],
      },
      {
        url:"https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_16_300_213797427.jpg?max_age=2592000",
        num:16,
        title:"巅峰榜·韩国",
        content: [],
        code: [],
      },
      {
        url:"https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_17_300_213923516.jpg?max_age=2592000",
        num:17,
        title:"巅峰榜·日本",
        content: [],
        code:[],
      }
    ],

    flag:false,//控制显示隐藏的变量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载页面时，我们请求一下榜单数据
    wx.showLoading({
      title: '正在加载',
    })
    
    var flag = this.data.flag;
    var len = this.data.img.length;
    var self = this;

    for (let i=0;i<len;i++){
      wx.request({
        url: url.hot,//请求榜单数据
        data: {
          topid: this.data.img[i].num,
        },
        success: function (e) {
          console.log(e);//查看输出信息
          var songList = e.data.showapi_res_body.pagebean.songlist;//获取歌曲列表
          var key = "img["+i+"].content";
          var code = "img["+i+"].code";

          if(self.data.img[i].num == 17){//获取到最后一条请求后 使记载图标消失
            wx.hideLoading();
            flag = true;
          }

          self.setData({
            [key]:songList,
            flag:flag
          });

          let data = songList;//存储数据用for循环进行编码
          for (let i = 0; i < data.length; i++) {//对里面每一项带特殊符号信息的都进行编码
            data[i].albumpic_big = encodeURIComponent(data[i].albumpic_big);
            data[i].albumpic_small = encodeURIComponent(data[i].albumpic_small);
            data[i].downUrl = encodeURIComponent(data[i].downUrl);
            data[i].url = encodeURIComponent(data[i].url);
            data[i].songname = encodeURIComponent(data[i].songname);
            data[i].singername = encodeURIComponent(data[i].singername);
          }

          self.setData({
            [code]:data
          });
        }
      })
    }
  },


  /**
   * 页面跳转
  */
  jump:function(e){
    // console.log(e);//查看输出内容
    if(jumpFlag==true){
      jumpFlag = false;
      var id = e.currentTarget.id;//获取id确定点击的是哪一项
      var data = this.data.img[id].code;//把编码好的内容(code)赋值给data

      var temp = JSON.stringify(data);//根据id确定点击的项的信息被作为传递的参数(已被编码的)
      wx.navigateTo({
        url: '../ranking/ranking?content='+temp//跳转同时传递参数
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //再次回到页面jumpFlag变为true
    jumpFlag = true;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})