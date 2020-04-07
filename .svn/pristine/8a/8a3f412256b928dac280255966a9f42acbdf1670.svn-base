// pages/signIn/signInDetail/signInDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,      //4 表示签到
    id:0,        //签到id
    info:{},     //签到详情
    picInfo:[],   //图片列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      flag:options.flag,
      id:options.id
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
  // 签到详情
  getDetail(){
    app.wxApi.getOne({ Flag: this.data.flag,Id:this.data.id}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          info: res.Value,
          picInfo: res.Value.picUrl.split('|')
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
  // 放大图片
  addpic(e){
    wx.previewImage({ //预览图片
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  }
  
})