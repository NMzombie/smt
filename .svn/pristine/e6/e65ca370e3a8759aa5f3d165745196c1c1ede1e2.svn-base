var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:1,                           //1 日报  2 周报  3 月报
    id:'',                            //日志的id
    diaryDetail:{},                   //日志详情
    replayVal:'',                     //回复的id
    Rdate:'',                          //当前月报的年月
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flag:options.tab,
      id:options.id
    })
    this.getOne();
    console.log(options,88888)
    this.SubmitIfRead();
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
  getOne(){
    app.wxApi.getOne({Flag:this.data.flag,Id:this.data.id}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          diaryDetail: res.Value
        })
        this.setData({
          Rdate: this.data.diaryDetail.Rdate
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
  // 写回复
  replay(){
    if (this.data.replayVal == ''){
      wx.showToast({
        title: '回复不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    app.wxApi.SubmitReplay({ Mail_num: wx.getStorageSync('mail_num'), Xm: wx.getStorageSync('username'), Flag:   this.data.flag, Id: this.data.id, ReplayCon: this.data.replayVal}).then(res=>{
      if (res.ResultCode == 1){
        this.getOne();
        this.setData({
          replayVal: '',
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
  // 得到回复的内容
  bindinput(e){
    this.setData({
      replayVal : e.detail.value,
    })
    
  },
  //提交
  submitDiary() {

    this.setData({
      submitButton: false
    })
    if (this.data.partOne == '' || this.data.partTwo == '' || this.data.partThree == '' || this.data.partFour == '') {
      wx.showToast({
        title: '请填写内容',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        submitButton: true
      })
      return;
    }
    if (this.data.linkmanParams == '') {
      wx.showToast({
        title: '请选择联系人',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        submitButton: true
      })
      return;
    }
    if (this.data.diaryType == 1) {//日报
      app.wxApi.SubmitDiary({
        Mail_num: wx.getStorageSync('mail_num'),
        Xm: wx.getStorageSync('username'),
        Rdate: formatTime.formatTime(new Date()),
        FinishWork: this.data.partOne,
        NoFinishWork: this.data.partTwo,
        followUpWork: this.data.partThree,
        subTotal: this.data.partFour,
        leadUsernames: this.data.linkmanParams,
        Num: 0,
        Vid: '',
        Schoolname1: '',
        School: ''
      }).then(res => {
        if (res.ResultCode == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: `/pages/diary/diaryDetail/diaryDetail?id=${res.Value}&tab=1`
          })
          wx.setStorageSync('partOne', '');
          wx.setStorageSync('partTwo', '');
          wx.setStorageSync('partThree', '');
          wx.setStorageSync('partFour', '');
          formatTime.initFun();
          this.setData({
            submitButton: true
          })
        } else {
          wx.showToast({
            title: res.ResultMessage,
            icon: 'none',
            duration: 2000
          })
          this.setData({
            submitButton: true
          })
        }

      })
    } else if (this.data.diaryType == 2) {//周报
      app.wxApi.SubmitWeekReport({
        Mail_num: wx.getStorageSync('mail_num'),
        Xm: wx.getStorageSync('username'),
        RweekNum: this.getWeekOfYear(),
        Rdate: this.getFirstDayOfWeek(new Date()),
        FinishWork: this.data.partOne,
        PlanNextWeek: this.data.partTwo,
        followUpWork: this.data.partThree,
        subTotal: this.data.partFour,
        leadUsernames: this.data.linkmanParams,

      }).then(res => {
        if (res.ResultCode == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: `/pages/diary/diaryDetail/diaryDetail?tab=2&id=${res.Value}`
          })
          wx.setStorageSync('partOne', '');
          wx.setStorageSync('partTwo', '');
          wx.setStorageSync('partThree', '');
          wx.setStorageSync('partFour', '');
          formatTime.initFun();
        } else {
          wx.showToast({
            title: res.ResultMessage,
            icon: 'none',
            duration: 2000
          })
        }
        this.setData({
          submitButton: true
        })
      })
    } else {//月报
      var myDate = new Date();
      app.wxApi.SubmitMonthReport({
        Mail_num: wx.getStorageSync('mail_num'),
        Xm: wx.getStorageSync('username'),
        Ryear: myDate.getFullYear(),
        Rmonth: myDate.getMonth() + 1,
        Rdate: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + '01',
        FinishWork: this.data.partOne,
        followUpWork: this.data.partTwo,
        questionDept: this.data.partThree,
        subTotal: this.data.partFour,
        leadUsernames: this.data.linkmanParams,

      }).then(res => {
        if (res.ResultCode == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: `/pages/diary/diaryDetail/diaryDetail?tab=3&id=${res.Value}`
          })
          wx.setStorageSync('partOne', '');
          wx.setStorageSync('partTwo', '');
          wx.setStorageSync('partThree', '');
          wx.setStorageSync('partFour', '');
          formatTime.initFun();
        } else {
          wx.showToast({
            title: res.ResultMessage,
            icon: 'none',
            duration: 2000
          })
        }

        this.setData({
          submitButton: true
        })
      })
    }

  },
  SubmitIfRead(){
    app.wxApi.SubmitIfRead({
      Mail_num: wx.getStorageSync('mail_num'),
      Xm: wx.getStorageSync('username'),
      Flag: this.data.flag,
      Id: this.data.id
    }).then(res=>{

    })
    
  }
})