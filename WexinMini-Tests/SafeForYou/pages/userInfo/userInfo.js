// pages/userInfo/userInfo.js
//获取应用实例
const app = getApp();
var openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImage:"https://pic4.zhimg.com/80/v2-4a92435cd4f789d031fa383a2121a6ed_hd.jpg",
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
          data: {
            appid: "wxdec09f48fc239f39",
            secret: "4e89c70bcedf97f145a1b77b7cc92010",
            js_code: code,
            grant_type: "authorization_code"
          },
          success: function (res) {
            openid = res.data.openid;
            //发送请求,登陆并且检验数据库是否绑定紧急联系人
            wx.request({
              url: 'https://xcx.changxiaoyuan.com/safe/user/first',
              method:"POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data:{
                open_id:openid
              },
              success:function(e){
                console.log(e);
                if(e.data.msg == "该用户为第一次登陆"){
                  self.setData({
                    show:true
                  })
                } else {
                  self.setData({
                    show:false
                  })
                }
              }
            })
          }
        })
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
  
  },
  /**
   * 添加联系人
  */
  addFriend:function(){
    wx.navigateTo({
      url: "../friend/friend?openid="+openid,
    })
  }
})