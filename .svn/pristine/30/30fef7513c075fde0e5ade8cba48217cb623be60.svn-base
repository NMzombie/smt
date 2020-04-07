// pages/signIn/home/home.js
//获取应用实例
var app = getApp();
import formatTime from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:1,                                             //当前选中的tab 默认1 1 我的签到  2 团队签到  3 学校签到
    startTime: formatTime.formatTime(new Date()),      //时间控件开始吧时间
    endTime: formatTime.formatTime(new Date()),        //时间控件结束时间
    currentPage:1,                                      //当前页数 默认1 
    mySignIn:[],                                       //我的签到列表
    teamSignIn:[],                                     //团队签到列表
    schoolSignIn:[],                                   //团队签到列表
    username:'',                                       //当前登录者的姓名
    searchVal: '',                                     //输入框搜索的值
    showTab:true,                                      //是否显示tab
    mainNum:'',                                        //客户经理账号
    departCode:'',                                     //部门代码
    otherUsername:'',                                  //
    baseSchoolSignIn:[],                                //学校对应地区基本数组
    myTotal:1,                                          //我的签到总页数
    schoolTotal:1,                                      // 学校签到总页数
    teamTotal:1,                                        //团队总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      username: wx.getStorageSync('username')
    })
    if (options.showTab){//从团队签到点击进入这里
      this.setData({
        showTab:false,
        mainNum: options.mainNum,
        departCode: options.departCode,
        otherUsername: options.otherUsername,
        startTime: options.startTime,
      })
      //this.getMyTeamQD()
    }else{
      //this.getMyQD();
    }
    if (options.tab){
      this.setData({
        tab: options.tab
      })
    }
    this.requestData()
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
    //初始化选中的值
    formatTime.initFun();
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
  // 点击tab 进行切换
  // 1 我的签到
  // 2团队签到
  // 3学校签到
  changeTab(e){
    let tag = e.target.dataset.tab;
    this.initDate();
    this.setData({
      tab: tag,
      currentPage: 1,
      endTime: formatTime.formatTime(new Date()),
      mySignIn: [],                                       //我的签到列表
      teamSignIn: [],                                     //团队签到列表
      schoolSignIn: [],                                   //团队签到列表
    })
    this.requestData()
  },
  //开始时间初始化到今天
  initDate(){
    this.setData({
      startTime: formatTime.formatTime(new Date()),
      currentPage: 1,
    })
    this.requestData()
  },
  //选择日期
  // dateType 1 表示开始时间  2 结束时间
  chooseDate(e){
    let dateType = e.target.dataset.datetype;
    if (dateType == 1){  //开始时间
      this.setData({
        startTime: e.detail.value,
        currentPage:1,
        mySignIn: [],                                       //我的签到列表
        teamSignIn: [],                                     //团队签到列表
        schoolSignIn: [],   
      })
      
    }else{
      if (this.compareDate(this.data.startTime, e.detail.value)){
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
    this.requestData();
  },
  // 两个日期进行比较
  compareDate(date1, date2){
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if(oDate1.getTime() > oDate2.getTime()){
      return true;
    } else {
      return false;
    }
  },
  //获取我的签到信息list
  getMyQD(){
    app.wxApi.getMyQD({ Page: this.data.currentPage, Stime: this.data.startTime, Etime:this.data.endTime }).then(res => {
      if (res.ResultCode == 1){
        this.setData({
          mySignIn: this.data.mySignIn.concat(res.Value.List),
          myTotal: res.Value.TotalPage
        })
        this.data.mySignIn.forEach((item,index)=>{
          this.setData({
            [`mySignIn[${index}].today`]: item.QdTime.split(' ')[0] == formatTime.getNowFormatDate() ? true : false
          })
        })  
      }else{
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  //获取我的团队签到
  getTeamQdCount(){
    app.wxApi.getTeamQdCount({Stime: this.data.startTime, Etime: this.data.endTime }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          teamSignIn: res.Value
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

  //切换不同的tab 请求不同的接口
  requestData(){
    let tag = this.data.tab;
    this.setData({
      tab: tag,
    })
  
    if(tag == 1){
      if (this.data.showTab){
        this.getMyQD()
      }else{
        this.getMyTeamQD();
      }
    } else if (tag == 2){
      this.getTeamQdCount()
    }else{
      this.getCity();
    }
    
  },
  //滑动到底部时 分页加载
  
  addMore(){
    let tag = this.data.tab;
    if (tag == 1) {
      if (this.data.currentPage < this.data.myTotal) {// 当前页数 小于 总页数时 在去请求接口
        this.setData({
          currentPage: this.data.currentPage + 1
        })
        if (this.data.showTab) {
          this.getMyQD()
        } else {
          this.getMyTeamQD();
        }
      }
    } else if (tag == 2) {
      if (this.data.currentPage < this.data.teamTotal) {
        this.setData({
          currentPage: this.data.currentPage + 1
        })
        this.getTeamQdCount()
      }
    } else {                                    
      if (this.data.currentPage < this.data.schoolTotal) {
        this.setData({
          currentPage: this.data.currentPage + 1
        })
        this.getCity();
      }
    }
    
  },
  search(e) {
    this.setData({
      searchVal: e.detail.value
    })
    if (this.data.searchVal != '') {
      let resArr = [];
      this.data.schoolSignIn.find((item, index) => {
        if (item.City.indexOf(this.data.searchVal) > -1) {
          resArr.push(item)
        }
      })
      this.setData({
        schoolSignIn: resArr
      })
    } else {
      this.setData({
        schoolSignIn: this.data.baseSchoolSignIn
      })
    }

  },
  // 跳转到团队签到
  renderTeam(e){
    let departCode = e.currentTarget.dataset.departcode
    wx.navigateTo({
      url: '/pages/signIn/teamSignIn/teamSignIn?departCode=' + departCode + "&startTime=" + this.data.startTime + "&endTime=" +    this.data.endTime
    })
  },
  // 跳转到学校签到
  renderSchool(e) {
    wx.navigateTo({
      url: '/pages/signIn/schoolSignIn/schoolSignIn?city=' + e.currentTarget.dataset.city +"&type=1"
    })
  },
  // 跳转个人签到里签到详情
  renderDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/signIn/signInDetail/signInDetail?flag=4&id='+ id
    })
  },

  //获取团队签到记录
  getMyTeamQD(){
    app.wxApi.getMyTeamQD({ Stime: this.data.startTime, Etime: this.data.endTime, Mail_num: this.data.mainNum, otherUsername: this.data.otherUsername, Page: this.data.currentPage}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          mySignIn: this.data.mySignIn.concat(res.Value.List),
          myTotal: res.Value.TotalPage
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
  //获取登录人权限范围的学校地区
  getCity(){
    app.wxApi.getCity().then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          schoolSignIn: res.Value,
          baseSchoolSignIn:res.Value
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
  // 跳转到签到
  signIn(e){
    app.wxApi.WeiXinUserFromIdAdd({ UserFromIdList: e.detail.formId }).then(res => {
      
    })
    wx.navigateTo({
      url: '/pages/signIn/clockIn/clockIn'
    })
  },
  //修改当日的签到
  editDiary(e){
    wx.navigateTo({
      url: `/pages/signIn/editSignIn/editSignIn?id=${e.currentTarget.dataset.id}`
    })
  }
})