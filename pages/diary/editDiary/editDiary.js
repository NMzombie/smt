var app = getApp();
import formatTime from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,                                //1：日报   2：月报   3：周报
    partOne: '',                            //第一部分所写内容
    partTwo: '',                           //第二部分所写内容
    partThree: '',                         //第二部分所写内容
    partFour: '',                          //第二部分所写内容
    linkmanInfoText: '',                    //所选联系人显示字符串
    linkmanParams: '',                      //所选联系人要提交的参数
    submitButton: true,                     //是否可以提交 防止重复提交
    diaryDetail:{},
    id:'',                                   //日志id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flag: options.tab,
      id: options.id
    })
    this.getDetail();
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
    let linkmanStr = '',
      linkmanParams = '';
    console.log(app.globalData.writeDiary.linkMan,7777)
    app.globalData.writeDiary.linkMan.forEach(item => {
      if (item.checked) {
        linkmanStr += item.Xm + ',';
        linkmanParams += item.Username + ',';
      }
    })
    this.setData({
      linkmanInfoText: linkmanStr,
      linkmanParams: linkmanParams
    })
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
  getPartone(e) {
    this.setData({
      ['diaryDetail.FinishWork']: e.detail.value,
    })
    
  },
  getParttwo(e) {
    if(this.data.flag == 1){
      this.setData({
        ['diaryDetail.NoFinishWork']: e.detail.value,
      })
    } else if (this.data.flag == 2){
      this.setData({
        ['diaryDetail.PlanNextWeek']: e.detail.value,
      })
    }else{
      this.setData({
        ['diaryDetail.followUpWork']: e.detail.value,
      })
    }
    
    
  },
  getPartthree(e) {
    if (this.data.flag == 3) {
      this.setData({
        ['diaryDetail.questionDept']: e.detail.value,
      })
    } else {
      this.setData({
        ['diaryDetail.followUpWork']: e.detail.value,
      })
    }
    
  },
  getPartfour(e) {
    this.setData({
      ['diaryDetail.subTotal']: e.detail.value,
    })
  },
  
  //跳转到联系人
  renderlinkMan() {
    wx.navigateTo({
      url: '/pages/diary/linkMan/linkMan?diaryType=' + this.data.flag + '&edit=true' + "&linkmanParams=" + this.data.linkmanParams
    })
  },
  //提交
  submitDiary() {

    this.setData({
      submitButton: false
    })
    
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
    if (this.data.flag == 1) {//日报
      app.wxApi.SubmitModifyDiary({
        RId:this.data.id,
        FinishWork: this.data.diaryDetail.FinishWork,
        NoFinishWork: this.data.diaryDetail.NoFinishWork,
        followUpWork: this.data.diaryDetail.followUpWork,
        subTotal: this.data.diaryDetail.subTotal,
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
    } else if (this.data.flag == 2) {//周报
      app.wxApi.SubmitModifyWeekReport({
        RId: this.data.id,
        FinishWork: this.data.diaryDetail.FinishWork,
        PlanNextWeek: this.data.diaryDetail.PlanNextWeek,
        followUpWork: this.data.diaryDetail.followUpWork,
        subTotal: this.data.diaryDetail.subTotal,
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
      app.wxApi.SubmitModifyMonthReport({
        FinishWork: this.data.diaryDetail.FinishWork,
        followUpWork: this.data.diaryDetail.followUpWork,
        questionDept: this.data.diaryDetail.questionDept,
        subTotal: this.data.diaryDetail.subTotal,
        leadUsernames: this.data.linkmanParams,
        RId: this.data.id,
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
  getDetail(){
    app.wxApi.getOne({ Flag: this.data.flag, Id: this.data.id }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          diaryDetail: res.Value,
          linkmanParams: res.Value.LeadUsernames
        })
        let linkmanStr = '';
        res.Value.IfReads.forEach((item,index)=>{
          linkmanStr += item.Readman+',';
        })
        this.setData({
          linkmanInfoText: linkmanStr
        })
        app.globalData.writeDiary.linkMan.forEach(item => {
          this.data.linkmanParams.split(',').forEach((a,b)=>{
            if (item.Username == a){
              item.checked = true
            }else{
              item.checked = false
            }
          })
         
        })
        var dateArr = this.data.diaryDetail.Rdate.split('/')
        this.setData({
          Rdate: dateArr[0] + '-' + dateArr[1]
        })
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})