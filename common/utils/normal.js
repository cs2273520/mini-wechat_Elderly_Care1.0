//手机正则
function isMobile (mobile) {  
    return /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
    .test(mobile)
  }

// 用户名正则 数字、字母，6-10位
function isName(name){
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(name)
}
// 验证码正则 数字4位
function isCode(code){
    return /^\d{4}$/.test(code)
}


// 身份证正则
function Idcard(id){
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(id)
}

// 姓名正则
function isRealName(name){
    return /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/.test(name)
}

// 地址正则
function isLocation(location){
    return /(?<province>[^省]+自治区|.*?省|.*?行政区|.*?市)(?<city>[^市]+自治州|.*?地区|.*?行政单位|.+盟|市辖区|.*?市|.*?县)(?<county>[^县]+县|.+区|.+市|.+旗|.+海域|.+岛)?(?<town>[^区]+区|.+镇)?(?<village>.*)/.test(location)

}



//防抖
const debounce = (func, wait)=>{
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      
      let later = () => {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }
}

// 计算坐标之间的距离
function GetDistance( coordinate1,  coordinate2){
    var radLat1 = coordinate1.latitude*Math.PI / 180.0;
    var radLat2 = coordinate2.latitude*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = coordinate1.longitude*Math.PI / 180.0 - coordinate2.longitude*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}


  module.exports = {
    isMobile,isName,isCode,debounce,GetDistance,Idcard,isRealName,isLocation
  }