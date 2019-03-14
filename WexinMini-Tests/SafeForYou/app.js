//app.js
var address;
var open_id;
App({
  
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
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
            open_id = res.data.openid;
          }
        })
      }
    })


    setInterval(function(){
      wx.getLocation({
        success: function(res) {
          res.latitude + "and" + res.longitude;
          wx.request({
            url: 'http://route.showapi.com/238-2?showapi_appid=65406&showapi_sign=5331d566a8034fb58f761b464afc04af&from=5&lng='+res.longitude+'&lat='+res.latitude,
            success:function(e){
              address = e.data.showapi_res_body.sematic_description;
              console.log(open_id);
              wx.request({
                url: 'https://xcx.changxiaoyuan.com/safe/user/updatePlace',
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data:{
                  open_id:open_id,
                  now_place:address
                },
                success:function(e){
                  console.log(e);
                }
              })
            }
          })
        },
      })
    },30000);
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    userInfo: null,
  }
})
