// pages/sj/sjDetail/sjDetail.js
import formatTime from "../../../utils/util.js"
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Id: null, // 商机id
    info: {},
    FollowUpList: [], // 商机跟进列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { id } = options;
    if (!id) return;
    this.setData({ Id: id });
    this.getBusiness(id);
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

  // 获取商机详情
  getBusiness: function (Id = 0) {
    app.wxApi.GetBusiness({ Id }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({
          info: Value,
        })
        wx.setNavigationBarTitle({
          title: Value.SJName
        })
        this.getFollowUpList(Value.SJBH);
      } else {
        this.showToast(ResultMessage);
      }
    })
  },

  // 获取商机跟进列表
  getFollowUpList: function (SJBH) {
    app.wxApi.BusinessFollowUpList({ SJBH, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({
          FollowUpList: Value,
        })
      } else {
        this.showToast(ResultMessage);
      }
    })
  },

  // toast
  showToast: function (title, icon = 'none') {
    wx.showToast({
      title,
      icon,
    })
  },
})