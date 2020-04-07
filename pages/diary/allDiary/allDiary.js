// pages/diary/allDiary/allDiary.js
var app = getApp();
import formatTime from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: formatTime.formatTime(new Date()),      //时间控件开始吧时间
    endTime: formatTime.formatTime(new Date()),        //时间控件结束时间
    tab:1,                                             //选中的类型   1：日报 2：周报 3：月报
    diaryType:1,                                       //1:我收到的   0：我发出的
    diaryList:[],                                      //数据列表
    partOne:'今日完成的工作',                           //列表内容显示的title
    partTwo: '未完成的工作',                            //列表内容显示的title
    partThree: '工作难点',                        //列表内容显示的title
    currentPage:1,                                     //当前页数
    myTotal:1,                                         //当前接口总页数
    selfMail_num:'',                                   //当前登录人mail_num 
    diarySearch:'',                                    //日志搜索关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
    wx.setStorageSync('partOne','');
    wx.setStorageSync('partTwo', ''); 
    wx.setStorageSync('partThree', '');
    wx.setStorageSync('getPartfour', '');
    this.setData({
      selfMail_num : wx.getStorageSync('mail_num')
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
    formatTime.initFun();
    this.requestData();
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
  //选择日期
  // dateType 1 表示开始时间  2 结束时间
  chooseDate(e) {
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
    this.requestData();
  },
  //根据不同tab请求不同数据
  requestData(){
    this.setData({
      diaryList:[],
      currentPage:1,
    })
    if (this.data.tab ==1){//日报
      
      this.setData({
        partOne:'今日完成的工作',
        partTwo:'未完成的工作',
        partThree:'工作难点',
      })
      this.getDay();
    } else if (this.data.tab == 2){//周报
      this.setData({
        partOne: '本周完成的工作',
        partTwo: '下周计划工作',
        partThree: '工作难点',
      })
      this.getMyWeekReport()
    }else{//月报
      this.setData({
        partOne: '本月完成的工作',
        partTwo: '本月工作问题',
        partThree: '需要部门协作问题',
      })
      this.getMyMonthReport()
    }
  },
  //获取日报 Ifmy: 0 本人编辑发出的日报  1 本人上交收到的日报
  getDay(e){
    // let type = e.currentTarget.dataset.type 
    app.wxApi.getMyDiary({ Stime: this.data.startTime, Etime: this.data.endTime, Ifmy: this.data.diaryType, Page: this.data.currentPage, KeyStr: this.data.diarySearch}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          diaryList: this.data.diaryList.concat(res.Value.List),
          myTotal: res.Value.TotalPage,
          currentPage: res.Value.CurrentPage
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
  //改变类型  1：我收到的 0：我发出的
  changeType(e){
    this.setData({
      diaryType: e.currentTarget.dataset.type 
    })
    this.requestData();
  },
  //改变日志类型  1：日报  2：周报  3：月报
  changeTab(e){
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
    if (e.currentTarget.dataset.tab == 1) {//日报
      this.setData({
        startTime: formatTime.formatTime(new Date()),
        endTime: formatTime.formatTime(new Date()),
      })
    } else if (e.currentTarget.dataset.tab == 2) {//周报
      this.setData({
        startTime: this.getWeekStartDate(),
        endTime: formatTime.formatTime(new Date()),
      })
    } else {//月报
      this.setData({
        startTime: this.getWeekStartDate(true),
        endTime: formatTime.formatTime(new Date()),
      })
    }
    this.requestData();
  },
  //获取周报
  getMyWeekReport(){
    app.wxApi.getMyWeekReport({ Stime: this.data.startTime, Etime: this.data.endTime, Ifmy: this.data.diaryType, Page: this.data.currentPage,KeyStr: this.data.diarySearch}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          diaryList: this.data.diaryList.concat(res.Value.List),
          myTotal: res.Value.TotalPage,
          currentPage: res.Value.CurrentPage
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
  //获取月报
  getMyMonthReport() {
    app.wxApi.getMyMonthReport({ Stime: this.data.startTime, Etime: this.data.endTime, Ifmy: this.data.diaryType, Page: this.data.currentPage,KeyStr: this.data.diarySearch}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          diaryList: this.data.diaryList.concat(res.Value.List),
          myTotal: res.Value.TotalPage,
          currentPage: res.Value.CurrentPage
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
  // 跳转到日志详细页
  renderDetail(e){
    wx.navigateTo({
      url: `/pages/diary/diaryDetail/diaryDetail?id=${e.currentTarget.dataset.id}&tab=${this.data.tab}&edit=${false}`
    })
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
  //跳转到写日志
  writeDiary(e){

    wx.navigateTo({
      url: `/pages/diary/writeDiary/writeDiary?diaryType=${e.currentTarget.dataset.type}`
    })
  },
  // 加载更多
  addMore() {
    let tab = this.data.tab;
    // console.log(tab)
    // console.log(this.data.currentPage);
    // console.log(this.data.myTotal);
    // console.log(this.data.diaryType)
    
    if (this.data.currentPage < this.data.myTotal) {// 当前页数 小于 总页数时 在去请求接口
      this.setData({
        currentPage: this.data.currentPage + 1
      })
      if (tab == 1) {//日报
        this.getDay();
      }else if(tab==2){
        this.getMyWeekReport();
      }else{
        this.getMyMonthReport();
      }
    }
    
  },
  // 获取本周周一的日期
  getWeekStartDate(month) {
    var nowTemp = new Date();//当前时间
    var oneDayLong = 24 * 60 * 60 * 1000;//一天的毫秒数
    var c_time = nowTemp.getTime();//当前时间的毫秒时间
    var c_day = nowTemp.getDay() || 7;//当前时间的星期几
    var m_time = c_time - (c_day - 1) * oneDayLong;//当前周一的毫秒时间
    var monday = new Date(m_time);//设置周一时间对象
    var m_year = monday.getFullYear();
    var m_month = (monday.getMonth() + 1) > 9 ? (monday.getMonth() + 1) : '0' + (monday.getMonth() + 1);
    var m_date = monday.getDate() > 9 ? monday.getDate() : '0' + monday.getDate();
    if (month){
      return m_year + '-' + m_month + '-' +'01'
    }
    return m_year + '-' + m_month + '-' + m_date
  },
  // 进入编辑日志
  editDiary(e){
    wx.navigateTo({
      url: `/pages/diary/editDiary/editDiary?id=${e.currentTarget.dataset.id}&tab=${this.data.tab}&edit=${true}`
    })
  },
  //输入搜索关键字
  bindKeyInput: function (e) {
    this.setData({
      diarySearch: e.detail.value
    })
  },
  cancle(){
    this.setData({
      diarySearch:''
    })
    this.requestData();
  }
})