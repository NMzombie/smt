var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGoToWX:true,//设备维修权限
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.commentFlag('isGoToWX', '326');
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
  formSubmit(e) {
    let page = e.currentTarget.dataset.page
    app.wxApi.WeiXinUserFromIdAdd({ UserFromIdList: e.detail.formId }).then(res => {
    })
    wx.navigateTo({
      url: `/pages/${page}`
    })
  },
  // 获取可枚举的属性---判断用户权限
  commentFlag: function (key, Flag) {
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
})