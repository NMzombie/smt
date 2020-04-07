const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolCode:'',//学校代码
    schoolname:'',//学校名称
    schoolInfo:[],//学校概况
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      schoolCode: options.schoolcode,
      schoolname: options.schoolname,
    })
    this.getSchoolInfo();
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
  getSchoolInfo(){
    app.wxApi.GetSchoolIntroInfo({ SchoolCode: this.data.schoolCode}).then(res=>{
      if (res.ResultCode == 1){
        this.setData({
          schoolInfo: res.Value
        })
      }else{
        this.setData({
          schoolInfo: null
        })
      }
    })
  },
  //签到总列表
  renderSingin(){
    wx.navigateTo({
      url: `/pages/signIn/schoolSigninDetail/schoolSigninDetail?schoolcode=${this.data.schoolCode}&schoolname=${this.data.schoolname}`
    })
  },
  //订单总列表
  renderOrderForm(){
    wx.navigateTo({
      url: `/pages/orderForm/orderFormHome/orderFormHome?KeyWord=${this.data.schoolname}`
    })
  },
  //商机总列表
  renderSj() {
    wx.navigateTo({
      url: `/pages/sj/sjHome/sjHome?KeyWord=${this.data.schoolname}`
    })
  },
  //商机详情
  sjDetail(e){
    wx.navigateTo({
      url: "/pages/sj/sjDetail/sjDetail?id=" + e.currentTarget.dataset.id
    })
  },
  // 订单详情
  orderFormDetail(e){
    wx.navigateTo({
      url: "/pages/orderForm/orderFormDetail/orderFormDetail?id=" + e.currentTarget.dataset.id + "&type=1" 
    })
  },
})