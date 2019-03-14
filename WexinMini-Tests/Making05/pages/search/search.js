// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resetBtn:false,
    showToast:false
  },
  //输入数据执行方法，使叉出现
  input:function(e){
    var value = e.detail.value;
    var resetBtn = this.data.resetBtn;
    if(value == ''){
      resetBtn = false;
    }else{
      resetBtn = true;
    }
    this.setData({
      resetBtn:resetBtn,
    });
  },

  //叉叉消失
  reset:function(){
    this.setData({
      resetBtn:false,
    })
  },

  //点击完成触发方法
  confirm:function(e){
    var value = e.detail.value;
    if(value==''){
      this.setData({
        showToast:true
      })
    }
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
  
  }
})