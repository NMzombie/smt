
var app = getApp();
// showMinutes  是否需要展示时分秒
// addDay       需要加入的天数
const formatTime = (date, showMinutes,showsecond) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  if (showsecond){
    return [hour, minute, second].map(formatNumber).join(':')
  }
  if (showMinutes) {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
  }
  
  return [year, month, day].map(formatNumber).join('-') 
  //+ ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//清空存储的值
const initFun = ()=>{
 
  app.globalData.linkMan = [];
  app.globalData.purpose = [];
  app.globalData.school = [];
  app.globalData.type = [];
  app.globalData.signIn.address="";
  app.globalData.signIn.linkManInfo.linkStr = "";
  app.globalData.signIn.linkManInfo.paramsLinkStr = "";
  app.globalData.signIn.purposeInfo = '';
  app.globalData.signIn.schoolInfo = '';
  app.globalData.signIn.typeInfo = [];
  app.globalData.writeDiary.linkMan = [];
  app.globalData.signIn.picArr = [];
  app.globalData.signIn.bzVal = [];
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getNowFormatDate = ()=>{
  var date = new Date();
  var seperator1 = "/";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}


module.exports = {
  formatTime: formatTime,
  initFun: initFun,
  getNowFormatDate: getNowFormatDate
}


