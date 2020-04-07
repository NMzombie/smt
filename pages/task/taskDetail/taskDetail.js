var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex: 0,
    showChildFlag:false, //
    SchoolFlowId: '',     //学校任务流程编号
    flowInfo:{},           //任务详情数组
    SchoolFlowLinkId:'',  //任务环节流程
    helpText:'',          //帮助说明
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      SchoolFlowId:options.id
    });
    this.TaskFlowLinkList();
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
  //维修人员
  bindPickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value,
      SchoolFlowLinkId: this.data.flowInfo.SchoolFlowLinkListView[e.detail.value].Id
    })
    this.TaskFlowLinkHelp();
    
  },
  showChild(e){
    this.setData({
      [`flowInfo.SchoolFlowLinkListView[${e.currentTarget.dataset.itemindex}].showChild`]: !this.data.flowInfo.SchoolFlowLinkListView[e.currentTarget.dataset.itemindex].showChild
    })
  },
  //详情
  flowDetail(e){
    wx.navigateTo({
      url: `/pages/task/flowDetail/flowDetail?id=${e.currentTarget.dataset.id}&childtext=${e.currentTarget.dataset.childtext}`,
    })
  },
  //登记
  register(e){
    wx.redirectTo({
      url: `/pages/task/register/register?id=${e.currentTarget.dataset.id}&SchoolFlowId=${this.data.SchoolFlowId}`,
    })
  },
  //获取任务列表
  TaskFlowLinkList() {
    app.task.TaskFlowLinkList({ SchoolFlowId: this.data.SchoolFlowId}).then(res => {
      if(res.ResultCode == 1){
        res.Value.SchoolFlowLinkListView.forEach((item,index)=>{
          item.showChild = false;
        })
        this.setData({
          flowInfo: res.Value
        })
      }
    })
  },
  //切换任务帮助
  TaskFlowLinkHelp(){
    app.task.TaskFlowLinkHelp({ SchoolFlowLinkId: this.data.SchoolFlowLinkId }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          helpText: res.Value.Bz
        })
        wx.showModal({
          title: '说明',
          showCancel: false,
          content: this.data.helpText == '' ? '暂无说明' : this.data.helpText,
          success(res) {
            if (res.confirm) {
              
            }
          }
        })
      }
    })
  },

  taskBz(){
    wx.showModal({
      title: '说明',
      showCancel: false,
      content: this.data.flowInfo.StartBz == '' ? '暂无说明' : this.data.flowInfo.StartBz,
      success(res) {
        if (res.confirm) {

        }
      }
    })
  }

})