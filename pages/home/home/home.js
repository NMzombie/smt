// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGoToSj: true, // 进入商机的权限
    isGoToDD: true, // 进入订单的权限
    isGoToTASK: true, // 进入任务的权限
    isGoToDEVICE: true, // 进入设备的权限
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.commentFlag('isGoToSj','245');
    this.commentFlag('isGoToDD', '255');
    this.commentFlag('isGoToTASK', '213');
    this.commentFlag('isGoToDEVICE', '320');
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
  // 获取可枚举的属性---判断用户权限
  commentFlag: function (key,Flag) {
    app.wxApi.CommentFlag({ Flag }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({
          [key]: Value,
        })
      } else {
        app.showToast(ResultMessage);
      }
    })
  },
  // 跳转到消息页
  message() {
    wx.navigateTo({
      url: '/pages/home/message/message'
    })
  },
  //跳转到签到首页
  // signIn() {
  //   wx.navigateTo({
  //     url: '/pages/signIn/home/home'
  //   })
  // },

  // //跳转到写日志页面

  // renderWriteDiary() {
  //   wx.navigateTo({
  //     url: '/pages/diary/allDiary/allDiary'
  //   })
  // },
  // //跳转到考勤
  // renderClock() {
  //   wx.navigateTo({
  //     url: '/pages/clockingIn/clockHome/clockHome'
  //   })
  // },
  // //跳转到商机
  // renderSj() {
  //   wx.navigateTo({
  //     url: '/pages/sj/sjHome/sjHome'
  //   })
  // },
  // //跳转到订单
  // renderOrderform() {
  //   wx.navigateTo({
  //     url: '/pages/orderForm/orderFormHome/orderFormHome'
  //   })
  // },
  
  // // 学校概况
  // renderSchool(){
  //   wx.navigateTo({
  //     url: '/pages/schoolProfiles/schoolList/schoolList'
  //   })
  // },
  formSubmit(e) {
    let page = e.currentTarget.dataset.page
   
    console.log(e.detail.formId)
    app.wxApi.WeiXinUserFromIdAdd({ UserFromIdList: e.detail.formId}).then(res=>{
    })
    wx.navigateTo({
      url: `/pages/${page}`
    })
  }
})