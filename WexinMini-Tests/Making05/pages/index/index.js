//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg:[//获取推荐轮播图的图片地址
      "https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/278633.jpg?max_age=2592000",
      "https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/278238.jpg?max_age=2592000",
      "https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/278634.jpg?max_age=2592000",
      "https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/278397.jpg?max_age=2592000",
      "https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/278597.jpg?max_age=2592000"
    ],

    interval:3000,
    duration:500,
    activeColor:"#fff"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://route.showapi.com/109-35?showapi_appid=65406&showapi_sign=5331d566a8034fb58f761b464afc04af&&needAllList=1',
      success:function(e){
        console.log(e);
      }
    })
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
    
  }
})