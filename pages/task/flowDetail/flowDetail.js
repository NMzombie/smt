var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SchoolFlowLinkId:'',
    flowDetail:{},
    src: app.SRC,
    imgUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      SchoolFlowLinkId:options.id,
      childtext: options.childtext
    })
    this.TaskFlowLinkDetails();
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
  //预览图片
  previewImage(e){
    wx.previewImage({ 
      current: '', // 当前显示图片的http链接
      urls: [this.data.imgUrl] // 需要预览的图片http链接列表
    })
  },
  //列表流程详情
  TaskFlowLinkDetails(){
    app.task.TaskFlowLinkDetails({ SchoolFlowLinkId: this.data.SchoolFlowLinkId }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          flowDetail: res.Value
        })
       
        this.setData({
          ['flowDetail.Fzr']: res.Value.Fzr == '' ? '' : res.Value.Fzr.split(',')[1],
          ['flowDetail.OpMode']: res.Value.OpMode == '' ? '' : res.Value.OpMode.split('|').join(','),
          imgUrl: this.data.flowDetail.HjFj == '' || this.data.flowDetail.HjFj == null ? '' : this.data.src + this.data.flowDetail.HjFj
        })
      }
    })
  }
})