
var appid = 65105;
var secret = "7ba716e8d1de4363b7745b6e63b442fc";
//字符串拼接请求
var param = "?showapi_appid=" + appid +"&showapi_sign="+secret;

var textJoke = "https://route.showapi.com/341-1"+param;
var imgJoke = "https://route.showapi.com/341-2" + param;
var gifJoke = "https://route.showapi.com/341-3" + param;

//module.exports为固定写法

module.exports = {
  textJoke: textJoke,
  imgJoke: imgJoke,
  gifJoke: gifJoke
};