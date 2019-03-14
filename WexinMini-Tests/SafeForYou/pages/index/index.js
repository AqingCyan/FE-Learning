//index.js
//获取应用实例
const app = getApp();
var duangFlag = false;
var allOver = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    hour: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    minute: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    lateHour: "00",
    lateMinute: "00",
    picker_flag: false,
    btn_flag: true,
    btn_flagWhit:true,
    btn_flagSafe:true
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
    wx.reLaunch({
      url: "index",
      success:function(){
        console.log("重新加载")
        //这里给后台发送消息表示这次计时结束
      }
    })
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

  // 自定义方法
  /**
   * 选择时间
  */
  bindChange: function (e) {
    var index1 = e.detail.value[0];
    var index2 = e.detail.value[1];
    if (index1 < 10) {
      this.setData({
        lateHour: "0" + index1
      })
    } else {
      this.setData({
        lateHour: index1
      })
    }
    if (index2 < 10) {
      this.setData({
        lateMinute: "0" + index2
      })
    } else {
      this.setData({
        lateMinute: index2
      })
    }
  },
  /**
   * 确定与取消
  */
  determine: function () {
    this.setData({
      picker_flag: false,
      lateHour: "00",
      lateMinute: "00"
    });
  },
  cancel: function () {
    var self = this;
    var timeOut = false;
    if(this.data.lateHour == 0 && this.data.lateMinute == 0){
      return;//初次选择为0，禁止确认时间
    }
    this.setData({
      picker_flag: false,
      flag: false,
      btn_flag: false,
      btn_flagSafe:false
    });
    setTimeout(function () {
      self.setData({
        flag: true
      })
    }, 3000);
    function time() {

      if (timeOut) return;//结束递归
    
      if (self.data.lateMinute <= 9 && self.data.lateMinute != 0) {
        self.data.lateMinute = self.data.lateMinute - 1;
        self.setData({
          lateMinute: "0" + self.data.lateMinute
        })
      } else if (self.data.lateMinute == 10) {
        self.data.lateMinute = self.data.lateMinute - 1;
        self.setData({
          lateMinute: "0" + self.data.lateMinute
        })
      } else if (self.data.lateMinute > 10) {
        self.data.lateMinute = self.data.lateMinute - 1;
        self.setData({
          lateMinute: self.data.lateMinute
        })
      } else if (self.data.lateMinute == 0 && self.data.lateHour <= 9 && self.data.lateHour != 0) {
        self.data.lateHour = self.data.lateHour - 1;
        self.setData({
          lateHour: "0" + self.data.lateHour,
          lateMinute: 59
        })
      } else if (self.data.lateMinute == 0 && self.data.lateHour == 10) {
        self.data.lateHour = self.data.lateHour - 1;
        self.setData({
          lateHour: "0" + self.data.lateHour,
          lateMinute: 59
        })
      } else if (self.data.lateMinute == 0 && self.data.lateHour > 10) {
        self.data.lateHour = self.data.lateHour - 1;
        self.setData({
          lateHour: self.data.lateHour,
          lateMinute: 59
        })
      } else if (self.data.lateMinute == 0 && self.data.lateHour == 0) {
        console.log("已经发送到后台");
        self.setData({
          btn_flagWhit: false
        })
        function duang() {
          if(duangFlag) return;
          wx.vibrateLong({
            success: function () {
              console.log("震动成功");
            }
          })
        }
        setInterval(duang,1000)
        //给后台发送消息
        timeOut = true;  //作为定时器结束标志，一旦变化 方法自动弹出
      }
    };
    wx.request({
      url: 'https://xcx.changxiaoyuan.com/safe/time/startTime',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        open_id: "1231231312321321"
      },
      success: function (e) {
        console.log(e);
      }
    })
    setInterval(time, 60000);//使用递归
  },
  /**
   * 选择时间
  */
  choose: function () {
    var self = this;
    this.setData({
      picker_flag: true,
    });
  },
  /**
   * 确认到家
  */
  timeOver:function(){
    //发送给后端消息
    console.log("发送给后端消息确认安全");
    wx.request({
      url: 'https://xcx.changxiaoyuan.com/safe/time/endTime',
      // method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        open_id: "1231231312321321"
      },
      success: function (e) {
        console.log(e);
      }
    })
    duangFlag = true;
    allOver = true;
    this.setData({
      btn_flagSafe:true,
      btn_flagWhit:true,
      lateMinute:"00",
      lateHour:"00"
    });
  },
  /**
   * 仍在路上
  */
  timeMore:function(){
    var self = this;
    var timeOut = false;
    duangFlag = true;
    this.setData({
      lateMinute:10,
      btn_flagWhit: true
    });
    function time(){
      if(timeOut) return;
      if(allOver) return;
      if (self.data.lateMinute <= 10 && self.data.lateMinute != 0) {
        self.data.lateMinute = self.data.lateMinute - 1;
        self.setData({
          lateMinute: "0" + self.data.lateMinute
        })
      } else if (self.data.lateMinute == 0) {
        duangFlag = false;
        timeOut = true;
        console.log("再次发送到后台");
        self.setData({
          btn_flagWhit: false
        })
        function duang() {
          if (duangFlag) return;
          wx.vibrateLong({
            success: function () {
              console.log("再次震动成功");
            }
          })
        }
        setInterval(duang, 1000)
      }
    }
    setInterval(time, 60000);
  }
})
