var app = getApp();
import formatTime from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:'',
    startTime:'',                                      //时间控件开始吧时间
    endTime: formatTime.formatTime(new Date()),        //时间控件结束时间
    infoList:[],
    TotalPage:1,
    CurrentPage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options,77)
    this.setData({
      startTime: this.getWeekStartDate(true),
      school: options.schoolcode ? options.schoolcode : '',
      schoolname: options.schoolname,
    })
    this.getMyTeamQD();
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

  },
  // 获得学校签到信息
  getMyTeamQD(){
   
    if (this.data.school == ''){
      return;
    }
    app.wxApi.getMyTeamQD({ Stime: this.data.startTime, Etime: this.data.endTime, School: this.data.school, Page: this.data.CurrentPage}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          infoList: this.data.infoList.concat(res.Value.List),
          TotalPage: res.Value.TotalPage
        })
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 获取本周周一的日期
  getWeekStartDate(month) {
    var now = new Date(); //当前日期 
    var nowDayOfWeek = now.getDay(); //今天本周的第几天 
    var nowDay = now.getDate(); //当前日 
    var nowMonth = now.getMonth(); //当前月 
    var nowYear = now.getFullYear(); //当前年 
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
    if (month) {
      return formatTime.formatTime(new Date(nowYear, nowMonth, '01'));
    }
    return formatTime.formatTime(weekStartDate);
  },
  //时间改变
  chooseDate(e) {
    this.setData({
      infoList:[],
      CurrentPage:1
    })
    let dateType = e.target.dataset.datetype;
    if (dateType == 1) {  //开始时间
      this.setData({
        startTime: e.detail.value,
      })
    } else {
      if (this.compareDate(this.data.startTime, e.detail.value)) {
        wx.showToast({
          title: '结束时间不能小于开始时间',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      this.setData({
        endTime: e.detail.value,
        currentPage: 1
      })
    }
    this.getMyTeamQD();
  },
  // 两个日期进行比较
  compareDate(date1, date2) {
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if (oDate1.getTime() > oDate2.getTime()) {
      return true;
    } else {
      return false;
    }
  },
  addMore() {
    // console.log(this.data.CurrentPage);
    // console.log(this.data.TotalPage);
    if (this.data.CurrentPage < this.data.TotalPage){
      this.setData({
        CurrentPage: this.data.CurrentPage + 1 
      })
      this.getMyTeamQD();
    }
    

  },
})