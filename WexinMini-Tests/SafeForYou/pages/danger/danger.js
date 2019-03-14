// pages/danger/danger.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    msg:"请再一次确认您要发送求救"
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
   * 点击事件
  */
  allRight:function (){
    var self = this;
    this.setData({
      flag:false
    });
    setInterval(function(){
      self.setData({
        flag:true
      })
    },8000);
  },
  /**
   * 确定与取消
  */
  sorry:function(){
    this.setData({
      flag:true
    })
  },

  must:function(){
    var self = this;
    // wx.request({
    //   url: '',
    // })
    //在success中写
    self.setData({
      msg:"我们已经成功发送您的呼救，请放心！"
    })
  }
})