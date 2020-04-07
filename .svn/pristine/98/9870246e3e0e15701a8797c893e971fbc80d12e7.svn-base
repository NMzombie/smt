// pages/clockingIn/clockDetail/clockDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    otherUsername:'',               //所查看的人的userid
    diaryList:[],                   //考勤记录数组
    teamEndTime:'',                 //结束时间
    teamStartTime:'',                //开始时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      otherUsername:options.userid,
      teamEndTime: options.teamEndTime,
      teamStartTime: options.teamStartTime
    })
    wx.setNavigationBarTitle({
      title: options.username+'考勤记录',
    });

    this.getMyKQ();
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
  getMyKQ() {
    app.wxApi.getMyKQ({ Stime: this.data.teamStartTime, Etime: this.data.teamEndTime, OtherUsername: this.data.otherUsername }).then(res => {
      if (res.ResultCode == 1) {
        //res.Value.List.forEach((item, index) => {
          //item.KqTime = item.KqTime.split(' ')[1]
       // })
        this.setData({
          diaryList: res.Value.List
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
})