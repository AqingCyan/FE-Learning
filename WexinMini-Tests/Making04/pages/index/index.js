//index.js
//引入封装好的的请求的参数
var url = require('../../utils/config.js');
// console.log(url);
//获取应用实例
const app = getApp();
var jumpFlag = true;//用来确保用户多次点击不会造成页面错误

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    data:[],//声明一个数组保存我们请求的数据(笑话)
    color:['one','two','three'],//我们把之前给前三定义好的样式存在数组中，然后循环到前三的样式中

    loadingMore:false,
    loadingOver:false,

    pageNum:1,//初始请求页数为1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    });
    this.request();//加载时调用请求方法
  },
  /**
   * 请求接口的方法
   */
  request: function(){
    var self = this;//保存this指向
    wx.request({
      url: url.textJoke,
      data: {
        page: this.data.pageNum,  //该api传递参数中有page，表示返回第几页。
        maxResult: 20,  //每页最大记录数。其值为1至50。
      },

      success:function(e){
        console.log(e);

        var data = e.data.showapi_res_body.contentlist;//获取笑话内容
        var length = data.length;
        if (length == 0) {//判断一下新获取的内容，如果再无获取内容，长度为0，就使得加载完成显示
          self.setData({
            loadingMore:false,
            loadingOver:true
          })

          return;
        }
        var list = self.data.data.concat(data);//把获取的内容和新加载的内容拼接在一起
        for(var i=0;i<data.length;i++){
          data[i].text = self.removeHTML(data[i].text);
        }
        self.setData({//这里的this指向变了
          data:list,
          flag:"true",
          loadingMore:false
        });

        wx.hideLoading();
      }
    })
  },

  /**
   * 点击跳转页面方法
  */
  jump:function(e){
    if(jumpFlag){
      jumpFlag = false;//跳转进来后

      // console.log(e);//查看一下id存储在哪里，获取id以便获取内容
      var id = e.currentTarget.id;
      console.log(id);//查看获取的id是否可以对应上序号
      var temp = JSON.stringify(this.data.data[id]);//由于接收的页面只能接收json格式的，所以需要转换为json
      console.log(temp);

      wx.navigateTo({
        url: '../textJoke/textJoke?data=' + temp,//把获得的数据传到指定页面地址
      });
    }
  },

  /**
   * 去除html标签的方法
  */
  removeHTML:function(str){
    return str.replace(/<[^>]+>/g,'');//使用正则去除<>
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
    this.request();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loadingMore:true,
      loadingOver:false,
      pageNum:this.data.pageNum+1,//如果下拉触底，请求数据时使下次请求页数加一
    });
    this.request();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})