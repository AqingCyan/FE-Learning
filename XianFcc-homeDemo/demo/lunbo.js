/*缓冲运动*/
function startMove() {
    var oDiv = document.getElementById('div1');
    setInterval(function () {
        var speed = (300-oDiv.offsetLeft)/50;
        oDiv.style.left = oDiv.offsetLeft + speed+'px';
    },10)
}
/*有bug：距离变化了*/

/*--------------------------------------------------------------------------------------------------------------------*/

/*伸缩*/
// window.onload=function () {
//     var aDiv = document.getElementsByClassName('tan');
//     for (var i =0;i<aDiv.length;i++){
//         aDiv[i].onmouseover = function () {
//             startMove2(this,400);
//         }
//         aDiv[i].onmouseout=function () {
//             startMove2(this,100);
//         }
//     }
// }
//
// var timer = null;
//
// function startMove2(obj,iTarget) {
//     clearInterval(timer);
//     timer = setInterval(function () {
//        var speed = (iTarget-obj.offsetWidth)/6;
//        speed = speed>0?Math.ceil(speed):Math.floor(speed);
//
//        if(obj.offsetWidth === iTarget){
//          clearInterval(timer);
//        }else {
//            obj.style.width = obj.offsetWidth + speed +'px';
//        }
//     },30);
// }
/*伸缩：有bug，会卡顿*/

//bug原因：timer = null 只有一个，如果一个运动未完成，再触发新的运动，就触发了timer = null 使运动结束

// window.onload=function () {
//     var aDiv = document.getElementsByClassName('tan');
//     for (var i =0;i<aDiv.length;i++){
//         aDiv[i].timer = null;     //加了一个自定义的属性 timer = null
//         aDiv[i].onmouseover = function () {
//             startMove2(this,400);
//         }
//         aDiv[i].onmouseout=function () {
//             startMove2(this,100);
//         }
//     }
// }
//
// // var timer = null;
//
// function startMove2(obj,iTarget) {
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function () {
//         var speed = (iTarget-obj.offsetWidth)/6;
//         speed = speed>0?Math.ceil(speed):Math.floor(speed);
//
//         if(obj.offsetWidth === iTarget){
//             clearInterval(obj.timer);
//         }else {
//             obj.style.width = obj.offsetWidth + speed +'px';
//         }
//     },30);
// }

/*--------------------------------------------------------------------------------------------------------------------*/
// window.onload =function () {
//     var aDiv = document.getElementsByClassName('dan');
//     for(var i = 0;i<aDiv.length;i++){
//         aDiv[i].onmouseover = function () {
//             startMove3(this,100);
//         };
//         aDiv[i].onmouseout = function () {
//             startMove3(this,30);
//         };
//     }
// };
//
// var alpha = 30;
//
// function  startMove3(obj,iTarget) {
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function () {
//         var speed = (iTarget-alpha)/6;
//         speed = speed>0?Math.ceil(speed):Math.floor(speed);
//
//         if(alpha === iTarget){
//             clearInterval(obj.timer);
//         }else {
//             alpha = alpha+speed;
//             obj.style.opacity = alpha/100;
//         }
//     },30);
// }

/*bug：颜色变化卡顿*/

window.onload =function () {
    var aDiv = document.getElementsByClassName('dan');
    for(var i = 0;i<aDiv.length;i++){
        aDiv[i].alpha = 30;
        aDiv[i].onmouseover = function () {
            startMove3(this,100);
        };
        aDiv[i].onmouseout = function () {
            startMove3(this,30);
        };
    }
};


function  startMove3(obj,iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed = (iTarget-obj.alpha)/6;
        speed = speed>0?Math.ceil(speed ):Math.floor(speed);

        if(obj.alpha === iTarget){
            clearInterval(obj.timer);
        }else {
            obj.alpha = obj.alpha+speed;
            obj.style.opacity = obj.alpha/100;
        }
    },30);
}
/*运动框架中  不共用任何变量*/

