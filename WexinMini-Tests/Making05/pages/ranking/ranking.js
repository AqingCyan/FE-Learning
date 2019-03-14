// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"",
    data:[],
    color:['color','color','color']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);//如果list.js文件中的jump方法未编码传递的参数，这里输出查看内容，发现JSON解析到'mp3'后面的'?'或者'&'等符号时就停止了(因为json不能转化特殊字符)，信息没有解析完,直接输出会报错，所以传之前，我们需要再list.js中编码一下,然后再在这里反编码出来我们需要的内容

    var data = JSON.parse(options.content);
    for (let i = 0; i < data.length; i++) {//反编码拿到我们需要的信息
      data[i].albumpic_big = decodeURIComponent(data[i].albumpic_big);
      data[i].albumpic_small = decodeURIComponent(data[i].albumpic_small);
      data[i].downUrl = decodeURIComponent(data[i].downUrl);
      data[i].url = decodeURIComponent(data[i].url);
      data[i].songname = decodeURIComponent(data[i].songname);
      data[i].singername = decodeURIComponent(data[i].singername);
    }
    console.log(data);//输出信息查看一下

    this.setData({
      data:data,
      src:data[0].albumpic_small,
      flag:true
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