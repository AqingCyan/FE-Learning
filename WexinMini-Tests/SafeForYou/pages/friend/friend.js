// pages/friend/friend.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all:{
      userName: '', userPhone: '',
      name1: '', phone1: '',
      name2: '', phone2: '',
      name3: '', phone3: '',
      openId:''
    },
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var t = "all.openId";
    this.setData({
      [t]:options.openid
    });
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
  
  },
  /**
   * 保存用户信息
  */
  save:function(){
    var self = this;
    var info = this.data.all;
    if(!(info.userName && info.userPhone && info.name1 && info.phone1)){
      this.setData({
        flag: false
      });
      setInterval(function(){
        self.setData({
          flag: true
        })
      },3000);
    } else {
      var allString = JSON.stringify(this.data.all);//转为json格式
      console.log(allString);
      wx.request({
        url: 'https://xcx.changxiaoyuan.com/safe/user/init',
        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        data:allString,
        success:function(e){
          console.log(e);
        }
      })
    }
  },
  /**
   * 获取信息
  */
  getUserName:function(e){
    var t = "all.userName";
    this.setData({
      [t]:e.detail.value
    });
  },
  getUserPhone:function(e){
    var t = "all.userPhone";
    this.setData({
      [t]: e.detail.value
    })
  },
  getName1:function(e){
    var t = "all.name1";
    this.setData({
      [t]: e.detail.value
    })
  },
  getName2: function (e) {
    var t = "all.name2";
    this.setData({
      [t]: e.detail.value
    })
  },
  getName3: function (e) {
    var t = "all.name3";
    this.setData({
      [t]: e.detail.value
    })
  },
  getPhone1:function (e) {
    var t = "all.phone1";
    this.setData({
      [t]: e.detail.value
    })
  },
  getPhone2: function (e) {
    var t = "all.phone2";
    this.setData({
      [t]: e.detail.value
    })
  },
  getPhone3: function (e) {
    var t = "all.phone3";
    this.setData({
      [t]: e.detail.value
    });
  },
})