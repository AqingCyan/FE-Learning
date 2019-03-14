var appid = 65406;
var secret = "5331d566a8034fb58f761b464afc04af";
//字符串拼接请求
var param = "?showapi_appid=" + appid + "&showapi_sign=" + secret;

var search = "https://route.showapi.com/213-1" + param;
var hot = "https://route.showapi.com/213-4" + param;

//module.exports为固定写法

module.exports = {
  search:search,
  hot:hot
};