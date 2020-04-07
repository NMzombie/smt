var app = getApp();
import formatTime from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:0,
    startTime: '',      //时间控件开始吧时间
    endTime: formatTime.formatTime(new Date()),        //时间控件结束时间
    schoolSearch:'',                                     //搜索学校名称
    pagesize:1,                                         //页数
    taskList:[],                                        //任务数组
    totalPage:1,                                        //总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       startTime: this.getWeekStartDate(true)
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.TaskList();
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
  //进行中的任务和已完成任务切换
  changeTab(e){
    this.setData({
      tab: e.target.dataset.tab,
      taskList:[],
      pagesize:1
    })
    this.TaskList();
  },
  //选择日期
  // dateType 1 表示开始时间  2 结束时间
  chooseDate(e) {
    this.setData({
      taskList: [],
      pagesize: 1
    })
    let dateType = e.target.dataset.datetype;
    if (dateType == 1) {  //开始时间
      this.setData({
        startTime: e.detail.value,
        currentPage: 1,
        mySignIn: [],                                       //我的签到列表
        teamSignIn: [],                                     //团队签到列表
        schoolSignIn: [],
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
        currentPage: 1,
        mySignIn: [],                                       //我的签到列表
        teamSignIn: [],                                     //团队签到列表
        schoolSignIn: [],                                   //团队签到列表
      })
    }

    this.TaskList();
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
  renderDetail(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/task/taskDetail/taskDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //获取任务列表
  TaskList(){
    app.task.TaskList({ Schoolname: this.data.schoolSearch, StarTime: this.data.startTime, EndTime: this.data.endTime, IfEnd: this.data.tab, PageIndex:this.data.pagesize,PageSize:15}).then(res => {
      if (res.ResultCode == 1){
        this.setData({
          taskList: this.data.taskList.concat(res.Value.List),
          totalPage: res.Value.TotalPage
        })
      }else{
        app.showToast(res.ResultMessage);
      }
    })
  },
  //添加更多
  addMore(){
    if (this.pagesize < this.totalPage){
      this.setData({
        pagesize: this.data.pagesize + 1
      })
      this.TaskList();
    }
  },
  //搜索
  searchSchool(){
    this.setData({
      taskList: [],
      pagesize: 1
    })
    this.TaskList()
  },
  //输入搜索的学校
  bindKeyInput(e){
    this.setData({
      schoolSearch:e.detail.value
    })
  },
  //取消搜索
  cancle(){
    this.setData({
      schoolSearch: '',
      taskList: [],
      pagesize: 1
    })
    this.TaskList()
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
    if (month) {
      return m_year + '-' + m_month + '-' + '01'
    }
    return m_year + '-' + m_month + '-' + m_date
  },
})