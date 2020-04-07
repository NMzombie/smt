var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusIndex:0,
    statusArr: [{// 1：正常 2：维护超期 3:离线（掉线） 4：设备故障 ,
      name:'正常',
      val:1
    },{
      name: '维护超期',
      val: 2
    },{
      name: '离线（掉线)',
      val: 3
    },{
      name: '设备故障',
      val: 4
    }],
    searchkey:'',//搜索内容
    pageIndex:1,//当前页数
    pageSize:10,//每页个数
    list:[],//数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.RepairsEquipmentList();
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
  deviceDetail(e){
    let item = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/device/school/deviceDetail/deviceDetail?kqjid=${item.kqjid}&schoolcode=${item.schoolcode}&schoolname=${item.schoolname}&type=2`,
    })
  },

  // 设备预警列表
  RepairsEquipmentList(){
    let { pageIndex, pageSize, typeIndex, searchkey, statusArr, statusIndex} = this.data
    app.device.RepairsEquipmentList({ PageIndex: pageIndex, PageSize: pageSize, WarningState: statusArr[statusIndex].val, SchoolName: searchkey}).then(res=>{
      const { Value, ResultCode, ResultMessage } = res;
      if (ResultCode == 1) {
        this.setData({
          list: this.data.list.concat(Value.List),
          totalCount: Value.TotalItemCount
       })
      } else {
        wx.showToast({
          title: ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //加载更多
  addMore() {
    if (this.data.totalCount <= this.data.list.length) return;
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.RepairsEquipmentList()
  },
  //切换状态
  bindPickerChange(e){
    this.setData({
      statusIndex:e.detail.value,
      pageIndex:1,
      list:[],
      totalCount:0
    })
    this.RepairsEquipmentList()
  },
  //跳转到报修
  deviceRepair(e){
    let item = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/device/school/repairsDevice/repairsDevice?kqjid=${item.kqjid}&schoolcode=${item.schoolcode}&schoolname=${item.schoolname}`,
    })
  },
  //搜索
  requestData(){
    this.setData({
      pageIndex: 1,
      list: [],
      totalCount: 0
    })
    this.RepairsEquipmentList()
  },
  bindKeyInput(e){
    this.setData({
      searchkey:e.detail.value
    })
  }
})